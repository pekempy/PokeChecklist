// Define evolution chains (national dex IDs)
export const evolutions = {
  // Gen 1
  2: { from: 1, method: "Level 16" }, // Ivysaur
  3: { from: 2, method: "Level 32" }, // Venusaur
  5: { from: 4, method: "Level 16" }, // Charmeleon
  6: { from: 5, method: "Level 36" }, // Charizard
  8: { from: 7, method: "Level 16" }, // Wartortle
  9: { from: 8, method: "Level 36" }, // Blastoise
  11: { from: 10, method: "Level 7" }, // Metapod
  12: { from: 11, method: "Level 10" }, // Butterfree
  14: { from: 13, method: "Level 7" }, // Kakuna
  15: { from: 14, method: "Level 10" }, // Beedrill
  17: { from: 16, method: "Level 18" }, // Pidgeotto
  18: { from: 17, method: "Level 36" }, // Pidgeot
  20: { from: 19, method: "Level 20" }, // Raticate
  22: { from: 21, method: "Level 20" }, // Fearow
  24: { from: 23, method: "Level 22" }, // Arbok
  26: { from: 25, method: "Thunder Stone" }, // Raichu
  28: { from: 27, method: "Level 22" }, // Sandslash
  30: { from: 29, method: "Level 16" }, // Nidorina
  31: { from: 30, method: "Moon Stone" }, // Nidoqueen
  33: { from: 32, method: "Level 16" }, // Nidorino
  34: { from: 33, method: "Moon Stone" }, // Nidoking
  36: { from: 35, method: "Moon Stone" }, // Clefable
  38: { from: 37, method: "Fire Stone" }, // Ninetales
  40: { from: 39, method: "Moon Stone" }, // Wigglytuff
  42: { from: 41, method: "Level 22" }, // Golbat
  44: { from: 43, method: "Level 21" }, // Gloom
  45: { from: 44, method: "Leaf Stone" }, // Vileplume
  47: { from: 46, method: "Level 24" }, // Parasect
  49: { from: 48, method: "Level 31" }, // Venomoth
  51: { from: 50, method: "Level 26" }, // Dugtrio
  53: { from: 52, method: "Level 28" }, // Persian
  55: { from: 54, method: "Level 33" }, // Golduck
  57: { from: 56, method: "Level 28" }, // Primeape
  59: { from: 58, method: "Fire Stone" }, // Arcanine
  61: { from: 60, method: "Level 25" }, // Poliwhirl
  62: { from: 61, method: "Water Stone" }, // Poliwrath
  64: { from: 63, method: "Level 16" }, // Kadabra
  65: { from: 64, method: "Trade Link" }, // Alakazam
  67: { from: 66, method: "Level 28" }, // Machoke
  68: { from: 67, method: "Trade Link" }, // Machamp
  70: { from: 69, method: "Level 21" }, // Weepinbell
  71: { from: 70, method: "Leaf Stone" }, // Victreebel
  73: { from: 72, method: "Level 30" }, // Tentacruel
  75: { from: 74, method: "Level 25" }, // Graveler
  76: { from: 75, method: "Trade Link" }, // Golem
  78: { from: 77, method: "Level 40" }, // Rapidash
  80: { from: 79, method: "Level 37" }, // Slowbro
  82: { from: 81, method: "Level 30" }, // Magneton
  85: { from: 84, method: "Level 31" }, // Dodrio
  87: { from: 86, method: "Level 34" }, // Dewgong
  89: { from: 88, method: "Level 38" }, // Muk
  91: { from: 90, method: "Water Stone" }, // Cloyster
  93: { from: 92, method: "Level 25" }, // Haunter
  94: { from: 93, method: "Trade Link" }, // Gengar
  97: { from: 96, method: "Level 26" }, // Hypno
  99: { from: 98, method: "Level 28" }, // Kingler
  101: { from: 100, method: "Level 30" }, // Electrode
  103: { from: 102, method: "Leaf Stone" }, // Exeggutor
  105: { from: 104, method: "Level 28" }, // Marowak
  110: { from: 109, method: "Level 35" }, // Weezing
  112: { from: 111, method: "Level 42" }, // Rhydon
  117: { from: 116, method: "Level 32" }, // Seadra
  119: { from: 118, method: "Level 33" }, // Seaking
  121: { from: 120, method: "Water Stone" }, // Starmie
  130: { from: 129, method: "Level 20" }, // Gyarados
  134: { from: 133, method: "Water Stone" }, // Vaporeon
  135: { from: 133, method: "Thunder Stone" }, // Jolteon
  136: { from: 133, method: "Fire Stone" }, // Flareon
  139: { from: 138, method: "Level 40" }, // Omastar
  141: { from: 140, method: "Level 40" }, // Kabutops
  148: { from: 147, method: "Level 30" }, // Dragonair
  149: { from: 148, method: "Level 55" }, // Dragonite

  // Gen 2
  153: { from: 152, method: "Level 16" }, // Bayleef
  154: { from: 153, method: "Level 32" }, // Meganium
  156: { from: 155, method: "Level 14" }, // Quilava
  157: { from: 156, method: "Level 36" }, // Typhlosion
  159: { from: 158, method: "Level 18" }, // Croconaw
  160: { from: 159, method: "Level 30" }, // Feraligatr
  162: { from: 161, method: "Level 15" }, // Furret
  164: { from: 163, method: "Level 20" }, // Noctowl
  166: { from: 165, method: "Level 18" }, // Ledian
  168: { from: 167, method: "Level 22" }, // Ariados
  169: { from: 42, method: "Friendship" }, // Crobat
  171: { from: 170, method: "Level 26" }, // Lanturn
  25: { from: 172, method: "Friendship" }, // Pichu -> Pikachu
  35: { from: 173, method: "Friendship" }, // Cleffa -> Clefairy
  39: { from: 174, method: "Friendship" }, // Igglybuff -> Jigglypuff
  176: { from: 175, method: "Friendship" }, // Togetic
  178: { from: 177, method: "Level 25" }, // Xatu
  180: { from: 179, method: "Level 15" }, // Flaaffy
  181: { from: 180, method: "Level 30" }, // Ampharos
  182: { from: 44, method: "Sun Stone" }, // Bellossom
  184: { from: 183, method: "Level 18" }, // Azumarill
  186: { from: 61, method: "Trade with King's Rock" }, // Politoed
  188: { from: 187, method: "Level 18" }, // Skiploom
  189: { from: 188, method: "Level 27" }, // Jumpluff
  192: { from: 191, method: "Sun Stone" }, // Sunflora
  195: { from: 194, method: "Level 20" }, // Quagsire
  196: { from: 133, method: "Friendship (Day)" }, // Espeon
  197: { from: 133, method: "Friendship (Night)" }, // Umbreon
  199: { from: 79, method: "Trade with King's Rock" }, // Slowking
  208: { from: 95, method: "Trade with Metal Coat" }, // Steelix
  212: { from: 123, method: "Trade with Metal Coat" }, // Scizor
  217: { from: 216, method: "Level 30" }, // Ursaring
  219: { from: 218, method: "Level 38" }, // Magcargo
  221: { from: 220, method: "Level 33" }, // Piloswine
  224: { from: 223, method: "Level 25" }, // Octillery
  230: { from: 117, method: "Trade with Dragon Scale" }, // Kingdra
  232: { from: 231, method: "Level 25" }, // Donphan
  233: { from: 137, method: "Trade with Up-Grade" }, // Porygon2
  106: { from: 236, method: "Level 20 (Attack > Defense)" }, // Hitmonlee
  107: { from: 236, method: "Level 20 (Attack < Defense)" }, // Hitmonchan
  237: { from: 236, method: "Level 20 (Attack = Defense)" }, // Hitmontop
  124: { from: 238, method: "Level 30" }, // Jynx
  125: { from: 239, method: "Level 30" }, // Electabuzz
  126: { from: 240, method: "Level 30" }, // Magmar
  242: { from: 113, method: "Friendship" }, // Blissey
  247: { from: 246, method: "Level 30" }, // Pupitar
  248: { from: 247, method: "Level 55" }, // Tyranitar

  // Gen 3
  253: { from: 252, method: "Level 16" }, // Grovyle
  254: { from: 253, method: "Level 36" }, // Sceptile
  256: { from: 255, method: "Level 16" }, // Combusken
  257: { from: 256, method: "Level 36" }, // Blaziken
  259: { from: 258, method: "Level 16" }, // Marshtomp
  260: { from: 259, method: "Level 36" }, // Swampert
  262: { from: 261, method: "Level 18" }, // Mightyena
  264: { from: 263, method: "Level 20" }, // Linoone
  266: { from: 265, method: "Level 7 (Silcoon)" }, // Silcoon
  267: { from: 266, method: "Level 10 (Beautifly)" }, // Beautifly
  268: { from: 265, method: "Level 7 (Cascoon)" }, // Cascoon
  269: { from: 268, method: "Level 10 (Dustox)" }, // Dustox
  271: { from: 270, method: "Level 14" }, // Lombre
  272: { from: 271, method: "Water Stone" }, // Ludicolo
  274: { from: 273, method: "Level 14" }, // Nuzleaf
  275: { from: 274, method: "Leaf Stone" }, // Shiftry
  277: { from: 276, method: "Level 22" }, // Swellow
  279: { from: 278, method: "Level 25" }, // Pelipper
  281: { from: 280, method: "Level 20" }, // Kirlia
  282: { from: 281, method: "Level 30" }, // Gardevoir
  284: { from: 283, method: "Level 22" }, // Masquerain
  286: { from: 285, method: "Level 23" }, // Breloom
  288: { from: 287, method: "Level 18" }, // Vigoroth
  289: { from: 288, method: "Level 36" }, // Slaking
  291: { from: 290, method: "Level 20 (Ninjask)" }, // Ninjask
  292: { from: 290, method: "Level 20 (Shedinja - Empty party slot)" }, // Shedinja
  294: { from: 293, method: "Level 20" }, // Loudred
  295: { from: 294, method: "Level 40" }, // Exploud
  297: { from: 296, method: "Level 24" }, // Hariyama
  183: { from: 298, method: "Friendship" }, // Azurill -> Marill
  301: { from: 300, method: "Moon Stone" }, // Delcatty
  305: { from: 304, method: "Level 32" }, // Lairon
  306: { from: 305, method: "Level 42" }, // Aggron
  308: { from: 307, method: "Level 37" }, // Medicham
  310: { from: 309, method: "Level 26" }, // Manectric
  317: { from: 316, method: "Level 26" }, // Swalot
  319: { from: 318, method: "Level 30" }, // Sharpedo
  321: { from: 320, method: "Level 40" }, // Wailord
  323: { from: 322, method: "Level 33" }, // Camerupt
  326: { from: 325, method: "Level 30" }, // Grumpig
  329: { from: 328, method: "Level 35" }, // Vibrava
  330: { from: 329, method: "Level 45" }, // Flygon
  332: { from: 331, method: "Level 32" }, // Cacturne
  334: { from: 333, method: "Level 35" }, // Altaria
  340: { from: 339, method: "Level 30" }, // Whiscash
  342: { from: 341, method: "Level 30" }, // Crawdaunt
  344: { from: 343, method: "Level 36" }, // Claydol
  346: { from: 345, method: "Level 40" }, // Cradily
  348: { from: 347, method: "Level 40" }, // Armaldo
  350: { from: 349, method: "Max Beauty / Prism Scale" }, // Milotic
  354: { from: 353, method: "Level 37" }, // Banette
  356: { from: 355, method: "Level 37" }, // Dusclops
  202: { from: 360, method: "Level 15" }, // Wynaut -> Wobbuffet
  362: { from: 361, method: "Level 42" }, // Glalie
  364: { from: 363, method: "Level 32" }, // Sealeo
  365: { from: 364, method: "Level 44" }, // Walrein
  367: { from: 366, method: "Trade with DeepSeaTooth" }, // Huntail
  368: { from: 366, method: "Trade with DeepSeaScale" }, // Gorebyss
  372: { from: 371, method: "Level 30" }, // Shelgon
  373: { from: 372, method: "Level 50" }, // Salamence
  375: { from: 374, method: "Level 20" }, // Metang
  376: { from: 375, method: "Level 45" } // Metagross
};

