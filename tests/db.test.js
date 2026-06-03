import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export default {
  name: "Database Configuration & Seeding",
  tests: {
    "Verify Games table contains exactly 11 games": async () => {
      const games = await query("SELECT * FROM games");
      assert.strictEqual(games.length, 11, "Should have exactly 11 games.");
    },

    "Verify Sections table contains exactly 92 sections (Prof Oak Challenge structure)": async () => {
      const sections = await query("SELECT * FROM sections");
      assert.strictEqual(sections.length, 92, "Should have exactly 92 sections (Prof Oak).");
    },

    "Verify Requirements counts match expected generation sizes (151, 251, 386, 386)": async () => {
      const yellowReqs = await query("SELECT COUNT(DISTINCT pokemon_id) as cnt FROM requirements WHERE game_id = 'yellow'");
      assert.strictEqual(yellowReqs[0].cnt, 151, "Yellow should have exactly 151 unique Pokémon in requirements.");

      const goldReqs = await query("SELECT COUNT(DISTINCT pokemon_id) as cnt FROM requirements WHERE game_id = 'gold'");
      assert.strictEqual(goldReqs[0].cnt, 251, "Gold should have exactly 251 unique Pokémon in requirements.");

      const emeraldReqs = await query("SELECT COUNT(DISTINCT pokemon_id) as cnt FROM requirements WHERE game_id = 'emerald'");
      assert.strictEqual(emeraldReqs[0].cnt, 386, "Emerald should have exactly 386 unique Pokémon in requirements.");

      const fireredReqs = await query("SELECT COUNT(DISTINCT pokemon_id) as cnt FROM requirements WHERE game_id = 'firered'");
      assert.strictEqual(fireredReqs[0].cnt, 386, "FireRed should have exactly 386 unique Pokémon in requirements.");
    },

    "Verify Yellow/Red/Blue requirements for Farfetch'd, Lickitung, Mr. Mime, Jynx, and Vulpix": async () => {
      // Farfetch'd (83)
      const farfetchdYellow = await query("SELECT * FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 83");
      assert.strictEqual(farfetchdYellow.length, 1);
      assert.strictEqual(farfetchdYellow[0].action_type, 'CATCH');
      assert.strictEqual(farfetchdYellow[0].location_details, 'Route 12, Route 13');

      const farfetchdRed = await query("SELECT * FROM requirements WHERE game_id = 'red' AND pokemon_id = 83");
      assert.strictEqual(farfetchdRed.length, 1);
      assert.strictEqual(farfetchdRed[0].action_type, 'TRADE');
      assert.strictEqual(farfetchdRed[0].location_details, 'Vermilion City (House)');

      // Lickitung (108)
      const lickitungYellow = await query("SELECT * FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 108");
      assert.strictEqual(lickitungYellow.length, 1);
      assert.strictEqual(lickitungYellow[0].action_type, 'CATCH');
      assert.strictEqual(lickitungYellow[0].location_details, 'Cerulean Cave');

      const lickitungRed = await query("SELECT * FROM requirements WHERE game_id = 'red' AND pokemon_id = 108");
      assert.strictEqual(lickitungRed.length, 1);
      assert.strictEqual(lickitungRed[0].action_type, 'TRADE');
      assert.strictEqual(lickitungRed[0].location_details, 'Route 18 (Gate 2F)');

      // Mr. Mime (122)
      const mrMimeYellow = await query("SELECT * FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 122");
      assert.strictEqual(mrMimeYellow.length, 1);
      assert.strictEqual(mrMimeYellow[0].action_type, 'TRADE');
      assert.strictEqual(mrMimeYellow[0].notes, 'Trade Clefairy -> Mr. Mime');

      const mrMimeRed = await query("SELECT * FROM requirements WHERE game_id = 'red' AND pokemon_id = 122");
      assert.strictEqual(mrMimeRed.length, 1);
      assert.strictEqual(mrMimeRed[0].action_type, 'TRADE');
      assert.strictEqual(mrMimeRed[0].notes, 'Trade Abra -> Mr. Mime');

      // Jynx (124)
      const jynxYellow = await query("SELECT * FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 124");
      assert.strictEqual(jynxYellow.length, 1);
      assert.strictEqual(jynxYellow[0].action_type, 'TRADE');
      assert.strictEqual(jynxYellow[0].location_details, 'Link Trade');
      assert.strictEqual(jynxYellow[0].notes, 'Not natively available in yellow — obtain by trading from another version.');

      const jynxRed = await query("SELECT * FROM requirements WHERE game_id = 'red' AND pokemon_id = 124");
      assert.strictEqual(jynxRed.length, 1);
      assert.strictEqual(jynxRed[0].action_type, 'TRADE');
      assert.strictEqual(jynxRed[0].location_details, 'Cerulean City (House)');

      // Vulpix (37)
      const vulpixYellow = await query("SELECT * FROM requirements WHERE game_id = 'yellow' AND pokemon_id = 37");
      assert.strictEqual(vulpixYellow.length, 1);
      assert.strictEqual(vulpixYellow[0].action_type, 'TRADE');
      assert.strictEqual(vulpixYellow[0].location_details, 'Link Trade');
      assert.strictEqual(vulpixYellow[0].notes, 'Not natively available in yellow — obtain by trading from another version.');
    },

    "Verify redundancy blank database file exists": async () => {
      const blankPath = path.join(projectRoot, 'pokemon_checklist_blank.db');
      assert.ok(fs.existsSync(blankPath), "pokemon_checklist_blank.db should exist.");
    }
  }
};
