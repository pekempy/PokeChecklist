import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { resolveRequirements } from './game_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbPath = path.join(__dirname, 'pokemon_checklist.db');
let db = new sqlite3.Database(dbPath, (err) => {
  if (!err) {
    db.run("PRAGMA foreign_keys = ON");
  }
});

const pokemonMaster = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'pokemon_master_386.json'), 'utf8')
);

// Map of pokemon by ID for quick resolver lookup
const pokemonMap = {};
pokemonMaster.forEach(p => {
  pokemonMap[p.id] = p;
});

// Load detailed data for enrichment
const detailedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'pokemon_detailed_data_386.json'), 'utf8')
);
const detailedDataMap = {};
detailedData.forEach(p => {
  detailedDataMap[p.id] = p;
});

function matchLocation(dbLoc, apiLoc) {
  const dbClean = dbLoc.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');
  const apiClean = apiLoc.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');
  
  const dbWords = dbClean.split(/\s+/).filter(Boolean);
  const apiWords = apiClean.split(/\s+/).filter(Boolean);
  
  // Strict Route matching
  const dbRouteIdx = dbWords.indexOf('route');
  const apiRouteIdx = apiWords.indexOf('route');
  if (dbRouteIdx !== -1 && apiRouteIdx !== -1) {
    const dbRouteNum = dbWords[dbRouteIdx + 1];
    const apiRouteNum = apiWords[apiRouteIdx + 1];
    if (dbRouteNum && apiRouteNum) {
      return dbRouteNum === apiRouteNum;
    }
  }
  
  // Specific place matchers
  if (dbClean.includes('safari') && apiClean.includes('safari')) return true;
  if (dbClean.includes('mansion') && apiClean.includes('mansion')) return true;
  if (dbClean.includes('seafoam') && apiClean.includes('seafoam')) return true;
  if (dbClean.includes('power plant') && apiClean.includes('power plant')) return true;
  if (dbClean.includes('victory road') && apiClean.includes('victory road')) return true;
  if (dbClean.includes('cerulean cave') && apiClean.includes('cerulean-cave')) return true;
  if (dbClean.includes('cerulean cave') && apiClean.includes('unknown dungeon')) return true;
  
  // Fallback: check overlap of words
  const ignore = ['and', 'the', 'a', 'or', 'of', 'in', 'f', 'b1f', 'b2f', 'b3f', 'b4f'];
  const dbSigs = dbWords.filter(w => !ignore.includes(w));
  const apiSigs = apiWords.filter(w => !ignore.includes(w));
  
  return dbSigs.some(w => apiSigs.includes(w));
}

function getEncounterDetails(gameId, pokemonId, dbLocation) {
  const pData = detailedDataMap[pokemonId];
  if (!pData) return null;
  const gameData = pData.obtainable_in[gameId];
  if (!gameData || !gameData.obtainable) return null;
  
  const matches = gameData.methods.filter(m => {
    if (m.type !== 'CATCH' && m.type !== 'GIFT') return false;
    return matchLocation(dbLocation, m.location);
  });
  
  if (matches.length === 0) return null;
  
  return matches.map(m => {
    const methodStr = m.method.charAt(0).toUpperCase() + m.method.slice(1).replace('-', ' ');
    return `${methodStr} [Lvl ${m.level_range}, ${m.chance}%]`;
  }).join(' | ');
}

export function setDatabasePath(newPath) {
  // Close old database connection if open
  if (db) {
    db.close();
  }
  dbPath = newPath;
  db = new sqlite3.Database(dbPath, (err) => {
    if (!err) {
      db.run("PRAGMA foreign_keys = ON");
    }
  });
}

export function getDbPath() {
  return dbPath;
}

export function getDb() {
  return db;
}

export function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

export function serialize(callback) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      try {
        callback();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}

