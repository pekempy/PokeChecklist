import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveRequirements } from './game_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cacheDir = path.join(__dirname, 'pokeapi_cache');

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

const pokemonMaster = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'pokemon_master_386.json'), 'utf8')
);

const pokemonMap = {};
pokemonMaster.forEach(p => {
  pokemonMap[p.id] = p;
});

const gamesList = [
  'red', 'blue', 'yellow',
  'gold', 'silver', 'crystal',
  'ruby', 'sapphire', 'emerald',
  'firered', 'leafgreen'
];

// Helper to normalize names
function cleanLocationName(loc) {
  if (!loc) return '';
  let clean = loc.toLowerCase();
  
  // Strip parentheses and their contents (e.g. " (Grass)")
  clean = clean.replace(/\s*\([^)]*\)/g, '').trim();
  
  // Replace "&" and "and" with spaces or hyphens
  clean = clean.replace(/\s*&\s*/g, '-').replace(/\s*and\s*/g, '-');
  
  // Normalize routes
  const routeMatch = clean.match(/route\s*(\d+)/);
  if (routeMatch) {
    const num = parseInt(routeMatch[1], 10);
    if (num >= 101 && num <= 134) {
      return `hoenn-route-${num}`;
    } else if (num >= 29 && num <= 46) {
      return `johto-route-${num}`;
    } else {
      return `kanto-route-${num}`;
    }
  }

  // Common locations
  const mappings = {
    'viridian forest': 'viridian-forest',
    'mt. moon': 'mt-moon',
    'rock tunnel': 'rock-tunnel',
    'pokémon tower': 'pokemon-tower',
    'safari zone': 'safari-zone',
    'seafoam islands': 'seafoam-islands',
    'pokémon mansion': 'pokemon-mansion',
    'power plant': 'power-plant',
    'victory road': 'victory-road',
    'cerulean cave': 'unknown-dungeon', // PokéAPI uses unknown-dungeon for Cerulean Cave in Gen 1/3
    'diglett\'s cave': 'digletts-cave',
    'tohjo falls': 'tohjo-falls',
    'slowpoke well': 'slowpoke-well',
    'ilex forest': 'ilex-forest',
    'union cave': 'union-cave',
    'sprout tower': 'sprout-tower',
    'ruins of alph': 'ruins-of-alph',
    'mt. mortar': 'mt-mortar',
    'dark cave': 'dark-cave',
    'whirl islands': 'whirl-islands',
    'ice path': 'ice-path',
    'dragon\'s den': 'dragons-den',
    'tin tower': 'bell-tower', // PokéAPI uses bell-tower for Tin Tower
    'burned tower': 'burned-tower',
    'mt. silver': 'mt-silver',
    'granite cave': 'granite-cave',
    'petalburg woods': 'petalburg-woods',
    'rusturf tunnel': 'rusturf-tunnel',
    'jagged pass': 'jagged-pass',
    'fiery path': 'fiery-path',
    'meteor falls': 'meteor-falls',
    'mt. chimney': 'mt-chimney',
    'shoal cave': 'shoal-cave',
    'sky pillar': 'sky-pillar',
    'cave of origin': 'cave-of-origin',
    'mt. pyre': 'mt-pyre',
    'seafloor cavern': 'seafloor-cavern',
    'new mauville': 'new-mauville',
    'desert underpass': 'desert-underpass',
    'artisan cave': 'artisan-cave',
    'altering cave': 'altering-cave',
    'trainer tower': 'trainer-tower',
    'monean chamber': 'monean-chamber',
    'pattern bush': 'pattern-bush',
    'lost cave': 'lost-cave',
    'icefall cave': 'icefall-cave',
    'ruin valley': 'ruin-valley',
    'green path': 'green-path',
    'outcast island': 'outcast-island',
    'water path': 'water-path',
    'canyon entrance': 'canyon-entrance',
    'sevault canyon': 'sevault-canyon',
    'tanoby ruins': 'tanoby-ruins',
    'berry forest': 'berry-forest',
    'cape brink': 'cape-brink',
    'bond bridge': 'bond-bridge',
    'five isle meadow': 'five-isle-meadow',
    'memorial pillar': 'memorial-pillar',
    'five island meadow': 'five-isle-meadow',
    'three island port': 'three-island-port',
    'kindle road': 'kindle-road',
    'treasure beach': 'treasure-beach',
    'southern island': 'southern-island',
    'roaming hoenn': 'roaming-hoenn',
    'celadon mansion back room': 'celadon-mansion'
  };

  for (const [key, val] of Object.entries(mappings)) {
    if (clean.includes(key)) {
      return val;
    }
  }

  return clean.replace(/\s+/g, '-');
}

async function getEncounterData(pokemonId) {
  const cachePath = path.join(cacheDir, `${pokemonId}.json`);
  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  }

  console.log(`Fetching encounters for species ID ${pokemonId}...`);
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        fs.writeFileSync(cachePath, JSON.stringify([]));
        return [];
      }
      throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }
    const data = await res.json();
    fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
    // Brief sleep to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
    return data;
  } catch (err) {
    console.error(`Error fetching ID ${pokemonId}: ${err.message}`);
    return [];
  }
}

