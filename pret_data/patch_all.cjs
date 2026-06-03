const fs = require('fs');

function buildObjString(obj) {
  return Object.entries(obj).map(([k, v]) => `    ${k}: { loc: "${v.loc}", sec: ${v.sec} },`).join('\n');
}

let gameData = fs.readFileSync('../game_data.js', 'utf8');

// Gen 1
const g1r = JSON.parse(fs.readFileSync('generated_red.json', 'utf8'));
const g1b = JSON.parse(fs.readFileSync('generated_blue.json', 'utf8'));
const g1y = JSON.parse(fs.readFileSync('generated_yellow.json', 'utf8'));

const repG1 = `export const gen1Wild = {
  yellow: {
${buildObjString(g1y)}
  },
  red: {
${buildObjString(g1r)}
  },
  blue: {
${buildObjString(g1b)}
  }
};`;
gameData = gameData.replace(/export const gen1Wild = \{[\s\S]*?\n\};/, repG1);

// Gen 2
const g2g = JSON.parse(fs.readFileSync('generated_gold.json', 'utf8'));
const g2s = JSON.parse(fs.readFileSync('generated_silver.json', 'utf8'));
const g2c = JSON.parse(fs.readFileSync('generated_crystal.json', 'utf8'));

const repG2 = `export const gen2Wild = {
  gold: {
${buildObjString(g2g)}
  },
  silver: {
${buildObjString(g2s)}
  },
  crystal: {
${buildObjString(g2c)}
  }
};`;
gameData = gameData.replace(/export const gen2Wild = \{[\s\S]*?\n\};/, repG2);

// Gen 3
const g3r = JSON.parse(fs.readFileSync('generated_ruby.json', 'utf8'));
const g3s = JSON.parse(fs.readFileSync('generated_sapphire.json', 'utf8'));
const g3e = JSON.parse(fs.readFileSync('generated_emerald.json', 'utf8'));
const g3fr = JSON.parse(fs.readFileSync('generated_firered.json', 'utf8'));

// LeafGreen isn't generated separately in pret scripts but firered handles it. Actually, wait!
// Do we have generated_leafgreen.json? Let's check if it exists. 
let g3lg;
try {
  g3lg = JSON.parse(fs.readFileSync('generated_leafgreen.json', 'utf8'));
} catch (e) {
  g3lg = g3fr; // fallback
}

const repG3 = `export const gen3Wild = {
  ruby: {
${buildObjString(g3r)}
  },
  sapphire: {
${buildObjString(g3s)}
  },
  emerald: {
${buildObjString(g3e)}
  },
  firered: {
${buildObjString(g3fr)}
  },
  leafgreen: {
${buildObjString(g3lg)}
  }
};`;
gameData = gameData.replace(/export const gen3Wild = \{[\s\S]*?\n\};/, repG3);

fs.writeFileSync('../game_data.js', gameData);
console.log("Patched all gens successfully!");