// Gift/Static Lists for Gen 1
export const gen1Gifts = {
  yellow: {
    25: { loc: "Pallet Town (Oak's Lab)", sec: 1 }, // Pikachu
    1: { loc: "Cerulean City (From girl)", sec: 2 }, // Bulbasaur
    4: { loc: "Route 24 (From trainer)", sec: 2 }, // Charmander
    7: { loc: "Vermilion City (Officer Jenny)", sec: 3 }, // Squirtle
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 }, // Magikarp
    133: { loc: "Celadon Mansion Back Room", sec: 4 }, // Eevee
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 }, // Hitmonlee
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 }, // Hitmonchan
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 }, // Lapras
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Porygon
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 }, // Omanyte
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 }, // Kabuto
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 }, // Aerodactyl
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 }, // Articuno
    145: { loc: "Power Plant (Static)", sec: 8 }, // Zapdos
    146: { loc: "Victory Road (Static)", sec: 9 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 10 }, // Mewtwo
    143: { loc: "Route 12 or 16 (Static - Poké Flute)", sec: 5 } // Snorlax
  },
  red: {
    1: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Bulbasaur
    4: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Charmander
    7: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Squirtle
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 }, // Magikarp
    133: { loc: "Celadon Mansion Back Room", sec: 4 }, // Eevee
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 }, // Hitmonlee
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 }, // Hitmonchan
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 }, // Lapras
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Porygon
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 }, // Omanyte
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 }, // Kabuto
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 }, // Aerodactyl
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 }, // Articuno
    145: { loc: "Power Plant (Static)", sec: 8 }, // Zapdos
    146: { loc: "Victory Road (Static)", sec: 9 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 10 }, // Mewtwo
    143: { loc: "Route 12 or 16 (Static - Poké Flute)", sec: 5 } // Snorlax
  },
  blue: {
    1: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Bulbasaur
    4: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Charmander
    7: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Squirtle
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 }, // Magikarp
    133: { loc: "Celadon Mansion Back Room", sec: 4 }, // Eevee
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 }, // Hitmonlee
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 }, // Hitmonchan
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 }, // Lapras
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Porygon
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 }, // Omanyte
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 }, // Kabuto
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 }, // Aerodactyl
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 }, // Articuno
    145: { loc: "Power Plant (Static)", sec: 8 }, // Zapdos
    146: { loc: "Victory Road (Static)", sec: 9 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 10 }, // Mewtwo
    143: { loc: "Route 12 or 16 (Static - Poké Flute)", sec: 5 } // Snorlax
  }
};

// In-game Trades for Gen 1
export const gen1Trades = {
  yellow: {
    122: { loc: "Route 2 (House)", notes: "Trade Clefairy -> Mr. Mime" } // Mr. Mime
  },
  red: {
    122: { loc: "Route 2 (House)", notes: "Trade Abra -> Mr. Mime" }, // Mr. Mime
    124: { loc: "Cerulean City (House)", notes: "Trade Poliwhirl -> Jynx" }, // Jynx
    83: { loc: "Vermilion City (House)", notes: "Trade Spearow -> Farfetch'd" }, // Farfetch'd
    108: { loc: "Route 18 (Gate 2F)", notes: "Trade Slowbro -> Lickitung" } // Lickitung
  },
  blue: {
    122: { loc: "Route 2 (House)", notes: "Trade Abra -> Mr. Mime" }, // Mr. Mime
    124: { loc: "Cerulean City (House)", notes: "Trade Poliwhirl -> Jynx" }, // Jynx
    83: { loc: "Vermilion City (House)", notes: "Trade Spearow -> Farfetch'd" }, // Farfetch'd
    108: { loc: "Route 18 (Gate 2F)", notes: "Trade Slowbro -> Lickitung" } // Lickitung
  }
};

// Wild Encounters for Gen 1
export const gen1Wild = {
  yellow: {
    16: { loc: "Route 1 & 2 (Grass)", sec: 1 }, // Pidgey
    19: { loc: "Route 1 & 2 (Grass)", sec: 1 }, // Rattata
    21: { loc: "Route 22 (Grass)", sec: 1 }, // Spearow
    56: { loc: "Route 22 (Grass)", sec: 1 }, // Mankey
    29: { loc: "Route 2 & 22 (Grass)", sec: 1 }, // Nidoran♀
    32: { loc: "Route 2 & 22 (Grass)", sec: 1 }, // Nidoran♂
    10: { loc: "Viridian Forest (Grass)", sec: 1 }, // Caterpie
    11: { loc: "Viridian Forest (Grass)", sec: 1 }, // Metapod
    17: { loc: "Viridian Forest (Grass - Rare)", sec: 1 }, // Pidgeotto

    27: { loc: "Route 3 & 4 (Grass)", sec: 2 }, // Sandshrew
    39: { loc: "Route 5, 6, 7, 8 (Grass)", sec: 3 }, // Jigglypuff
    41: { loc: "Mt. Moon (Cave)", sec: 2 }, // Zubat
    74: { loc: "Mt. Moon (Cave)", sec: 2 }, // Geodude
    46: { loc: "Mt. Moon (Cave)", sec: 2 }, // Paras
    35: { loc: "Mt. Moon (Cave)", sec: 2 }, // Clefairy
    43: { loc: "Route 24 & 25 (Grass)", sec: 2 }, // Oddish
    69: { loc: "Route 24 & 25 (Grass)", sec: 2 }, // Bellsprout
    48: { loc: "Route 24 & 25 (Grass)", sec: 2 }, // Venonat
    63: { loc: "Route 5 & 6 (Grass)", sec: 2 }, // Abra

    50: { loc: "Diglett's Cave", sec: 3 }, // Diglett
    51: { loc: "Diglett's Cave (Rare)", sec: 3 }, // Dugtrio
    96: { loc: "Route 11 (Grass)", sec: 3 }, // Drowzee
    98: [ // Krabby
      { loc: "Route 25 (Fishing - Super Rod)", sec: 2 },
      { loc: "Route 10 (Fishing - Super Rod)", sec: 4 },
      { loc: "Seafoam Islands (Cave)", sec: 7 },
      { loc: "Seafoam Islands (Fishing - Super Rod)", sec: 7 }
    ],
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Poliwag
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Goldeen
    54: { loc: "Route 6 (Surfing - Rare)", sec: 3 }, // Psyduck
    90: [ // Shellder
      { loc: "Vermilion City Harbor (Fishing - Super Rod)", sec: 3 },
      { loc: "Route 17 (Fishing - Super Rod)", sec: 5 },
      { loc: "Route 18 (Fishing - Super Rod)", sec: 5 }
    ],
    116: { loc: "Route 10 (Fishing - Super Rod)", sec: 3 }, // Horsea
    72: { loc: "Route 19 (Surfing)", sec: 7 }, // Tentacool
    22: { loc: "Route 17, 18 & 23 (Grass)", sec: 5 }, // Fearow
    61: { loc: "Route 10 (Surfing)", sec: 3 }, // Poliwhirl

    66: { loc: "Rock Tunnel (Cave)", sec: 4 }, // Machop
    95: { loc: "Rock Tunnel (Cave)", sec: 4 }, // Onix

    92: { loc: "Pokémon Tower (Ghost)", sec: 5 }, // Gastly
    93: { loc: "Pokémon Tower (Ghost)", sec: 5 }, // Haunter
    104: { loc: "Pokémon Tower (Ground)", sec: 5 }, // Cubone
    84: { loc: "Route 16, 17, 18 (Grass)", sec: 5 }, // Doduo
    77: { loc: "Route 17 (Grass)", sec: 5 }, // Ponyta
    111: { loc: "Safari Zone (Grass)", sec: 5 }, // Rhyhorn
    113: { loc: "Safari Zone (Grass)", sec: 5 }, // Chansey
    102: { loc: "Safari Zone (Grass)", sec: 5 }, // Exeggcute
    123: { loc: "Safari Zone (Grass)", sec: 5 }, // Scyther
    127: { loc: "Safari Zone (Grass)", sec: 5 }, // Pinsir
    114: { loc: "Safari Zone (Grass)", sec: 5 }, // Tangela
    115: { loc: "Safari Zone (Grass)", sec: 5 }, // Kangaskhan
    128: { loc: "Safari Zone (Grass)", sec: 5 }, // Tauros
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 }, // Dratini
    148: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 }, // Dragonair
    20: { loc: "Route 16, 17, 18 (Grass)", sec: 5 }, // Raticate
    83: { loc: "Route 12 & 13 (Grass)", sec: 5 }, // Farfetch'd

    88: [{ loc: "Pokémon Mansion", sec: 7 }, { loc: "Power Plant (Electric Room)", sec: 8 }], // Grimer
    89: [{ loc: "Pokémon Mansion", sec: 7 }, { loc: "Power Plant (Electric Room)", sec: 8 }], // Muk
    58: { loc: "Pokémon Mansion", sec: 7 }, // Growlithe
    86: { loc: "Seafoam Islands (Cave)", sec: 7 }, // Seel
    87: { loc: "Seafoam Islands (Cave)", sec: 7 }, // Dewgong
    79: { loc: "Route 12 & 13 (Surfing)", sec: 7 }, // Slowpoke
    120: { loc: "Route 19, 20, 21 (Fishing - Super Rod) & Seafoam Islands (Surfing)", sec: 7 }, // Staryu

    81: { loc: "Power Plant (Electric Room)", sec: 8 }, // Magnemite
    82: { loc: "Power Plant (Electric Room)", sec: 8 }, // Magneton
    100: { loc: "Power Plant (Static - Pokéball)", sec: 8 }, // Voltorb
    101: { loc: "Power Plant (Static - Pokéball)", sec: 8 }, // Electrode

    67: { loc: "Victory Road (Cave)", sec: 9 }, // Machoke
    75: { loc: "Victory Road (Cave)", sec: 9 }, // Graveler

    132: { loc: "Cerulean Cave (B1F)", sec: 10 }, // Ditto
    108: { loc: "Cerulean Cave (Cave)", sec: 10 } // Lickitung
  },
  red: {
    25: [{ loc: "Viridian Forest (Grass - Rare)", sec: 1 }, { loc: "Power Plant (Electric Room)", sec: 8 }], // Pikachu
    10: { loc: "Viridian Forest (Grass)", sec: 1 }, // Caterpie
    11: { loc: "Viridian Forest (Grass)", sec: 1 }, // Metapod
    13: { loc: "Viridian Forest (Grass)", sec: 1 }, // Weedle
    14: { loc: "Viridian Forest (Grass)", sec: 1 }, // Kakuna
    16: { loc: "Route 1 & 2 (Grass)", sec: 1 }, // Pidgey
    19: { loc: "Route 1 & 2 (Grass)", sec: 1 }, // Rattata
    21: { loc: "Route 22 (Grass)", sec: 1 }, // Spearow
    56: { loc: "Route 5 & 6 (Grass)", sec: 3 }, // Mankey
    29: { loc: "Route 2 & 22 (Grass)", sec: 1 }, // Nidoran♀
    32: { loc: "Route 2 & 22 (Grass)", sec: 1 }, // Nidoran♂

    23: { loc: "Route 4 (Grass)", sec: 2 }, // Ekans
    39: { loc: "Route 3 (Grass)", sec: 2 }, // Jigglypuff
    41: { loc: "Mt. Moon (Cave)", sec: 2 }, // Zubat
    74: { loc: "Mt. Moon (Cave)", sec: 2 }, // Geodude
    46: { loc: "Mt. Moon (Cave)", sec: 2 }, // Paras
    35: { loc: "Mt. Moon (Cave)", sec: 2 }, // Clefairy
    43: { loc: "Route 24 & 25 (Grass)", sec: 2 }, // Oddish
    48: { loc: "Route 12, 13, 14, 15 (Grass)", sec: 7 }, // Venonat
    63: { loc: "Route 24 & 25 (Grass)", sec: 2 }, // Abra

    50: { loc: "Diglett's Cave", sec: 3 }, // Diglett
    51: { loc: "Diglett's Cave (Rare)", sec: 3 }, // Dugtrio
    96: { loc: "Route 11 (Grass)", sec: 3 }, // Drowzee
    98: { loc: "Route 11 (Fishing - Super Rod)", sec: 3 }, // Krabby
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Poliwag
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Goldeen
    54: { loc: "Route 24 & 25 (Fishing - Super Rod)", sec: 2 }, // Psyduck
    90: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 }, // Shellder
    116: { loc: "Route 19 (Fishing - Super Rod)", sec: 7 }, // Horsea
    72: { loc: "Route 19 (Surfing)", sec: 7 }, // Tentacool
    22: { loc: "Route 17, 18 & 23 (Grass)", sec: 5 }, // Fearow
    61: { loc: "Route 10 (Surfing)", sec: 3 }, // Poliwhirl

    66: { loc: "Rock Tunnel (Cave)", sec: 4 }, // Machop
    95: { loc: "Rock Tunnel (Cave)", sec: 4 }, // Onix
    100: { loc: "Route 10 (Grass)", sec: 4 }, // Voltorb

    92: { loc: "Pokémon Tower (Ghost)", sec: 5 }, // Gastly
    93: { loc: "Pokémon Tower (Ghost)", sec: 5 }, // Haunter
    104: { loc: "Pokémon Tower (Ground)", sec: 5 }, // Cubone
    84: { loc: "Route 16, 17, 18 (Grass)", sec: 5 }, // Doduo
    77: { loc: "Pokémon Mansion (Grass)", sec: 7 }, // Ponyta
    111: { loc: "Safari Zone (Grass)", sec: 5 }, // Rhyhorn
    113: { loc: "Safari Zone (Grass)", sec: 5 }, // Chansey
    102: { loc: "Safari Zone (Grass)", sec: 5 }, // Exeggcute
    123: { loc: "Safari Zone (Grass)", sec: 5 }, // Scyther
    115: { loc: "Safari Zone (Grass)", sec: 5 }, // Kangaskhan
    128: { loc: "Safari Zone (Grass)", sec: 5 }, // Tauros
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 }, // Dratini
    20: { loc: "Route 16, 17, 18 (Grass)", sec: 5 }, // Raticate
    58: { loc: "Route 7 & 8 (Grass)", sec: 5 }, // Growlithe

    88: { loc: "Pokémon Mansion", sec: 7 }, // Grimer
    89: { loc: "Pokémon Mansion", sec: 7 }, // Muk
    109: { loc: "Pokémon Mansion", sec: 7 }, // Koffing
    110: { loc: "Pokémon Mansion", sec: 7 }, // Weezing
    86: { loc: "Seafoam Islands (Cave)", sec: 7 }, // Seel
    87: { loc: "Seafoam Islands (Cave)", sec: 7 }, // Dewgong
    114: { loc: "Route 21 (Grass)", sec: 7 }, // Tangela

    81: { loc: "Power Plant (Electric Room)", sec: 8 }, // Magnemite
    82: { loc: "Power Plant (Electric Room)", sec: 8 }, // Magneton
    125: { loc: "Power Plant (Electric Room)", sec: 8 }, // Electabuzz

    67: { loc: "Victory Road (Cave)", sec: 9 }, // Machoke
    75: { loc: "Victory Road (Cave)", sec: 9 }, // Graveler

    132: { loc: "Cerulean Cave (B1F)", sec: 10 }, // Ditto
    79: { loc: "Seafoam Islands & Route 10 (Fishing)", sec: 7 } // Slowpoke
  },
  blue: {
    25: [{ loc: "Viridian Forest (Grass - Rare)", sec: 1 }, { loc: "Power Plant (Electric Room)", sec: 8 }], // Pikachu
    10: { loc: "Viridian Forest (Grass)", sec: 1 }, // Caterpie
    11: { loc: "Viridian Forest (Grass)", sec: 1 }, // Metapod
    13: { loc: "Viridian Forest (Grass)", sec: 1 }, // Weedle
    14: { loc: "Viridian Forest (Grass)", sec: 1 }, // Kakuna
    16: { loc: "Route 1 & 2 (Grass)", sec: 1 }, // Pidgey
    19: { loc: "Route 1 & 2 (Grass)", sec: 1 }, // Rattata
    21: { loc: "Route 22 (Grass)", sec: 1 }, // Spearow
    29: { loc: "Route 2 & 22 (Grass)", sec: 1 }, // Nidoran♀
    32: { loc: "Route 2 & 22 (Grass)", sec: 1 }, // Nidoran♂

    27: { loc: "Route 3 & 4 (Grass)", sec: 2 }, // Sandshrew
    39: { loc: "Route 3 (Grass)", sec: 2 }, // Jigglypuff
    41: { loc: "Mt. Moon (Cave)", sec: 2 }, // Zubat
    74: { loc: "Mt. Moon (Cave)", sec: 2 }, // Geodude
    46: { loc: "Mt. Moon (Cave)", sec: 2 }, // Paras
    35: { loc: "Mt. Moon (Cave)", sec: 2 }, // Clefairy
    69: { loc: "Route 24 & 25 (Grass)", sec: 2 }, // Bellsprout
    48: { loc: "Route 12, 13, 14, 15 (Grass)", sec: 7 }, // Venonat
    63: { loc: "Route 24 & 25 (Grass)", sec: 2 }, // Abra
    52: { loc: "Route 5 & 6 (Grass)", sec: 2 }, // Meowth

    50: { loc: "Diglett's Cave", sec: 3 }, // Diglett
    51: { loc: "Diglett's Cave (Rare)", sec: 3 }, // Dugtrio
    96: { loc: "Route 11 (Grass)", sec: 3 }, // Drowzee
    98: { loc: "Route 11 (Fishing - Super Rod)", sec: 3 }, // Krabby
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Poliwag
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Goldeen
    54: { loc: "Seafoam Islands (Cave)", sec: 7 }, // Psyduck
    90: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 }, // Shellder
    116: { loc: "Route 19 (Fishing - Super Rod)", sec: 7 }, // Horsea
    72: { loc: "Route 19 (Surfing)", sec: 7 }, // Tentacool
    22: { loc: "Route 17, 18 & 23 (Grass)", sec: 5 }, // Fearow
    61: { loc: "Route 10 (Surfing)", sec: 3 }, // Poliwhirl

    66: { loc: "Rock Tunnel (Cave)", sec: 4 }, // Machop
    95: { loc: "Rock Tunnel (Cave)", sec: 4 }, // Onix
    100: { loc: "Route 10 (Grass)", sec: 4 }, // Voltorb

    92: { loc: "Pokémon Tower (Ghost)", sec: 5 }, // Gastly
    93: { loc: "Pokémon Tower (Ghost)", sec: 5 }, // Haunter
    104: { loc: "Pokémon Tower (Ground)", sec: 5 }, // Cubone
    84: { loc: "Route 16, 17, 18 (Grass)", sec: 5 }, // Doduo
    77: { loc: "Pokémon Mansion (Grass)", sec: 7 }, // Ponyta
    111: { loc: "Safari Zone (Grass)", sec: 5 }, // Rhyhorn
    113: { loc: "Safari Zone (Grass)", sec: 5 }, // Chansey
    102: { loc: "Safari Zone (Grass)", sec: 5 }, // Exeggcute
    127: { loc: "Safari Zone (Grass)", sec: 5 }, // Pinsir
    115: { loc: "Safari Zone (Grass)", sec: 5 }, // Kangaskhan
    128: { loc: "Safari Zone (Grass)", sec: 5 }, // Tauros
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 }, // Dratini
    20: { loc: "Route 16, 17, 18 (Grass)", sec: 5 }, // Raticate
    37: { loc: "Route 7 & 8 (Grass)", sec: 5 }, // Vulpix

    88: { loc: "Pokémon Mansion", sec: 7 }, // Grimer
    89: { loc: "Pokémon Mansion", sec: 7 }, // Muk
    109: { loc: "Pokémon Mansion", sec: 7 }, // Koffing
    110: { loc: "Pokémon Mansion", sec: 7 }, // Weezing
    126: { loc: "Pokémon Mansion", sec: 7 }, // Magmar
    86: { loc: "Seafoam Islands (Cave)", sec: 7 }, // Seel
    87: { loc: "Seafoam Islands (Cave)", sec: 7 }, // Dewgong
    114: { loc: "Route 21 (Grass)", sec: 7 }, // Tangela

    81: { loc: "Power Plant (Electric Room)", sec: 8 }, // Magnemite
    82: { loc: "Power Plant (Electric Room)", sec: 8 }, // Magneton

    67: { loc: "Victory Road (Cave)", sec: 9 }, // Machoke
    75: { loc: "Victory Road (Cave)", sec: 9 }, // Graveler

    132: { loc: "Cerulean Cave (B1F)", sec: 10 }, // Ditto
    79: { loc: "Seafoam Islands & Route 10 (Fishing)", sec: 7 }, // Slowpoke
    120: { loc: "Route 19, 20, 21 (Fishing - Super Rod) & Seafoam Islands", sec: 7 } // Staryu
  }
};