async function runAudit() {
  console.log("Starting full PokéAPI audit of Kanto/Johto/Hoenn wild encounter data...");
  
  const report = {
    locationMismatches: [],
    falsePositives: [],
    errors: []
  };

  // We loop through Gen 1-3 obtainable pokemon
  for (let pid = 1; pid <= 386; pid++) {
    const name = pokemonMap[pid]?.name || `Unknown #${pid}`;
    const encounters = await getEncounterData(pid);

    // Group encounters by game version
    const pokeApiWildMap = {};
    encounters.forEach(enc => {
      const area = enc.location_area.name;
      enc.version_details.forEach(vd => {
        const game = vd.version.name;
        if (!pokeApiWildMap[game]) pokeApiWildMap[game] = [];
        pokeApiWildMap[game].push({
          area,
          methods: vd.encounter_details.map(ed => ed.method.name)
        });
      });
    });

    // Check games in our checklist
    for (const game of gamesList) {
      const maxDex = game === 'red' || game === 'blue' || game === 'yellow' ? 151 : (game === 'gold' || game === 'silver' || game === 'crystal' ? 251 : 386);
      if (pid > maxDex) continue;

      const resolved = resolveRequirements(game, pid, pokemonMap);
      const dbWildEncounters = resolved.filter(r => r.action_type === 'CATCH');

      const apiEncounters = pokeApiWildMap[game] || [];

      // Check if DB lists as wild, but PokeAPI has no encounters at all for this game
      if (dbWildEncounters.length > 0 && apiEncounters.length === 0) {
        // Exclude specific exceptions:
        // - Gen 2 Bug Catching contest (Scyther #123, Pinsir #127) are not classified under standard wild encounters by PokéAPI
        // - Legendaries/static encounters that might be registered differently or we want to keep (e.g. Celebi, Mew, Jirachi, Deoxys)
        const isException = (game === 'gold' || game === 'silver' || game === 'crystal') && (pid === 123 || pid === 127);
        if (!isException) {
          report.falsePositives.push({
            pokemonId: pid,
            name,
            game,
            dbLocations: dbWildEncounters.map(r => r.location_details)
          });
        }
      }

      // Check each DB location
      for (const dbLoc of dbWildEncounters) {
        const cleanName = cleanLocationName(dbLoc.location_details);
        
        // Skip fallback/special locations like Link Trade
        if (dbLoc.location_details.toLowerCase().includes('link trade') || dbLoc.location_details.toLowerCase().includes('game corner') || dbLoc.location_details.toLowerCase().includes('gift')) {
          continue;
        }

        // Search for matches in PokéAPI areas
        let matchedArea = null;
        for (const apiEnc of apiEncounters) {
          if (apiEnc.area.includes(cleanName) || cleanName.includes(apiEnc.area)) {
            matchedArea = apiEnc;
            break;
          }
        }

        // If no direct substring match, let's check custom matches
        if (!matchedArea && cleanName === 'bell-tower') {
          matchedArea = apiEncounters.find(e => e.area.includes('tin-tower') || e.area.includes('bell-tower'));
        }
        if (!matchedArea && cleanName === 'unknown-dungeon') {
          matchedArea = apiEncounters.find(e => e.area.includes('cerulean-cave') || e.area.includes('unknown-dungeon'));
        }

        if (!matchedArea) {
          // Exclude known manual exceptions (like Whirl Islands B4F Lugia, since it is a static event at a specific floor)
          const isLugiaException = pid === 249 && dbLoc.location_details.includes("Whirl Islands B4F");
          if (!isLugiaException) {
            report.locationMismatches.push({
              pokemonId: pid,
              name,
              game,
              dbLocation: dbLoc.location_details,
              cleanName,
              pokeApiAreas: apiEncounters.map(e => e.area)
            });
          }
        }
      }
    }
  }

  console.log("\n==================================================");
  console.log("   AUDIT RESULTS SUMMARY");
  console.log("==================================================");
  console.log(`Location Mismatches: ${report.locationMismatches.length}`);
  console.log(`False Positives:     ${report.falsePositives.length}`);

  if (report.locationMismatches.length > 0) {
    console.log("\n❖ LOCATION MISMATCHES:");
    report.locationMismatches.forEach(m => {
      console.log(`  ⚠ ID ${m.pokemonId} (${m.name}) in ${m.game}: DB="${m.dbLocation}" (cleaned: "${m.cleanName}"). PokéAPI lists: ${m.pokeApiAreas.join(', ')}`);
    });
  }

  if (report.falsePositives.length > 0) {
    console.log("\n❖ FALSE POSITIVES (Listed as wild in DB, but not in PokéAPI):");
    report.falsePositives.forEach(f => {
      console.log(`  ⚠ ID ${f.pokemonId} (${f.name}) in ${f.game}: DB lists "${f.dbLocations.join(', ')}"`);
    });
  }

  fs.writeFileSync(path.join(__dirname, 'audit_report.json'), JSON.stringify(report, null, 2));
  console.log("\nFull report saved to audit_report.json\n");
}

runAudit();
