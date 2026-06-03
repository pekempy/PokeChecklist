const fs = require('fs');
const readline = require('readline');
const path = require('path');

const csvPath = path.join(__dirname, 'data_export_encounters_csv_comma');
const dbPath = path.join(__dirname, '..', 'pokemon_detailed_data_386.json');

const pokemonData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const nameToId = {};
pokemonData.forEach(p => {
  nameToId[p.name.toLowerCase().replace(/[^a-z0-9]/g, '-')] = p.id;
  nameToId[p.name.toLowerCase()] = p.id;
});

// Custom mappings for weird names
nameToId['mr-mime'] = 122;
nameToId['nidoran-f'] = 29;
nameToId['nidoran-m'] = 32;
nameToId['farfetchd'] = 83;

// Map section logic (from generate_gsc.cjs roughly)
const mapToSection = {
  "New Bark Town": 1, "Route 29": 1, "Cherrygrove City": 1, "Route 30": 1, "Route 31": 1, "Dark Cave": 1, "Violet City": 1, "Sprout Tower": 1, "Route 32": 1, "Ruins of Alph": 1,
  "Route 36": 2, "Route 35": 2, "Route 34": 2, "Ilex Forest": 2, "Azalea Town": 2, "Slowpoke Well": 2, "Route 33": 2, "Union Cave": 2,
  "Goldenrod City": 3, "National Park": 3, "Route 37": 3, "Ecruteak City": 3, "Burned Tower": 3, "Tin Tower": 3, "Bell Tower": 3,
  "Route 38": 4, "Route 39": 4, "Olivine City": 4, "Route 40": 4, "Route 41": 4, "Cianwood City": 4, "Whirl Islands": 4,
  "Route 42": 5, "Mt Mortar": 5, "Mt. Mortar": 5, "Mahogany Town": 5, "Route 43": 5, "Lake of Rage": 5,
  "Route 44": 6, "Ice Path": 6, "Blackthorn City": 6, "Dragons Den": 6, "Dragon's Den": 6, "Route 45": 6, "Route 46": 6,
  "Route 27": 7, "Tohjo Falls": 7, "Route 26": 7, "Victory Road": 7, "Indigo Plateau": 7,
  "Pallet Town": 8, "Route 1": 8, "Viridian City": 8, "Route 2": 8, "Pewter City": 8, "Route 3": 8, "Mt Moon": 8, "Mt. Moon": 8, "Route 4": 8, "Cerulean City": 8, "Route 24": 8, "Route 25": 8, "Route 5": 8, "Route 6": 8, "Vermilion City": 8,
  "Route 11": 9, "Digletts Cave": 9, "Diglett's Cave": 9, "Route 9": 9, "Route 10": 9, "Rock Tunnel": 9, "Lavender Town": 9, "Route 8": 9, "Route 7": 9, "Celadon City": 9, "Route 16": 9, "Route 17": 9, "Route 18": 9, "Fuchsia City": 9, "Route 15": 9, "Route 14": 9, "Route 13": 9, "Route 12": 9,
  "Saffron City": 10, "Route 19": 10, "Route 20": 10, "Seafoam Islands": 10, "Cinnabar Island": 10, "Route 21": 10, "Route 22": 10, "Route 28": 10, "Mt Silver": 10, "Mt. Silver": 10
};

function determineSection(loc, gameStr) {
  let sec = 10;
  for (const [key, val] of Object.entries(mapToSection)) {
    if (loc.toLowerCase().includes(key.toLowerCase())) {
      sec = val;
      break;
    }
  }
  
  // Cap sections based on the game to match the new Oak Challenge UI structure
  let maxSec = 10;
  if (['red', 'blue', 'yellow', 'firered', 'leafgreen'].includes(gameStr)) {
    maxSec = 7;
  } else if (['ruby', 'sapphire', 'emerald'].includes(gameStr)) {
    maxSec = 9;
  }
  
  return Math.min(sec, maxSec);
}

function formatLocation(locStr) {
  return locStr.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace('Johto', '').replace('Kanto', '').trim();
}

