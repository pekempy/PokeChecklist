const fs = require('fs');
const path = require('path');

const mapToSection = {
  // 1: Pre-Badge 1 (Brock)
  'Route 1': 1, 'Route 2': 1, 'Route 22': 1, 'Viridian Forest': 1,
  // 2: Pre-Badge 2 (Misty)
  'Route 3': 2, 'Mt Moon 1f': 2, 'Mt Moon B1f': 2, 'Mt Moon B2f': 2, 'Route 4': 2,
  // 3: Pre-Badge 3 (Koga) - Everything accessible after Cut
  'Route 24': 3, 'Route 25': 3, 'Route 5': 3, 'Route 6': 3, 'Route 11': 3, 'Digletts Cave': 3,
  'Route 9': 3, 'Route 10': 3, 'Rock Tunnel 1f': 3, 'Rock Tunnel B1f': 3, 'Route 8': 3, 'Route 7': 3,
  'Pokemon Tower 1f': 3, 'Pokemon Tower 2f': 3, 'Pokemon Tower 3f': 3, 'Pokemon Tower 4f': 3, 'Pokemon Tower 5f': 3, 'Pokemon Tower 6f': 3, 'Pokemon Tower 7f': 3,
  'Route 12': 3, 'Route 13': 3, 'Route 14': 3, 'Route 15': 3, 'Route 16': 3, 'Route 17': 3, 'Route 18': 3,
  'Safari Zone Center': 3, 'Safari Zone East': 3, 'Safari Zone North': 3, 'Safari Zone West': 3,
  // 4: Pre-Badge 4 (Erika) - Everything accessible after Surf (from Koga)
  'Sea Routes': 4, 'Seafoam Islands 1f': 4,
  'Pokemon Mansion 1f': 4, 'Pokemon Mansion 2f': 4, 'Pokemon Mansion 3f': 4, 'Pokemon Mansion B1f': 4, 'Route 21': 4, 'Power Plant': 4,
  // 5: Pre-Badges 5-8 - Articuno (Requires Strength from Erika)
  'Seafoam Islands B1f': 5, 'Seafoam Islands B2f': 5, 'Seafoam Islands B3f': 5, 'Seafoam Islands B4f': 5,
  // 6: Pre-Elite Four
  'Route 23': 6, 'Victory Road 1f': 6, 'Victory Road 2f': 6, 'Victory Road 3f': 6,
  // 7: Post-Game
  'Cerulean Cave 1f': 7, 'Cerulean Cave 2f': 7, 'Cerulean Cave B1f': 7,
};

const cleanMapName = (name) => {
  if (name.includes('Mt Moon')) return 'Mt. Moon';
  if (name.includes('Pokemon Tower')) return 'Pokémon Tower';
  if (name.includes('Safari Zone')) return 'Safari Zone';
  if (name.includes('Seafoam Islands')) return 'Seafoam Islands';
  if (name.includes('Pokemon Mansion')) return 'Pokémon Mansion';
  if (name.includes('Cerulean Cave')) return 'Cerulean Cave';
  if (name.includes('Victory Road')) return 'Victory Road';
  if (name.includes('Rock Tunnel')) return 'Rock Tunnel';
  if (name.includes('Sea Routes')) return 'Sea Routes'; // This covers 19 & 20
  if (name === 'Digletts Cave') return "Diglett's Cave";
  return name;
};

function parseRBYMap(fileContent, mapFilename, targetVersion) {
  const lines = fileContent.split('\n');
  const encounters = [];
  
  let currentMap = mapFilename.replace('.asm', '').replace(/([A-Z])/g, ' $1').trim();
  // Fix camelCase splits like "Mt Moon1 F"
  currentMap = currentMap.replace('Mt Moon1 F', 'Mt Moon 1f')
                         .replace('Mt Moon B1 F', 'Mt Moon B1f')
                         .replace('Mt Moon B2 F', 'Mt Moon B2f')
                         .replace('Route10', 'Route 10')
                         .replace(/([A-Za-z]+)(\d+)(F|B\d+F)/i, '$1 $2$3')
                         .replace(/\s+/g, ' ');
  // Hacky fixes for map names
  if (currentMap === 'Mt Moon1f') currentMap = 'Mt Moon 1f';
  if (currentMap === 'Mt Moon B1f') currentMap = 'Mt Moon B1f';
  if (currentMap === 'Mt Moon B2f') currentMap = 'Mt Moon B2f';
  if (currentMap.startsWith('Route ')) {
    const num = currentMap.replace('Route ', '');
    currentMap = `Route ${num.trim()}`;
  }
  
  currentMap = currentMap.replace('1 F', '1f').replace('2 F', '2f').replace('3 F', '3f').replace('4 F', '4f').replace('5 F', '5f').replace('6 F', '6f').replace('7 F', '7f')
                         .replace('B1 F', 'B1f').replace('B2 F', 'B2f').replace('B3 F', 'B3f').replace('B4 F', 'B4f');

  let activeVersion = 'both'; 
  let currentMethod = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith(';')) continue;
    
    if (line.startsWith('IF DEF(_RED)')) activeVersion = 'red';
    else if (line.startsWith('IF DEF(_BLUE)')) activeVersion = 'blue';
    else if (line.startsWith('ELIF DEF(_BLUE)')) activeVersion = 'blue';
    else if (line.startsWith('ENDC')) activeVersion = 'both';
    
    if (targetVersion !== 'yellow') {
      if (activeVersion !== 'both' && activeVersion !== targetVersion) continue;
    }
    
    if (line.startsWith('def_grass_wildmons')) {
      const rate = parseInt(line.split(' ')[1]);
      if (rate > 0) currentMethod = 'Walk';
      else currentMethod = null;
    } else if (line.startsWith('def_water_wildmons')) {
      const rate = parseInt(line.split(' ')[1]);
      if (rate > 0) currentMethod = 'Surf';
      else currentMethod = null;
    } else if (line.startsWith('db') && currentMethod) {
      const parts = line.replace('db', '').trim().split(',');
      if (parts.length >= 2) {
        let species = parts[1].trim().split(' ')[0];
        if (species.includes(';')) species = species.split(';')[0].trim();
        if (!species || species === '0' || species === '$00') continue;
        
        encounters.push({ map: currentMap, species: species, method: currentMethod });
      }
    } else if (line.startsWith('end_grass_wildmons') || line.startsWith('end_water_wildmons')) {
      currentMethod = null;
    }
  }
  return encounters;
}