// Seeder logic for Gen 2 (Johto)
export const gen2Gifts = {
  gold: {
    152: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Chikorita
    155: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Cyndaquil
    158: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Totodile
    175: { loc: "Violet City Pokémon Center (Egg)", sec: 1 }, // Togepi
    213: { loc: "Cianwood City (From Mania)", sec: 5 }, // Shuckle
    147: { loc: "Dragon's Den Shrine (Elder's Quiz)", sec: 8 }, // Dratini
    236: { loc: "Mt. Mortar B1F (From Kiyo)", sec: 8 }, // Tyrogue
    133: { loc: "Goldenrod City (From Bill)", sec: 3 } // Eevee
  },
  silver: {
    152: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Chikorita
    155: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Cyndaquil
    158: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Totodile
    175: { loc: "Violet City Pokémon Center (Egg)", sec: 1 }, // Togepi
    213: { loc: "Cianwood City (From Mania)", sec: 5 }, // Shuckle
    147: { loc: "Dragon's Den Shrine (Elder's Quiz)", sec: 8 }, // Dratini
    236: { loc: "Mt. Mortar B1F (From Kiyo)", sec: 8 }, // Tyrogue
    133: { loc: "Goldenrod City (From Bill)", sec: 3 } // Eevee
  },
  crystal: {
    152: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Chikorita
    155: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Cyndaquil
    158: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Totodile
    175: { loc: "Violet City Pokémon Center (Egg)", sec: 1 }, // Togepi
    213: { loc: "Cianwood City (From Mania)", sec: 5 }, // Shuckle
    147: { loc: "Dragon's Den Shrine (ExtremeSpeed Dratini)", sec: 8 }, // Dratini
    236: { loc: "Mt. Mortar B1F (From Kiyo)", sec: 8 }, // Tyrogue
    133: { loc: "Goldenrod City (From Bill)", sec: 3 }, // Eevee
    172: { loc: "Goldenrod Daycare (Odd Egg Gift)", sec: 3 } // Pichu
  }
};

export const gen2Trades = {
  gold: {
    95: { loc: "Violet City", notes: "Trade Bellsprout -> Onix" }, // Onix
    66: { loc: "Goldenrod Dept. Store 5F", notes: "Trade Drowzee -> Machop" }, // Machop
    142: { loc: "Route 14 (Gate)", notes: "Trade Chansey -> Aerodactyl", sec: 10 } // Aerodactyl
  },
  silver: {
    95: { loc: "Violet City", notes: "Trade Bellsprout -> Onix" }, // Onix
    66: { loc: "Goldenrod Dept. Store 5F", notes: "Trade Drowzee -> Machop" }, // Machop
    142: { loc: "Route 14 (Gate)", notes: "Trade Chansey -> Aerodactyl", sec: 10 } // Aerodactyl
  },
  crystal: {
    95: { loc: "Violet City", notes: "Trade Bellsprout -> Onix" }, // Onix
    66: { loc: "Goldenrod Dept. Store 5F", notes: "Trade Drowzee -> Machop" }, // Machop
    142: { loc: "Route 14 (Gate)", notes: "Trade Chansey -> Aerodactyl", sec: 10 } // Aerodactyl
  }
};