async function processCSV() {
  const fileStream = fs.createReadStream(csvPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const missingEncounters = {
    red: {}, blue: {}, yellow: {},
    gold: {}, silver: {}, crystal: {},
    ruby: {}, sapphire: {}, emerald: {}, firered: {}, leafgreen: {}
  };

  let header = true;
  for await (const line of rl) {
    if (header) { header = false; continue; }
    
    // Naive CSV split, ignoring quotes since we just need first few columns reliably
    const parts = line.split(',');
    if (parts.length < 5) continue;
    
    const formId = parts[0];
    const versions = parts[1].replace(/"/g, ''); // Could be "gold,silver"
    const locId = parts[2];
    const method = parts[3];

    // Check for our target versions
    const gameKeys = [];
    if (versions.includes('red-blue')) { gameKeys.push('red', 'blue'); }
    if (versions.includes('yellow')) gameKeys.push('yellow');
    if (versions.includes('gold,silver') || versions.includes('gold-silver')) { gameKeys.push('gold', 'silver'); }
    if (versions.includes('crystal')) gameKeys.push('crystal');
    if (versions.includes('ruby,sapphire') || versions.includes('ruby-sapphire')) { gameKeys.push('ruby', 'sapphire'); }
    if (versions.includes('emerald')) gameKeys.push('emerald');
    if (versions.includes('firered,leafgreen') || versions.includes('firered-leafgreen')) { gameKeys.push('firered', 'leafgreen'); }
    
    // Fallbacks if they split them
    if (versions.includes('red') && !versions.includes('firered') && !gameKeys.includes('red')) gameKeys.push('red');
    if (versions.includes('blue') && !gameKeys.includes('blue')) gameKeys.push('blue');
    if (versions.includes('gold') && !gameKeys.includes('gold')) gameKeys.push('gold');
    if (versions.includes('silver') && !gameKeys.includes('silver')) gameKeys.push('silver');
    if (versions.includes('ruby') && !gameKeys.includes('ruby')) gameKeys.push('ruby');
    if (versions.includes('sapphire') && !gameKeys.includes('sapphire')) gameKeys.push('sapphire');
    if (versions.includes('firered') && !gameKeys.includes('firered')) gameKeys.push('firered');
    if (versions.includes('leafgreen') && !gameKeys.includes('leafgreen')) gameKeys.push('leafgreen');

    if (gameKeys.length === 0) continue;
    
    // Include methods we want to supplement (mostly fishing, headbutt, swarm, gift, static)
    const isFishing = method.includes('fishing');
    const isHeadbutt = method.includes('headbutt');
    const isSwarm = method.includes('swarm');
    const isGift = method.includes('gift');
    const isStatic = method.includes('static') || method.includes('only-one');
    const isTrade = method.includes('trade');
    
    // We can also allow regular walking if the location explicitly mentions a missing area
    // but to avoid massive duplication, let's stick to these specific non-standard methods
    if (!isFishing && !isHeadbutt && !isSwarm && !isGift && !isStatic && !isTrade) continue;

    const pokeName = formId.replace('-default', '').replace(/-[a-z]+$/g, '');
    const id = nameToId[pokeName] || nameToId[pokeName.replace('-', '')];
    
    if (!id || id > 251) continue; // Only care up to Celebi

    let methodTag = '';
    if (method.includes('old-rod')) methodTag = 'Old Rod';
    else if (method.includes('good-rod')) methodTag = 'Good Rod';
    else if (method.includes('super-rod')) methodTag = 'Super Rod';
    else if (isFishing) methodTag = 'Fishing';
    else if (isHeadbutt) methodTag = 'Headbutt';
    else if (isSwarm) methodTag = 'Swarm';
    else if (isGift) methodTag = 'Gift';
    else if (isStatic) methodTag = 'Static';
    else if (isTrade) methodTag = 'Trade';
    else methodTag = method;

    let formattedLoc = formatLocation(locId);
    if (formattedLoc.includes('Ruins Of Alph')) formattedLoc = 'Ruins of Alph';
    formattedLoc = formattedLoc.replace(' Route', 'Route'); // e.g. Johto Route 34 -> Route 34

    const displayLoc = `${formattedLoc} (${methodTag})`;
    
    for (const g of gameKeys) {
      const sec = determineSection(formattedLoc, g);
      if (!missingEncounters[g][id]) {
        missingEncounters[g][id] = { loc: displayLoc, sec: sec };
      } else {
        if (!missingEncounters[g][id].loc.includes(displayLoc)) {
          missingEncounters[g][id].loc += `, ${displayLoc}`;
        }
        if (sec < missingEncounters[g][id].sec) {
          missingEncounters[g][id].sec = sec;
        }
      }
    }
  }

  // Now read the existing generated JSONs, merge, and save
  const games = ['red', 'blue', 'yellow', 'gold', 'silver', 'crystal', 'ruby', 'sapphire', 'emerald', 'firered', 'leafgreen'];
  for (const g of games) {
    const jsonPath = path.join(__dirname, `generated_${g}.json`);
    let data = {};
    if (fs.existsSync(jsonPath)) {
      data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    }
    
    for (const [id, entry] of Object.entries(missingEncounters[g])) {
      if (!data[id]) {
        data[id] = entry;
      } else {
        if (!data[id].loc.includes(entry.loc.split(', ')[0])) {
           data[id].loc += `, ${entry.loc}`;
        }
        if (entry.sec < data[id].sec) {
           data[id].sec = entry.sec;
        }
      }
    }
    
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`Merged missing PokeDB data into generated_${g}.json`);
  }
}

processCSV().catch(console.error);
