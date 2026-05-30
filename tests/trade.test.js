import assert from 'assert';
import { query, run } from '../db.js';

export default {
  name: "Inter-Game Trading & Swap Logic",
  tests: {
    "Verify trading/swapping Pokemon updates database ownership and progress correctly": async () => {
      // 1. Setup Yellow Pikachu requirement (completed)
      const pikachuYellowReq = await query("SELECT id FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 25 LIMIT 1");
      const pikReqId = pikachuYellowReq[0].id;
      await run("UPDATE progress SET completed = 1 WHERE requirement_id = ?", [pikReqId]);
      await run("INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES ('yellow', 25)");

      // 2. Setup Red Bulbasaur requirement (completed)
      const bulbasaurRedReq = await query("SELECT id FROM requirements WHERE game_id = 'red' AND pokemon_id = 1 LIMIT 1");
      const bulbReqId = bulbasaurRedReq[0].id;
      await run("UPDATE progress SET completed = 1 WHERE requirement_id = ?", [bulbReqId]);
      await run("INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES ('red', 1)");

      // 3. Execute Trade Swap (Pikachu Yellow -> Red, Bulbasaur Red -> Yellow)
      // Delete Pikachu from Yellow, insert to Red
      await run('DELETE FROM caught_pokemon WHERE game_id = ? AND pokemon_id = ?', ['yellow', 25]);
      await run('INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES (?, ?)', ['red', 25]);

      // Set Pikachu requirement in Yellow to uncompleted
      await run("UPDATE progress SET completed = 0 WHERE requirement_id = ?", [pikReqId]);
      // Set Pikachu requirement in Red to completed
      const redPikachuReq = await query("SELECT id FROM requirements WHERE game_id = 'red' AND pokemon_id = 25 LIMIT 1");
      await run("UPDATE progress SET completed = 1 WHERE requirement_id = ?", [redPikachuReq[0].id]);

      // Delete Bulbasaur from Red, insert to Yellow
      await run('DELETE FROM caught_pokemon WHERE game_id = ? AND pokemon_id = ?', ['red', 1]);
      await run('INSERT OR IGNORE INTO caught_pokemon (game_id, pokemon_id) VALUES (?, ?)', ['yellow', 1]);

      // Set Bulbasaur requirement in Red to uncompleted
      await run("UPDATE progress SET completed = 0 WHERE requirement_id = ?", [bulbReqId]);
      // Set Bulbasaur requirement in Yellow to completed
      const yellowBulbasaurReq = await query("SELECT id FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 1 LIMIT 1");
      await run("UPDATE progress SET completed = 1 WHERE requirement_id = ?", [yellowBulbasaurReq[0].id]);

      // 4. Verification
      const pikachuOwners = await query("SELECT game_id FROM caught_pokemon WHERE pokemon_id = 25");
      assert.strictEqual(pikachuOwners.length, 1, "Pikachu should be owned in only 1 game.");
      assert.strictEqual(pikachuOwners[0].game_id, 'red', "Pikachu should now be owned in red.");

      const bulbasaurOwners = await query("SELECT game_id FROM caught_pokemon WHERE pokemon_id = 1");
      assert.strictEqual(bulbasaurOwners.length, 1, "Bulbasaur should be owned in only 1 game.");
      assert.strictEqual(bulbasaurOwners[0].game_id, 'yellow', "Bulbasaur should now be owned in yellow.");
    }
  }
};
