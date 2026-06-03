const fs = require('fs');

function formatMapName(constName) {
  return constName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function parseGrassAsm(fileContent, gameId) {
  const lines = fileContent.split('\n');
  const encounters = [];
  
  let currentMap = null;
  let currentRates = null;
  let currentTime = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith(';')) {
      if (line.includes('; morn')) currentTime = 'morn';
      else if (line.includes('; day')) currentTime = 'day';
      else if (line.includes('; nite')) currentTime = 'nite';
      continue;
    }
    
    if (line.startsWith('def_grass_wildmons')) {
      const parts = line.split(/\s+/);
      currentMap = formatMapName(parts[1]);
      currentTime = 'morn'; // Default reset
    } else if (line.startsWith('db') && line.includes('percent')) {
      // db 10 percent, 10 percent, 10 percent ; encounter rates: morn/day/nite
      const ratesMatches = line.match(/(\d+)\s*percent/g);
      if (ratesMatches && ratesMatches.length >= 3) {
        currentRates = {
          morn: parseInt(ratesMatches[0]),
          day: parseInt(ratesMatches[1]),
          nite: parseInt(ratesMatches[2])
        };
      }
    } else if (line.startsWith('db') && currentMap) {
      // db 3, RATTATA
      const parts = line.replace('db', '').trim().split(',');
      if (parts.length >= 2) {
        const level = parseInt(parts[0].trim());
        let species = parts[1].trim().split(' ')[0]; // Handle comments
        
        // Remove trailing comments if any
        if (species.includes(';')) species = species.split(';')[0].trim();
        
        // Skip placeholders
        if (!species || species === '0' || species === '$00') continue;
        
        let chance = 0;
        // Approximation of encounter slots (20%, 20%, 20%, 10%, 10%, 10%, 5%, 5%)
        // Pret's actual slot chances are: 30%, 30%, 20%, 10%, 5%, 4%, 1% (wait, gen 2 slots are: 30, 30, 20, 10, 5, 4, 1)
        // Let's just track presence for now, or use the slot index
        
        encounters.push({
          map: currentMap,
          time: currentTime,
          level: level,
          species: species,
          game: gameId,
          type: 'grass'
        });
      }
    } else if (line.startsWith('end_grass_wildmons')) {
      currentMap = null;
      currentRates = null;
    }
  }
  
  return encounters;
}

function parseWaterAsm(fileContent, gameId) {
  const lines = fileContent.split('\n');
  const encounters = [];
  let currentMap = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith(';')) continue;
    
    if (line.startsWith('def_water_wildmons')) {
      const parts = line.split(/\s+/);
      currentMap = formatMapName(parts[1]);
    } else if (line.startsWith('db') && line.includes('percent')) {
      // rate line
    } else if (line.startsWith('db') && currentMap) {
      const parts = line.replace('db', '').trim().split(',');
      if (parts.length >= 2) {
        const level = parseInt(parts[0].trim());
        let species = parts[1].trim().split(' ')[0];
        
        if (species.includes(';')) species = species.split(';')[0].trim();
        if (!species || species === '0' || species === '$00') continue;
        
        encounters.push({
          map: currentMap,
          time: 'all',
          level: level,
          species: species,
          game: gameId,
          type: 'surf'
        });
      }
    } else if (line.startsWith('end_water_wildmons')) {
      currentMap = null;
    }
  }
  
  return encounters;
}

const crystalJohtoGrass = parseGrassAsm(fs.readFileSync('johto_grass.asm', 'utf8'), 'crystal');
const crystalKantoGrass = parseGrassAsm(fs.readFileSync('kanto_grass.asm', 'utf8'), 'crystal');
const crystalJohtoWater = parseWaterAsm(fs.readFileSync('johto_water.asm', 'utf8'), 'crystal');
const crystalKantoWater = parseWaterAsm(fs.readFileSync('kanto_water.asm', 'utf8'), 'crystal');

const gsJohtoGrass = parseGrassAsm(fs.readFileSync('gs_johto_grass.asm', 'utf8'), 'gs');
const gsKantoGrass = parseGrassAsm(fs.readFileSync('gs_kanto_grass.asm', 'utf8'), 'gs');
const gsJohtoWater = parseWaterAsm(fs.readFileSync('gs_johto_water.asm', 'utf8'), 'gs');
const gsKantoWater = parseWaterAsm(fs.readFileSync('gs_kanto_water.asm', 'utf8'), 'gs');

const allEncounters = [
  ...crystalJohtoGrass, ...crystalKantoGrass, ...crystalJohtoWater, ...crystalKantoWater,
  ...gsJohtoGrass, ...gsKantoGrass, ...gsJohtoWater, ...gsKantoWater
];

// Let's see what we got for Route 33
const route33 = allEncounters.filter(e => e.map === 'Route 33');
console.log("Route 33 Encounters:", route33);

const route32 = allEncounters.filter(e => e.map === 'Route 32' && e.species === 'WOOPER' && e.game === 'crystal');
console.log("Route 32 Wooper (Crystal):", route32);
