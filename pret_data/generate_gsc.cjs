const fs = require('fs');

function formatMapName(constName) {
  return constName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// Map of maps to Sections (1 to 10)
const mapToSection = {
  // Pre-Badge 1 (Falkner)
  'New Bark Town': 1, 'Route 29': 1, 'Cherrygrove City': 1, 'Route 30': 1, 'Route 31': 1, 'Dark Cave Violet Entrance': 1,
  'Violet City': 1, 'Sprout Tower 1f': 1, 'Sprout Tower 2f': 1, 'Sprout Tower 3f': 1, 'Route 46': 1,
  // Pre-Badge 2 (Bugsy)
  'Route 32': 2, 'Ruins Of Alph Outside': 2, 'Union Cave 1f': 2,
  'Route 33': 2, 'Azalea Town': 2, 'Slowpoke Well B1f': 2, 'Slowpoke Well B2f': 2, 'Ilex Forest': 2,
  // Pre-Badge 3 (Whitney)
  'Route 34': 3, 'Goldenrod City': 3, 'Route 35': 3, 'National Park': 3, 'National Park Bug Contest': 3, 'Route 36': 3,
  // Pre-Badge 4 (Morty)
  'Route 37': 4, 'Ecruteak City': 4, 'Burned Tower 1f': 4, 'Burned Tower B1f': 4,
  'Route 38': 4, 'Route 39': 4, 'Olivine City': 4, 'Route 40': 4, 'Route 42': 4, 'Mount Mortar 1f Outside': 4, 'Mount Mortar 1f Inside': 4, 'Mount Mortar 2f Inside': 4, 'Mount Mortar B1f': 4,
  'Mahogany Town': 4, 'Route 43': 4, 'Lake Of Rage': 4,
  // Pre-Badge 5 (Pryce)
  'Tohjo Falls': 5, 'Ruins Of Alph Inner Chamber': 5, 'Union Cave B1f': 5, 'Union Cave B2f': 5, 'Route 41': 5,
  // Pre-Badge 6 and 7 (Jasmine and Chuck)
  'Cianwood City': 6, 'Whirl Island Nw': 6, 'Whirl Island Ne': 6, 'Whirl Island Sw': 6, 'Whirl Island Se': 6, 'Whirl Island B1f': 6, 'Whirl Island B2f': 6, 'Whirl Island Lugia Chamber': 6,
  // Pre-Badge 8 (Clair)
  'Route 44': 7, 'Ice Path 1f': 7, 'Ice Path B1f': 7, 'Ice Path B2f Mahogany Side': 7, 'Ice Path B2f Blackthorn Side': 7, 'Ice Path B3f': 7,
  'Blackthorn City': 7, 'Dragons Den 1f': 7, 'Dragons Den B1f': 7, 'Dark Cave Blackthorn Entrance': 7, 'Route 45': 7,
  'Tin Tower 1f': 7, 'Tin Tower 2f': 7, 'Tin Tower 3f': 7, 'Tin Tower 4f': 7, 'Tin Tower 5f': 7, 'Tin Tower 6f': 7, 'Tin Tower 7f': 7, 'Tin Tower 8f': 7, 'Tin Tower 9f': 7,
  // Pre-Elite Four
  'Route 27': 8, 'Route 26': 8, 'Victory Road': 8,
  // Pre-Kanto Badges
  'Route 1': 9, 'Route 2': 9, 'Route 3': 9, 'Route 4': 9, 'Route 5': 9, 'Route 6': 9, 'Route 7': 9, 'Route 8': 9, 'Route 9': 9, 'Route 10 North': 9, 'Route 10 South': 9,
  'Route 11': 9, 'Route 12': 9, 'Route 13': 9, 'Route 14': 9, 'Route 15': 9, 'Route 16': 9, 'Route 17': 9, 'Route 18': 9, 'Route 19': 9, 'Route 20': 9,
  'Route 21': 9, 'Route 22': 9, 'Route 24': 9, 'Route 25': 9,
  'Pallet Town': 9, 'Viridian City': 9, 'Pewter City': 9, 'Cerulean City': 9, 'Vermilion City': 9, 'Lavender Town': 9, 'Celadon City': 9, 'Fuchsia City': 9, 'Saffron City': 9, 'Cinnabar Island': 9,
  'Mount Moon': 9, 'Mount Moon Square': 9, 'Rock Tunnel 1f': 9, 'Rock Tunnel B1f': 9, 'Digletts Cave': 9, 'Underground Path': 9,
  // Post-Kanto Badges
  'Route 28': 10, 'Silver Cave Outside': 10, 'Silver Cave Room 1': 10, 'Silver Cave Room 2': 10, 'Silver Cave Room 3': 10, 'Silver Cave Item Rooms': 10
};

// Aliases for Map Names to clean them up
const cleanMapName = (name) => {
  if (name.includes('Sprout Tower')) return 'Sprout Tower';
  if (name.includes('Tin Tower')) return 'Tin Tower';
  if (name.includes('Burned Tower')) return 'Burned Tower';
  if (name.includes('Whirl Island')) return 'Whirl Islands';
  if (name.includes('Mount Mortar')) return 'Mt. Mortar';
  if (name.includes('Ice Path')) return 'Ice Path';
  if (name.includes('Dragons Den')) return 'Dragon\'s Den';
  if (name.includes('Silver Cave')) return 'Mt. Silver';
  if (name.includes('Union Cave')) return 'Union Cave';
  if (name.includes('Slowpoke Well')) return 'Slowpoke Well';
  if (name.includes('Ruins Of Alph')) return 'Ruins of Alph';
  if (name.includes('Dark Cave')) return 'Dark Cave';
  if (name.includes('Rock Tunnel')) return 'Rock Tunnel';
  return name;
}

function parseGrassAsm(fileContent, targetVersion) {
  const lines = fileContent.split('\n');
  const encounters = [];
  
  let currentMap = null;
  let currentTime = null;
  let activeVersion = 'both'; // 'both', 'gold', 'silver'
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith(';')) {
      if (line.includes('; morn')) currentTime = 'morn';
      else if (line.includes('; day')) currentTime = 'day';
      else if (line.includes('; nite')) currentTime = 'nite';
      continue;
    }
    
    if (line.startsWith('IF DEF(_GOLD)')) activeVersion = 'gold';
    else if (line.startsWith('ELIF DEF(_SILVER)')) activeVersion = 'silver';
    else if (line.startsWith('ENDC')) activeVersion = 'both';
    
    // Check if we should process this line based on version
    if (targetVersion !== 'crystal') {
      if (activeVersion !== 'both' && activeVersion !== targetVersion) continue;
    }
    
    if (line.startsWith('def_grass_wildmons')) {
      const parts = line.split(/\s+/);
      currentMap = formatMapName(parts[1]);
      currentTime = 'morn'; // Default reset
    } else if (line.startsWith('db') && line.includes('percent')) {
      // Rates line, ignore for now
    } else if (line.startsWith('db') && currentMap) {
      const parts = line.replace('db', '').trim().split(',');
      if (parts.length >= 2) {
        let species = parts[1].trim().split(' ')[0];
        if (species.includes(';')) species = species.split(';')[0].trim();
        if (!species || species === '0' || species === '$00') continue;
        
        encounters.push({ map: currentMap, time: currentTime, species: species, method: 'Walk' });
      }
    } else if (line.startsWith('end_grass_wildmons')) {
      currentMap = null;
    }
  }
  return encounters;
}

