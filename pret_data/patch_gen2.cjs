const fs = require('fs');

const gc = JSON.parse(fs.readFileSync('generated_crystal.json', 'utf8'));
const gg = JSON.parse(fs.readFileSync('generated_gold.json', 'utf8'));
const gs = JSON.parse(fs.readFileSync('generated_silver.json', 'utf8'));

let gameData = fs.readFileSync('../game_data.js', 'utf8');

function buildObjString(obj) {
  return Object.entries(obj).map(([k, v]) => `    ${k}: { loc: "${v.loc}", sec: ${v.sec} },`).join('\n');
}

const replacementGen2 = `export const gen2Wild = {
  gold: {
${buildObjString(gg)}
  },
  silver: {
${buildObjString(gs)}
  },
  crystal: {
${buildObjString(gc)}
  }
};`;

const regexGen2 = /export const gen2Wild = \{[\s\S]*?\n\};/;
gameData = gameData.replace(regexGen2, replacementGen2);

fs.writeFileSync('../game_data.js', gameData);
console.log("Patched gen2Wild successfully!");
