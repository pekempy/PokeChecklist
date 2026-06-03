const fs = require('fs');

const pokemonMaster = JSON.parse(fs.readFileSync('../pokemon_master_386.json', 'utf8'));
const speciesToId = {};
pokemonMaster.forEach(p => {
  let name = p.name.toUpperCase().replace(/[^A-Z0-9]/g, '_');
  if (name === 'NIDORAN_') name = p.id === 29 ? 'NIDORAN_F' : 'NIDORAN_M';
  if (name === 'FARFETCH_D' || name === 'FARFETCHD') name = 'FARFETCH_D';
  if (name === 'MR__MIME' || name === 'MR_MIME') name = 'MR__MIME';
  if (name === 'DEOXYS') name = 'DEOXYS_NORMAL';
  speciesToId[name] = p.id;
  speciesToId[p.name.toUpperCase()] = p.id;
  speciesToId['SPECIES_' + name] = p.id;
  speciesToId['SPECIES_' + name.replace('_', '')] = p.id;
});
speciesToId['SPECIES_NIDORAN_F'] = 29;
speciesToId['SPECIES_NIDORAN_M'] = 32;
speciesToId['SPECIES_FARFETCHD'] = 83;
speciesToId['SPECIES_MR_MIME'] = 122;

const mapToSectionRSE = {
  // Pre-Badge 1 (Rustboro Gym)
  'Route 101': 1, 'Route 102': 1, 'Route 103': 1, 'Route 104': 1, 'Petalburg Woods': 1,
  'Route 115': 1, 'Route 116': 1, 'Rusturf Tunnel': 1,
  // Pre-Badge 2 (Mauville Gym)
  'Route 105': 2, 'Route 106': 2, 'Granite Cave': 2, 'Route 107': 2, 'Route 108': 2, 'Route 109': 2,
  'Route 110': 2, 'Route 117': 2,
  // Pre-Badge 3 (Lavaridge Gym)
  'Route 111': 3, 'Route 112': 3, 'Fiery Path': 3, 'Route 113': 3, 'Route 114': 3, 'Meteor Falls': 3,
  'Jagged Pass': 3,
  // Pre-Badge 4 & 5 (Dewford and Petalburg Gym)
  'Desert': 4, 'Mirage Tower': 4,
  // Pre-Badge 6 (Mossdeep Gym)
  'New Mauville': 5, 'Route 118': 5, 'Route 119': 5, 'Route 120': 5, 'Route 121': 5, 'Safari Zone': 5,
  'Mt. Pyre': 5, 'Route 122': 5, 'Route 123': 5, 'Shoal Cave': 5, 'Route 124': 5, 'Route 125': 5,
  'Route 126': 5, 'Route 127': 5,
  // Pre-Badge 7 (Sootopolis Gym)
  'Route 128': 6, 'Seafloor Cavern': 6, 'Cave Of Origin': 6, 'Sealed Chamber': 6,
  'Desert Ruins': 6, 'Island Cave': 6,
  // Pre-Badge 8 (Fortree Gym)
  'Ancient Tomb': 7, 'Sky Pillar': 7,
  // Pre-Elite Four
  'Route 129': 8, 'Route 130': 8, 'Route 131': 8, 'Route 132': 8, 'Route 133': 8, 'Route 134': 8,
  'Ever Grande City': 8, 'Victory Road': 8,
  // Post-Game
  'Desert Underpass': 9, 'Artisan Cave': 9, 'Marine Cave': 9, 'Terra Cave': 9,
  'Altering Cave': 9, 'Navel Rock': 9, 'Birth Island': 9, 'Faraway Island': 9
};