function parseWaterAsm(fileContent, targetVersion) {
  const lines = fileContent.split('\n');
  const encounters = [];
  let currentMap = null;
  let activeVersion = 'both';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith(';')) continue;
    
    if (line.startsWith('IF DEF(_GOLD)')) activeVersion = 'gold';
    else if (line.startsWith('ELIF DEF(_SILVER)')) activeVersion = 'silver';
    else if (line.startsWith('ENDC')) activeVersion = 'both';
    
    if (targetVersion !== 'crystal') {
      if (activeVersion !== 'both' && activeVersion !== targetVersion) continue;
    }
    
    if (line.startsWith('def_water_wildmons')) {
      const parts = line.split(/\s+/);
      currentMap = formatMapName(parts[1]);
    } else if (line.startsWith('db') && currentMap && !line.includes('percent')) {
      const parts = line.replace('db', '').trim().split(',');
      if (parts.length >= 2) {
        let species = parts[1].trim().split(' ')[0];
        if (species.includes(';')) species = species.split(';')[0].trim();
        if (!species || species === '0' || species === '$00') continue;
        
        encounters.push({ map: currentMap, time: 'all', species: species, method: 'Surf' });
      }
    } else if (line.startsWith('end_water_wildmons')) {
      currentMap = null;
    }
  }
  return encounters;
}