export const gen2Wild = {
  gold: {
    161: { loc: "Route 29 (Morning/Day)", sec: 1 }, // Sentret
    163: { loc: "Route 29 (Night)", sec: 1 }, // Hoothoot
    167: { loc: "Route 30 & 31 (Night)", sec: 1 }, // Spinarak
    16: { loc: "Route 29 & 30 (Morning/Day)", sec: 1 }, // Pidgey
    19: { loc: "Route 29 & 30 (All day)", sec: 1 }, // Rattata
    10: { loc: "Route 30 & 31 (Morning/Day)", sec: 1 }, // Caterpie
    41: { loc: "Dark Cave", sec: 1 }, // Zubat
    74: { loc: "Dark Cave & Route 46", sec: 1 }, // Geodude
    21: { loc: "Route 46 (Morning/Day)", sec: 1 }, // Spearow
    69: { loc: "Route 31 & 32", sec: 1 }, // Bellsprout
    92: { loc: "Sprout Tower (Night)", sec: 1 }, // Gastly

    179: { loc: "Route 32 (Morning/Day)", sec: 2 }, // Mareep
    194: { loc: "Route 32 (Night)", sec: 2 }, // Wooper
    27: { loc: "Union Cave", sec: 2 }, // Sandshrew
    79: { loc: "Slowpoke Well", sec: 2 }, // Slowpoke
    95: { loc: "Union Cave", sec: 2 }, // Onix

    63: { loc: "Route 34 & 35", sec: 3 }, // Abra
    96: { loc: "Route 34 & 35", sec: 3 }, // Drowzee
    132: { loc: "Route 34 & 35", sec: 3 }, // Ditto
    209: { loc: "Route 38", sec: 3 }, // Snubbull
    193: { loc: "Route 35 (Rare / Swarm)", sec: 3 }, // Yanma
    29: { loc: "Route 35 & 36", sec: 3 }, // Nidoran♀
    32: { loc: "Route 35 & 36", sec: 3 }, // Nidoran♂
    185: { loc: "Route 36 (Static SquirtBottle)", sec: 3 }, // Sudowoodo
    123: { loc: "National Park (Bug Catching Contest)", sec: 3 }, // Scyther
    127: { loc: "National Park (Bug Catching Contest)", sec: 3 }, // Pinsir

    109: { loc: "Burned Tower", sec: 4 }, // Koffing
    20: { loc: "Burned Tower", sec: 4 }, // Raticate
    58: { loc: "Route 36 & 37", sec: 4 }, // Growlithe
    234: { loc: "Route 36 & 37", sec: 4 }, // Stantler
    81: { loc: "Route 38 & 39", sec: 4 }, // Magnemite
    241: { loc: "Route 38 & 39", sec: 4 }, // Miltank
    128: { loc: "Route 38 & 39", sec: 4 }, // Tauros

    72: { loc: "Route 40 & 41 (Surfing)", sec: 5 }, // Tentacool
    73: { loc: "Route 40 & 41 (Surfing)", sec: 5 }, // Tentacruel
    98: { loc: "Route 40 (Rock Smash)", sec: 5 }, // Krabby

    220: { loc: "Ice Path", sec: 7 }, // Swinub
    124: { loc: "Ice Path", sec: 7 }, // Jynx

    116: { loc: "Whirl Islands (Whirlpool)", sec: 8 }, // Horsea
    86: { loc: "Whirl Islands", sec: 8 }, // Seel
    202: { loc: "Dark Cave (Back Area)", sec: 8 }, // Wobbuffet
    206: { loc: "Dark Cave (Front Area)", sec: 8 }, // Dunsparce

    216: { loc: "Route 45 (Morning/Day)", sec: 9 }, // Teddiursa
    207: { loc: "Route 45 (All Day)", sec: 9 }, // Gligar
    111: { loc: "Victory Road", sec: 9 }, // Rhyhorn
    75: { loc: "Victory Road (Cave)", sec: 9 }, // Graveler

    25: { loc: "Route 2 (Grass)", sec: 10 }, // Pikachu
    77: { loc: "Kanto Route 22, 26, 27, 28 (Grass)", sec: 10 }, // Ponyta
    100: { loc: "Kanto Route 10 (Grass)", sec: 10 }, // Voltorb
    104: { loc: "Rock Tunnel (Cave)", sec: 10 }, // Cubone
    113: { loc: "Kanto Route 13, 14, 15 (Grass)", sec: 10 }, // Chansey
    90: { loc: "Route 41 (Fishing - Good Rod)", sec: 5 }, // Shellder
    246: { loc: "Mt. Silver (Cave)", sec: 10 }, // Larvitar
    200: { loc: "Mt. Silver (Night)", sec: 10 }, // Misdreavus
    143: { loc: "Vermilion City (Static)", sec: 10 }, // Snorlax
    249: { loc: "Whirl Islands B4F (Static)", sec: 10 }, // Lugia
    250: { loc: "Tin Tower (Static)", sec: 10 }, // Ho-Oh
    245: { loc: "Roaming Johto", sec: 10 }, // Suicune
    243: { loc: "Roaming Johto", sec: 10 }, // Raikou
    244: { loc: "Roaming Johto", sec: 10 }, // Entei
    83: { loc: "Route 38 & 39", sec: 4 }, // Farfetch'd
    108: { loc: "Route 44", sec: 7 }, // Lickitung
    114: { loc: "Route 44", sec: 7 }, // Tangela
    115: { loc: "Rock Tunnel (Cave)", sec: 10 }, // Kangaskhan
    122: { loc: "Route 21", sec: 10 }, // Mr. Mime
    131: { loc: "Union Cave B2F (Static - Friday)", sec: 2 }, // Lapras
    190: { loc: "Route 29, 30, 31, 32 & 33 (Headbutt)", sec: 1 }, // Aipom
    198: { loc: "Route 7, 16 & 18 (Night)", sec: 10 }, // Murkrow
    201: { loc: "Ruins of Alph (Inner Chambers)", sec: 1 }, // Unown
    203: { loc: "Route 43", sec: 7 }, // Girafarig
    204: { loc: "Ilex Forest & Route 34 (Headbutt)", sec: 1 }, // Pineco
    214: { loc: "Route 29, 30, 31 & Azalea Town (Headbutt)", sec: 1 }, // Heracross
    215: { loc: "Route 28 & Mt. Silver (Night)", sec: 10 }, // Sneasel
    222: { loc: "Cherrygrove City & Route 34 (Fishing - Good Rod)", sec: 2 }, // Corsola
    226: { loc: "Route 41 (Surfing)", sec: 5 }, // Mantine
    228: { loc: "Route 7 (Night)", sec: 10 }, // Houndour
    235: { loc: "Ruins of Alph (Grass)", sec: 1 }, // Smeargle
    211: { loc: "Route 32 (Fishing - Swarm/Old Rod) & Route 12/13 (Fishing - Super Rod)", sec: 2 } // Qwilfish
  },
  silver: {
    161: { loc: "Route 29 (Morning/Day)", sec: 1 }, // Sentret
    163: { loc: "Route 29 (Night)", sec: 1 }, // Hoothoot
    165: { loc: "Route 30 & 31 (Morning)", sec: 1 }, // Ledyba
    16: { loc: "Route 29 & 30 (Morning/Day)", sec: 1 }, // Pidgey
    19: { loc: "Route 29 & 30 (All day)", sec: 1 }, // Rattata
    13: { loc: "Route 30 & 31 (Morning/Day)", sec: 1 }, // Weedle
    41: { loc: "Dark Cave", sec: 1 }, // Zubat
    74: { loc: "Dark Cave & Route 46", sec: 1 }, // Geodude
    21: { loc: "Route 46 (Morning/Day)", sec: 1 }, // Spearow
    69: { loc: "Route 31 & 32", sec: 1 }, // Bellsprout
    92: { loc: "Sprout Tower (Night)", sec: 1 }, // Gastly

    179: { loc: "Route 32 (Morning/Day)", sec: 2 }, // Mareep
    194: { loc: "Route 32 (Night)", sec: 2 }, // Wooper
    79: { loc: "Slowpoke Well", sec: 2 }, // Slowpoke
    95: { loc: "Union Cave", sec: 2 }, // Onix

    63: { loc: "Route 34 & 35", sec: 3 }, // Abra
    96: { loc: "Route 34 & 35", sec: 3 }, // Drowzee
    132: { loc: "Route 34 & 35", sec: 3 }, // Ditto
    209: { loc: "Route 38", sec: 3 }, // Snubbull
    193: { loc: "Route 35 (Rare / Swarm)", sec: 3 }, // Yanma
    29: { loc: "Route 35 & 36", sec: 3 }, // Nidoran♀
    32: { loc: "Route 35 & 36", sec: 3 }, // Nidoran♂
    185: { loc: "Route 36 (Static SquirtBottle)", sec: 3 }, // Sudowoodo
    123: { loc: "National Park (Bug Catching Contest)", sec: 3 }, // Scyther
    127: { loc: "National Park (Bug Catching Contest)", sec: 3 }, // Pinsir

    109: { loc: "Burned Tower", sec: 4 }, // Koffing
    20: { loc: "Burned Tower", sec: 4 }, // Raticate
    37: { loc: "Route 36 & 37", sec: 4 }, // Vulpix
    234: { loc: "Route 36 & 37", sec: 4 }, // Stantler
    81: { loc: "Route 38 & 39", sec: 4 }, // Magnemite
    241: { loc: "Route 38 & 39", sec: 4 }, // Miltank
    128: { loc: "Route 38 & 39", sec: 4 }, // Tauros
    52: { loc: "Route 38 & 39 (Morning/Night)", sec: 4 }, // Meowth

    72: { loc: "Route 40 & 41 (Surfing)", sec: 5 }, // Tentacool
    73: { loc: "Route 40 & 41 (Surfing)", sec: 5 }, // Tentacruel
    98: { loc: "Route 40 (Rock Smash)", sec: 5 }, // Krabby

    220: { loc: "Ice Path", sec: 7 }, // Swinub
    124: { loc: "Ice Path", sec: 7 }, // Jynx
    225: { loc: "Ice Path (All Day)", sec: 7 }, // Delibird

    116: { loc: "Whirl Islands (Whirlpool)", sec: 8 }, // Horsea
    86: { loc: "Whirl Islands", sec: 8 }, // Seel
    202: { loc: "Dark Cave (Back Area)", sec: 8 }, // Wobbuffet
    206: { loc: "Dark Cave (Front Area)", sec: 8 }, // Dunsparce

    231: { loc: "Route 45 (Morning/Day)", sec: 9 }, // Phanpy
    227: { loc: "Route 45 (All Day)", sec: 9 }, // Skarmory
    111: { loc: "Victory Road", sec: 9 }, // Rhyhorn
    75: { loc: "Victory Road", sec: 9 }, // Graveler

    25: { loc: "Route 2 (Grass)", sec: 10 }, // Pikachu
    23: { loc: "Route 32 & 33 (Grass)", sec: 2 }, // Ekans - Silver exclusive
    77: { loc: "Kanto Route 22, 26, 27, 28 (Grass)", sec: 10 }, // Ponyta
    100: { loc: "Kanto Route 10 (Grass)", sec: 10 }, // Voltorb
    104: { loc: "Rock Tunnel (Cave)", sec: 10 }, // Cubone
    113: { loc: "Kanto Route 13, 14, 15 (Grass)", sec: 10 }, // Chansey
    90: { loc: "Route 41 (Fishing - Good Rod)", sec: 5 }, // Shellder
    246: { loc: "Mt. Silver (Cave)", sec: 10 }, // Larvitar
    200: { loc: "Mt. Silver (Night)", sec: 10 }, // Misdreavus
    143: { loc: "Vermilion City (Static)", sec: 10 }, // Snorlax
    249: { loc: "Whirl Islands B4F (Static)", sec: 10 }, // Lugia
    250: { loc: "Tin Tower (Static)", sec: 10 }, // Ho-Oh
    245: { loc: "Roaming Johto", sec: 10 }, // Suicune
    243: { loc: "Roaming Johto", sec: 10 }, // Raikou
    244: { loc: "Roaming Johto", sec: 10 }, // Entei
    83: { loc: "Route 38 & 39", sec: 4 }, // Farfetch'd
    108: { loc: "Route 44", sec: 7 }, // Lickitung
    114: { loc: "Route 44", sec: 7 }, // Tangela
    115: { loc: "Rock Tunnel (Cave)", sec: 10 }, // Kangaskhan
    122: { loc: "Route 21", sec: 10 }, // Mr. Mime
    131: { loc: "Union Cave B2F (Static - Friday)", sec: 2 }, // Lapras
    190: { loc: "Route 29, 30, 31, 32 & 33 (Headbutt)", sec: 1 }, // Aipom
    198: { loc: "Route 7, 16 & 18 (Night)", sec: 10 }, // Murkrow
    201: { loc: "Ruins of Alph (Inner Chambers)", sec: 1 }, // Unown
    203: { loc: "Route 43", sec: 7 }, // Girafarig
    204: { loc: "Ilex Forest & Route 34 (Headbutt)", sec: 1 }, // Pineco
    214: { loc: "Route 29, 30, 31 & Azalea Town (Headbutt)", sec: 1 }, // Heracross
    215: { loc: "Route 28 & Mt. Silver (Night)", sec: 10 }, // Sneasel
    222: { loc: "Cherrygrove City & Route 34 (Fishing - Good Rod)", sec: 2 }, // Corsola
    228: { loc: "Route 7 (Night)", sec: 10 }, // Houndour
    235: { loc: "Ruins of Alph (Grass)", sec: 1 }, // Smeargle
    211: { loc: "Route 32 (Fishing - Swarm/Old Rod) & Route 12/13 (Fishing - Super Rod)", sec: 2 } // Qwilfish
  },
  crystal: {
    161: { loc: "Route 29 (Morning/Day)", sec: 1 }, // Sentret
    163: { loc: "Route 29 (Night)", sec: 1 }, // Hoothoot
    165: { loc: "Route 30 & 31 (Morning)", sec: 1 }, // Ledyba
    167: { loc: "Route 30 & 31 (Night)", sec: 1 }, // Spinarak
    16: { loc: "Route 29 & 30 (Morning/Day)", sec: 1 }, // Pidgey
    19: { loc: "Route 29 & 30 (All day)", sec: 1 }, // Rattata
    10: { loc: "Route 30 & 31 (Morning/Day)", sec: 1 }, // Caterpie
    13: { loc: "Route 30 & 31 (Morning/Day)", sec: 1 }, // Weedle
    41: { loc: "Dark Cave", sec: 1 }, // Zubat
    74: { loc: "Dark Cave & Route 46", sec: 1 }, // Geodude
    21: { loc: "Route 46 (Morning/Day)", sec: 1 }, // Spearow
    69: { loc: "Route 31 & 32", sec: 1 }, // Bellsprout
    92: { loc: "Sprout Tower (Night)", sec: 1 }, // Gastly

    194: { loc: "Route 32 (Night)", sec: 2 }, // Wooper
    27: { loc: "Union Cave (B1F/B2F)", sec: 2 }, // Sandshrew
    79: { loc: "Slowpoke Well", sec: 2 }, // Slowpoke
    95: { loc: "Union Cave", sec: 2 }, // Onix

    63: { loc: "Route 34 & 35", sec: 3 }, // Abra
    96: { loc: "Route 34 & 35", sec: 3 }, // Drowzee
    132: { loc: "Route 34 & 35", sec: 3 }, // Ditto
    209: { loc: "Route 34 & 35", sec: 3 }, // Snubbull
    193: { loc: "Route 35 (Rare / Swarm)", sec: 3 }, // Yanma
    29: { loc: "Route 35 & 36", sec: 3 }, // Nidoran♀
    32: { loc: "Route 35 & 36", sec: 3 }, // Nidoran♂
    185: { loc: "Route 36 (Static SquirtBottle)", sec: 3 }, // Sudowoodo
    123: { loc: "National Park (Bug Catching Contest)", sec: 3 }, // Scyther
    127: { loc: "National Park (Bug Catching Contest)", sec: 3 }, // Pinsir

    109: { loc: "Burned Tower", sec: 4 }, // Koffing
    20: { loc: "Burned Tower", sec: 4 }, // Raticate
    58: { loc: "Route 36 & 37", sec: 4 }, // Growlithe
    234: { loc: "Route 36 & 37", sec: 4 }, // Stantler
    81: { loc: "Route 38 & 39", sec: 4 }, // Magnemite
    241: { loc: "Route 38 & 39", sec: 4 }, // Miltank
    128: { loc: "Route 38 & 39", sec: 4 }, // Tauros
    52: { loc: "Route 38 & 39 (Morning/Night)", sec: 4 }, // Meowth

    72: { loc: "Route 40 & 41 (Surfing)", sec: 5 }, // Tentacool
    73: { loc: "Route 40 & 41 (Surfing)", sec: 5 }, // Tentacruel
    98: { loc: "Route 40 (Rock Smash)", sec: 5 }, // Krabby

    220: { loc: "Ice Path", sec: 7 }, // Swinub
    124: { loc: "Ice Path", sec: 7 }, // Jynx
    215: { loc: "Ice Path (Night)", sec: 7 }, // Sneasel

    116: { loc: "Whirl Islands (Whirlpool)", sec: 8 }, // Horsea
    86: { loc: "Whirl Islands", sec: 8 }, // Seel
    202: { loc: "Dark Cave (Back Area)", sec: 8 }, // Wobbuffet
    206: { loc: "Dark Cave (Front Area)", sec: 8 }, // Dunsparce

    231: { loc: "Route 45 (Morning/Day)", sec: 9 }, // Phanpy
    207: { loc: "Route 45 (All Day)", sec: 9 }, // Gligar
    227: { loc: "Route 45 (All Day)", sec: 9 }, // Skarmory
    111: { loc: "Victory Road", sec: 9 }, // Rhyhorn
    75: { loc: "Victory Road", sec: 9 }, // Graveler

    25: { loc: "Route 2 (Grass)", sec: 10 }, // Pikachu
    23: { loc: "Route 32 & 33 (Grass)", sec: 2 }, // Ekans - Crystal exclusive Johto
    77: { loc: "Kanto Route 22, 26, 27, 28 (Grass)", sec: 10 }, // Ponyta
    100: { loc: "Kanto Route 10 (Grass)", sec: 10 }, // Voltorb
    104: { loc: "Rock Tunnel (Cave)", sec: 10 }, // Cubone
    113: { loc: "Kanto Route 13, 14, 15 (Grass)", sec: 10 }, // Chansey
    90: { loc: "Route 41 (Fishing - Good Rod)", sec: 5 }, // Shellder
    246: { loc: "Mt. Silver (Cave)", sec: 10 }, // Larvitar
    200: { loc: "Mt. Silver (Night)", sec: 10 }, // Misdreavus
    143: { loc: "Vermilion City (Static)", sec: 10 }, // Snorlax
    249: { loc: "Whirl Islands B4F (Static)", sec: 10 }, // Lugia
    250: { loc: "Tin Tower (Static)", sec: 10 }, // Ho-Oh
    245: { loc: "Tin Tower (Static Event)", sec: 4 }, // Suicune static in Crystal!
    243: { loc: "Roaming Johto", sec: 10 }, // Raikou
    244: { loc: "Roaming Johto", sec: 10 }, // Entei
    83: { loc: "Route 43 (Morning/Day)", sec: 7 }, // Farfetch'd
    108: { loc: "Route 44", sec: 7 }, // Lickitung
    114: { loc: "Route 44", sec: 7 }, // Tangela
    115: { loc: "Rock Tunnel (Cave)", sec: 10 }, // Kangaskhan
    122: { loc: "Route 21", sec: 10 }, // Mr. Mime
    131: { loc: "Union Cave B2F (Static - Friday)", sec: 2 }, // Lapras
    190: { loc: "Route 29, 30, 31, 32 & 33 (Headbutt)", sec: 1 }, // Aipom
    198: { loc: "Route 7 & 16 (Night)", sec: 10 }, // Murkrow
    201: { loc: "Ruins of Alph (Inner Chambers)", sec: 1 }, // Unown
    204: { loc: "Ilex Forest & Route 34 (Headbutt)", sec: 1 }, // Pineco
    210: { loc: "Route 6 (Night)", sec: 10 }, // Granbull
    211: { loc: "Route 32 (Fishing - Swarm/Old Rod) & Route 12/13 (Fishing - Super Rod)", sec: 2 }, // Qwilfish
    214: { loc: "Route 33, 42 & 44 (Headbutt)", sec: 2 }, // Heracross
    222: { loc: "Cherrygrove City & Route 34 (Fishing - Good Rod)", sec: 2 }, // Corsola
    225: { loc: "Ice Path (Cave)", sec: 7 }, // Delibird
    226: { loc: "Route 41 (Surfing)", sec: 5 }, // Mantine
    228: { loc: "Route 7 (Night)", sec: 10 }, // Houndour
    235: { loc: "Ruins of Alph (Grass)", sec: 1 } // Smeargle
  }
};