const mapToSectionFRLG = {
  // Pre-Badge 1 (Brock)
  'Route 1': 1, 'Route 2': 1, 'Route 22': 1, 'Viridian Forest': 1,
  // Pre-Badge 2 (Misty)
  'Route 3': 2, 'Mt. Moon': 2, 'Route 4': 2, 'Route 24': 2, 'Route 25': 2, 'Route 5': 2, 'Route 6': 2, 'Route 11': 2, "Diglett's Cave": 2,
  // Pre-Badge 3 (Koga)
  'Route 9': 3, 'Route 10': 3, 'Rock Tunnel': 3, 'Route 8': 3, 'Route 7': 3,
  'Pokemon Tower': 3, 'Route 12': 3, 'Route 13': 3, 'Route 14': 3, 'Route 15': 3, 'Route 16': 3, 'Route 17': 3, 'Route 18': 3,
  'Safari Zone': 3,
  // Pre-Badge 4 (Blaine)
  'Route 19': 4, 'Route 20': 4, 'Route 21': 4, 'Seafoam Islands': 4, 'Pokemon Mansion': 4, 'Power Plant': 4,
  // Pre-Badge 5 (Erika)
  'One Island': 5, 'Two Island': 5, 'Three Island': 5, 'Kindle Road': 5, 'Treasure Beach': 5, 'Mt. Ember': 5,
  'Cape Brink': 5, 'Bond Bridge': 5, 'Berry Forest': 5, 'Water Path': 5, 'Ruin Valley': 5,
  // Pre-Badges 6-8 and E4
  'Route 23': 6, 'Victory Road': 6,
  // Post-Game
  'Four Island': 7, 'Five Island': 7, 'Six Island': 7, 'Seven Island': 7,
  'Icefall Cave': 7, 'Resort Gorgeous': 7, 'Lost Cave': 7, 'Water Labyrinth': 7, 'Pattern Bush': 7,
  'Green Path': 7, 'Outcast Island': 7, 'Trainer Tower': 7, 'Canyon Entrance': 7, 'Sevault Canyon': 7,
  'Tanoby Ruins': 7, 'Cerulean Cave': 7,
  'Navel Rock': 7, 'Birth Island': 7
};

function cleanMapNameGen3(rawName) {
  let name = rawName.replace('MAP_', '').replace(/_/g, ' ');
  // Handle caps and spaces
  name = name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
  // Specific fixes
  name = name.replace(/Mt Pyre.*/, 'Mt. Pyre')
             .replace(/Granite Cave.*/, 'Granite Cave')
             .replace(/Meteor Falls.*/, 'Meteor Falls')
             .replace(/Shoal Cave.*/, 'Shoal Cave')
             .replace(/Victory Road.*/, 'Victory Road')
             .replace(/Seafloor Cavern.*/, 'Seafloor Cavern')
             .replace(/Cave Of Origin.*/, 'Cave Of Origin')
             .replace(/Mt Moon.*/, 'Mt. Moon')
             .replace(/Rock Tunnel.*/, 'Rock Tunnel')
             .replace(/Pokemon Tower.*/, 'Pokemon Tower')
             .replace(/Seafoam Islands.*/, 'Seafoam Islands')
             .replace(/Pokemon Mansion.*/, 'Pokemon Mansion')
             .replace(/Cerulean Cave.*/, 'Cerulean Cave')
             .replace(/Digletts Cave.*/, "Diglett's Cave")
             .replace(/Safari Zone.*/, 'Safari Zone')
             .replace(/Ruins Of Alph.*/, 'Ruins Of Alph')
             .replace(/Icefall Cave.*/, 'Icefall Cave')
             .replace(/Lost Cave.*/, 'Lost Cave')
             .replace(/Mt Ember.*/, 'Mt. Ember');
             
  name = name.replace(/ 1f.*/i, '').replace(/ B1f.*/i, '').replace(/ 2f.*/i, '').replace(/ B2f.*/i, '').replace(/ 3f.*/i, '');
  return name.trim();
}

