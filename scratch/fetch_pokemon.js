import fs from 'fs';
import path from 'path';

async function fetchAllPokemon() {
  console.log("Fetching Pokémon data from PokeAPI...");
  const pokemonList = [];
  
  // We fetch 1 to 386
  for (let id = 1; id <= 386; id++) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      
      const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      const type1 = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
      const type2 = data.types[1] ? data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1) : null;
      
      // Clean up names if they contain hyphens (e.g. Nidoran-m, Mr-mime, Ho-oh)
      let cleanName = name;
      if (id === 29) cleanName = "Nidoran♀";
      else if (id === 32) cleanName = "Nidoran♂";
      else if (id === 83) cleanName = "Farfetch'd";
      else if (id === 122) cleanName = "Mr. Mime";
      else if (id === 250) cleanName = "Ho-Oh";
      else if (name.includes('-')) {
        cleanName = name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
      }
      
      pokemonList.push({
        id,
        name: cleanName,
        type1,
        type2
      });
      if (id % 50 === 0 || id === 386) {
        console.log(`Fetched ${id}/386...`);
      }
    } catch (err) {
      console.error(`Failed to fetch ID ${id}:`, err);
    }
  }
  
  fs.writeFileSync('pokemon_master_386.json', JSON.stringify(pokemonList, null, 2));
  console.log("Done! Saved to pokemon_master_386.json");
}

fetchAllPokemon();
