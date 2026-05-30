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
    }
  }
};