function parseGen3JSON(fileContent, versionTarget, sectionMap) {
  const data = JSON.parse(fileContent);
  let encounters = [];

  for (const group of data.wild_encounter_groups) {
    for (const e of group.encounters) {
      if (versionTarget === 'sapphire' && !e.base_label.includes('Sapphire') && e.base_label.match(/(Ruby|Emerald|FireRed|LeafGreen)/)) continue;
      if (versionTarget === 'ruby' && e.base_label.includes('Sapphire')) continue;
      if (versionTarget === 'leafgreen' && !e.base_label.includes('LeafGreen') && e.base_label.match(/(FireRed)/)) continue;
      if (versionTarget === 'firered' && e.base_label.includes('LeafGreen')) continue;

      const mapClean = cleanMapNameGen3(e.map || e.base_label || '');

      if (e.land_mons) {
        for (const mon of e.land_mons.mons) {
          encounters.push({ map: mapClean, species: mon.species, method: 'Walk' });
        }
      }
      if (e.water_mons) {
        for (const mon of e.water_mons.mons) {
          encounters.push({ map: mapClean, species: mon.species, method: 'Surf' });
        }
      }
      if (e.fishing_mons) {
        for (const mon of e.fishing_mons.mons) {
          encounters.push({ map: mapClean, species: mon.species, method: 'Fish' });
        }
      }
      if (e.rock_smash_mons) {
        for (const mon of e.rock_smash_mons.mons) {
          encounters.push({ map: mapClean, species: mon.species, method: 'Rock Smash' });
        }
      }
    }
  }

  const speciesData = {};
  for (const e of encounters) {
    const id = speciesToId[e.species];
    if (!id) {
      // console.log("Missing ID for:", e.species);
      continue;
    }
    
    if (!speciesData[id]) speciesData[id] = [];
    
    const defaultSec = versionTarget === 'firered' || versionTarget === 'leafgreen' ? 7 : 9;
    const sec = sectionMap[e.map] || defaultSec;
    
    const existing = speciesData[id].find(x => x.map === e.map && x.method === e.method);
    if (!existing) {
      speciesData[id].push({ map: e.map, method: e.method, sec: sec });
    }
  }

  const finalMap = {};
  for (const id in speciesData) {
    const locs = speciesData[id];
    locs.sort((a, b) => a.sec - b.sec);
    const minSec = locs[0].sec;
    
    const uniqueMaps = [...new Set(locs.map(l => l.map))];
    let locStr = uniqueMaps.join(', ');
    
    const methods = [...new Set(locs.map(l => l.method))];
    let methodStr = "";
    if (methods.includes('Surf') && !methods.includes('Walk')) methodStr = " (Surf)";
    else if (methods.includes('Fish') && !methods.includes('Walk') && !methods.includes('Surf')) methodStr = " (Fish)";
    else if (methods.includes('Rock Smash') && !methods.includes('Walk')) methodStr = " (Rock Smash)";
    
    finalMap[id] = { loc: locStr + methodStr, sec: minSec };
  }
  return finalMap;
}

const emeraldMap = parseGen3JSON(fs.readFileSync('emerald_wild.json', 'utf8'), 'emerald', mapToSectionRSE);
const rubyMap = parseGen3JSON(fs.readFileSync('ruby_wild.json', 'utf8'), 'ruby', mapToSectionRSE);
const sapphireMap = parseGen3JSON(fs.readFileSync('ruby_wild.json', 'utf8'), 'sapphire', mapToSectionRSE);
const fireredMap = parseGen3JSON(fs.readFileSync('firered_wild.json', 'utf8'), 'firered', mapToSectionFRLG);

fs.writeFileSync('generated_emerald.json', JSON.stringify(emeraldMap, null, 2));
fs.writeFileSync('generated_ruby.json', JSON.stringify(rubyMap, null, 2));
fs.writeFileSync('generated_sapphire.json', JSON.stringify(sapphireMap, null, 2));
fs.writeFileSync('generated_firered.json', JSON.stringify(fireredMap, null, 2));
console.log("Generated Gen 3 JSON maps successfully!");