// Seeder logic for Gen 3 (Hoenn)
export const gen3Gifts = {
  ruby: {
    252: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Treecko
    255: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Torchic
    258: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Mudkip
    345: { loc: "Rustboro City (Devon Corp - Root Fossil)", sec: 5 }, // Lileep
    347: { loc: "Rustboro City (Devon Corp - Claw Fossil)", sec: 5 }, // Anorith
    360: { loc: "Lavaridge Town (Egg)", sec: 7 }, // Wynaut
    351: { loc: "Weather Institute (From Scientist)", sec: 6 }, // Castform
    374: { loc: "Mossdeep City (Steven's House Post-Game)", sec: 10 } // Beldum
  },
  sapphire: {
    252: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Treecko
    255: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Torchic
    258: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Mudkip
    345: { loc: "Rustboro City (Devon Corp - Root Fossil)", sec: 5 }, // Lileep
    347: { loc: "Rustboro City (Devon Corp - Claw Fossil)", sec: 5 }, // Anorith
    360: { loc: "Lavaridge Town (Egg)", sec: 7 }, // Wynaut
    351: { loc: "Weather Institute (From Scientist)", sec: 6 }, // Castform
    374: { loc: "Mossdeep City (Steven's House Post-Game)", sec: 10 } // Beldum
  },
  emerald: {
    252: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Treecko
    255: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Torchic
    258: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Mudkip
    345: { loc: "Rustboro City (Devon Corp - Root Fossil)", sec: 5 }, // Lileep
    347: { loc: "Rustboro City (Devon Corp - Claw Fossil)", sec: 5 }, // Anorith
    360: { loc: "Lavaridge Town (Egg)", sec: 7 }, // Wynaut
    351: { loc: "Weather Institute (From Scientist)", sec: 6 }, // Castform
    374: { loc: "Mossdeep City (Steven's House Post-Game)", sec: 10 }, // Beldum
    185: { loc: "Battle Frontier (Static - Wailmer Pail)", sec: 9 } // Sudowoodo
  },
  firered: {
    1: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Bulbasaur
    4: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Charmander
    7: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Squirtle
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 }, // Magikarp
    35: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Clefairy
    63: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Abra
    123: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Scyther
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Porygon
    133: { loc: "Celadon Mansion Back Room", sec: 4 }, // Eevee
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 }, // Hitmonlee
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 }, // Hitmonchan
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 }, // Lapras
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 }, // Omanyte
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 }, // Kabuto
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 }, // Aerodactyl
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 }, // Articuno
    145: { loc: "Power Plant (Static)", sec: 8 }, // Zapdos
    146: { loc: "Mt. Ember Summit (Static)", sec: 10 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 10 }, // Mewtwo
    175: { loc: "Water Labyrinth (From Gentleman)", sec: 10 } // Togepi
  },
  leafgreen: {
    1: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Bulbasaur
    4: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Charmander
    7: { loc: "Pallet Town (Starter Choice)", sec: 1 }, // Squirtle
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 }, // Magikarp
    35: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Clefairy
    63: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Abra
    127: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Pinsir
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 }, // Porygon
    133: { loc: "Celadon Mansion Back Room", sec: 4 }, // Eevee
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 }, // Hitmonlee
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 }, // Hitmonchan
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 }, // Lapras
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 }, // Omanyte
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 }, // Kabuto
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 }, // Aerodactyl
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 }, // Articuno
    145: { loc: "Power Plant (Static)", sec: 8 }, // Zapdos
    146: { loc: "Mt. Ember Summit (Static)", sec: 10 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 10 }, // Mewtwo
    175: { loc: "Water Labyrinth (From Gentleman)", sec: 10 } // Togepi
  }
};

export const gen3Trades = {
  ruby: {
    296: { loc: "Rustboro City", notes: "Trade Slakoth -> Makuhita" } // Makuhita
  },
  sapphire: {
    296: { loc: "Rustboro City", notes: "Trade Slakoth -> Makuhita" } // Makuhita
  },
  emerald: {
    296: { loc: "Rustboro City", notes: "Trade Slakoth -> Makuhita" } // Makuhita
  },
  firered: {
    122: { loc: "Route 2 (House)", notes: "Trade Abra -> Mr. Mime", sec: 1 }, // Mr. Mime
    124: { loc: "Cerulean City (House)", notes: "Trade Poliwhirl -> Jynx", sec: 2 }, // Jynx
    83: { loc: "Vermilion City (House)", notes: "Trade Spearow -> Farfetch'd", sec: 3 }, // Farfetch'd
    108: { loc: "Route 18 Gate 2F", notes: "Trade Golduck -> Lickitung", sec: 5 }, // Lickitung
    29: { loc: "Route 5 Underground Path", notes: "Trade Nidoran♂ -> Nidoran♀", sec: 2 } // Nidoran♀
  },
  leafgreen: {
    122: { loc: "Route 2 (House)", notes: "Trade Abra -> Mr. Mime", sec: 1 }, // Mr. Mime
    124: { loc: "Cerulean City (House)", notes: "Trade Poliwhirl -> Jynx", sec: 2 }, // Jynx
    83: { loc: "Vermilion City (House)", notes: "Trade Spearow -> Farfetch'd", sec: 3 }, // Farfetch'd
    108: { loc: "Route 18 Gate 2F", notes: "Trade Slowbro -> Lickitung", sec: 5 }, // Lickitung
    32: { loc: "Route 5 Underground Path", notes: "Trade Nidoran♀ -> Nidoran♂", sec: 2 } // Nidoran♂
  }
};