const pokemonMaster = JSON.parse(fs.readFileSync('../pokemon_master_386.json', 'utf8'));
const speciesToId = {};
pokemonMaster.forEach(p => {
  let name = p.name.toUpperCase().replace(/[^A-Z0-9]/g, '_');
  if (name === 'NIDORAN_') name = p.id === 29 ? 'NIDORAN_F' : 'NIDORAN_M';
  if (name === 'FARFETCH_D' || name === 'FARFETCHD') name = 'FARFETCH_D';
  if (name === 'MR__MIME' || name === 'MR_MIME') name = 'MR__MIME';
  speciesToId[name] = p.id;
  speciesToId[p.name.toUpperCase()] = p.id;
});
speciesToId['NIDORAN_F'] = 29;
speciesToId['NIDORAN_M'] = 32;
speciesToId['FARFETCH_D'] = 83;
speciesToId['FARFETCHD'] = 83;
speciesToId['MR__MIME'] = 122;
speciesToId['MR_MIME'] = 122;

function generateGameMap(gameId) {
  let mapDir = gameId === 'yellow' ? 'pokeyellow_maps' : 'pokered_maps';
  
  let encounters = [];
  const files = fs.readdirSync(mapDir);
  for (const file of files) {
    if (file.endsWith('.asm')) {
      encounters.push(...parseRBYMap(fs.readFileSync(path.join(mapDir, file), 'utf8'), file, gameId));
    }
  }
  
  const speciesData = {};
  for (const e of encounters) {
    const id = speciesToId[e.species];
    if (!id) continue;
    
    if (!speciesData[id]) speciesData[id] = [];
    
    // Clean up map name properly for mapping to sections
    let searchMap = e.map;
    // Map fixing logic
    searchMap = searchMap.replace('Route1', 'Route 1')
                         .replace('Route2', 'Route 2')
                         .replace('Route3', 'Route 3')
                         .replace('Route4', 'Route 4')
                         .replace('Route5', 'Route 5')
                         .replace('Route6', 'Route 6')
                         .replace('Route7', 'Route 7')
                         .replace('Route8', 'Route 8')
                         .replace('Route9', 'Route 9')
                         .replace('Route10', 'Route 10')
                         .replace('Route11', 'Route 11')
                         .replace('Route12', 'Route 12')
                         .replace('Route13', 'Route 13')
                         .replace('Route14', 'Route 14')
                         .replace('Route15', 'Route 15')
                         .replace('Route16', 'Route 16')
                         .replace('Route17', 'Route 17')
                         .replace('Route18', 'Route 18')
                         .replace('Route21', 'Route 21')
                         .replace('Route22', 'Route 22')
                         .replace('Route23', 'Route 23')
                         .replace('Route24', 'Route 24')
                         .replace('Route25', 'Route 25');
    const sec = mapToSection[searchMap] || 7;
    const cleanMap = cleanMapName(searchMap);
    
    const existing = speciesData[id].find(x => x.map === cleanMap && x.method === e.method);
    if (!existing) {
      speciesData[id].push({ map: cleanMap, method: e.method, sec: sec });
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
    
    finalMap[id] = { loc: locStr + methodStr, sec: minSec };
  }
  
  return finalMap;
}

const yellowMap = generateGameMap('yellow');
const redMap = generateGameMap('red');
const blueMap = generateGameMap('blue');

fs.writeFileSync('generated_yellow.json', JSON.stringify(yellowMap, null, 2));
fs.writeFileSync('generated_red.json', JSON.stringify(redMap, null, 2));
fs.writeFileSync('generated_blue.json', JSON.stringify(blueMap, null, 2));
console.log("Generated RBY JSON maps successfully!");