const pokemonMaster = JSON.parse(fs.readFileSync('../pokemon_master_386.json', 'utf8'));
const speciesToId = {};
pokemonMaster.forEach(p => {
  let name = p.name.toUpperCase().replace(/[^A-Z0-9]/g, '_');
  if (name === 'NIDORAN_') name = p.id === 29 ? 'NIDORAN_F' : 'NIDORAN_M';
  if (name === 'FARFETCH_D') name = 'FARFETCH_D';
  if (name === 'MR__MIME') name = 'MR__MIME';
  if (name === 'HO_OH') name = 'HO_OH';
  speciesToId[name] = p.id;
  speciesToId[p.name.toUpperCase()] = p.id;
});
speciesToId['NIDORAN_F'] = 29;
speciesToId['NIDORAN_M'] = 32;
speciesToId['FARFETCH_D'] = 83;
speciesToId['MR__MIME'] = 122;
speciesToId['HO_OH'] = 250;

function generateGameMap(gameId) {
  let grassFiles = [];
  let waterFiles = [];
  
  if (gameId === 'crystal') {
    grassFiles = ['johto_grass.asm', 'kanto_grass.asm'];
    waterFiles = ['johto_water.asm', 'kanto_water.asm'];
  } else {
    grassFiles = ['gs_johto_grass.asm', 'gs_kanto_grass.asm'];
    waterFiles = ['gs_johto_water.asm', 'gs_kanto_water.asm'];
  }
  
  let encounters = [];
  for (const file of grassFiles) {
    if (fs.existsSync(file)) encounters.push(...parseGrassAsm(fs.readFileSync(file, 'utf8'), gameId));
  }
  for (const file of waterFiles) {
    if (fs.existsSync(file)) encounters.push(...parseWaterAsm(fs.readFileSync(file, 'utf8'), gameId));
  }
  
  // Aggregate by Species
  const speciesData = {};
  for (const e of encounters) {
    const id = speciesToId[e.species];
    if (!id) {
      // console.log("Missing ID for", e.species);
      continue;
    }
    
    if (!speciesData[id]) speciesData[id] = [];
    
    const sec = mapToSection[e.map] || 10;
    const cleanMap = cleanMapName(e.map);
    
    // Check if we already have this map + time + method for this species
    const existing = speciesData[id].find(x => x.map === cleanMap && x.time === e.time && x.method === e.method);
    if (!existing) {
      speciesData[id].push({ map: cleanMap, time: e.time, method: e.method, sec: sec });
    }
  }
  
  const finalMap = {};
  for (const id in speciesData) {
    const locs = speciesData[id];
    locs.sort((a, b) => a.sec - b.sec);
    const minSec = locs[0].sec;
    
    const uniqueMaps = [...new Set(locs.map(l => l.map))];
    let locStr = uniqueMaps.join(', ');
    
    // Just figure out if it's night only or something
    const times = [...new Set(locs.map(l => l.time))];
    let timeStr = "";
    if (times.length === 1 && times[0] === 'nite') timeStr = " (Night)";
    else if (times.length === 1 && times[0] === 'morn') timeStr = " (Morning)";
    else if (times.length === 2 && times.includes('morn') && times.includes('day')) timeStr = " (Morning/Day)";
    
    const methods = [...new Set(locs.map(l => l.method))];
    let methodStr = "";
    if (methods.includes('Surf') && !methods.includes('Walk')) methodStr = " (Surf)";
    
    finalMap[id] = { loc: locStr + timeStr + methodStr, sec: minSec };
  }
  
  return finalMap;
}

const crystalMap = generateGameMap('crystal');
const goldMap = generateGameMap('gold');
const silverMap = generateGameMap('silver');

fs.writeFileSync('generated_crystal.json', JSON.stringify(crystalMap, null, 2));
fs.writeFileSync('generated_gold.json', JSON.stringify(goldMap, null, 2));
fs.writeFileSync('generated_silver.json', JSON.stringify(silverMap, null, 2));
console.log("Generated JSON maps successfully!");