export const gen3Wild = {
  ruby: {
    261: { loc: "Route 101", sec: 1 }, // Poochyena
    263: { loc: "Route 101", sec: 1 }, // Zigzagoon
    265: { loc: "Route 101", sec: 1 }, // Wurmple
    278: { loc: "Route 103 & 104", sec: 1 }, // Wingull
    276: { loc: "Route 104", sec: 1 }, // Taillow
    273: { loc: "Route 102 (Grass)", sec: 1 }, // Seedot
    280: { loc: "Route 102 (Rare)", sec: 1 }, // Ralts
    285: { loc: "Petalburg Woods", sec: 1 }, // Shroomish
    287: { loc: "Petalburg Woods", sec: 1 }, // Slakoth
    290: { loc: "Route 116", sec: 1 }, // Nincada
    293: { loc: "Rusturf Tunnel", sec: 1 }, // Whismur

    296: { loc: "Granite Cave", sec: 2 }, // Makuhita
    41: { loc: "Granite Cave & Meteor Falls", sec: 2 }, // Zubat
    74: { loc: "Granite Cave", sec: 2 }, // Geodude
    304: { loc: "Granite Cave", sec: 2 }, // Aron
    303: { loc: "Granite Cave", sec: 2 }, // Mawile

    309: { loc: "Route 110", sec: 3 }, // Electrike
    311: { loc: "Route 110 (Grass)", sec: 3 }, // Plusle
    316: { loc: "Route 110 (Grass)", sec: 3 }, // Gulpin
    81: { loc: "New Mauville", sec: 3 }, // Magnemite
    100: { loc: "New Mauville", sec: 3 }, // Voltorb

    322: { loc: "Route 112 & Fiery Path", sec: 4 }, // Numel
    325: { loc: "Jagged Pass", sec: 4 }, // Spoink
    324: { loc: "Fiery Path", sec: 4 }, // Torkoal
    66: { loc: "Fiery Path", sec: 4 }, // Machop
    109: { loc: "Fiery Path", sec: 4 }, // Koffing
    327: { loc: "Route 113", sec: 4 }, // Spinda
    300: { loc: "Route 116 (Grass)", sec: 4 }, // Skitty

    328: { loc: "Route 111 (Desert)", sec: 5 }, // Trapinch
    331: { loc: "Route 111 (Desert)", sec: 5 }, // Cacnea
    343: { loc: "Route 111 (Desert)", sec: 5 }, // Baltoy
    27: { loc: "Route 111 (Desert)", sec: 5 }, // Sandshrew
    333: { loc: "Route 114 (Grass)", sec: 5 }, // Swablu
    335: { loc: "Route 114 (Grass)", sec: 5 }, // Zangoose
    338: { loc: "Meteor Falls", sec: 5 }, // Solrock

    352: { loc: "Route 120 (Static Encounters)", sec: 6 }, // Kecleon
    359: { loc: "Route 120 (Grass)", sec: 6 }, // Absol
    357: { loc: "Route 119 (Grass)", sec: 6 }, // Tropius
    349: { loc: "Route 119 (Fishing - Old Rod)", sec: 6 }, // Feebas
    318: { loc: "Route 118 (Fishing - Good Rod)", sec: 6 }, // Carvanha

    353: { loc: "Mt. Pyre (Cave)", sec: 7 }, // Shuppet - also in Ruby!
    355: { loc: "Mt. Pyre (Cave)", sec: 7 }, // Duskull - also in Ruby!
    358: { loc: "Mt. Pyre (Summit)", sec: 7 }, // Chimecho
    202: { loc: "Safari Zone", sec: 7 }, // Wobbuffet
    203: { loc: "Safari Zone", sec: 7 }, // Girafarig
    84: { loc: "Safari Zone", sec: 7 }, // Doduo
    25: { loc: "Safari Zone", sec: 7 }, // Pikachu
    177: { loc: "Safari Zone", sec: 7 }, // Natu
    231: { loc: "Safari Zone", sec: 7 }, // Phanpy
    214: { loc: "Safari Zone", sec: 7 }, // Heracross
    111: { loc: "Safari Zone", sec: 7 }, // Rhyhorn
    88: { loc: "Fiery Path", sec: 4 }, // Grimer
    341: { loc: "Petalburg City (Fishing - Good Rod)", sec: 4 }, // Corphish
    283: { loc: "Route 102 (Surfing)", sec: 1 }, // Surskit
    360: { loc: "Route 130 (Grass)", sec: 9 }, // Wynaut (wild, also gift egg)
    361: { loc: "Shoal Cave B3F", sec: 8 }, // Snorunt

    366: { loc: "Route 124 (Underwater Dive)", sec: 8 }, // Clamperl
    369: { loc: "Route 124 (Underwater Dive)", sec: 8 }, // Relicanth
    170: { loc: "Route 124 (Underwater Dive)", sec: 8 }, // Chinchou
    370: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 }, // Luvdisc
    222: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 }, // Corsola
    363: { loc: "Shoal Cave", sec: 8 }, // Spheal
    344: { loc: "Sky Pillar", sec: 10 }, // Claydol
    356: { loc: "Sky Pillar", sec: 10 }, // Dusclops

    371: { loc: "Meteor Falls (Inner B1F)", sec: 9 }, // Bagon
    380: { loc: "Southern Island (Static)", sec: 9 }, // Latias
    381: { loc: "Roaming Hoenn (Mascot)", sec: 9 }, // Latios

    377: { loc: "Desert Ruins (Static - Solve Puzzle)", sec: 10 }, // Regirock
    378: { loc: "Island Cave (Static - Solve Puzzle)", sec: 10 }, // Regice
    379: { loc: "Ancient Tomb (Static - Solve Puzzle)", sec: 10 }, // Registeel
    383: { loc: "Cave of Origin (Static)", sec: 10 }, // Groudon
    384: { loc: "Sky Pillar (Static)", sec: 10 }, // Rayquaza
    227: { loc: "Route 113", sec: 5 }, // Skarmory
    299: { loc: "Granite Cave B2F (Rock Smash)", sec: 2 }, // Nosepass
    312: { loc: "Route 110 (Grass - Rare)", sec: 3 }, // Minun
    313: { loc: "Route 117 (Grass - Rare)", sec: 3 }, // Volbeat
    314: { loc: "Route 117 (Grass - Rare)", sec: 3 }, // Illumise
    315: { loc: "Route 117", sec: 3 }, // Roselia
    127: { loc: "Safari Zone (Mach Bike Area)", sec: 7 } // Pinsir
  },
  sapphire: {
    261: { loc: "Route 101", sec: 1 }, // Poochyena
    263: { loc: "Route 101", sec: 1 }, // Zigzagoon
    265: { loc: "Route 101", sec: 1 }, // Wurmple
    278: { loc: "Route 103 & 104", sec: 1 }, // Wingull
    276: { loc: "Route 104", sec: 1 }, // Taillow
    270: { loc: "Route 102 (Grass)", sec: 1 }, // Lotad
    280: { loc: "Route 102 (Rare)", sec: 1 }, // Ralts
    285: { loc: "Petalburg Woods", sec: 1 }, // Shroomish
    287: { loc: "Petalburg Woods", sec: 1 }, // Slakoth
    290: { loc: "Route 116", sec: 1 }, // Nincada
    293: { loc: "Rusturf Tunnel", sec: 1 }, // Whismur

    296: { loc: "Granite Cave", sec: 2 }, // Makuhita
    41: { loc: "Granite Cave & Meteor Falls", sec: 2 }, // Zubat
    74: { loc: "Granite Cave", sec: 2 }, // Geodude
    304: { loc: "Granite Cave", sec: 2 }, // Aron
    302: { loc: "Granite Cave", sec: 2 }, // Sableye

    309: { loc: "Route 110", sec: 3 }, // Electrike
    312: { loc: "Route 110 (Grass)", sec: 3 }, // Minun
    316: { loc: "Route 110 (Grass)", sec: 3 }, // Gulpin
    81: { loc: "New Mauville", sec: 3 }, // Magnemite
    100: { loc: "New Mauville", sec: 3 }, // Voltorb

    322: { loc: "Route 112 & Fiery Path", sec: 4 }, // Numel
    325: { loc: "Jagged Pass", sec: 4 }, // Spoink
    324: { loc: "Fiery Path", sec: 4 }, // Torkoal
    66: { loc: "Fiery Path", sec: 4 }, // Machop
    109: { loc: "Fiery Path", sec: 4 }, // Koffing
    327: { loc: "Route 113", sec: 4 }, // Spinda
    300: { loc: "Route 116 (Grass)", sec: 4 }, // Skitty

    328: { loc: "Route 111 (Desert)", sec: 5 }, // Trapinch
    331: { loc: "Route 111 (Desert)", sec: 5 }, // Cacnea
    343: { loc: "Route 111 (Desert)", sec: 5 }, // Baltoy
    27: { loc: "Route 111 (Desert)", sec: 5 }, // Sandshrew
    333: { loc: "Route 114 (Grass)", sec: 5 }, // Swablu
    336: { loc: "Route 114 (Grass)", sec: 5 }, // Seviper
    337: { loc: "Meteor Falls", sec: 5 }, // Lunatone

    352: { loc: "Route 120 (Static Encounters)", sec: 6 }, // Kecleon
    359: { loc: "Route 120 (Grass)", sec: 6 }, // Absol
    357: { loc: "Route 119 (Grass)", sec: 6 }, // Tropius
    349: { loc: "Route 119 (Fishing - Old Rod)", sec: 6 }, // Feebas
    318: { loc: "Route 118 (Fishing - Good Rod)", sec: 6 }, // Carvanha

    355: { loc: "Mt. Pyre (Cave)", sec: 7 }, // Duskull
    353: { loc: "Mt. Pyre (Cave)", sec: 7 }, // Shuppet - also in Sapphire!
    354: { loc: "Sky Pillar", sec: 10 }, // Banette
    358: { loc: "Mt. Pyre (Summit)", sec: 7 }, // Chimecho
    202: { loc: "Safari Zone", sec: 7 }, // Wobbuffet
    203: { loc: "Safari Zone", sec: 7 }, // Girafarig
    84: { loc: "Safari Zone", sec: 7 }, // Doduo
    25: { loc: "Safari Zone", sec: 7 }, // Pikachu
    177: { loc: "Safari Zone", sec: 7 }, // Natu
    231: { loc: "Safari Zone", sec: 7 }, // Phanpy
    214: { loc: "Safari Zone", sec: 7 }, // Heracross
    111: { loc: "Safari Zone", sec: 7 }, // Rhyhorn
    88: { loc: "Fiery Path", sec: 4 }, // Grimer
    341: { loc: "Petalburg City (Fishing - Good Rod)", sec: 4 }, // Corphish
    283: { loc: "Route 102 (Surfing)", sec: 1 }, // Surskit
    360: { loc: "Route 130 (Grass)", sec: 9 }, // Wynaut (wild, also gift egg)
    361: { loc: "Shoal Cave B3F", sec: 8 }, // Snorunt
    344: { loc: "Sky Pillar", sec: 10 }, // Claydol

    366: { loc: "Route 124 (Underwater Dive)", sec: 8 }, // Clamperl
    369: { loc: "Route 124 (Underwater Dive)", sec: 8 }, // Relicanth
    170: { loc: "Route 124 (Underwater Dive)", sec: 8 }, // Chinchou
    370: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 }, // Luvdisc
    222: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 }, // Corsola
    363: { loc: "Shoal Cave", sec: 8 }, // Spheal

    371: { loc: "Meteor Falls (Inner B1F)", sec: 9 }, // Bagon
    380: { loc: "Roaming Hoenn (Mascot)", sec: 9 }, // Latias
    381: { loc: "Southern Island (Static)", sec: 9 }, // Latios

    377: { loc: "Desert Ruins (Static - Solve Puzzle)", sec: 10 }, // Regirock
    378: { loc: "Island Cave (Static - Solve Puzzle)", sec: 10 }, // Regice
    379: { loc: "Ancient Tomb (Static - Solve Puzzle)", sec: 10 }, // Registeel
    382: { loc: "Cave of Origin (Static)", sec: 10 }, // Kyogre
    384: { loc: "Sky Pillar (Static)", sec: 10 }, // Rayquaza
    227: { loc: "Route 113", sec: 5 }, // Skarmory
    299: { loc: "Granite Cave B2F (Rock Smash)", sec: 2 }, // Nosepass
    311: { loc: "Route 110 (Grass - Rare)", sec: 3 }, // Plusle
    313: { loc: "Route 117 (Grass - Rare)", sec: 3 }, // Volbeat
    314: { loc: "Route 117 (Grass - Rare)", sec: 3 }, // Illumise
    315: { loc: "Route 117", sec: 3 }, // Roselia
    127: { loc: "Safari Zone (Mach Bike Area)", sec: 7 } // Pinsir
  },
  emerald: {
    261: { loc: "Route 101", sec: 1 }, // Poochyena
    263: { loc: "Route 101", sec: 1 }, // Zigzagoon
    265: { loc: "Route 101", sec: 1 }, // Wurmple
    278: { loc: "Route 103 & 104", sec: 1 }, // Wingull
    276: { loc: "Route 104", sec: 1 }, // Taillow
    273: { loc: "Route 102 (Grass)", sec: 1 }, // Seedot
    270: { loc: "Route 102 (Grass)", sec: 1 }, // Lotad
    280: { loc: "Route 102 (Rare)", sec: 1 }, // Ralts
    285: { loc: "Petalburg Woods", sec: 1 }, // Shroomish
    287: { loc: "Petalburg Woods", sec: 1 }, // Slakoth
    290: { loc: "Route 116", sec: 1 }, // Nincada
    293: { loc: "Rusturf Tunnel", sec: 1 }, // Whismur

    296: { loc: "Granite Cave", sec: 2 }, // Makuhita
    41: { loc: "Granite Cave & Meteor Falls", sec: 2 }, // Zubat
    74: { loc: "Granite Cave", sec: 2 }, // Geodude
    304: { loc: "Granite Cave", sec: 2 }, // Aron
    302: { loc: "Granite Cave (B1F/B2F)", sec: 2 }, // Sableye

    309: { loc: "Route 110", sec: 3 }, // Electrike
    311: { loc: "Route 110 (Grass)", sec: 3 }, // Plusle
    312: { loc: "Route 110 (Grass)", sec: 3 }, // Minun
    316: { loc: "Route 110 (Grass)", sec: 3 }, // Gulpin
    81: { loc: "New Mauville", sec: 3 }, // Magnemite
    100: { loc: "New Mauville", sec: 3 }, // Voltorb

    322: { loc: "Route 112 & Fiery Path", sec: 4 }, // Numel
    325: { loc: "Jagged Pass", sec: 4 }, // Spoink
    324: { loc: "Fiery Path", sec: 4 }, // Torkoal
    66: { loc: "Fiery Path", sec: 4 }, // Machop
    109: { loc: "Fiery Path", sec: 4 }, // Koffing
    327: { loc: "Route 113", sec: 4 }, // Spinda
    300: { loc: "Route 116 (Grass)", sec: 4 }, // Skitty

    328: { loc: "Route 111 (Desert)", sec: 5 }, // Trapinch
    331: { loc: "Route 111 (Desert)", sec: 5 }, // Cacnea
    343: { loc: "Route 111 (Desert)", sec: 5 }, // Baltoy
    27: { loc: "Route 111 (Desert)", sec: 5 }, // Sandshrew
    333: { loc: "Route 114 (Grass)", sec: 5 }, // Swablu
    336: { loc: "Route 114 (Grass)", sec: 5 }, // Seviper
    338: { loc: "Meteor Falls", sec: 5 }, // Solrock

    352: { loc: "Route 120 (Static Encounters)", sec: 6 }, // Kecleon
    359: { loc: "Route 120 (Grass)", sec: 6 }, // Absol
    357: { loc: "Route 119 (Grass)", sec: 6 }, // Tropius
    349: { loc: "Route 119 (Fishing - Old Rod)", sec: 6 }, // Feebas
    318: { loc: "Route 118 (Fishing - Good Rod)", sec: 6 }, // Carvanha

    353: { loc: "Mt. Pyre (Cave)", sec: 7 }, // Shuppet
    355: { loc: "Mt. Pyre (Cave)", sec: 7 }, // Duskull
    354: { loc: "Sky Pillar", sec: 10 }, // Banette
    344: { loc: "Sky Pillar", sec: 10 }, // Claydol
    358: { loc: "Mt. Pyre (Summit)", sec: 7 }, // Chimecho
    202: { loc: "Safari Zone", sec: 7 }, // Wobbuffet
    203: { loc: "Safari Zone", sec: 7 }, // Girafarig
    84: { loc: "Safari Zone", sec: 7 }, // Doduo
    25: { loc: "Safari Zone", sec: 7 }, // Pikachu
    177: { loc: "Safari Zone", sec: 7 }, // Natu
    231: { loc: "Safari Zone", sec: 7 }, // Phanpy
    214: { loc: "Safari Zone", sec: 7 }, // Heracross
    111: { loc: "Safari Zone", sec: 7 }, // Rhyhorn
    88: { loc: "Fiery Path", sec: 4 }, // Grimer
    341: { loc: "Petalburg City (Fishing - Good Rod)", sec: 4 }, // Corphish
    360: { loc: "Route 130 (Grass)", sec: 9 }, // Wynaut (wild, also gift egg)
    361: { loc: "Shoal Cave B3F", sec: 8 }, // Snorunt

    366: { loc: "Route 124 (Underwater Dive)", sec: 8 }, // Clamperl
    369: { loc: "Route 124 (Underwater Dive)", sec: 8 }, // Relicanth
    170: { loc: "Route 124 (Underwater Dive)", sec: 8 }, // Chinchou
    370: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 }, // Luvdisc
    222: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 }, // Corsola
    363: { loc: "Shoal Cave", sec: 8 }, // Spheal

    371: { loc: "Meteor Falls (Inner B1F)", sec: 9 }, // Bagon
    380: { loc: "Roaming Hoenn (Mascot)", sec: 9 }, // Latias
    381: { loc: "Roaming Hoenn (Mascot)", sec: 9 }, // Latios

    377: { loc: "Desert Ruins (Static - Solve Puzzle)", sec: 10 }, // Regirock
    378: { loc: "Island Cave (Static - Solve Puzzle)", sec: 10 }, // Regice
    379: { loc: "Ancient Tomb (Static - Solve Puzzle)", sec: 10 }, // Registeel
    382: { loc: "Marine Cave (Static Event)", sec: 10 }, // Kyogre
    383: { loc: "Terra Cave (Static Event)", sec: 10 }, // Groudon
    384: { loc: "Sky Pillar (Static - Pre-Elite Four)", sec: 9 }, // Rayquaza
    127: { loc: "Safari Zone (Mach Bike Area)", sec: 5 }, // Pinsir
    132: { loc: "Desert Underpass", sec: 6 }, // Ditto
    190: { loc: "Safari Zone (Expansion Area)", sec: 9 }, // Aipom
    204: { loc: "Safari Zone (Expansion Area)", sec: 9 }, // Pineco
    207: { loc: "Safari Zone (Expansion Area)", sec: 9 }, // Gligar
    209: { loc: "Safari Zone (Expansion Area)", sec: 9 }, // Snubbull
    213: { loc: "Safari Zone (Expansion Area - Rock Smash)", sec: 9 }, // Shuckle
    227: { loc: "Route 113", sec: 5 }, // Skarmory
    228: { loc: "Safari Zone (Expansion Area)", sec: 9 }, // Houndour
    234: { loc: "Safari Zone (Expansion Area)", sec: 9 }, // Stantler
    235: { loc: "Artisan Cave", sec: 9 }, // Smeargle
    241: { loc: "Safari Zone (Expansion Area)", sec: 9 }, // Miltank
    299: { loc: "Granite Cave B2F (Rock Smash)", sec: 2 }, // Nosepass
    303: { loc: "Victory Road B1F & B2F", sec: 9 }, // Mawile
    313: { loc: "Route 117", sec: 3 }, // Volbeat
    314: { loc: "Route 117", sec: 3 } // Illumise
  },
  firered: {
    1: { loc: "Link Trade", sec: 10 }, // Bulbasaur (Starter exclusive fallback)
    4: { loc: "Link Trade", sec: 10 }, // Charmander
    7: { loc: "Link Trade", sec: 10 }, // Squirtle
    16: { loc: "Route 1", sec: 1 }, // Pidgey
    19: { loc: "Route 1", sec: 1 }, // Rattata
    21: { loc: "Route 22", sec: 1 }, // Spearow
    56: { loc: "Route 22", sec: 1 }, // Mankey
    32: { loc: "Route 3 (Grass)", sec: 2 }, // Nidoran♂
    29: { loc: "Route 3 (Grass)", sec: 2 }, // Nidoran♀
    23: { loc: "Route 4", sec: 2 }, // Ekans
    25: [{ loc: "Viridian Forest", sec: 1 }, { loc: "Power Plant", sec: 8 }], // Pikachu
    10: { loc: "Viridian Forest", sec: 1 }, // Caterpie
    11: { loc: "Viridian Forest", sec: 1 }, // Metapod
    13: { loc: "Viridian Forest", sec: 1 }, // Weedle
    14: { loc: "Viridian Forest", sec: 1 }, // Kakuna
    39: { loc: "Route 3", sec: 2 }, // Jigglypuff
    41: { loc: "Mt. Moon", sec: 2 }, // Zubat
    74: { loc: "Mt. Moon", sec: 2 }, // Geodude
    46: { loc: "Mt. Moon", sec: 2 }, // Paras
    43: { loc: "Route 24", sec: 2 }, // Oddish
    63: { loc: "Route 24", sec: 2 }, // Abra
    96: { loc: "Route 11", sec: 3 }, // Drowzee
    52: { loc: "Route 5 & 6", sec: 2 }, // Meowth
    54: { loc: "Route 6", sec: 3 }, // Psyduck
    58: { loc: "Route 8", sec: 5 }, // Growlithe
    50: { loc: "Diglett's Cave", sec: 3 }, // Diglett
    51: { loc: "Diglett's Cave", sec: 3 }, // Dugtrio
    66: { loc: "Rock Tunnel", sec: 4 }, // Machop
    95: { loc: "Rock Tunnel", sec: 4 }, // Onix
    81: { loc: "Power Plant", sec: 8 }, // Magnemite
    82: { loc: "Power Plant", sec: 8 }, // Magneton
    100: { loc: "Power Plant", sec: 8 }, // Voltorb
    101: { loc: "Power Plant", sec: 8 }, // Electrode
    92: { loc: "Pokémon Tower", sec: 5 }, // Gastly
    93: { loc: "Pokémon Tower", sec: 5 }, // Haunter
    104: { loc: "Pokémon Tower", sec: 5 }, // Cubone
    111: { loc: "Safari Zone", sec: 5 }, // Rhyhorn
    113: { loc: "Safari Zone", sec: 5 }, // Chansey
    123: { loc: "Safari Zone", sec: 5 }, // Scyther
    115: { loc: "Safari Zone", sec: 5 }, // Kangaskhan
    102: { loc: "Safari Zone", sec: 5 }, // Exeggcute
    128: { loc: "Safari Zone", sec: 5 }, // Tauros
    114: { loc: "Route 21", sec: 7 }, // Tangela
    77: { loc: "Kindle Road", sec: 10 }, // Ponyta
    78: { loc: "Kindle Road", sec: 10 }, // Rapidash
    84: { loc: "Route 16", sec: 5 }, // Doduo
    109: { loc: "Pokémon Mansion", sec: 7 }, // Koffing
    110: { loc: "Pokémon Mansion", sec: 7 }, // Weezing
    88: { loc: "Pokémon Mansion", sec: 7 }, // Grimer
    86: { loc: "Seafoam Islands", sec: 7 }, // Seel
    87: { loc: "Seafoam Islands", sec: 7 }, // Dewgong
    116: { loc: "Route 19 (Fishing - Good Rod)", sec: 7 }, // Horsea
    117: { loc: "Route 19 (Fishing - Super Rod)", sec: 7 }, // Seadra
    90: { loc: "Vermilion City (Fishing - Super Rod)", sec: 3 }, // Shellder
    98: { loc: "Vermilion City (Fishing - Good Rod)", sec: 3 }, // Krabby
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Goldeen
    119: { loc: "Fuchsia City (Fishing - Super Rod)", sec: 5 }, // Seaking
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Poliwag
    61: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 }, // Poliwhirl
    72: { loc: "Route 19 (Surfing)", sec: 7 }, // Tentacool
    73: { loc: "Kindle Road (Surfing)", sec: 10 }, // Tentacruel
    132: { loc: "Route 13", sec: 5 }, // Ditto
    143: { loc: "Route 12 & 16", sec: 5 }, // Snorlax
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 }, // Dratini
    148: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 }, // Dragonair
    213: { loc: "One Island (Rock Smash)", sec: 8 }, // Shuckle
    202: { loc: "Ruin Valley (Grass)", sec: 10 }, // Wobbuffet
    206: { loc: "Three Island Port (Grass)", sec: 10 }, // Dunsparce
    214: { loc: "Pattern Bush (Grass)", sec: 10 }, // Heracross
    231: { loc: "Canyon Entrance (Grass)", sec: 10 }, // Phanpy
    246: { loc: "Sevault Canyon (Grass)", sec: 10 }, // Larvitar
    193: { loc: "Ruin Valley (Six Island)", sec: 10 }, // Yanma
    198: { loc: "Lost Cave (Five Island)", sec: 10 }, // Murkrow
    201: { loc: "Tanoby Ruins (Seven Island)", sec: 10 }, // Unown
    211: { loc: "Five Isle Meadow & Water Labyrinth (Fishing - Super Rod)", sec: 10 }, // Qwilfish
    225: { loc: "Icefall Cave (Four Island)", sec: 10 }, // Delibird
    227: { loc: "Sevault Canyon (Seven Island)", sec: 10 }, // Skarmory
    243: { loc: "Roaming Kanto (Post-Game - If Squirtle Chosen)", sec: 10 }, // Raikou
    244: { loc: "Roaming Kanto (Post-Game - If Bulbasaur Chosen)", sec: 10 }, // Entei
    245: { loc: "Roaming Kanto (Post-Game - If Charmander Chosen)", sec: 10 } // Suicune
  },
  leafgreen: {
    1: { loc: "Link Trade", sec: 10 }, // Bulbasaur (Starter exclusive fallback)
    4: { loc: "Link Trade", sec: 10 }, // Charmander
    7: { loc: "Link Trade", sec: 10 }, // Squirtle
    16: { loc: "Route 1", sec: 1 }, // Pidgey
    19: { loc: "Route 1", sec: 1 }, // Rattata
    21: { loc: "Route 22", sec: 1 }, // Spearow
    56: { loc: "Route 22", sec: 1 }, // Mankey
    32: { loc: "Route 3 (Grass)", sec: 2 }, // Nidoran♂
    29: { loc: "Route 3 (Grass)", sec: 2 }, // Nidoran♀
    25: [{ loc: "Viridian Forest", sec: 1 }, { loc: "Power Plant", sec: 8 }], // Pikachu
    27: { loc: "Route 4", sec: 2 }, // Sandshrew
    10: { loc: "Viridian Forest", sec: 1 }, // Caterpie
    11: { loc: "Viridian Forest", sec: 1 }, // Metapod
    13: { loc: "Viridian Forest", sec: 1 }, // Weedle
    14: { loc: "Viridian Forest", sec: 1 }, // Kakuna
    39: { loc: "Route 3", sec: 2 }, // Jigglypuff
    41: { loc: "Mt. Moon", sec: 2 }, // Zubat
    74: { loc: "Mt. Moon", sec: 2 }, // Geodude
    46: { loc: "Mt. Moon", sec: 2 }, // Paras
    69: { loc: "Route 24", sec: 2 }, // Bellsprout
    63: { loc: "Route 24", sec: 2 }, // Abra
    96: { loc: "Route 11", sec: 3 }, // Drowzee
    52: { loc: "Route 5 & 6", sec: 2 }, // Meowth
    79: { loc: "Route 6", sec: 3 }, // Slowpoke
    37: { loc: "Route 8", sec: 5 }, // Vulpix
    50: { loc: "Diglett's Cave", sec: 3 }, // Diglett
    51: { loc: "Diglett's Cave", sec: 3 }, // Dugtrio
    66: { loc: "Rock Tunnel", sec: 4 }, // Machop
    95: { loc: "Rock Tunnel", sec: 4 }, // Onix
    81: { loc: "Power Plant", sec: 8 }, // Magnemite
    82: { loc: "Power Plant", sec: 8 }, // Magneton
    100: { loc: "Power Plant", sec: 8 }, // Voltorb
    101: { loc: "Power Plant", sec: 8 }, // Electrode
    92: { loc: "Pokémon Tower", sec: 5 }, // Gastly
    93: { loc: "Pokémon Tower", sec: 5 }, // Haunter
    104: { loc: "Pokémon Tower", sec: 5 }, // Cubone
    111: { loc: "Safari Zone", sec: 5 }, // Rhyhorn
    113: { loc: "Safari Zone", sec: 5 }, // Chansey
    127: { loc: "Safari Zone", sec: 5 }, // Pinsir
    115: { loc: "Safari Zone", sec: 5 }, // Kangaskhan
    102: { loc: "Safari Zone", sec: 5 }, // Exeggcute
    128: { loc: "Safari Zone", sec: 5 }, // Tauros
    114: { loc: "Route 21", sec: 7 }, // Tangela
    77: { loc: "Kindle Road", sec: 10 }, // Ponyta
    78: { loc: "Kindle Road", sec: 10 }, // Rapidash
    84: { loc: "Route 16", sec: 5 }, // Doduo
    109: { loc: "Pokémon Mansion", sec: 7 }, // Koffing
    88: { loc: "Pokémon Mansion", sec: 7 }, // Grimer
    89: { loc: "Pokémon Mansion", sec: 7 }, // Muk
    86: { loc: "Seafoam Islands", sec: 7 }, // Seel
    87: { loc: "Seafoam Islands", sec: 7 }, // Dewgong
    116: { loc: "Route 19 (Fishing - Good Rod)", sec: 7 }, // Horsea
    120: { loc: "Vermilion City (Fishing - Super Rod)", sec: 3 }, // Staryu
    98: { loc: "Vermilion City (Fishing - Good Rod)", sec: 3 }, // Krabby
    99: { loc: "Route 19 (Fishing - Super Rod)", sec: 7 }, // Kingler
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Goldeen
    119: { loc: "Fuchsia City (Fishing - Super Rod)", sec: 5 }, // Seaking
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 }, // Poliwag
    61: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 }, // Poliwhirl
    72: { loc: "Route 19 (Surfing)", sec: 7 }, // Tentacool
    73: { loc: "Kindle Road (Surfing)", sec: 10 }, // Tentacruel
    132: { loc: "Route 13", sec: 5 }, // Ditto
    143: { loc: "Route 12 & 16", sec: 5 }, // Snorlax
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 }, // Dratini
    148: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 }, // Dragonair
    213: { loc: "One Island (Rock Smash)", sec: 8 }, // Shuckle
    202: { loc: "Ruin Valley (Grass)", sec: 10 }, // Wobbuffet
    206: { loc: "Three Island Port (Grass)", sec: 10 }, // Dunsparce
    214: { loc: "Pattern Bush (Grass)", sec: 10 }, // Heracross
    215: { loc: "Icefall Cave (Grass)", sec: 10 }, // Sneasel
    223: { loc: "Trainer Tower (Fishing - Super Rod)", sec: 10 }, // Remoraid
    226: { loc: "Tanoby Ruins (Water)", sec: 10 }, // Mantine
    193: { loc: "Ruin Valley (Six Island)", sec: 10 }, // Yanma
    200: { loc: "Lost Cave (Five Island)", sec: 10 }, // Misdreavus
    201: { loc: "Tanoby Ruins (Seven Island)", sec: 10 }, // Unown
    243: { loc: "Roaming Kanto (Post-Game - If Squirtle Chosen)", sec: 10 }, // Raikou
    244: { loc: "Roaming Kanto (Post-Game - If Bulbasaur Chosen)", sec: 10 }, // Entei
    245: { loc: "Roaming Kanto (Post-Game - If Charmander Chosen)", sec: 10 } // Suicune
  }
};

