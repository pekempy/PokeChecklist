import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb, query, run } from './db.js';
import { evolutions } from './game_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoints

// 1. Get all supported games (including stubs)
app.get('/api/games', async (req, res) => {
  try {
    const games = await query('SELECT * FROM games ORDER BY generation, name');
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve games' });
  }
});

// 2. Get sections for a specific game
app.get('/api/sections', async (req, res) => {
  const { game_id } = req.query;
  if (!game_id) {
    return res.status(400).json({ error: 'game_id is required' });
  }
  try {
    const sections = await query(
      'SELECT * FROM sections WHERE game_id = ? ORDER BY order_index',
      [game_id]
    );
    res.json(sections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve sections' });
  }
});

// 3. Get checklist requirements and progress for a specific game and section
app.get('/api/checklist', async (req, res) => {
  const { game_id, section_id } = req.query;
  if (!game_id) {
    return res.status(400).json({ error: 'game_id is required' });
  }
  try {
    let sql = `
      SELECT 
        r.id as requirement_id,
        r.action_type,
        r.location_details,
        r.notes,
        p.id as pokemon_id,
        p.name as pokemon_name,
        p.type1 as pokemon_type1,
        p.type2 as pokemon_type2,
        s.id as section_id,
        s.name as section_name,
        COALESCE(prog.completed, 0) as completed,
        (SELECT group_concat(game_id) FROM caught_pokemon WHERE pokemon_id = p.id) as caught_games
      FROM requirements r
      JOIN pokemon p ON r.pokemon_id = p.id
      JOIN sections s ON r.section_id = s.id
      LEFT JOIN progress prog ON r.id = prog.requirement_id
      WHERE r.game_id = ?
    `;
    const params = [game_id];

    if (section_id) {
      sql += ' AND r.section_id = ?';
      params.push(section_id);
    }

    sql += ' ORDER BY s.order_index, p.id';

    const checklist = await query(sql, params);
    
    const gameGen = ['red', 'blue', 'yellow'].includes(game_id) ? 1 : (['gold', 'silver', 'crystal'].includes(game_id) ? 2 : 3);
    const maxDex = gameGen === 1 ? 151 : (gameGen === 2 ? 251 : 386);

    // Add evolution stage to each item dynamically, ignoring baby forms not in the game's generation
    const checklistWithStage = checklist.map(item => {
      let stage = 1;
      let currentId = item.pokemon_id;
      while (evolutions[currentId]) {
        const fromId = evolutions[currentId].from;
        if (fromId > maxDex) {
          // If the pre-evolution does not exist in this generation (e.g. Pichu in Gen 1), stop here.
          break;
        }
        stage++;
        currentId = fromId;
      }
      return {
        ...item,
        evolution_stage: stage
      };
    });
    
    res.json(checklistWithStage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve checklist' });
  }
});

// 4. Update progress for a requirement
app.post('/api/progress', async (req, res) => {
  const { requirement_id, completed } = req.body;
  if (requirement_id === undefined || completed === undefined) {
    return res.status(400).json({ error: 'requirement_id and completed are required' });
  }
  
  const completedVal = completed ? 1 : 0;

  try {
    // Insert or replace progress entry
    await run(`
      INSERT INTO progress (requirement_id, completed, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(requirement_id) DO UPDATE SET
        completed = EXCLUDED.completed,
        updated_at = CURRENT_TIMESTAMP
    `, [requirement_id, completedVal]);

    // Update caught_pokemon state
    const reqInfo = await query('SELECT game_id, pokemon_id FROM requirements WHERE id = ?', [requirement_id]);
    if (reqInfo.length > 0) {
      const { game_id, pokemon_id } = reqInfo[0];
      if (completedVal === 1) {
        await run('INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES (?, ?)', [game_id, pokemon_id]);
      } else {
        // Only delete if there are no other completed requirements for this pokemon in this game
        const otherCompleted = await query(`
          SELECT COUNT(*) as count 
          FROM requirements r
          JOIN progress p ON r.id = p.requirement_id
          WHERE r.game_id = ? AND r.pokemon_id = ? AND p.completed = 1 AND r.id != ?
        `, [game_id, pokemon_id, requirement_id]);
        
        if (otherCompleted[0].count === 0) {
          await run('DELETE FROM caught_pokemon WHERE game_id = ? AND pokemon_id = ?', [game_id, pokemon_id]);
        }
      }

      // Get updated list of games where this pokemon is caught
      const caughtGamesRows = await query('SELECT game_id FROM caught_pokemon WHERE pokemon_id = ?', [pokemon_id]);
      const caught_games = caughtGamesRows.map(row => row.game_id);
      
      return res.json({ success: true, requirement_id, completed: completedVal, caught_games });
    }

    res.json({ success: true, requirement_id, completed: completedVal, caught_games: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// 4b. Trade (swap) Pokémon between games
app.post('/api/trade_pokemon', async (req, res) => {
  const { pokemon_id, target_pokemon_id, from_game, to_game } = req.body;
  if (!pokemon_id || !target_pokemon_id || !from_game || !to_game) {
    return res.status(400).json({ error: 'pokemon_id, target_pokemon_id, from_game, and to_game are required' });
  }

  try {
    // 1. Swap Caterpie (pokemon_id): From -> To
    await run('DELETE FROM caught_pokemon WHERE game_id = ? AND pokemon_id = ?', [from_game, pokemon_id]);
    await run('INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES (?, ?)', [to_game, pokemon_id]);

    // Uncheck Caterpie in from_game
    const fromReqs = await query('SELECT id FROM requirements WHERE game_id = ? AND pokemon_id = ?', [from_game, pokemon_id]);
    for (const r of fromReqs) {
      await run(`
        INSERT INTO progress (requirement_id, completed, updated_at)
        VALUES (?, 0, CURRENT_TIMESTAMP)
        ON CONFLICT(requirement_id) DO UPDATE SET completed = 0, updated_at = CURRENT_TIMESTAMP
      `, [r.id]);
    }

    // Check Caterpie in to_game
    const toReqs = await query('SELECT id FROM requirements WHERE game_id = ? AND pokemon_id = ?', [to_game, pokemon_id]);
    if (toReqs.length > 0) {
      const tradeReq = await query("SELECT id FROM requirements WHERE game_id = ? AND pokemon_id = ? AND action_type = 'TRADE' LIMIT 1", [to_game, pokemon_id]);
      const targetReqId = tradeReq.length > 0 ? tradeReq[0].id : toReqs[0].id;
      await run(`
        INSERT INTO progress (requirement_id, completed, updated_at)
        VALUES (?, 1, CURRENT_TIMESTAMP)
        ON CONFLICT(requirement_id) DO UPDATE SET completed = 1, updated_at = CURRENT_TIMESTAMP
      `, [targetReqId]);
    }

    // 2. Swap Target Pokémon (target_pokemon_id): To -> From
    await run('DELETE FROM caught_pokemon WHERE game_id = ? AND pokemon_id = ?', [to_game, target_pokemon_id]);
    await run('INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES (?, ?)', [from_game, target_pokemon_id]);

    // Uncheck Target Pokémon in to_game
    const targetToReqs = await query('SELECT id FROM requirements WHERE game_id = ? AND pokemon_id = ?', [to_game, target_pokemon_id]);
    for (const r of targetToReqs) {
      await run(`
        INSERT INTO progress (requirement_id, completed, updated_at)
        VALUES (?, 0, CURRENT_TIMESTAMP)
        ON CONFLICT(requirement_id) DO UPDATE SET completed = 0, updated_at = CURRENT_TIMESTAMP
      `, [r.id]);
    }

    // Check Target Pokémon in from_game
    const targetFromReqs = await query('SELECT id FROM requirements WHERE game_id = ? AND pokemon_id = ?', [from_game, target_pokemon_id]);
    if (targetFromReqs.length > 0) {
      const tradeReq = await query("SELECT id FROM requirements WHERE game_id = ? AND pokemon_id = ? AND action_type = 'TRADE' LIMIT 1", [from_game, target_pokemon_id]);
      const targetReqId = tradeReq.length > 0 ? tradeReq[0].id : targetFromReqs[0].id;
      await run(`
        INSERT INTO progress (requirement_id, completed, updated_at)
        VALUES (?, 1, CURRENT_TIMESTAMP)
        ON CONFLICT(requirement_id) DO UPDATE SET completed = 1, updated_at = CURRENT_TIMESTAMP
      `, [targetReqId]);
    }

    // 3. Retrieve updated caught games list for both Pokémon
    const caughtGames1Rows = await query('SELECT game_id FROM caught_pokemon WHERE pokemon_id = ?', [pokemon_id]);
    const caught_games1 = caughtGames1Rows.map(row => row.game_id);

    const caughtGames2Rows = await query('SELECT game_id FROM caught_pokemon WHERE pokemon_id = ?', [target_pokemon_id]);
    const caught_games2 = caughtGames2Rows.map(row => row.game_id);

    res.json({ 
      success: true, 
      pokemon_id, 
      target_pokemon_id, 
      caught_games1, 
      caught_games2 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to execute swap trade' });
  }
});

// 4c. Get list of caught Pokémon for a game (to trade back)
app.get('/api/caught_pokemon', async (req, res) => {
  const { game_id } = req.query;
  if (!game_id) {
    return res.status(400).json({ error: 'game_id is required' });
  }
  try {
    const sql = `
      SELECT p.id, p.name 
      FROM caught_pokemon cp
      JOIN pokemon p ON cp.pokemon_id = p.id
      WHERE cp.game_id = ?
      ORDER BY p.name
    `;
    const list = await query(sql, [game_id]);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve caught Pokémon' });
  }
});

// 4d. Search all Pokémon globally with location details across games
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q || !q.trim()) {
    return res.json([]);
  }
  
  try {
    const searchTerm = `%${q.trim()}%`;
    const matchedPkmn = await query(`
      SELECT id, name, type1, type2
      FROM pokemon
      WHERE name LIKE ? OR id = ? OR type1 LIKE ? OR type2 LIKE ?
      ORDER BY id
      LIMIT 100
    `, [searchTerm, parseInt(q) || -1, searchTerm, searchTerm]);

    const results = [];
    for (const p of matchedPkmn) {
      // Get all caught games
      const caughtRows = await query('SELECT game_id FROM caught_pokemon WHERE pokemon_id = ?', [p.id]);
      const caught_games = caughtRows.map(r => r.game_id);

      // Get requirements (encounters) for each game where this pokemon exists
      const requirements = await query(`
        SELECT 
          r.id as requirement_id,
          r.game_id,
          g.name as game_name,
          r.action_type,
          r.location_details,
          r.notes,
          s.name as section_name,
          COALESCE(prog.completed, 0) as completed
        FROM requirements r
        JOIN games g ON r.game_id = g.id
        JOIN sections s ON r.section_id = s.id
        LEFT JOIN progress prog ON r.id = prog.requirement_id
        WHERE r.pokemon_id = ?
        ORDER BY g.generation ASC, g.id ASC
      `, [p.id]);

      results.push({
        pokemon_id: p.id,
        pokemon_name: p.name,
        pokemon_type1: p.type1,
        pokemon_type2: p.type2,
        caught_games,
        requirements
      });
    }

    res.json(results);
  } catch (err) {
    console.error('Error during search:', err);
    res.status(500).json({ error: 'Failed to search Pokémon' });
  }
});

// 5. Get overall game progress summary (completed count, total count)
app.get('/api/progress/summary', async (req, res) => {
  const { game_id } = req.query;
  if (!game_id) {
    return res.status(400).json({ error: 'game_id is required' });
  }
  try {
    const summary = await query(`
      SELECT 
        COUNT(r.id) as total_count,
        SUM(COALESCE(p.completed, 0)) as completed_count
      FROM requirements r
      LEFT JOIN progress p ON r.id = p.requirement_id
      WHERE r.game_id = ?
    `, [game_id]);

    const stats = {
      total: summary[0].total_count || 0,
      completed: summary[0].completed_count || 0,
      percentage: summary[0].total_count 
        ? Math.round((summary[0].completed_count / summary[0].total_count) * 100) 
        : 0
    };

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve progress summary' });
  }
});

// Start Server and Init Database
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
}

start();