export async function initDb() {
  // Run PRAGMA foreign_keys to be sure it is active for this session
  await run("PRAGMA foreign_keys = ON");
  
  // Clean up any orphaned progress rows first
  await run("DELETE FROM progress WHERE requirement_id NOT IN (SELECT id FROM requirements)");

  // Create tables
  await run(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      generation INTEGER NOT NULL,
      region TEXT NOT NULL
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS game_settings (
      game_id TEXT PRIMARY KEY,
      surf INTEGER DEFAULT 0,
      rod TEXT DEFAULT 'none',
      trade_link TEXT DEFAULT 'all',
      active_section_id INTEGER,
      FOREIGN KEY (game_id) REFERENCES games (id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS sections (
      id INTEGER PRIMARY KEY,
      game_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      order_index INTEGER NOT NULL,
      FOREIGN KEY (game_id) REFERENCES games (id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      type1 TEXT NOT NULL,
      type2 TEXT
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS requirements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id TEXT NOT NULL,
      section_id INTEGER NOT NULL,
      pokemon_id INTEGER NOT NULL,
      action_type TEXT NOT NULL,
      location_details TEXT NOT NULL,
      notes TEXT,
      FOREIGN KEY (game_id) REFERENCES games (id),
      FOREIGN KEY (section_id) REFERENCES sections (id),
      FOREIGN KEY (pokemon_id) REFERENCES pokemon (id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      requirement_id INTEGER UNIQUE NOT NULL,
      completed INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (requirement_id) REFERENCES requirements (id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS caught_pokemon (
      game_id TEXT NOT NULL,
      pokemon_id INTEGER NOT NULL,
      PRIMARY KEY (game_id, pokemon_id),
      FOREIGN KEY (game_id) REFERENCES games (id),
      FOREIGN KEY (pokemon_id) REFERENCES pokemon (id)
    )
  `);

  // Ensure caught_pokemon is populated from any existing progress (non-destructive migration check)
  try {
    await run(`
      INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id)
      SELECT r.game_id, r.pokemon_id
      FROM requirements r
      JOIN progress p ON r.id = p.requirement_id
      WHERE p.completed = 1
    `);
  } catch (err) {
    console.error("Migration to caught_pokemon failed:", err);
  }

  // Migrate existing requirements to use the new pokedollar symbol
  try {
    await run(`
      UPDATE requirements 
      SET location_details = 'Route 4 Pokémon Center (Buy for 500 ₽)' 
      WHERE location_details LIKE 'Route 4 Pokémon Center (Buy for 500%'
    `);
  } catch (err) {
    console.error("Migration of currency symbol failed:", err);
  }

  // Differential seeder: Only insert what is missing!
  await seedMissingData();

  // Create or refresh blank redundancy copy if we are in production
  if (dbPath.includes('pokemon_checklist.db')) {
    const blankPath = path.join(__dirname, 'pokemon_checklist_blank.db');
    try {
      fs.copyFileSync(dbPath, blankPath);
      // Clean caught logs in the blank copy
      const blankDb = new sqlite3.Database(blankPath);
      blankDb.serialize(() => {
        blankDb.run("UPDATE progress SET completed = 0");
        blankDb.run("DELETE FROM caught_pokemon");
        blankDb.close();
      });
      console.log(`Updated blank redundancy database at: ${blankPath}`);
    } catch (err) {
      console.error("Failed to create blank redundancy copy:", err);
    }
  }
}

async function seedMissingData() {
  console.log("Checking for missing data in database...");

  // 1. Seed missing master pokemon
  await run("BEGIN TRANSACTION");
  for (const p of pokemonMaster) {
    await run(`INSERT OR IGNORE INTO pokemon (id, name, type1, type2) VALUES (?, ?, ?, ?)`, [p.id, p.name, p.type1, p.type2]);
  }
  await run("COMMIT");

  // 2. Seed missing games
  const gamesList = [
    { id: 'red', name: 'Pokémon Red', gen: 1, region: 'Kanto' },
    { id: 'blue', name: 'Pokémon Blue', gen: 1, region: 'Kanto' },
    { id: 'yellow', name: 'Pokémon Yellow', gen: 1, region: 'Kanto' },
    { id: 'gold', name: 'Pokémon Gold', gen: 2, region: 'Johto' },
    { id: 'silver', name: 'Pokémon Silver', gen: 2, region: 'Johto' },
    { id: 'crystal', name: 'Pokémon Crystal', gen: 2, region: 'Johto' },
    { id: 'ruby', name: 'Pokémon Ruby', gen: 3, region: 'Hoenn' },
    { id: 'sapphire', name: 'Pokémon Sapphire', gen: 3, region: 'Hoenn' },
    { id: 'emerald', name: 'Pokémon Emerald', gen: 3, region: 'Hoenn' },
    { id: 'firered', name: 'Pokémon FireRed', gen: 3, region: 'Kanto' },
    { id: 'leafgreen', name: 'Pokémon LeafGreen', gen: 3, region: 'Kanto' }
  ];

  await run("BEGIN TRANSACTION");
  for (const g of gamesList) {
    // If the game exists but is named a Stub, rename it to active
    await run(`
      INSERT INTO games (id, name, generation, region) VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET name = excluded.name, generation = excluded.generation, region = excluded.region
    `, [g.id, g.name, g.gen, g.region]);
  }
  await run("COMMIT");

  // 3. Seed missing sections (10 per game)
  await run("BEGIN TRANSACTION");
  let sectionGlobalId = 1;
  for (const game of gamesList) {
    const names = game.region === 'Kanto' 
      ? [
          "Pre-Boulder Badge (Brock)", "Pre-Cascade Badge (Misty)", "Pre-Thunder Badge (Lt. Surge)",
          "Pre-Rainbow Badge (Erika)", "Pre-Soul Badge (Koga)", "Pre-Marsh Badge (Sabrina)",
          "Pre-Volcano Badge (Blaine)", "Pre-Earth Badge (Giovanni)", "Pre-Elite Four", "Post-Game"
        ]
      : game.region === 'Johto'
      ? [
          "Pre-Zephyr Badge (Falkner)", "Pre-Hive Badge (Bugsy)", "Pre-Plain Badge (Whitney)",
          "Pre-Fog Badge (Morty)", "Pre-Storm Badge (Chuck)", "Pre-Mineral Badge (Jasmine)",
          "Pre-Glacier Badge (Pryce)", "Pre-Rising Badge (Clair)", "Pre-Elite Four", "Post-Game"
        ]
      : [
          "Pre-Stone Badge (Roxanne)", "Pre-Knuckle Badge (Brawly)", "Pre-Dynamo Badge (Wattson)",
          "Pre-Heat Badge (Flannery)", "Pre-Balance Badge (Norman)", "Pre-Feather Badge (Winona)",
          "Pre-Mind Badge (Tate & Liza)", "Pre-Rain Badge (Wallace)", "Pre-Elite Four", "Post-Game"
        ];

    for (let i = 0; i < 10; i++) {
      await run(`
        INSERT OR IGNORE INTO sections (id, game_id, name, description, order_index)
        VALUES (?, ?, ?, ?, ?)
      `, [sectionGlobalId, game.id, names[i], `Milestone section ${i + 1} for ${game.name}`, i + 1]);
      sectionGlobalId++;
    }
  }
  await run("COMMIT");

  // Track mapping from game_id + section_order_index to absolute section_id
  const sectionRows = await query(`SELECT id, game_id, order_index FROM sections`);
  const sectionIdMap = {};
  sectionRows.forEach(row => {
    sectionIdMap[`${row.game_id}_${row.order_index}`] = row.id;
  });

  // 4. Seed requirements differentially to preserve checked box states
  const existingReqs = await query("SELECT id, game_id, pokemon_id, action_type, location_details, section_id, notes FROM requirements");
  const existingMap = {};
  for (const r of existingReqs) {
    const key = `${r.game_id}|${r.pokemon_id}|${r.action_type}|${r.location_details}`;
    existingMap[key] = r;
  }

  const activeReqKeys = new Set();

  await run("BEGIN TRANSACTION");
  for (const game of gamesList) {
    const maxDex = game.gen === 1 ? 151 : (game.gen === 2 ? 251 : 386);
    for (let pid = 1; pid <= maxDex; pid++) {
      const resolvedList = resolveRequirements(game.id, pid, pokemonMap);
      for (const resolved of resolvedList) {
        const absoluteSecId = sectionIdMap[`${game.id}_${resolved.section_id}`];
        if (!absoluteSecId) {
          throw new Error(`Failed to map section for ${game.id} section index ${resolved.section_id}`);
        }
        const key = `${game.id}|${pid}|${resolved.action_type}|${resolved.location_details}`;
        activeReqKeys.add(key);

        let finalNotes = resolved.notes;
        if (resolved.action_type === 'CATCH' || resolved.action_type === 'GIFT') {
          const apiNotes = getEncounterDetails(game.id, pid, resolved.location_details);
          if (apiNotes) {
            finalNotes = apiNotes;
          }
        }

        const existing = existingMap[key];
        if (existing) {
          if (existing.section_id !== absoluteSecId || existing.notes !== finalNotes) {
            await run(`
              UPDATE requirements 
              SET section_id = ?, notes = ?
              WHERE id = ?
            `, [absoluteSecId, finalNotes, existing.id]);
          }
        } else {
          await run(`
            INSERT INTO requirements (game_id, section_id, pokemon_id, action_type, location_details, notes)
            VALUES (?, ?, ?, ?, ?, ?)
          `, [game.id, absoluteSecId, pid, resolved.action_type, resolved.location_details, finalNotes]);
        }
      }
    }
  }

  // Delete requirements that are no longer in game_data (cascades to progress table)
  for (const [key, existing] of Object.entries(existingMap)) {
    if (!activeReqKeys.has(key)) {
      await run("DELETE FROM requirements WHERE id = ?", [existing.id]);
    }
  }
  await run("COMMIT");

  // 5. Ensure every requirement has a progress row (defaulting to 0)
  await run(`
    INSERT OR IGNORE INTO progress (requirement_id, completed)
    SELECT id, 0 FROM requirements
  `);

  // 6. Non-destructive migration/sync:
  // If a pokemon is in caught_pokemon but has 0 checked requirements, check the earliest one.
  await run(`
    UPDATE progress
    SET completed = 1
    WHERE requirement_id IN (
      SELECT MIN(r.id)
      FROM requirements r
      JOIN caught_pokemon cp ON r.game_id = cp.game_id AND r.pokemon_id = cp.pokemon_id
      WHERE (
        SELECT COUNT(*) 
        FROM requirements r2
        JOIN progress p2 ON r2.id = p2.requirement_id
        WHERE r2.game_id = cp.game_id AND r2.pokemon_id = cp.pokemon_id AND p2.completed = 1
      ) = 0
      GROUP BY r.game_id, r.pokemon_id
    )
  `);

  console.log("Database verification & differential seeding complete.");
}