function getGeneration(pokemonId) {
  if (pokemonId <= 151) return 1;
  if (pokemonId <= 251) return 2;
  return 3;
}

function getDescendantIds(pId) {
  const list = [];
  for (const [targetId, evo] of Object.entries(evolutions)) {
    if (evo.from === pId) {
      list.push(Number(targetId));
      list.push(...getDescendantIds(Number(targetId)));
    }
  }
  return list;
}

/**
 * Returns ALL valid acquisition methods for a Pokémon in a given game.
 * Each entry: { action_type, location_details, notes, section_id }
 *
 * Priority for "primary" display: Gift > NPC Trade > Wild CATCH > Evolve > Link Trade
 * But ALL applicable methods are returned so the UI can show every option.
 */
export function resolveRequirements(gameId, pokemonId, pokemonMap, visited = new Set()) {
  if (visited.has(pokemonId)) return [];
  visited.add(pokemonId);

  const pokemon = pokemonMap[pokemonId];
  if (!pokemon) throw new Error(`Unknown pokemon ID ${pokemonId}`);

  const gameGen = ['red', 'blue', 'yellow'].includes(gameId) ? 1
    : (['gold', 'silver', 'crystal'].includes(gameId) ? 2 : 3);

  const results = [];

  // Helper to push if not duplicate location
  const seen = new Set();
  const push = (entry) => {
    const key = `${entry.action_type}|${entry.location_details}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push(entry);
    }
  };

  // 1. Gift / Static encounters
  const giftMap = gameGen === 1 ? gen1Gifts[gameId]
    : (gameGen === 2 ? gen2Gifts[gameId] : gen3Gifts[gameId]);
  if (giftMap && giftMap[pokemonId]) {
    const g = giftMap[pokemonId];
    push({ action_type: 'GIFT', location_details: g.loc, notes: g.notes || `Gift/Static encounter for ${pokemon.name}.`, section_id: g.sec });
  }

  // 2. In-game NPC Trades
  const tradeMap = gameGen === 1 ? gen1Trades[gameId]
    : (gameGen === 2 ? gen2Trades[gameId] : gen3Trades[gameId]);
  if (tradeMap && tradeMap[pokemonId]) {
    const t = tradeMap[pokemonId];
    push({ action_type: 'TRADE', location_details: t.loc, notes: t.notes, section_id: t.sec || 3 });
  }

  // 3. Wild encounters (may be multiple per game in the multi-wild map)
  const wildMap = gameGen === 1 ? gen1Wild[gameId]
    : (gameGen === 2 ? gen2Wild[gameId] : gen3Wild[gameId]);
  if (wildMap) {
    const entries = wildMap[pokemonId];
    if (entries) {
      // Support both single-object { loc, sec } and array [{ loc, sec }, ...]
      const list = Array.isArray(entries) ? entries : [entries];
      for (const w of list) {
        push({ action_type: 'CATCH', location_details: w.loc, notes: `Wild encounter.`, section_id: w.sec });
      }
    }
  }

  // 4. Evolution method
  const evo = evolutions[pokemonId];
  if (evo) {
    const fromGen = getGeneration(evo.from);
    if (fromGen <= gameGen) {
      const preReqs = resolveRequirements(gameId, evo.from, pokemonMap, new Set(visited));
      // Use earliest section of pre-evolution as the section for the evo entry
      const preSecId = preReqs.length > 0 ? Math.min(...preReqs.map(r => r.section_id)) : 10;
      const preName = pokemonMap[evo.from].name;
      push({
        action_type: 'EVOLVE',
        location_details: `Evolve ${preName}`,
        notes: `Evolves from ${preName} (${evo.method}).`,
        section_id: preSecId
      });
    }
  }

  // 4b. Breeding method (for baby/base Pokémon in Gen 2 and Gen 3)
  if (gameGen >= 2) {
    const isBaseStage = !evolutions[pokemonId];
    if (isBaseStage) {
      const hasOtherNatives = results.some(r => r.action_type === 'GIFT' || r.action_type === 'TRADE' || r.action_type === 'CATCH');
      if (!hasOtherNatives) {
        const descendants = getDescendantIds(pokemonId);
        const obtainableDescendants = descendants.filter(dId => {
          if (getGeneration(dId) > gameGen) return false;
          const reqs = resolveRequirements(gameId, dId, pokemonMap, new Set(visited));
          return reqs.some(r => r.action_type !== 'TRADE' || r.location_details !== 'Link Trade');
        });

        if (obtainableDescendants.length > 0) {
          const parentNames = obtainableDescendants.map(dId => pokemonMap[dId].name);
          const parentNamesStr = parentNames.join('/');

          let minSecId = 10;
          obtainableDescendants.forEach(dId => {
            const reqs = resolveRequirements(gameId, dId, pokemonMap, new Set(visited));
            const secIds = reqs.filter(r => r.action_type !== 'TRADE' || r.location_details !== 'Link Trade').map(r => r.section_id);
            if (secIds.length > 0) {
              minSecId = Math.min(minSecId, ...secIds);
            }
          });

          const daycareSec = gameId.includes('firered') || gameId.includes('leafgreen') ? 10 : 3;
          const resolvedSec = Math.max(minSecId, daycareSec);

          push({
            action_type: 'BREED',
            location_details: `Breed ${parentNamesStr}`,
            notes: `Breed ${parentNamesStr} at the Day Care.`,
            section_id: resolvedSec
          });
        }
      }
    }
  }

  // 5. Fallback: Link Trade (version exclusive)
  if (results.length === 0) {
    results.push({
      action_type: 'TRADE',
      location_details: 'Link Trade',
      notes: `Not natively available in ${gameId} — obtain by trading from another version.`,
      section_id: 10
    });
  }

  return results;
}

// Legacy single-result shim (used nowhere after rewrite but kept for safety)
export function resolveRequirement(gameId, pokemonId, pokemonMap) {
  const results = resolveRequirements(gameId, pokemonId, pokemonMap);
  return results[0];
}
