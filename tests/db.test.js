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

    "Verify Sections table contains exactly 110 sections (10 per game)": async () => {
      const sections = await query("SELECT * FROM sections");
      assert.strictEqual(sections.length, 110, "Should have exactly 110 sections (10 per game).");
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

    "Verify redundancy blank database file exists": async () => {
      const blankPath = path.join(projectRoot, 'pokemon_checklist_blank.db');
      assert.ok(fs.existsSync(blankPath), "pokemon_checklist_blank.db should exist.");
    }
  }
};
