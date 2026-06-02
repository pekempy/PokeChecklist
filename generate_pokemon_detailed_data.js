import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { evolutions, gen1Trades, gen2Trades, gen3Trades } from './game_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = __dirname;

// Load Pokemon master list
const pokemonMaster = JSON.parse(
  fs.readFileSync(path.join(projectDir, 'pokemon_master_386.json'), 'utf8')
);

const pokemonMap = {};
pokemonMaster.forEach(p => {
  pokemonMap[p.id] = {
    id: p.id,
    name: p.name,
    types: p.type2 ? [p.type1, p.type2] : [p.type1]
  };
});

const gamesList = [
  'red', 'blue', 'yellow',
  'gold', 'silver', 'crystal',
  'ruby', 'sapphire', 'emerald',
  'firered', 'leafgreen'
];

// Helper to clean location area names
function cleanLocationArea(name) {
  return name
    .replace(/^kanto-/, '')
    .replace(/^johto-/, '')
    .replace(/^hoenn-/, '')
    .replace(/-area$/, '')
    .split('-')
    .map(word => {
      if (word === 'route') return 'Route';
      if (/^[b0-9]+f$/i.test(word)) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// 1. Load encounters cache
const pokemonEncounters = {};
for (let id = 1; id <= 386; id++) {
  const cachePath = path.join(projectDir, 'pokeapi_cache', `${id}.json`);
  if (fs.existsSync(cachePath)) {
    pokemonEncounters[id] = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } else {
    pokemonEncounters[id] = [];
  }
}

// Map trade lists by game
const tradesByGame = {
  red: gen1Trades.red,
  blue: gen1Trades.blue,
  yellow: gen1Trades.yellow,
  gold: gen2Trades.gold,
  silver: gen2Trades.silver,
  crystal: gen2Trades.crystal,
  ruby: gen3Trades.ruby,
  sapphire: gen3Trades.sapphire,
  emerald: gen3Trades.emerald,
  firered: gen3Trades.firered,
  leafgreen: gen3Trades.leafgreen
};

// Main processing structure
const detailedData = {};
for (let id = 1; id <= 386; id++) {
  detailedData[id] = {
    id: id,
    name: pokemonMap[id].name,
    types: pokemonMap[id].types,
    obtainable_in: {}
  };
  
  gamesList.forEach(game => {
    detailedData[id].obtainable_in[game] = {
      obtainable: false,
      methods: [] // Will contain details of wild, gift, trade, evolve, breed
    };
  });
}

// PASS 1: Direct obtainable (Wild / Gift / Trades)
for (let id = 1; id <= 386; id++) {
  const encounters = pokemonEncounters[id];
  const list = Array.isArray(encounters) ? encounters : (encounters.encounters || []);
  
  // Wild & Gift encounters
  list.forEach(enc => {
    const locName = cleanLocationArea(enc.location_area.name);
    
    enc.version_details.forEach(vd => {
      const game = vd.version.name;
      if (!gamesList.includes(game)) return;
      
      // Group details by method
      const methodGroups = {};
      vd.encounter_details.forEach(det => {
        const mName = det.method.name;
        if (!methodGroups[mName]) {
          methodGroups[mName] = {
            method: mName,
            min_level: det.min_level,
            max_level: det.max_level,
            chance: 0
          };
        }
        methodGroups[mName].chance += det.chance;
        methodGroups[mName].min_level = Math.min(methodGroups[mName].min_level, det.min_level);
        methodGroups[mName].max_level = Math.max(methodGroups[mName].max_level, det.max_level);
      });
      
      Object.values(methodGroups).forEach(group => {
        const isGift = group.method === 'gift';
        detailedData[id].obtainable_in[game].obtainable = true;
        detailedData[id].obtainable_in[game].methods.push({
          type: isGift ? 'GIFT' : 'CATCH',
          location: locName,
          method: group.method,
          level_range: group.min_level === group.max_level ? `${group.min_level}` : `${group.min_level}-${group.max_level}`,
          chance: group.chance
        });
      });
    });
  });
  
  // Trades
  gamesList.forEach(game => {
    const tradeData = tradesByGame[game];
    if (tradeData && tradeData[id]) {
      detailedData[id].obtainable_in[game].obtainable = true;
      detailedData[id].obtainable_in[game].methods.push({
        type: 'TRADE',
        location: tradeData[id].loc,
        method: 'in-game-trade',
        notes: tradeData[id].notes || `In-game trade in ${tradeData[id].loc}`
      });
    }
  });
}

// PASS 2: Evolution propagation (Iterate multiple times to resolve chains)
let changed = true;
while (changed) {
  changed = false;
  for (let id = 1; id <= 386; id++) {
    const evo = evolutions[id];
    if (!evo || !evo.from) continue;
    
    gamesList.forEach(game => {
      const gameObj = detailedData[id].obtainable_in[game];
      if (gameObj.obtainable) return; // Already obtainable
      
      const preEvoObj = detailedData[evo.from].obtainable_in[game];
      if (preEvoObj.obtainable) {
        gameObj.obtainable = true;
        gameObj.methods.push({
          type: 'EVOLVE',
          from_id: evo.from,
          from_name: pokemonMap[evo.from].name,
          method: evo.method
        });
        changed = true;
      }
    });
  }
}

// Helper to get descendants in evolution chain
function getDescendants(pid) {
  const list = [];
  for (const [targetId, evo] of Object.entries(evolutions)) {
    if (evo.from === pid) {
      list.push(Number(targetId));
      list.push(...getDescendants(Number(targetId)));
    }
  }
  return list;
}

// PASS 3: Breeding propagation (If an evolved form is obtainable, the baby form can be bred)
for (let id = 1; id <= 386; id++) {
  const isBaseStage = !evolutions[id];
  if (!isBaseStage) continue;

  const descendants = getDescendants(id);

  gamesList.forEach(game => {
    const gameObj = detailedData[id].obtainable_in[game];
    if (gameObj.obtainable) return; // Already obtainable
    
    // Find all obtainable descendants in this game
    const obtainableParents = descendants.filter(pId => {
      const parentGameData = detailedData[pId].obtainable_in[game];
      return parentGameData && parentGameData.obtainable;
    });
    
    if (obtainableParents.length > 0) {
      gameObj.obtainable = true;
      const parentNames = obtainableParents.map(pId => pokemonMap[pId].name);
      const parentNamesStr = parentNames.join('/');
      gameObj.methods.push({
        type: 'BREED',
        parents: obtainableParents,
        parent_names: parentNames,
        notes: `Breed ${parentNamesStr} at Daycare`
      });
    }
  });
}

// Output detailed data
fs.writeFileSync(
  path.join(projectDir, 'pokemon_detailed_data_386.json'),
  JSON.stringify(Object.values(detailedData), null, 2),
  'utf8'
);

console.log("Successfully generated pokemon_detailed_data_386.json with rich encounter info, levels, and percentages!");
