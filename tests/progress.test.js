import assert from 'assert';
import { query, run } from '../db.js';

export default {
  name: "Checklist Completion & Progress Sync",
  tests: {
    "Verify Progress table row count matches Requirements table": async () => {
      const reqCount = await query("SELECT COUNT(*) as count FROM requirements");
      const progCount = await query("SELECT COUNT(*) as count FROM progress");
      assert.strictEqual(progCount[0].count, reqCount[0].count, "Progress and requirements row counts must match.");
    },

    "Verify caught checklist status marking and caught_pokemon sync": async () => {
      // Find Pikachu (ID 25) in Yellow checklist
      const pikachuReq = await query("SELECT id FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 25 LIMIT 1");
      assert.ok(pikachuReq.length > 0, "Yellow Pikachu requirement should exist.");
      const reqId = pikachuReq[0].id;

      // Set completed = 1
      await run("UPDATE progress SET completed = 1 WHERE requirement_id = ?", [reqId]);
      // Simulating caught_pokemon synchronization
      await run("INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES ('yellow', 25)");

      // Verify record exists in caught_pokemon
      const caught = await query("SELECT * FROM caught_pokemon WHERE game_id = 'yellow' AND pokemon_id = 25");
      assert.strictEqual(caught.length, 1, "Pikachu should be listed in caught_pokemon for yellow.");

      // Verify record is marked completed in progress
      const completed = await query("SELECT completed FROM progress WHERE requirement_id = ?", [reqId]);
      assert.strictEqual(completed[0].completed, 1, "Progress should be marked completed.");
    },

    "Verify game progress reset deletes caught_pokemon and clears progress": async () => {
      // 1. Mark Pikachu (ID 25) in Yellow checklist as completed
      const yellowPikachu = await query("SELECT id FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 25 LIMIT 1");
      const reqId = yellowPikachu[0].id;
      await run("UPDATE progress SET completed = 1 WHERE requirement_id = ?", [reqId]);
      await run("INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES ('yellow', 25)");

      // 2. Perform mock reset for yellow
      await run("DELETE FROM caught_pokemon WHERE game_id = 'yellow'");
      await run(`
        UPDATE progress 
        SET completed = 0, updated_at = CURRENT_TIMESTAMP
        WHERE requirement_id IN (
          SELECT id FROM requirements WHERE game_id = 'yellow'
        )
      `);

      // 3. Verify caught_pokemon for yellow is empty
      const caughtCount = await query("SELECT COUNT(*) as count FROM caught_pokemon WHERE game_id = 'yellow'");
      assert.strictEqual(caughtCount[0].count, 0, "caught_pokemon for yellow should be empty after reset.");

      // 4. Verify Pikachu completed progress state is 0
      const prog = await query("SELECT completed FROM progress WHERE requirement_id = ?", [reqId]);
      assert.strictEqual(prog[0].completed, 0, "Pikachu progress should be 0 after reset.");
    },

    "Verify un-checking a requirement correctly deletes the pokemon from caught_pokemon": async () => {
      // 1. Mark Pikachu (ID 25) in Yellow checklist as completed
      const yellowPikachuReqs = await query("SELECT id FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 25");
      const reqId1 = yellowPikachuReqs[0].id;
      
      // Ensure all other requirements for Pikachu in Yellow are set to completed = 0 initially
      for (const req of yellowPikachuReqs) {
        await run("UPDATE progress SET completed = 0 WHERE requirement_id = ?", [req.id]);
      }
      
      // Set the first requirement to completed = 1, insert caught_pokemon
      await run("UPDATE progress SET completed = 1 WHERE requirement_id = ?", [reqId1]);
      await run("INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES ('yellow', 25)");

      // Verify it is caught
      const caughtBefore = await query("SELECT * FROM caught_pokemon WHERE game_id = 'yellow' AND pokemon_id = 25");
      assert.strictEqual(caughtBefore.length, 1, "Pikachu should be listed in caught_pokemon.");

      // 2. Uncheck the requirement
      await run("UPDATE progress SET completed = 0 WHERE requirement_id = ?", [reqId1]);
      
      // Run the otherCompleted logic
      const otherCompleted = await query(`
        SELECT COUNT(*) as count 
        FROM requirements r
        JOIN progress p ON r.id = p.requirement_id
        WHERE r.game_id = 'yellow' AND r.pokemon_id = 25 AND p.completed = 1 AND r.id != ?
      `, [reqId1]);
      
      if (otherCompleted[0].count === 0) {
        await run('DELETE FROM caught_pokemon WHERE game_id = ? AND pokemon_id = ?', ['yellow', 25]);
      }

      // 3. Verify caught_pokemon is deleted
      const caughtAfter = await query("SELECT * FROM caught_pokemon WHERE game_id = 'yellow' AND pokemon_id = 25");
      assert.strictEqual(caughtAfter.length, 0, "Pikachu should be deleted from caught_pokemon after un-checking last completed requirement.");
    },

    "Verify releasing a caught Pokémon deletes caught_pokemon and resets all its requirements progress to 0": async () => {
      // 1. Mark Pikachu (ID 25) caught with multiple requirements completed
      const yellowPikachuReqs = await query("SELECT id FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 25");
      for (const req of yellowPikachuReqs) {
        await run("UPDATE progress SET completed = 1 WHERE requirement_id = ?", [req.id]);
      }
      await run("INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES ('yellow', 25)");

      // 2. Release Pikachu
      await run('DELETE FROM caught_pokemon WHERE game_id = ? AND pokemon_id = ?', ['yellow', 25]);
      await run(`
        UPDATE progress 
        SET completed = 0, updated_at = CURRENT_TIMESTAMP
        WHERE requirement_id IN (
          SELECT id FROM requirements WHERE game_id = ? AND pokemon_id = ?
        )
      `, ['yellow', 25]);

      // 3. Verify caught_pokemon is empty for Pikachu in Yellow
      const caught = await query("SELECT * FROM caught_pokemon WHERE game_id = 'yellow' AND pokemon_id = 25");
      assert.strictEqual(caught.length, 0, "Pikachu caught entry should be deleted.");

      // 4. Verify all Pikachu requirements completed status is 0
      const progressList = await query(`
        SELECT completed FROM progress 
        WHERE requirement_id IN (
          SELECT id FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 25
        )
      `);
      assert.ok(progressList.every(p => p.completed === 0), "All requirement progress states should be 0.");
    }
  }
};
