import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { setDatabasePath, initDb, getDb } from './db.js';

// Test Suites
import dbSuite from './tests/db.test.js';
import progressSuite from './tests/progress.test.js';
import tradeSuite from './tests/trade.test.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDbPath = path.join(__dirname, 'pokemon_checklist_test.db');

const suites = [dbSuite, progressSuite, tradeSuite];

async function runRunner() {
  console.log("\n\x1b[1m\x1b[35m==================================================");
  console.log("   PokéChecklist Automated Test Suite Runner      ");
  console.log("==================================================\x1b[0m");

  // Setup test environment
  setDatabasePath(testDbPath);
  await initDb();

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const totalSuites = suites.length;
  let passedSuites = 0;

  const runnerStart = performance.now();

  for (const suite of suites) {
    console.log(`\n\x1b[1m\x1b[36m❖ Suite: ${suite.name}\x1b[0m`);
    console.log(`\x1b[2m  ${'━'.repeat(suite.name.length + 9)}\x1b[0m`);

    let suiteFailed = false;

    for (const [testName, testFn] of Object.entries(suite.tests)) {
      totalTests++;
      const start = performance.now();
      try {
        await testFn();
        const duration = (performance.now() - start).toFixed(1);
        console.log(`  \x1b[32m✔\x1b[0m ${testName} \x1b[2m(${duration}ms)\x1b[0m`);
        passedTests++;
      } catch (err) {
        suiteFailed = true;
        failedTests++;
        console.log(`  \x1b[31m✖\x1b[0m ${testName}`);
        console.log(`    \x1b[31mError: ${err.message}\x1b[0m`);
        if (err.stack) {
          const lines = err.stack.split('\n');
          console.log(`    \x1b[2m${lines.slice(1, 4).join('\n    ')}\x1b[0m`);
        }
      }
    }

    if (!suiteFailed) {
      passedSuites++;
    }
  }

  const totalDuration = (performance.now() - runnerStart).toFixed(0);

  // Close database connection before cleanup
  getDb().close();

  // Print Summary Box
  console.log("\n\x1b[1m\x1b[35m==================================================");
  console.log("   TEST RUN SUMMARY");
  console.log("==================================================\x1b[0m");
  
  const suitesColor = passedSuites === totalSuites ? '\x1b[32m' : '\x1b[31m';
  const testsColor = failedTests === 0 ? '\x1b[32m' : '\x1b[31m';
  
  console.log(`  Suites:   ${suitesColor}${passedSuites} passed\x1b[0m, ${totalSuites} total`);
  console.log(`  Tests:    ${testsColor}${passedTests} passed\x1b[0m, ${failedTests > 0 ? `\x1b[31m${failedTests} failed\x1b[0m, ` : ''}${totalTests} total`);
  console.log(`  Duration: \x1b[33m${totalDuration} ms\x1b[0m`);
  
  if (failedTests === 0) {
    console.log(`\n  Status:   \x1b[1m\x1b[32mPASS ✅\x1b[0m`);
    console.log(`\x1b[1m\x1b[35m==================================================\x1b[0m\n`);
    process.exit(0);
  } else {
    console.log(`\n  Status:   \x1b[1m\x1b[31mFAIL ❌\x1b[0m`);
    console.log(`\x1b[1m\x1b[35m==================================================\x1b[0m\n`);
    process.exit(1);
  }
}

async function main() {
  try {
    await runRunner();
  } catch (err) {
    console.error("\x1b[31mFatal test runner error:\x1b[0m", err);
    try {
      getDb().close();
    } catch (_) {}
    process.exit(1);
  } finally {
    // Clean up database file
    try {
      if (fs.existsSync(testDbPath)) {
        fs.unlinkSync(testDbPath);
      }
    } catch (err) {
      console.error("Failed to clean up test database file:", err);
    }
  }
}

main();
