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
    145: { loc: "Power Plant (Static)", sec: 4 }, // Zapdos
    146: { loc: "Victory Road (Static)", sec: 6 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 7 }, // Mewtwo
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
    145: { loc: "Power Plant (Static)", sec: 4 }, // Zapdos
    146: { loc: "Victory Road (Static)", sec: 6 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 7 }, // Mewtwo
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
    145: { loc: "Power Plant (Static)", sec: 4 }, // Zapdos
    146: { loc: "Victory Road (Static)", sec: 6 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 7 }, // Mewtwo
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
    10: { loc: "Viridian Forest", sec: 1 },
    11: { loc: "Viridian Forest", sec: 1 },
    16: { loc: "Route 1, Route 2...", sec: 1 },
    17: { loc: "Viridian Forest, Route 11...", sec: 1 },
    19: { loc: "Route 1, Route 2...", sec: 1 },
    20: { loc: "Route 10, Route 11...", sec: 3 },
    21: { loc: "Route 22, Route 3...", sec: 1 },
    22: { loc: "Route 16, Route 17...", sec: 3 },
    27: { loc: "Mt. Moon, Route 3, Route 4", sec: 2 },
    28: { loc: "Cerulean Cave", sec: 7 },
    29: { loc: "Route 2, Route 22...", sec: 1 },
    30: { loc: "Route 9, Safari Zone, Route 23", sec: 3 },
    32: { loc: "Route 2, Route 22...", sec: 1 },
    33: { loc: "Route 9, Safari Zone, Route 23", sec: 3 },
    35: { loc: "Mt. Moon", sec: 2 },
    39: { loc: "Route 5, Route 6...", sec: 3 },
    41: { loc: "Mt. Moon, Rock Tunnel...", sec: 2 },
    42: { loc: "Cerulean Cave, Seafoam Islands, Victory Road", sec: 7 },
    43: { loc: "Route 12, Route 13...", sec: 3 },
    44: { loc: "Route 12, Route 13...", sec: 3 },
    46: { loc: "Safari Zone, Mt. Moon", sec: 3 },
    47: { loc: "Safari Zone, Cerulean Cave, Route 18 (Trade)", sec: 3 },
    48: { loc: "Route 14, Route 15...", sec: 3 },
    49: { loc: "Route 14, Route 15, Cerulean Cave", sec: 3 },
    50: { loc: "Diglett's Cave", sec: 3 },
    51: { loc: "Diglett's Cave, Route 11 (Trade)", sec: 3 },
    54: { loc: "Route 6 (Surf)", sec: 3 },
    55: { loc: "Route 6 (Surf)", sec: 3 },
    56: { loc: "Route 22, Route 3...", sec: 1 },
    57: { loc: "Route 23", sec: 6 },
    58: { loc: "Pokémon Mansion", sec: 7 },
    60: { loc: "Route 22 (Super Rod), Route 23 (Super Rod), Viridian City (Super Rod)", sec: 7 },
    61: { loc: "Route 22 (Super Rod), Route 23 (Super Rod)", sec: 7 },
    63: { loc: "Route 5, Route 6...", sec: 3 },
    64: { loc: "Route 8", sec: 3 },
    66: { loc: "Route 10, Rock Tunnel", sec: 3 },
    67: { loc: "Victory Road, Underground Path Routes 5 6 (Trade)", sec: 7 },
    69: { loc: "Route 12, Route 13...", sec: 3 },
    70: { loc: "Route 12, Route 13...", sec: 3 },
    72: { loc: "Route 21, Seafoam Islands... (Surf), Route 11 (Super Rod), Route 13 (Super Rod), Route 17 (Super Rod), Route 18 (Super Rod), Route 19 (Super Rod), Route 20 (Super Rod), Route 21 (Super Rod), Pallet Town (Super Rod), Vermilion City (Super Rod), Vermilion City Port (Super Rod), Cinnabar Island (Super Rod)", sec: 4 },
    73: { loc: "Route 19 (Super Rod), Route 20 (Super Rod), Route 21 (Super Rod)", sec: 7 },
    74: { loc: "Mt. Moon, Rock Tunnel, Victory Road", sec: 2 },
    75: { loc: "Cerulean Cave, Victory Road", sec: 7 },
    77: { loc: "Route 17", sec: 3 },
    79: { loc: "Route 12, Route 13, Seafoam Islands", sec: 3 },
    80: { loc: "Route 12, Route 13, Seafoam Islands", sec: 3 },
    81: { loc: "Route 10, Power Plant", sec: 3 },
    82: { loc: "Power Plant", sec: 4 },
    83: { loc: "Route 12, Route 13", sec: 3 },
    84: { loc: "Route 16, Route 17, Route 18", sec: 3 },
    85: { loc: "Route 17", sec: 3 },
    86: { loc: "Seafoam Islands", sec: 5 },
    87: { loc: "Seafoam Islands, Cinnabar Lab (Trade)", sec: 5 },
    88: { loc: "Power Plant, Pokémon Mansion", sec: 4 },
    89: { loc: "Power Plant, Pokémon Mansion, Cinnabar Lab (Trade)", sec: 4 },
    90: { loc: "Route 17 (Super Rod), Route 18 (Super Rod), Vermilion City Port (Super Rod)", sec: 7 },
    92: { loc: "Pokémon Tower", sec: 7 },
    93: { loc: "Pokémon Tower", sec: 7 },
    95: { loc: "Rock Tunnel, Victory Road", sec: 3 },
    96: { loc: "Route 11", sec: 3 },
    98: { loc: "Seafoam Islands, Route 10 (Super Rod), Route 25 (Super Rod), Seafoam Islands B3f (Super Rod), Seafoam Islands B4f (Super Rod)", sec: 7 },
    99: { loc: "Seafoam Islands, Route 10 (Super Rod), Route 25 (Super Rod), Seafoam Islands B3f (Super Rod), Seafoam Islands B4f (Super Rod)", sec: 5 },
    100: { loc: "Power Plant", sec: 4 },
    102: { loc: "Safari Zone", sec: 3 },
    104: { loc: "Safari Zone, Pokémon Tower", sec: 3 },
    105: { loc: "Safari Zone", sec: 3 },
    108: { loc: "Cerulean Cave", sec: 7 },
    111: { loc: "Safari Zone, Cerulean Cave", sec: 3 },
    112: { loc: "Cerulean Cave, Cinnabar Lab (Trade)", sec: 7 },
    113: { loc: "Safari Zone, Cerulean Cave", sec: 3 },
    114: { loc: "Safari Zone", sec: 3 },
    115: { loc: "Safari Zone", sec: 3 },
    116: { loc: "Route 10 (Super Rod), Route 11 (Super Rod), Route 12 (Super Rod), Route 13 (Super Rod), Vermilion City (Super Rod)", sec: 7 },
    117: { loc: "Route 12 (Super Rod), Route 13 (Super Rod)", sec: 7 },
    118: { loc: "Route 04 (Super Rod), Route 06 (Super Rod), Route 24 (Super Rod), Cerulean City (Super Rod), Celadon City (Super Rod), Cerulean Cave 1f (Super Rod), Cerulean Cave 2f (Super Rod)", sec: 7 },
    119: { loc: "Route 04 (Super Rod), Route 24 (Super Rod), Cerulean City (Super Rod), Cerulean Cave 1f (Super Rod), Cerulean Cave 2f (Super Rod)", sec: 7 },
    120: { loc: "Seafoam Islands (Surf), Route 19 (Super Rod), Route 20 (Super Rod), Route 21 (Super Rod), Cinnabar Island (Super Rod), Pallet Town (Super Rod), Vermilion City Port (Super Rod), Seafoam Islands B3f (Super Rod), Seafoam Islands B4f (Super Rod)", sec: 5 },
    123: { loc: "Safari Zone", sec: 3 },
    127: { loc: "Safari Zone", sec: 3 },
    128: { loc: "Safari Zone", sec: 3 },
    129: { loc: "Fuchsia City (Super Rod), Safari Zone  Center Area (Super Rod), Safari Zone  Area 1 (Super Rod), Safari Zone  Area 2 (Super Rod), Safari Zone  Area 3 (Super Rod)", sec: 7 },
    130: { loc: "Fuchsia City (Super Rod)", sec: 7 },
    132: { loc: "Pokémon Mansion, Cerulean Cave", sec: 4 },
    147: { loc: "Safari Zone  Center Area (Super Rod), Safari Zone  Area 1 (Super Rod), Safari Zone  Area 2 (Super Rod), Safari Zone  Area 3 (Super Rod)", sec: 7 },
    148: { loc: "Safari Zone  Center Area (Super Rod)", sec: 7 },
  },
  red: {
    10: { loc: "Viridian Forest, Route 25", sec: 1 },
    11: { loc: "Viridian Forest, Route 25", sec: 1 },
    13: { loc: "Route 2, Viridian Forest...", sec: 1 },
    14: { loc: "Viridian Forest, Route 24, Route 25", sec: 1 },
    16: { loc: "Route 1, Route 2...", sec: 1 },
    17: { loc: "Route 14, Route 15, Route 21", sec: 3 },
    19: { loc: "Route 1, Route 2...", sec: 1 },
    20: { loc: "Route 16, Route 17...", sec: 3 },
    21: { loc: "Route 22, Route 3...", sec: 1 },
    22: { loc: "Route 17, Route 18, Route 23", sec: 3 },
    23: { loc: "Route 4, Route 10...", sec: 2 },
    24: { loc: "Route 23, Cerulean Cave", sec: 6 },
    25: { loc: "Viridian Forest, Power Plant", sec: 1 },
    26: { loc: "Cerulean Cave", sec: 7 },
    29: { loc: "Route 22, Safari Zone", sec: 1 },
    30: { loc: "Safari Zone", sec: 3 },
    32: { loc: "Route 22, Safari Zone", sec: 1 },
    33: { loc: "Safari Zone", sec: 3 },
    35: { loc: "Mt. Moon", sec: 2 },
    39: { loc: "Route 3", sec: 2 },
    40: { loc: "Cerulean Cave", sec: 7 },
    41: { loc: "Mt. Moon, Rock Tunnel...", sec: 2 },
    42: { loc: "Cerulean Cave, Seafoam Islands, Victory Road", sec: 7 },
    43: { loc: "Route 12, Route 13...", sec: 3 },
    44: { loc: "Route 12, Route 13...", sec: 3 },
    46: { loc: "Mt. Moon, Safari Zone", sec: 2 },
    47: { loc: "Safari Zone, Cerulean Cave", sec: 3 },
    48: { loc: "Route 12, Route 13...", sec: 3 },
    49: { loc: "Safari Zone, Cerulean Cave, Victory Road", sec: 3 },
    50: { loc: "Diglett's Cave", sec: 3 },
    51: { loc: "Diglett's Cave", sec: 3 },
    54: { loc: "Seafoam Islands", sec: 7 },
    55: { loc: "Seafoam Islands", sec: 7 },
    56: { loc: "Route 5, Route 6...", sec: 3 },
    58: { loc: "Route 7, Route 8, Pokémon Mansion", sec: 3 },
    63: { loc: "Route 24, Route 25", sec: 3 },
    64: { loc: "Cerulean Cave", sec: 7 },
    66: { loc: "Rock Tunnel, Victory Road", sec: 7 },
    67: { loc: "Victory Road", sec: 7 },
    72: { loc: "Route 21, Sea Routes (Surf)", sec: 4 },
    74: { loc: "Mt. Moon, Rock Tunnel, Victory Road", sec: 2 },
    75: { loc: "Victory Road", sec: 7 },
    77: { loc: "Pokémon Mansion", sec: 7 },
    79: { loc: "Seafoam Islands", sec: 7 },
    80: { loc: "Seafoam Islands", sec: 5 },
    81: { loc: "Power Plant", sec: 4 },
    82: { loc: "Power Plant, Cerulean Cave", sec: 4 },
    84: { loc: "Route 16, Route 17...", sec: 3 },
    85: { loc: "Cerulean Cave", sec: 7 },
    86: { loc: "Seafoam Islands", sec: 7 },
    87: { loc: "Seafoam Islands", sec: 5 },
    88: { loc: "Pokémon Mansion", sec: 7 },
    89: { loc: "Pokémon Mansion", sec: 7 },
    90: { loc: "Seafoam Islands", sec: 7 },
    92: { loc: "Pokémon Tower", sec: 7 },
    93: { loc: "Pokémon Tower", sec: 7 },
    95: { loc: "Rock Tunnel, Victory Road", sec: 7 },
    96: { loc: "Route 11", sec: 3 },
    97: { loc: "Cerulean Cave", sec: 7 },
    100: { loc: "Route 10, Power Plant", sec: 3 },
    101: { loc: "Cerulean Cave", sec: 7 },
    102: { loc: "Safari Zone", sec: 3 },
    104: { loc: "Pokémon Tower", sec: 7 },
    105: { loc: "Cerulean Cave, Victory Road", sec: 7 },
    109: { loc: "Pokémon Mansion", sec: 7 },
    110: { loc: "Pokémon Mansion", sec: 7 },
    111: { loc: "Safari Zone", sec: 3 },
    112: { loc: "Cerulean Cave", sec: 7 },
    113: { loc: "Safari Zone, Cerulean Cave", sec: 3 },
    114: { loc: "Route 21", sec: 4 },
    115: { loc: "Safari Zone", sec: 3 },
    116: { loc: "Seafoam Islands", sec: 7 },
    117: { loc: "Seafoam Islands", sec: 5 },
    120: { loc: "Seafoam Islands", sec: 5 },
    123: { loc: "Safari Zone", sec: 3 },
    125: { loc: "Power Plant", sec: 4 },
    128: { loc: "Safari Zone", sec: 3 },
    132: { loc: "Route 13, Route 14...", sec: 3 },
  },
  blue: {
    10: { loc: "Route 2, Viridian Forest...", sec: 1 },
    11: { loc: "Viridian Forest, Route 24, Route 25", sec: 1 },
    13: { loc: "Viridian Forest, Route 25", sec: 1 },
    14: { loc: "Viridian Forest, Route 25", sec: 1 },
    16: { loc: "Route 1, Route 2...", sec: 1 },
    17: { loc: "Route 14, Route 15, Route 21", sec: 3 },
    19: { loc: "Route 1, Route 2...", sec: 1 },
    20: { loc: "Route 16, Route 17...", sec: 3 },
    21: { loc: "Route 22, Route 3...", sec: 1 },
    22: { loc: "Route 17, Route 18, Route 23", sec: 3 },
    25: { loc: "Viridian Forest, Power Plant", sec: 1 },
    26: { loc: "Power Plant, Cerulean Cave", sec: 4 },
    27: { loc: "Route 4, Route 10...", sec: 2 },
    28: { loc: "Route 23, Cerulean Cave", sec: 6 },
    29: { loc: "Route 22, Safari Zone", sec: 1 },
    30: { loc: "Safari Zone", sec: 3 },
    32: { loc: "Route 22, Safari Zone", sec: 1 },
    33: { loc: "Safari Zone", sec: 3 },
    35: { loc: "Mt. Moon", sec: 2 },
    37: { loc: "Route 7, Route 8, Pokémon Mansion", sec: 3 },
    39: { loc: "Route 3", sec: 2 },
    40: { loc: "Cerulean Cave", sec: 7 },
    41: { loc: "Mt. Moon, Rock Tunnel...", sec: 2 },
    42: { loc: "Cerulean Cave, Seafoam Islands, Victory Road", sec: 7 },
    46: { loc: "Mt. Moon, Safari Zone", sec: 2 },
    47: { loc: "Safari Zone, Cerulean Cave", sec: 3 },
    48: { loc: "Route 12, Route 13...", sec: 3 },
    49: { loc: "Safari Zone, Cerulean Cave, Victory Road", sec: 3 },
    50: { loc: "Diglett's Cave", sec: 3 },
    51: { loc: "Diglett's Cave", sec: 3 },
    52: { loc: "Route 5, Route 6...", sec: 3 },
    54: { loc: "Seafoam Islands", sec: 7 },
    55: { loc: "Seafoam Islands", sec: 5 },
    63: { loc: "Route 24, Route 25", sec: 3 },
    64: { loc: "Cerulean Cave", sec: 7 },
    66: { loc: "Rock Tunnel, Victory Road", sec: 7 },
    67: { loc: "Victory Road", sec: 7 },
    69: { loc: "Route 12, Route 13...", sec: 3 },
    70: { loc: "Route 12, Route 13...", sec: 3 },
    72: { loc: "Route 21, Sea Routes (Surf)", sec: 4 },
    74: { loc: "Mt. Moon, Rock Tunnel, Victory Road", sec: 2 },
    75: { loc: "Victory Road", sec: 7 },
    77: { loc: "Pokémon Mansion", sec: 7 },
    79: { loc: "Seafoam Islands", sec: 7 },
    80: { loc: "Seafoam Islands", sec: 7 },
    81: { loc: "Power Plant", sec: 4 },
    82: { loc: "Power Plant, Cerulean Cave", sec: 4 },
    84: { loc: "Route 16, Route 17...", sec: 3 },
    85: { loc: "Cerulean Cave", sec: 7 },
    86: { loc: "Seafoam Islands", sec: 7 },
    87: { loc: "Seafoam Islands", sec: 5 },
    88: { loc: "Pokémon Mansion", sec: 7 },
    89: { loc: "Pokémon Mansion", sec: 7 },
    90: { loc: "Seafoam Islands", sec: 5 },
    92: { loc: "Pokémon Tower", sec: 7 },
    93: { loc: "Pokémon Tower", sec: 7 },
    95: { loc: "Rock Tunnel, Victory Road", sec: 7 },
    96: { loc: "Route 11", sec: 3 },
    97: { loc: "Cerulean Cave", sec: 7 },
    98: { loc: "Seafoam Islands", sec: 7 },
    99: { loc: "Seafoam Islands", sec: 5 },
    100: { loc: "Route 10, Power Plant", sec: 3 },
    101: { loc: "Cerulean Cave", sec: 7 },
    102: { loc: "Safari Zone", sec: 3 },
    104: { loc: "Pokémon Tower", sec: 7 },
    105: { loc: "Cerulean Cave, Victory Road", sec: 7 },
    109: { loc: "Pokémon Mansion", sec: 7 },
    110: { loc: "Pokémon Mansion", sec: 7 },
    111: { loc: "Safari Zone", sec: 3 },
    112: { loc: "Cerulean Cave", sec: 7 },
    113: { loc: "Safari Zone, Cerulean Cave", sec: 3 },
    114: { loc: "Route 21", sec: 4 },
    115: { loc: "Safari Zone", sec: 3 },
    120: { loc: "Seafoam Islands", sec: 7 },
    126: { loc: "Pokémon Mansion", sec: 7 },
    127: { loc: "Safari Zone", sec: 3 },
    128: { loc: "Safari Zone", sec: 3 },
    132: { loc: "Route 13, Route 14...", sec: 3 },
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
    133: { loc: "Goldenrod City (From Bill)", sec: 3 }, // Eevee
    185: { loc: "Route 36 (Static - Squirtbottle)", sec: 4 } // Sudowoodo
  },
  silver: {
    152: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Chikorita
    155: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Cyndaquil
    158: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 }, // Totodile
    175: { loc: "Violet City Pokémon Center (Egg)", sec: 1 }, // Togepi
    213: { loc: "Cianwood City (From Mania)", sec: 5 }, // Shuckle
    147: { loc: "Dragon's Den Shrine (Elder's Quiz)", sec: 8 }, // Dratini
    236: { loc: "Mt. Mortar B1F (From Kiyo)", sec: 8 }, // Tyrogue
    133: { loc: "Goldenrod City (From Bill)", sec: 3 }, // Eevee
    185: { loc: "Route 36 (Static - Squirtbottle)", sec: 4 } // Sudowoodo
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
    172: { loc: "Goldenrod Daycare (Odd Egg Gift)", sec: 3 }, // Pichu
    185: { loc: "Route 36 (Static - Squirtbottle)", sec: 4 } // Sudowoodo
  }
};

export const gen2Trades = {
  gold: {
    95: { loc: "Violet City", notes: "Trade Bellsprout -> Onix" }, // Onix
    66: { loc: "Goldenrod Dept. Store 5F", notes: "Trade Drowzee -> Machop" }, // Machop
    142: { loc: "Route 14 (Gate)", notes: "Trade Chansey -> Aerodactyl", sec: 7 } // Aerodactyl
  },
  silver: {
    95: { loc: "Violet City", notes: "Trade Bellsprout -> Onix" }, // Onix
    66: { loc: "Goldenrod Dept. Store 5F", notes: "Trade Drowzee -> Machop" }, // Machop
    142: { loc: "Route 14 (Gate)", notes: "Trade Chansey -> Aerodactyl", sec: 7 } // Aerodactyl
  },
  crystal: {
    95: { loc: "Violet City", notes: "Trade Bellsprout -> Onix" }, // Onix
    66: { loc: "Goldenrod Dept. Store 5F", notes: "Trade Drowzee -> Machop" }, // Machop
    142: { loc: "Route 14 (Gate)", notes: "Trade Chansey -> Aerodactyl", sec: 7 } // Aerodactyl
  }
};

export const gen2Wild = {
  gold: {
    10: { loc: "Route 30 & Route 31... (Morning/Day), Route 26 (Headbutt), Route 27 (Headbutt), Azalea Town (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Ilex Forest (Headbutt), Lake Of Rage (Headbutt)", sec: 1 },
    11: { loc: "Route 30 & Route 31... (Morning/Day), Route 26 (Headbutt), Route 27 (Headbutt), Azalea Town (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Route 47 (Headbutt), Ilex Forest (Headbutt), Lake Of Rage (Headbutt)", sec: 1 },
    12: { loc: "Route 2 (Morning), Route 26 (Headbutt), Route 27 (Headbutt), Azalea Town (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Route 47 (Headbutt), Ilex Forest (Headbutt), Lake Of Rage (Headbutt)", sec: 2 },
    16: { loc: "Route 29 & Route 30... (Morning/Day)", sec: 1 },
    17: { loc: "Route 37 & Route 43... (Morning/Day)", sec: 4 },
    19: { loc: "Sprout Tower & Route 29..., Route 38 (Swarm)", sec: 1 },
    20: { loc: "Burned Tower & Mt. Mortar..., Route 38 (Swarm)", sec: 4 },
    21: { loc: "Route 46 & Route 33...", sec: 1 },
    22: { loc: "Route 9 & Route 10 North... (Morning/Day)", sec: 9 },
    25: { loc: "Route 2", sec: 9 },
    27: { loc: "Union Cave & Mount Moon", sec: 2 },
    28: { loc: "Route 26 & Route 27 & Mount Moon", sec: 8 },
    29: { loc: "Route 35 & Route 36", sec: 3 },
    30: { loc: "Route 13 & Route 14 & Route 15", sec: 9 },
    32: { loc: "Route 35 & Route 36", sec: 3 },
    33: { loc: "Route 13 & Route 14 & Route 15", sec: 9 },
    35: { loc: "Mount Moon", sec: 9 },
    39: { loc: "Route 46 & Route 3 & Route 4", sec: 1 },
    41: { loc: "Dark Cave & Union Cave...", sec: 1 },
    42: { loc: "Slowpoke Well & Mt. Mortar...", sec: 2 },
    43: { loc: "Ilex Forest & Route 5... (Night)", sec: 2 },
    44: { loc: "Route 5 (Night)", sec: 9 },
    46: { loc: "Ilex Forest & Mount Moon", sec: 2 },
    48: { loc: "Route 43 & Route 24 & Route 25", sec: 4 },
    49: { loc: "Route 24 & Route 25 (Night)", sec: 9 },
    50: { loc: "Digletts Cave", sec: 9 },
    51: { loc: "Digletts Cave", sec: 9 },
    54: { loc: "Ilex Forest & Route 35 & Route 6 (Surf)", sec: 2 },
    55: { loc: "Ilex Forest & Route 35...", sec: 2 },
    56: { loc: "Route 42 & Route 9", sec: 4 },
    57: { loc: "Route 9", sec: 9 },
    58: { loc: "Route 36 & Route 37...", sec: 3 },
    60: { loc: "Route 30 & Route 31... (Surf)", sec: 1 },
    61: { loc: "Route 30 & Route 31... (Surf)", sec: 1 },
    63: { loc: "Route 34 & Route 35...", sec: 3 },
    64: { loc: "Route 8", sec: 9 },
    66: { loc: "Mt. Mortar & Rock Tunnel", sec: 4 },
    67: { loc: "Mt. Mortar & Rock Tunnel", sec: 4 },
    69: { loc: "Route 31 & Route 32...", sec: 1 },
    70: { loc: "Route 44 & Route 24 & Route 25", sec: 7 },
    72: { loc: "New Bark Town & Cherrygrove City... (Surf)", sec: 1 },
    73: { loc: "New Bark Town & Cherrygrove City... (Surf)", sec: 1 },
    74: { loc: "Dark Cave & Route 46...", sec: 1 },
    75: { loc: "Mt. Mortar & Dark Cave...", sec: 4 },
    77: { loc: "Route 26 & Route 27...", sec: 8 },
    78: { loc: "Mt. Silver & Route 28", sec: 10 },
    79: { loc: "Slowpoke Well & Tohjo Falls", sec: 2 },
    80: { loc: "Slowpoke Well (Surf)", sec: 2 },
    81: { loc: "Route 38 & Route 39...", sec: 4 },
    83: { loc: "Route 38 & Route 39 (Morning/Day)", sec: 4 },
    84: { loc: "Route 26 & Route 27... (Morning/Day)", sec: 8 },
    85: { loc: "Route 26 & Mt. Silver & Route 28 (Morning/Day)", sec: 8 },
    86: { loc: "Whirl Islands", sec: 6 },
    88: { loc: "Route 16 & Route 17...", sec: 9 },
    89: { loc: "Route 16 & Route 17...", sec: 9 },
    92: { loc: "Sprout Tower & Tin Tower (Night)", sec: 1 },
    93: { loc: "Route 8 (Night)", sec: 9 },
    95: { loc: "Union Cave & Victory Road...", sec: 2 },
    96: { loc: "Route 34 & Route 35 & Route 11", sec: 3 },
    97: { loc: "Route 11", sec: 9 },
    98: { loc: "Whirl Islands", sec: 6 },
    100: { loc: "Route 10 North", sec: 9 },
    104: { loc: "Rock Tunnel", sec: 9 },
    105: { loc: "Rock Tunnel", sec: 9 },
    108: { loc: "Route 44", sec: 7 },
    109: { loc: "Burned Tower", sec: 4 },
    111: { loc: "Victory Road", sec: 8 },
    113: { loc: "Route 13 & Route 14 & Route 15", sec: 9 },
    114: { loc: "Route 44 & Route 21...", sec: 7 },
    115: { loc: "Rock Tunnel", sec: 9 },
    116: { loc: "Whirl Islands (Surf)", sec: 6 },
    117: { loc: "Whirl Islands (Surf)", sec: 6 },
    118: { loc: "Mt. Mortar & Route 42... (Surf)", sec: 4 },
    119: { loc: "Mt. Mortar & Route 42... (Surf)", sec: 4 },
    122: { loc: "Route 21", sec: 9 },
    124: { loc: "Ice Path", sec: 7 },
    125: { loc: "Route 10 North", sec: 9 },
    126: { loc: "Burned Tower", sec: 4 },
    128: { loc: "Route 38 & Route 39", sec: 4 },
    129: { loc: "Dark Cave & Route 43... (Surf)", sec: 1 },
    130: { loc: "Lake Of Rage (Surf)", sec: 4 },
    132: { loc: "Route 34 & Route 35", sec: 3 },
    147: { loc: "Dragon's Den (Surf)", sec: 7 },
    161: { loc: "Route 29 & Route 1 (Morning/Day)", sec: 1 },
    162: { loc: "Route 1 (Morning/Day)", sec: 9 },
    163: { loc: "Route 29 & Route 30... (Night)", sec: 1 },
    164: { loc: "Route 43 & Route 2... (Night)", sec: 4 },
    167: { loc: "Route 30 & Route 31... (Night), Route 01 (Headbutt), Route 02  Northern Section (Headbutt), Route 02  Southern Section (Headbutt), Route 12 (Headbutt), Route 13 (Headbutt), Route 14 (Headbutt), Route 15 (Headbutt), Route 18 (Headbutt), Route 21 (Headbutt), Route 22 (Headbutt), Route 26 (Headbutt), Route 27 (Headbutt), Pallet Town (Headbutt), Viridian City (Headbutt), Fuchsia City (Headbutt), Viridian Forest (Headbutt), New Bark Town (Headbutt), Cherrygrove City (Headbutt), Ecruteak City (Headbutt), Safari Zone Gate (Headbutt), Route 29 (Headbutt), Route 30 (Headbutt), Route 31 (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Route 47 (Headbutt), Route 48 (Headbutt), National Park (Headbutt)", sec: 1 },
    168: { loc: "Route 2 (Night), Viridian Forest (Headbutt)", sec: 9 },
    177: { loc: "Ruins of Alph", sec: 2 },
    179: { loc: "Route 32 & Route 42 & Route 43", sec: 2 },
    180: { loc: "Route 42 & Route 43", sec: 4 },
    183: { loc: "Mt. Mortar", sec: 4 },
    187: { loc: "Route 32 & Route 33... (Morning/Day)", sec: 2 },
    188: { loc: "Route 14 (Morning/Day)", sec: 9 },
    191: { loc: "National Park & Route 24", sec: 3 },
    193: { loc: "Route 35", sec: 3 },
    194: { loc: "Route 32 & Ruins of Alph & Union Cave", sec: 2 },
    195: { loc: "Ruins of Alph & Union Cave...", sec: 2 },
    198: { loc: "Route 7 & Route 16 (Night)", sec: 9 },
    200: { loc: "Mt. Silver (Night)", sec: 10 },
    201: { loc: "Ruins of Alph", sec: 5 },
    202: { loc: "Dark Cave", sec: 7 },
    203: { loc: "Route 43", sec: 4 },
    206: { loc: "Dark Cave", sec: 1 },
    207: { loc: "Route 45", sec: 7 },
    209: { loc: "Route 38", sec: 4 },
    215: { loc: "Mt. Silver & Route 28 (Night)", sec: 10 },
    216: { loc: "Route 45", sec: 7 },
    217: { loc: "Victory Road & Mt. Silver & Route 28", sec: 8 },
    218: { loc: "Route 16 & Route 17 & Route 18", sec: 9 },
    220: { loc: "Ice Path", sec: 7 },
    226: { loc: "Route 41 (Surf)", sec: 5 },
    228: { loc: "Route 7 (Night)", sec: 9 },
    234: { loc: "Route 36 & Route 37", sec: 3 },
    235: { loc: "Ruins of Alph", sec: 2 },
    241: { loc: "Route 38 & Route 39", sec: 4 },
    246: { loc: "Mt. Silver", sec: 10 },
  },
  silver: {
    13: { loc: "Route 30 & Route 31... (Morning/Day), Route 26 (Headbutt), Route 27 (Headbutt), Azalea Town (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Ilex Forest (Headbutt), Lake Of Rage (Headbutt)", sec: 1 },
    14: { loc: "Route 30 & Route 31... (Morning/Day), Route 26 (Headbutt), Route 27 (Headbutt), Azalea Town (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Route 47 (Headbutt), Ilex Forest (Headbutt), Lake Of Rage (Headbutt)", sec: 1 },
    15: { loc: "Route 2 (Morning), Route 26 (Headbutt), Route 27 (Headbutt), Azalea Town (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Route 47 (Headbutt), Ilex Forest (Headbutt), Lake Of Rage (Headbutt)", sec: 2 },
    16: { loc: "Route 29 & Route 30... (Morning/Day)", sec: 1 },
    17: { loc: "Route 37 & Route 43... (Morning/Day)", sec: 4 },
    19: { loc: "Sprout Tower & Route 29...", sec: 1 },
    20: { loc: "Burned Tower & Mt. Mortar...", sec: 4 },
    21: { loc: "Route 46 & Route 33... (Morning/Day)", sec: 1 },
    22: { loc: "Route 9 & Route 10 North... (Morning/Day)", sec: 9 },
    23: { loc: "Route 32 & Route 33...", sec: 2 },
    24: { loc: "Route 26 & Route 27...", sec: 8 },
    25: { loc: "Route 2", sec: 9 },
    29: { loc: "Route 35 & Route 36", sec: 3 },
    30: { loc: "Route 13 & Route 14 & Route 15", sec: 9 },
    32: { loc: "Route 35 & Route 36", sec: 3 },
    33: { loc: "Route 13 & Route 14 & Route 15", sec: 9 },
    35: { loc: "Mount Moon", sec: 9 },
    37: { loc: "Route 36 & Route 37...", sec: 3 },
    39: { loc: "Route 46 & Route 3 & Route 4", sec: 1 },
    41: { loc: "Dark Cave & Union Cave...", sec: 1 },
    42: { loc: "Slowpoke Well & Mt. Mortar...", sec: 2 },
    43: { loc: "Ilex Forest & Route 5... (Night)", sec: 2 },
    44: { loc: "Route 5 (Night)", sec: 9 },
    46: { loc: "Ilex Forest & Mount Moon", sec: 2 },
    48: { loc: "Route 43 & Route 24 & Route 25", sec: 4 },
    49: { loc: "Route 24 & Route 25 (Night)", sec: 9 },
    50: { loc: "Digletts Cave", sec: 9 },
    51: { loc: "Digletts Cave", sec: 9 },
    52: { loc: "Route 38 & Route 39..., Route 38 (Swarm)", sec: 4 },
    53: { loc: "Route 7", sec: 9 },
    54: { loc: "Ilex Forest & Route 35 & Route 6 (Surf)", sec: 2 },
    55: { loc: "Ilex Forest & Route 35...", sec: 2 },
    60: { loc: "Route 30 & Route 31... (Surf)", sec: 1 },
    61: { loc: "Route 30 & Route 31... (Surf)", sec: 1 },
    63: { loc: "Route 34 & Route 35...", sec: 3 },
    64: { loc: "Route 8", sec: 9 },
    66: { loc: "Mt. Mortar & Rock Tunnel", sec: 4 },
    67: { loc: "Mt. Mortar & Rock Tunnel", sec: 4 },
    69: { loc: "Route 31 & Route 32...", sec: 1 },
    70: { loc: "Route 44 & Route 24 & Route 25", sec: 7 },
    72: { loc: "New Bark Town & Cherrygrove City... (Surf)", sec: 1 },
    73: { loc: "New Bark Town & Cherrygrove City... (Surf)", sec: 1 },
    74: { loc: "Dark Cave & Route 46...", sec: 1 },
    75: { loc: "Mt. Mortar & Dark Cave...", sec: 4 },
    77: { loc: "Route 26 & Route 27...", sec: 8 },
    78: { loc: "Mt. Silver & Route 28", sec: 10 },
    79: { loc: "Slowpoke Well & Tohjo Falls", sec: 2 },
    80: { loc: "Slowpoke Well (Surf)", sec: 2 },
    81: { loc: "Route 38 & Route 39...", sec: 4 },
    83: { loc: "Route 38 & Route 39 (Morning/Day)", sec: 4 },
    84: { loc: "Route 26 & Route 27... (Morning/Day)", sec: 8 },
    85: { loc: "Route 27 & Mt. Silver & Route 28 (Morning/Day)", sec: 8 },
    86: { loc: "Whirl Islands", sec: 6 },
    88: { loc: "Route 16 & Route 17...", sec: 9 },
    89: { loc: "Route 16 & Route 17...", sec: 9 },
    92: { loc: "Sprout Tower & Tin Tower (Night)", sec: 1 },
    93: { loc: "Route 8 (Night)", sec: 9 },
    95: { loc: "Union Cave & Victory Road...", sec: 2 },
    96: { loc: "Route 34 & Route 35 & Route 11", sec: 3 },
    97: { loc: "Route 11", sec: 9 },
    98: { loc: "Whirl Islands", sec: 6 },
    100: { loc: "Route 10 North", sec: 9 },
    104: { loc: "Rock Tunnel", sec: 9 },
    105: { loc: "Rock Tunnel", sec: 9 },
    108: { loc: "Route 44", sec: 7 },
    109: { loc: "Burned Tower", sec: 4 },
    111: { loc: "Victory Road", sec: 8 },
    113: { loc: "Route 13 & Route 14 & Route 15", sec: 9 },
    114: { loc: "Route 44 & Route 21...", sec: 7 },
    115: { loc: "Rock Tunnel", sec: 9 },
    116: { loc: "Whirl Islands (Surf)", sec: 6 },
    117: { loc: "Whirl Islands (Surf)", sec: 6 },
    118: { loc: "Mt. Mortar & Route 42... (Surf)", sec: 4 },
    119: { loc: "Mt. Mortar & Route 42... (Surf)", sec: 4 },
    122: { loc: "Route 21", sec: 9 },
    124: { loc: "Ice Path", sec: 7 },
    125: { loc: "Route 10 North", sec: 9 },
    126: { loc: "Burned Tower", sec: 4 },
    128: { loc: "Route 38 & Route 39", sec: 4 },
    129: { loc: "Dark Cave & Route 43... (Surf)", sec: 1 },
    130: { loc: "Lake Of Rage (Surf)", sec: 4 },
    132: { loc: "Route 34 & Route 35", sec: 3 },
    147: { loc: "Dragon's Den (Surf)", sec: 7 },
    161: { loc: "Route 29 & Route 1 (Morning/Day)", sec: 1 },
    162: { loc: "Route 1 (Morning/Day)", sec: 9 },
    163: { loc: "Route 29 & Route 30... (Night)", sec: 1 },
    164: { loc: "Route 43 & Route 2... (Night)", sec: 4 },
    165: { loc: "Route 30 & Route 31... (Morning), Route 01 (Headbutt), Route 02  Northern Section (Headbutt), Route 02  Southern Section (Headbutt), Route 12 (Headbutt), Route 13 (Headbutt), Route 14 (Headbutt), Route 15 (Headbutt), Route 18 (Headbutt), Route 21 (Headbutt), Route 22 (Headbutt), Route 26 (Headbutt), Route 27 (Headbutt), Pallet Town (Headbutt), Viridian City (Headbutt), Fuchsia City (Headbutt), Viridian Forest (Headbutt), New Bark Town (Headbutt), Cherrygrove City (Headbutt), Ecruteak City (Headbutt), Safari Zone Gate (Headbutt), Route 29 (Headbutt), Route 30 (Headbutt), Route 31 (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Route 47 (Headbutt), Route 48 (Headbutt), National Park (Headbutt)", sec: 1 },
    166: { loc: "Route 2 (Morning), Viridian Forest (Headbutt)", sec: 9 },
    177: { loc: "Ruins of Alph", sec: 2 },
    179: { loc: "Route 32 & Route 42 & Route 43", sec: 2 },
    180: { loc: "Route 42 & Route 43", sec: 4 },
    183: { loc: "Mt. Mortar", sec: 4 },
    187: { loc: "Route 32 & Route 33... (Morning/Day)", sec: 2 },
    188: { loc: "Route 14 (Morning/Day)", sec: 9 },
    191: { loc: "National Park & Route 24", sec: 3 },
    193: { loc: "Route 35", sec: 3 },
    194: { loc: "Route 32 & Ruins of Alph & Union Cave", sec: 2 },
    195: { loc: "Ruins of Alph & Union Cave...", sec: 2 },
    198: { loc: "Route 7 & Route 16 (Night)", sec: 9 },
    200: { loc: "Mt. Silver (Night)", sec: 10 },
    201: { loc: "Ruins of Alph", sec: 5 },
    202: { loc: "Dark Cave", sec: 7 },
    203: { loc: "Route 43", sec: 4 },
    206: { loc: "Dark Cave", sec: 1 },
    209: { loc: "Route 38", sec: 4 },
    215: { loc: "Mt. Silver & Route 28 (Night)", sec: 10 },
    218: { loc: "Route 16 & Route 17 & Route 18", sec: 9 },
    220: { loc: "Ice Path", sec: 7 },
    225: { loc: "Ice Path", sec: 7 },
    227: { loc: "Route 45", sec: 7 },
    228: { loc: "Route 7 (Night)", sec: 9 },
    231: { loc: "Route 45", sec: 7 },
    232: { loc: "Victory Road & Mt. Silver & Route 28", sec: 8 },
    234: { loc: "Route 36 & Route 37", sec: 3 },
    235: { loc: "Ruins of Alph", sec: 2 },
    241: { loc: "Route 38 & Route 39", sec: 4 },
    246: { loc: "Mt. Silver", sec: 10 },
  },
  crystal: {
    10: { loc: "Route 30 & Route 31... (Morning/Day), Ilex Forest (Headbutt)", sec: 1 },
    11: { loc: "Ilex Forest & Route 24 & Route 25 (Morning/Day), Ilex Forest (Headbutt)", sec: 2 },
    12: { loc: "Route 2 & Route 24 & Route 25 (Morning/Day)", sec: 9 },
    13: { loc: "Route 30 & Route 31... (Morning/Day), Ilex Forest (Headbutt)", sec: 1 },
    14: { loc: "Ilex Forest (Morning/Day), Ilex Forest (Headbutt)", sec: 2 },
    16: { loc: "Route 29 & Route 30... (Morning/Day)", sec: 1 },
    17: { loc: "Route 37 & Route 38... (Morning/Day)", sec: 4 },
    19: { loc: "Sprout Tower & Route 29...", sec: 1 },
    20: { loc: "Burned Tower & Mt. Mortar...", sec: 4 },
    21: { loc: "Route 46 & Route 33... (Morning/Day), Azalea Town (Headbutt), Route 33 (Headbutt), Route 42 (Headbutt)", sec: 1 },
    22: { loc: "Route 42 & Route 9... (Morning/Day)", sec: 4 },
    23: { loc: "Route 32 & Route 33... (Morning/Day), Route 26 (Headbutt), Route 27 (Headbutt), Azalea Town (Headbutt), Route 32 (Headbutt), Route 33 (Headbutt), Route 42 (Headbutt)", sec: 1 },
    24: { loc: "Route 42 & Route 26... (Morning/Day)", sec: 4 },
    25: { loc: "Route 2 (Morning/Day)", sec: 9 },
    27: { loc: "Union Cave & Mount Moon... (Morning/Day)", sec: 2 },
    28: { loc: "Victory Road & Route 26 (Morning/Day)", sec: 8 },
    29: { loc: "National Park (Morning/Day)", sec: 3 },
    30: { loc: "Route 13 & Route 14 & Route 15 (Morning/Day)", sec: 9 },
    32: { loc: "National Park (Morning/Day)", sec: 3 },
    33: { loc: "Route 13 & Route 14 & Route 15 (Morning/Day)", sec: 9 },
    35: { loc: "Mount Moon & Route 3 & Route 4", sec: 9 },
    39: { loc: "Route 34 & Route 35...", sec: 3 },
    41: { loc: "Dark Cave & Route 30...", sec: 1 },
    42: { loc: "Slowpoke Well & Mt. Mortar...", sec: 2 },
    43: { loc: "Ilex Forest & Route 24 & Route 25 (Night)", sec: 2 },
    44: { loc: "Route 24 (Night)", sec: 9 },
    46: { loc: "Ilex Forest & Mount Moon", sec: 2 },
    47: { loc: "Mt. Silver", sec: 10 },
    48: { loc: "Ilex Forest & National Park... (Night), Route 43 (Headbutt), Lake Of Rage (Headbutt)", sec: 2 },
    49: { loc: "Route 43 & Route 9... (Night)", sec: 4 },
    50: { loc: "Digletts Cave", sec: 9 },
    51: { loc: "Digletts Cave", sec: 9 },
    52: { loc: "Route 38 & Route 39... (Night)", sec: 4 },
    53: { loc: "Route 7 (Night)", sec: 9 },
    54: { loc: "Ilex Forest & National Park...", sec: 2 },
    55: { loc: "Ilex Forest & Route 35...", sec: 2 },
    58: { loc: "Route 35 & Route 36... (Morning/Day)", sec: 3 },
    60: { loc: "Route 30 & Route 31..., Route 44 (Super Rod)", sec: 1 },
    61: { loc: "Route 30 & Route 31...", sec: 1 },
    63: { loc: "Route 34 & Route 35...", sec: 3 },
    64: { loc: "Route 8", sec: 9 },
    66: { loc: "Mt. Mortar & Rock Tunnel (Morning/Day)", sec: 4 },
    67: { loc: "Mt. Mortar & Rock Tunnel & Mt. Silver (Morning/Day)", sec: 4 },
    69: { loc: "Route 31 & Route 32...", sec: 1 },
    70: { loc: "Route 44", sec: 7 },
    72: { loc: "New Bark Town & Cherrygrove City... (Surf)", sec: 1 },
    73: { loc: "New Bark Town & Cherrygrove City... (Surf)", sec: 1 },
    74: { loc: "Dark Cave & Route 46...", sec: 1 },
    75: { loc: "Mt. Mortar & Dark Cave...", sec: 4 },
    77: { loc: "Route 26 & Route 27... (Morning/Day)", sec: 8 },
    78: { loc: "Mt. Silver & Route 28 (Morning/Day)", sec: 10 },
    79: { loc: "Slowpoke Well & Tohjo Falls", sec: 2 },
    80: { loc: "Slowpoke Well (Surf)", sec: 2 },
    81: { loc: "Route 38 & Route 39...", sec: 4 },
    82: { loc: "Power Plant (Trade)", sec: 10 },
    83: { loc: "Route 43 (Morning/Day)", sec: 4 },
    84: { loc: "Route 26 & Route 27... (Morning/Day)", sec: 8 },
    85: { loc: "Route 27 & Mt. Silver & Route 28 (Morning/Day), Blackthorn City (Trade)", sec: 7 },
    86: { loc: "Whirl Islands (Morning/Day)", sec: 6 },
    88: { loc: "Route 16 & Route 17...", sec: 9 },
    89: { loc: "Route 16 & Route 17...", sec: 9 },
    92: { loc: "Sprout Tower & Route 31... (Night)", sec: 1 },
    93: { loc: "Rock Tunnel & Route 8 (Night)", sec: 9 },
    95: { loc: "Union Cave & Victory Road...", sec: 2 },
    96: { loc: "Route 34 & Route 35... (Night)", sec: 3 },
    97: { loc: "Route 11 (Night)", sec: 9 },
    98: { loc: "Whirl Islands", sec: 6 },
    100: { loc: "Route 10 North", sec: 9 },
    102: { loc: "Route 26 (Headbutt), Route 27 (Headbutt), Route 29 (Headbutt), Route 30 (Headbutt), Route 31 (Headbutt), Route 32 (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Route 43 (Headbutt), Lake Of Rage (Headbutt)", sec: 1 },
    104: { loc: "Rock Tunnel (Morning/Day)", sec: 9 },
    105: { loc: "Rock Tunnel & Route 9 & Route 10 North (Morning/Day)", sec: 9 },
    108: { loc: "Route 44 (Morning/Day)", sec: 7 },
    109: { loc: "Burned Tower", sec: 4 },
    110: { loc: "Burned Tower", sec: 4 },
    111: { loc: "Victory Road (Morning/Day)", sec: 8 },
    112: { loc: "Victory Road (Morning/Day)", sec: 8 },
    113: { loc: "Route 13 & Route 14 & Route 15", sec: 9 },
    114: { loc: "Route 44 & Route 21...", sec: 7 },
    115: { loc: "Rock Tunnel (Morning/Day)", sec: 9 },
    116: { loc: "Whirl Islands (Surf)", sec: 6 },
    117: { loc: "Whirl Islands (Surf)", sec: 6 },
    118: { loc: "Mt. Mortar & Route 42... (Surf)", sec: 4 },
    119: { loc: "Mt. Mortar & Route 42... (Surf)", sec: 4 },
    122: { loc: "Route 21 (Morning/Day)", sec: 9 },
    124: { loc: "Ice Path (Morning/Day)", sec: 7 },
    125: { loc: "Route 10 North", sec: 9 },
    126: { loc: "Mt. Silver (Morning/Day)", sec: 10 },
    128: { loc: "Route 38 & Route 39 (Morning/Day)", sec: 4 },
    129: { loc: "Dark Cave & Route 43... (Surf)", sec: 1 },
    130: { loc: "Lake Of Rage (Surf)", sec: 4 },
    132: { loc: "Route 34 & Route 35", sec: 3 },
    147: { loc: "Dragon's Den (Surf), Dragons Den (Gift)", sec: 6 },
    161: { loc: "Route 29 & Route 43 & Route 1 (Morning/Day)", sec: 1 },
    162: { loc: "Route 43 & Route 1 (Morning/Day)", sec: 4 },
    163: { loc: "Route 29 & Route 30... (Night), Route 26 (Headbutt), Route 27 (Headbutt), Route 29 (Headbutt), Route 30 (Headbutt), Route 31 (Headbutt), Route 32 (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt), Route 43 (Headbutt), Ilex Forest (Headbutt), Lake Of Rage (Headbutt)", sec: 1 },
    164: { loc: "Route 37 & Route 38... (Night), Ilex Forest (Headbutt)", sec: 2 },
    165: { loc: "Route 30 & Route 31... (Morning), Route 29 (Headbutt), Route 30 (Headbutt), Route 31 (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt)", sec: 1 },
    166: { loc: "Route 37 & Route 2 (Morning)", sec: 4 },
    167: { loc: "Route 30 & Route 31... (Night), Route 29 (Headbutt), Route 30 (Headbutt), Route 31 (Headbutt), Route 34 (Headbutt), Route 35 (Headbutt), Route 36 (Headbutt), Route 37 (Headbutt), Route 38 (Headbutt), Route 39 (Headbutt)", sec: 1 },
    168: { loc: "Route 37 & Route 2 (Night)", sec: 4 },
    177: { loc: "Ruins of Alph", sec: 2 },
    178: { loc: "Pewter City (Trade)", sec: 8 },
    183: { loc: "Mt. Mortar & Route 42", sec: 4 },
    187: { loc: "Route 29 & Route 30... (Morning/Day)", sec: 1 },
    188: { loc: "Route 14 (Morning/Day)", sec: 9 },
    190: { loc: "Azalea Town (Headbutt)", sec: 2 },
    191: { loc: "National Park & Route 24", sec: 3 },
    193: { loc: "Route 35", sec: 3 },
    194: { loc: "Ruins of Alph & Union Cave & Route 32", sec: 2 },
    195: { loc: "Ruins of Alph & Union Cave...", sec: 2 },
    198: { loc: "Route 7 & Route 16 (Night)", sec: 9 },
    200: { loc: "Mt. Silver (Night)", sec: 10 },
    201: { loc: "Ruins of Alph", sec: 5 },
    202: { loc: "Dark Cave (Night)", sec: 7 },
    204: { loc: "Route 29 (Headbutt), Route 30 (Headbutt), Route 31 (Headbutt), Route 32 (Headbutt), Route 43 (Headbutt), Ilex Forest (Headbutt)", sec: 1 },
    206: { loc: "Dark Cave", sec: 1 },
    207: { loc: "Route 45", sec: 7 },
    209: { loc: "Route 34 & Route 35... (Morning/Day)", sec: 3 },
    210: { loc: "Route 6 (Morning/Day)", sec: 9 },
    214: { loc: "Azalea Town (Headbutt)", sec: 2 },
    215: { loc: "Ice Path (Night)", sec: 7 },
    216: { loc: "Dark Cave (Morning)", sec: 1 },
    217: { loc: "Dark Cave & Mt. Silver (Morning/Day)", sec: 7 },
    218: { loc: "Route 16 & Route 17 & Route 18", sec: 9 },
    220: { loc: "Ice Path (Morning/Day)", sec: 7 },
    225: { loc: "Ice Path (Night)", sec: 7 },
    226: { loc: "Route 41 (Surf)", sec: 5 },
    227: { loc: "Route 45 (Morning/Day)", sec: 7 },
    228: { loc: "Route 7 (Night)", sec: 9 },
    231: { loc: "Route 46 & Route 45 (Morning)", sec: 1 },
    232: { loc: "Route 45 (Morning/Day)", sec: 7 },
    234: { loc: "Route 37 (Night)", sec: 4 },
    235: { loc: "Ruins of Alph (Morning/Day)", sec: 2 },
    241: { loc: "Route 38 & Route 39 (Morning/Day)", sec: 4 },
    246: { loc: "Mt. Silver (Morning/Day)", sec: 10 },
    247: { loc: "Mt. Silver (Morning/Day)", sec: 10 },
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
    374: { loc: "Mossdeep City (Steven's House Post-Game)", sec: 9 } // Beldum
  },
  sapphire: {
    252: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Treecko
    255: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Torchic
    258: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Mudkip
    345: { loc: "Rustboro City (Devon Corp - Root Fossil)", sec: 5 }, // Lileep
    347: { loc: "Rustboro City (Devon Corp - Claw Fossil)", sec: 5 }, // Anorith
    360: { loc: "Lavaridge Town (Egg)", sec: 7 }, // Wynaut
    351: { loc: "Weather Institute (From Scientist)", sec: 6 }, // Castform
    374: { loc: "Mossdeep City (Steven's House Post-Game)", sec: 9 } // Beldum
  },
  emerald: {
    252: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Treecko
    255: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Torchic
    258: { loc: "Route 101 (Starter Choice)", sec: 1 }, // Mudkip
    345: { loc: "Rustboro City (Devon Corp - Root Fossil)", sec: 5 }, // Lileep
    347: { loc: "Rustboro City (Devon Corp - Claw Fossil)", sec: 5 }, // Anorith
    360: { loc: "Lavaridge Town (Egg)", sec: 7 }, // Wynaut
    351: { loc: "Weather Institute (From Scientist)", sec: 6 }, // Castform
    374: { loc: "Mossdeep City (Steven's House Post-Game)", sec: 9 }, // Beldum
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
    145: { loc: "Power Plant (Static)", sec: 4 }, // Zapdos
    146: { loc: "Mt. Ember Summit (Static)", sec: 6 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 7 }, // Mewtwo
    175: { loc: "Water Labyrinth (From Gentleman)", sec: 7 } // Togepi
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
    145: { loc: "Power Plant (Static)", sec: 4 }, // Zapdos
    146: { loc: "Mt. Ember Summit (Static)", sec: 6 }, // Moltres
    150: { loc: "Cerulean Cave (Static)", sec: 7 }, // Mewtwo
    175: { loc: "Water Labyrinth (From Gentleman)", sec: 7 } // Togepi
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
    25: { loc: "Safari Zone", sec: 5 },
    27: { loc: "Route111, Route113", sec: 9 },
    37: { loc: "Mt. Pyre", sec: 5 },
    39: { loc: "Route115", sec: 9 },
    41: { loc: "Granite Cave, Meteor Falls...", sec: 2 },
    42: { loc: "Meteor Falls, Shoal Cave...", sec: 3 },
    43: { loc: "Safari Zone, Route110...", sec: 5 },
    44: { loc: "Safari Zone, Route121, Route123", sec: 5 },
    54: { loc: "Safari Zone (Surf)", sec: 5 },
    55: { loc: "Safari Zone (Surf)", sec: 5 },
    63: { loc: "Granite Cave", sec: 2 },
    66: { loc: "Jagged Pass, Fiery Path, Route112", sec: 3 },
    72: { loc: "Shoal Cave, Seafloor Cavern... (Surf), Team Magma Hideout (Old Rod), Team Magma Hideout (Good Rod)", sec: 5 },
    73: { loc: "Abandoned Ship Rooms, Abandoned Ship Hidden Floor Corridors (Surf)", sec: 9 },
    74: { loc: "Granite Cave, Safari Zone...", sec: 2 },
    75: { loc: "Victory Road (Rock Smash)", sec: 8 },
    81: { loc: "New Mauville Entrance, New Mauville Inside", sec: 9 },
    82: { loc: "New Mauville Inside", sec: 9 },
    84: { loc: "Safari Zone", sec: 5 },
    85: { loc: "Safari Zone", sec: 5 },
    88: { loc: "Fiery Path", sec: 3 },
    100: { loc: "New Mauville Entrance, New Mauville Inside", sec: 9 },
    101: { loc: "New Mauville Inside", sec: 9 },
    109: { loc: "Fiery Path", sec: 3 },
    111: { loc: "Safari Zone", sec: 5 },
    116: { loc: "Route132, Route133, Route134 (Fish)", sec: 9 },
    118: { loc: "Meteor Falls, Safari Zone... (Fish)", sec: 3 },
    119: { loc: "Safari Zone (Fish)", sec: 5 },
    120: { loc: "Lilycove City (Fish), Team Magma Hideout (Super Rod)", sec: 9 },
    127: { loc: "Safari Zone", sec: 5 },
    129: { loc: "Meteor Falls, Shoal Cave... (Surf), Team Magma Hideout (Old Rod), Team Magma Hideout (Good Rod)", sec: 3 },
    130: { loc: "Sootopolis City (Fish)", sec: 9 },
    170: { loc: "Underwater1, Underwater2 (Surf)", sec: 9 },
    177: { loc: "Safari Zone", sec: 5 },
    178: { loc: "Safari Zone", sec: 5 },
    183: { loc: "Petalburg City, Route102...", sec: 9 },
    202: { loc: "Safari Zone", sec: 5 },
    203: { loc: "Safari Zone", sec: 5 },
    214: { loc: "Safari Zone", sec: 5 },
    218: { loc: "Fiery Path", sec: 3 },
    222: { loc: "Ever Grande City, Route128 (Fish)", sec: 8 },
    227: { loc: "Route113", sec: 9 },
    231: { loc: "Safari Zone", sec: 5 },
    261: { loc: "Route101, Route102, Route103", sec: 9 },
    263: { loc: "Petalburg Woods, Route101...", sec: 1 },
    264: { loc: "Route118, Route119...", sec: 9 },
    265: { loc: "Petalburg Woods, Route101...", sec: 1 },
    266: { loc: "Petalburg Woods", sec: 1 },
    268: { loc: "Petalburg Woods", sec: 1 },
    273: { loc: "Route102, Route114", sec: 9 },
    274: { loc: "Route114", sec: 9 },
    276: { loc: "Petalburg Woods, Route104...", sec: 1 },
    277: { loc: "Route115", sec: 9 },
    278: { loc: "Mt. Pyre, Ever Grande City...", sec: 5 },
    279: { loc: "Ever Grande City, Slateport City... (Surf)", sec: 8 },
    280: { loc: "Route102", sec: 9 },
    283: { loc: "Route102, Route111...", sec: 9 },
    285: { loc: "Petalburg Woods", sec: 1 },
    287: { loc: "Petalburg Woods", sec: 1 },
    290: { loc: "Route116", sec: 9 },
    293: { loc: "Rusturf Tunnel, Victory Road, Route116", sec: 1 },
    294: { loc: "Victory Road", sec: 8 },
    296: { loc: "Granite Cave, Victory Road", sec: 2 },
    297: { loc: "Victory Road", sec: 8 },
    299: { loc: "Granite Cave (Rock Smash)", sec: 2 },
    300: { loc: "Route116", sec: 9 },
    303: { loc: "Granite Cave, Cave Of Origin...", sec: 2 },
    304: { loc: "Granite Cave, Victory Road", sec: 2 },
    305: { loc: "Victory Road", sec: 8 },
    307: { loc: "Mt. Pyre, Victory Road", sec: 5 },
    308: { loc: "Victory Road", sec: 8 },
    309: { loc: "Route110, Route118", sec: 9 },
    310: { loc: "Route118", sec: 9 },
    311: { loc: "Route110", sec: 9 },
    312: { loc: "Route110", sec: 9 },
    313: { loc: "Route117", sec: 9 },
    314: { loc: "Route117", sec: 9 },
    315: { loc: "Route117", sec: 9 },
    316: { loc: "Route110", sec: 9 },
    318: { loc: "Route118, Route119 (Fish)", sec: 9 },
    319: { loc: "Mossdeep City, Route103... (Fish)", sec: 9 },
    320: { loc: "Shoal Cave, Seafloor Cavern... (Fish)", sec: 5 },
    321: { loc: "Route129 (Surf)", sec: 9 },
    322: { loc: "Jagged Pass, Fiery Path, Route112", sec: 3 },
    324: { loc: "Fiery Path", sec: 3 },
    325: { loc: "Jagged Pass", sec: 3 },
    327: { loc: "Route113", sec: 9 },
    328: { loc: "Route111", sec: 9 },
    331: { loc: "Route111", sec: 9 },
    333: { loc: "Route114, Route115", sec: 9 },
    334: { loc: "Sky Pillar 5f", sec: 9 },
    335: { loc: "Route114", sec: 9 },
    338: { loc: "Meteor Falls", sec: 3 },
    339: { loc: "Meteor Falls, Victory Road... (Fish)", sec: 3 },
    340: { loc: "Meteor Falls, Victory Road (Fish)", sec: 3 },
    341: { loc: "Petalburg City, Route102, Route117 (Fish)", sec: 9 },
    343: { loc: "Route111", sec: 9 },
    344: { loc: "Sky Pillar, Sky Pillar 5f", sec: 7 },
    352: { loc: "Route118, Route119...", sec: 9 },
    353: { loc: "Mt. Pyre", sec: 5 },
    355: { loc: "Mt. Pyre, Route121, Route123", sec: 5 },
    356: { loc: "Sky Pillar, Sky Pillar 5f", sec: 7 },
    357: { loc: "Route119", sec: 9 },
    358: { loc: "Mt. Pyre", sec: 5 },
    359: { loc: "Route120", sec: 9 },
    360: { loc: "Route130", sec: 9 },
    361: { loc: "Shoal Cave", sec: 5 },
    363: { loc: "Shoal Cave", sec: 5 },
    366: { loc: "Underwater1, Underwater2 (Surf)", sec: 9 },
    369: { loc: "Underwater1, Underwater2 (Surf)", sec: 9 },
    370: { loc: "Ever Grande City, Route128 (Fish)", sec: 8 },
    371: { loc: "Meteor Falls", sec: 3 },
  },
  sapphire: {
    25: { loc: "Safari Zone", sec: 5 },
    27: { loc: "Route111, Route113", sec: 9 },
    37: { loc: "Mt. Pyre", sec: 5 },
    39: { loc: "Route115", sec: 9 },
    41: { loc: "Granite Cave, Meteor Falls...", sec: 2 },
    42: { loc: "Meteor Falls, Shoal Cave...", sec: 3 },
    43: { loc: "Safari Zone, Route110...", sec: 5 },
    44: { loc: "Safari Zone, Route121, Route123", sec: 5 },
    54: { loc: "Safari Zone (Surf)", sec: 5 },
    55: { loc: "Safari Zone (Surf)", sec: 5 },
    63: { loc: "Granite Cave", sec: 2 },
    66: { loc: "Jagged Pass, Fiery Path, Route112", sec: 3 },
    72: { loc: "Shoal Cave, Seafloor Cavern... (Surf), Team Aqua Hideout (Old Rod), Team Aqua Hideout (Good Rod)", sec: 5 },
    73: { loc: "Abandoned Ship Rooms, Abandoned Ship Hidden Floor Corridors (Surf)", sec: 9 },
    74: { loc: "Granite Cave, Safari Zone...", sec: 2 },
    75: { loc: "Victory Road (Rock Smash)", sec: 8 },
    81: { loc: "New Mauville Entrance, New Mauville Inside", sec: 9 },
    82: { loc: "New Mauville Inside", sec: 9 },
    84: { loc: "Safari Zone", sec: 5 },
    85: { loc: "Safari Zone", sec: 5 },
    88: { loc: "Fiery Path", sec: 3 },
    100: { loc: "New Mauville Entrance, New Mauville Inside", sec: 9 },
    101: { loc: "New Mauville Inside", sec: 9 },
    109: { loc: "Fiery Path", sec: 3 },
    111: { loc: "Safari Zone", sec: 5 },
    116: { loc: "Route132, Route133, Route134 (Fish)", sec: 9 },
    118: { loc: "Meteor Falls, Safari Zone... (Fish)", sec: 3 },
    119: { loc: "Safari Zone (Fish)", sec: 5 },
    120: { loc: "Lilycove City (Fish), Team Aqua Hideout (Super Rod)", sec: 9 },
    127: { loc: "Safari Zone", sec: 5 },
    129: { loc: "Meteor Falls, Shoal Cave... (Surf), Team Aqua Hideout (Old Rod), Team Aqua Hideout (Good Rod)", sec: 3 },
    130: { loc: "Sootopolis City (Fish)", sec: 9 },
    170: { loc: "Underwater1, Underwater2 (Surf)", sec: 9 },
    177: { loc: "Safari Zone", sec: 5 },
    178: { loc: "Safari Zone", sec: 5 },
    183: { loc: "Petalburg City, Route102...", sec: 9 },
    202: { loc: "Safari Zone", sec: 5 },
    203: { loc: "Safari Zone", sec: 5 },
    214: { loc: "Safari Zone", sec: 5 },
    218: { loc: "Fiery Path", sec: 3 },
    222: { loc: "Ever Grande City, Route128 (Fish)", sec: 8 },
    227: { loc: "Route113", sec: 9 },
    231: { loc: "Safari Zone", sec: 5 },
    261: { loc: "Route101, Route102, Route103", sec: 9 },
    263: { loc: "Petalburg Woods, Route101...", sec: 1 },
    264: { loc: "Route118, Route119...", sec: 9 },
    265: { loc: "Petalburg Woods, Route101...", sec: 1 },
    266: { loc: "Petalburg Woods", sec: 1 },
    268: { loc: "Petalburg Woods", sec: 1 },
    270: { loc: "Route102, Route114", sec: 9 },
    271: { loc: "Route114", sec: 9 },
    276: { loc: "Petalburg Woods, Route104...", sec: 1 },
    277: { loc: "Route115", sec: 9 },
    278: { loc: "Mt. Pyre, Ever Grande City...", sec: 5 },
    279: { loc: "Ever Grande City, Slateport City... (Surf)", sec: 8 },
    280: { loc: "Route102", sec: 9 },
    283: { loc: "Route102, Route111...", sec: 9 },
    285: { loc: "Petalburg Woods", sec: 1 },
    287: { loc: "Petalburg Woods", sec: 1 },
    290: { loc: "Route116", sec: 9 },
    293: { loc: "Rusturf Tunnel, Victory Road, Route116", sec: 1 },
    294: { loc: "Victory Road", sec: 8 },
    296: { loc: "Granite Cave, Victory Road", sec: 2 },
    297: { loc: "Victory Road", sec: 8 },
    299: { loc: "Granite Cave (Rock Smash)", sec: 2 },
    300: { loc: "Route116", sec: 9 },
    302: { loc: "Granite Cave, Cave Of Origin...", sec: 2 },
    304: { loc: "Granite Cave, Victory Road", sec: 2 },
    305: { loc: "Victory Road", sec: 8 },
    307: { loc: "Mt. Pyre, Victory Road", sec: 5 },
    308: { loc: "Victory Road", sec: 8 },
    309: { loc: "Route110, Route118", sec: 9 },
    310: { loc: "Route118", sec: 9 },
    311: { loc: "Route110", sec: 9 },
    312: { loc: "Route110", sec: 9 },
    313: { loc: "Route117", sec: 9 },
    314: { loc: "Route117", sec: 9 },
    315: { loc: "Route117", sec: 9 },
    316: { loc: "Route110", sec: 9 },
    318: { loc: "Route118, Route119 (Fish)", sec: 9 },
    319: { loc: "Mossdeep City, Route103... (Fish)", sec: 9 },
    320: { loc: "Shoal Cave, Seafloor Cavern... (Fish)", sec: 5 },
    321: { loc: "Route129 (Surf)", sec: 9 },
    322: { loc: "Jagged Pass, Fiery Path, Route112", sec: 3 },
    324: { loc: "Fiery Path", sec: 3 },
    325: { loc: "Jagged Pass", sec: 3 },
    327: { loc: "Route113", sec: 9 },
    328: { loc: "Route111", sec: 9 },
    331: { loc: "Route111", sec: 9 },
    333: { loc: "Route114, Route115", sec: 9 },
    334: { loc: "Sky Pillar 5f", sec: 9 },
    336: { loc: "Route114", sec: 9 },
    337: { loc: "Meteor Falls", sec: 3 },
    339: { loc: "Meteor Falls, Victory Road... (Fish)", sec: 3 },
    340: { loc: "Meteor Falls, Victory Road (Fish)", sec: 3 },
    341: { loc: "Petalburg City, Route102, Route117 (Fish)", sec: 9 },
    343: { loc: "Route111", sec: 9 },
    344: { loc: "Sky Pillar, Sky Pillar 5f", sec: 7 },
    352: { loc: "Route118, Route119...", sec: 9 },
    353: { loc: "Mt. Pyre, Route121, Route123", sec: 5 },
    354: { loc: "Sky Pillar, Sky Pillar 5f", sec: 7 },
    355: { loc: "Mt. Pyre", sec: 5 },
    357: { loc: "Route119", sec: 9 },
    358: { loc: "Mt. Pyre", sec: 5 },
    359: { loc: "Route120", sec: 9 },
    360: { loc: "Route130", sec: 9 },
    361: { loc: "Shoal Cave", sec: 5 },
    363: { loc: "Shoal Cave", sec: 5 },
    366: { loc: "Underwater1, Underwater2 (Surf)", sec: 9 },
    369: { loc: "Underwater1, Underwater2 (Surf)", sec: 9 },
    370: { loc: "Ever Grande City, Route128 (Fish)", sec: 8 },
    371: { loc: "Meteor Falls", sec: 3 },
  },
  emerald: {
    1: { loc: "gbattlepyramid 1", sec: 9 },
    2: { loc: "gbattlepyramid 1, gbattlepyramid 2", sec: 9 },
    3: { loc: "gbattlepyramid 1, gbattlepyramid 2, gbattlepyramid 3", sec: 9 },
    4: { loc: "gbattlepyramid 1, gbattlepyramid 2...", sec: 9 },
    5: { loc: "gbattlepyramid 2, gbattlepyramid 3...", sec: 9 },
    6: { loc: "gbattlepyramid 3, gbattlepyramid 4...", sec: 9 },
    7: { loc: "gbattlepyramid 4, gbattlepyramid 5...", sec: 9 },
    8: { loc: "gbattlepyramid 5, gbattlepyramid 6, gbattlepyramid 7", sec: 9 },
    25: { loc: "Safari Zone", sec: 5 },
    27: { loc: "Mirage Tower, Route111, Mirage Tower 4f", sec: 4 },
    37: { loc: "Mt. Pyre", sec: 5 },
    39: { loc: "Route115", sec: 9 },
    41: { loc: "Granite Cave, Meteor Falls...", sec: 2 },
    42: { loc: "Meteor Falls, Shoal Cave...", sec: 3 },
    43: { loc: "Safari Zone, Route110...", sec: 5 },
    44: { loc: "Safari Zone, Route121, Route123", sec: 5 },
    52: { loc: "Battle Frontier Hoenn (Trade)", sec: 9 },
    54: { loc: "Safari Zone (Surf)", sec: 5 },
    55: { loc: "Safari Zone (Surf)", sec: 5 },
    63: { loc: "Granite Cave, Route116", sec: 2 },
    66: { loc: "Fiery Path, Jagged Pass", sec: 3 },
    72: { loc: "Shoal Cave, Seafloor Cavern... (Surf)", sec: 5 },
    73: { loc: "Abandoned Ship Rooms, Abandoned Ship Hidden Floor Corridors (Surf)", sec: 9 },
    74: { loc: "Granite Cave, Safari Zone...", sec: 2 },
    75: { loc: "Victory Road, Magma Hideout, Magma Hideout 4f", sec: 8 },
    81: { loc: "New Mauville Inside, New Mauville Entrance", sec: 9 },
    82: { loc: "New Mauville Inside", sec: 9 },
    84: { loc: "Safari Zone", sec: 5 },
    85: { loc: "Safari Zone", sec: 5 },
    88: { loc: "Fiery Path", sec: 3 },
    100: { loc: "New Mauville Inside, New Mauville Entrance", sec: 9 },
    101: { loc: "New Mauville Inside, gbattlepike 2", sec: 9 },
    109: { loc: "Fiery Path", sec: 3 },
    111: { loc: "Safari Zone", sec: 5 },
    116: { loc: "Route132, Route133, Route134 (Fish), Pacifidlog Town (Trade)", sec: 9 },
    118: { loc: "Meteor Falls, Safari Zone... (Surf), Safari Zone Hoenn Area 5 (Old Rod), Safari Zone Hoenn Area 5 (Good Rod), Safari Zone Hoenn Area 5 (Super Rod)", sec: 3 },
    119: { loc: "Safari Zone (Fish)", sec: 5 },
    120: { loc: "Lilycove City (Fish)", sec: 9 },
    127: { loc: "Safari Zone", sec: 5 },
    129: { loc: "Meteor Falls, Safari Zone... (Surf), Safari Zone Hoenn Area 5 (Old Rod), Safari Zone Hoenn Area 5 (Good Rod)", sec: 3 },
    130: { loc: "Sootopolis City (Fish)", sec: 9 },
    132: { loc: "Desert Underpass", sec: 9 },
    152: { loc: "Littleroot Town (Gift)", sec: 9 },
    155: { loc: "Littleroot Town (Gift)", sec: 9 },
    158: { loc: "Littleroot Town (Gift)", sec: 9 },
    163: { loc: "Safari Zone", sec: 5 },
    165: { loc: "Safari Zone", sec: 5 },
    167: { loc: "Safari Zone", sec: 5 },
    170: { loc: "Underwater Route126, Underwater Route124 (Surf)", sec: 9 },
    177: { loc: "Safari Zone", sec: 5 },
    178: { loc: "Safari Zone", sec: 5 },
    179: { loc: "Safari Zone, Altering Cave", sec: 5 },
    183: { loc: "Safari Zone, Route102...", sec: 5 },
    190: { loc: "Safari Zone, Altering Cave", sec: 5 },
    191: { loc: "Safari Zone", sec: 5 },
    194: { loc: "Safari Zone (Surf)", sec: 5 },
    195: { loc: "Safari Zone (Surf)", sec: 5 },
    202: { loc: "Safari Zone, gbattlepike 4", sec: 5 },
    203: { loc: "Safari Zone", sec: 5 },
    204: { loc: "Safari Zone, Altering Cave", sec: 5 },
    207: { loc: "Safari Zone", sec: 5 },
    209: { loc: "Safari Zone", sec: 5 },
    213: { loc: "Safari Zone, Altering Cave", sec: 5 },
    214: { loc: "Safari Zone", sec: 5 },
    216: { loc: "Safari Zone, Altering Cave", sec: 5 },
    218: { loc: "Fiery Path, Route113", sec: 3 },
    222: { loc: "Ever Grande City, Route128 (Fish)", sec: 8 },
    223: { loc: "Safari Zone (Fish), Safari Zone Hoenn Area 5 (Good Rod), Safari Zone Hoenn Area 5 (Super Rod)", sec: 5 },
    224: { loc: "Safari Zone (Fish), Safari Zone Hoenn Area 5 (Super Rod)", sec: 5 },
    227: { loc: "Route113", sec: 9 },
    228: { loc: "Safari Zone, Altering Cave", sec: 5 },
    231: { loc: "Safari Zone", sec: 5 },
    234: { loc: "Safari Zone, Altering Cave", sec: 5 },
    235: { loc: "Artisan Cave, Altering Cave", sec: 9 },
    241: { loc: "Safari Zone", sec: 5 },
    261: { loc: "Petalburg Woods, Route101...", sec: 1 },
    262: { loc: "Route120, Route121, Route123", sec: 9 },
    263: { loc: "Route101, Route102...", sec: 9 },
    264: { loc: "Route118, Route119", sec: 9 },
    265: { loc: "Petalburg Woods, Route101...", sec: 1 },
    266: { loc: "Petalburg Woods", sec: 1 },
    268: { loc: "Petalburg Woods", sec: 1 },
    270: { loc: "Route102, Route114", sec: 9 },
    271: { loc: "Route114", sec: 9 },
    273: { loc: "Route102, Route117, Route120", sec: 9 },
    274: { loc: "Route114", sec: 9 },
    276: { loc: "Petalburg Woods, Route104...", sec: 1 },
    277: { loc: "Route115", sec: 9 },
    278: { loc: "Mt. Pyre, Ever Grande City...", sec: 5 },
    279: { loc: "Ever Grande City, Route103... (Surf)", sec: 8 },
    280: { loc: "Route102", sec: 9 },
    285: { loc: "Petalburg Woods", sec: 1 },
    286: { loc: "gbattlepike 3", sec: 9 },
    287: { loc: "Petalburg Woods", sec: 1 },
    290: { loc: "Route116", sec: 9 },
    293: { loc: "Rusturf Tunnel, Victory Road...", sec: 1 },
    294: { loc: "Victory Road, Desert Underpass", sec: 8 },
    296: { loc: "Granite Cave, Victory Road", sec: 2 },
    297: { loc: "Victory Road", sec: 8 },
    299: { loc: "Granite Cave (Rock Smash)", sec: 2 },
    300: { loc: "Route116", sec: 9 },
    302: { loc: "Granite Cave, Cave Of Origin...", sec: 2 },
    303: { loc: "Victory Road", sec: 8 },
    304: { loc: "Granite Cave, Victory Road", sec: 2 },
    305: { loc: "Victory Road", sec: 8 },
    309: { loc: "Route110, Route118", sec: 9 },
    310: { loc: "Route118", sec: 9 },
    311: { loc: "Route110", sec: 9 },
    312: { loc: "Route110", sec: 9 },
    313: { loc: "Route117", sec: 9 },
    314: { loc: "Route117", sec: 9 },
    316: { loc: "Route110", sec: 9 },
    318: { loc: "Route118, Route119 (Fish)", sec: 9 },
    319: { loc: "Route103, Route118... (Fish)", sec: 9 },
    320: { loc: "Shoal Cave, Seafloor Cavern... (Fish)", sec: 5 },
    321: { loc: "Route129 (Surf)", sec: 9 },
    322: { loc: "Fiery Path, Jagged Pass, Route112", sec: 3 },
    324: { loc: "Fiery Path, Magma Hideout, Magma Hideout 4f", sec: 3 },
    325: { loc: "Jagged Pass", sec: 3 },
    327: { loc: "Route113", sec: 9 },
    328: { loc: "Mirage Tower, Route111, Mirage Tower 4f", sec: 4 },
    331: { loc: "Route111", sec: 9 },
    333: { loc: "Route114, Route115", sec: 9 },
    334: { loc: "Sky Pillar 5f", sec: 9 },
    336: { loc: "Route114, gbattlepike 1...", sec: 9 },
    338: { loc: "Meteor Falls", sec: 3 },
    339: { loc: "Meteor Falls, Victory Road... (Fish)", sec: 3 },
    340: { loc: "Meteor Falls, Victory Road (Fish)", sec: 3 },
    341: { loc: "Route102, Route117, Petalburg City (Fish)", sec: 9 },
    343: { loc: "Route111", sec: 9 },
    344: { loc: "Sky Pillar, Sky Pillar 5f", sec: 7 },
    350: { loc: "gbattlepike 1, gbattlepike 2...", sec: 9 },
    352: { loc: "Route118, Route119...", sec: 9 },
    353: { loc: "Mt. Pyre, Route121, Route123", sec: 5 },
    354: { loc: "Sky Pillar, Sky Pillar 5f", sec: 7 },
    355: { loc: "Mt. Pyre", sec: 5 },
    356: { loc: "gbattlepike 1", sec: 9 },
    357: { loc: "Route119", sec: 9 },
    358: { loc: "Mt. Pyre", sec: 5 },
    359: { loc: "Route120", sec: 9 },
    360: { loc: "Route130", sec: 9 },
    361: { loc: "Shoal Cave", sec: 5 },
    363: { loc: "Shoal Cave", sec: 5 },
    366: { loc: "Underwater Route126, Underwater Route124 (Surf)", sec: 9 },
    369: { loc: "Underwater Route126, Underwater Route124 (Surf)", sec: 9 },
    370: { loc: "Ever Grande City, Route128 (Fish)", sec: 8 },
    371: { loc: "Meteor Falls", sec: 3 },
  },
  firered: {
    10: { loc: "Viridian Forest, Six Island Pattern Bush...", sec: 1 },
    11: { loc: "Viridian Forest, Six Island Pattern Bush...", sec: 1 },
    13: { loc: "Viridian Forest, Six Island Pattern Bush...", sec: 1 },
    14: { loc: "Viridian Forest, Six Island Pattern Bush...", sec: 1 },
    16: { loc: "Three Island Berry Forest, Three Island Bond Bridge...", sec: 7 },
    17: { loc: "Three Island Berry Forest, Three Island Bond Bridge...", sec: 7 },
    19: { loc: "Pokemon Mansion, Route1...", sec: 4 },
    20: { loc: "Pokemon Mansion, Route16...", sec: 4 },
    21: { loc: "Mt. Ember, One Island Kindle Road...", sec: 5 },
    22: { loc: "Mt. Ember, One Island Kindle Road...", sec: 5 },
    23: { loc: "Route4, Route8...", sec: 7 },
    24: { loc: "Victory Road, Route23", sec: 6 },
    25: { loc: "Viridian Forest, Power Plant", sec: 1 },
    29: { loc: "Safari Zone, Route3", sec: 3 },
    30: { loc: "Safari Zone, Route 11 (Trade)", sec: 3 },
    32: { loc: "Safari Zone, Route3", sec: 3 },
    33: { loc: "Safari Zone", sec: 3 },
    35: { loc: "Mt. Moon", sec: 2 },
    39: { loc: "Route3", sec: 7 },
    41: { loc: "Mt. Moon, Rock Tunnel...", sec: 2 },
    42: { loc: "Seafoam Islands, Victory Road...", sec: 4 },
    43: { loc: "Three Island Berry Forest, Two Island Cape Brink...", sec: 7 },
    44: { loc: "Three Island Berry Forest, Two Island Cape Brink...", sec: 7 },
    46: { loc: "Mt. Moon, Safari Zone", sec: 2 },
    47: { loc: "Safari Zone, Cerulean Cave", sec: 3 },
    48: { loc: "Safari Zone, Three Island Berry Forest...", sec: 3 },
    49: { loc: "Safari Zone, Three Island Berry Forest", sec: 3 },
    50: { loc: "Diglett's Cave", sec: 2 },
    51: { loc: "Diglett's Cave", sec: 2 },
    52: { loc: "One Island Kindle Road, One Island Treasure Beach...", sec: 7 },
    53: { loc: "One Island Kindle Road, One Island Treasure Beach...", sec: 7 },
    54: { loc: "Safari Zone, Seafoam Islands..., Route 04 (Super Rod), Route 06 (Super Rod), Route 10 (Super Rod), Route 11 (Super Rod), Route 12 (Super Rod), Route 13 (Super Rod), Route 19 (Super Rod), Route 20 (Super Rod), Route 21 (Super Rod), Route 22 (Super Rod), Route 23 (Super Rod), Route 24 (Super Rod), Route 25 (Super Rod), Pallet Town (Super Rod), Viridian City (Super Rod), Cerulean City (Super Rod), Vermilion City (Good Rod), Vermilion City Port (Super Rod), Fuchsia City (Super Rod), Cinnabar Island (Super Rod), Cerulean Cave 1f (Super Rod), Cerulean Cave B2f (Super Rod), Safari Zone  Center Area (Super Rod), Safari Zone  Area 1 (Super Rod), Safari Zone  Area 2 (Super Rod), Safari Zone  Area 3 (Super Rod), Seafoam Islands B3f (Super Rod), Seafoam Islands B4f (Super Rod), One Island (Super Rod), Four Island (Super Rod), Five Island (Super Rod), Treasure Beach (Super Rod), Kindle Road (Super Rod), Cape Brink (Super Rod), Bond Bridge (Super Rod), Resort Gorgeous (Super Rod), Water Labyrinth (Super Rod), Five Isle Meadow (Super Rod), Memorial Pillar (Super Rod), Outcast Island (Super Rod), Green Path (Super Rod), Water Path (Super Rod), Ruin Valley (Super Rod), Trainer Tower (Super Rod), Tanoby Ruins (Super Rod), Berry Forest (Super Rod), Icefall Cave Entrance (Super Rod), Icefall Cave Back Cave (Super Rod)", sec: 3 },
    55: { loc: "Seafoam Islands, Cerulean Cave...", sec: 4 },
    56: { loc: "Rock Tunnel, Route3...", sec: 3 },
    57: { loc: "Victory Road, Cerulean Cave, Route23", sec: 6 },
    58: { loc: "Pokemon Mansion, Route7, Route8", sec: 4 },
    60: { loc: "Safari Zone, Cerulean Cave... (Fish)", sec: 3 },
    61: { loc: "Cerulean Cave, Four Island Icefall Cave... (Fish)", sec: 7 },
    63: { loc: "Route24, Route25", sec: 7 },
    64: { loc: "Cerulean Cave", sec: 7 },
    66: { loc: "Rock Tunnel, Mt. Ember, Victory Road", sec: 3 },
    67: { loc: "Mt. Ember, Victory Road, Cerulean Cave", sec: 5 },
    72: { loc: "One Island, Ssanne Exterior... (Surf)", sec: 5 },
    73: { loc: "One Island, Four Island Icefall Cave... (Surf)", sec: 5 },
    74: { loc: "Mt. Moon, Rock Tunnel...", sec: 2 },
    75: { loc: "Rock Tunnel, Mt. Ember... (Rock Smash)", sec: 3 },
    77: { loc: "Mt. Ember, One Island Kindle Road", sec: 5 },
    78: { loc: "Mt. Ember, One Island Kindle Road", sec: 5 },
    81: { loc: "Power Plant", sec: 4 },
    82: { loc: "Power Plant, Cerulean Cave", sec: 4 },
    84: { loc: "Safari Zone, Route16...", sec: 3 },
    86: { loc: "Seafoam Islands, Four Island Icefall Cave", sec: 4 },
    87: { loc: "Seafoam Islands, Four Island Icefall Cave", sec: 4 },
    88: { loc: "Pokemon Mansion, Celadon City", sec: 4 },
    90: { loc: "One Island, Ssanne Exterior... (Fish), Pallet Town (Super Rod), Vermilion City (Super Rod), Vermilion City Port (Super Rod), Cinnabar Island (Super Rod), One Island (Super Rod), Five Island (Super Rod), Icefall Cave Back Cave (Super Rod)", sec: 5 },
    92: { loc: "Pokemon Tower, Five Island Lost Cave", sec: 3 },
    93: { loc: "Pokemon Tower, Five Island Lost Cave", sec: 3 },
    95: { loc: "Rock Tunnel, Victory Road, Seven Island Sevault Canyon", sec: 3 },
    96: { loc: "Three Island Berry Forest, Route11", sec: 7 },
    97: { loc: "Three Island Berry Forest", sec: 7 },
    98: { loc: "Seafoam Islands, Ssanne Exterior... (Fish), Route 04 (Good Rod), Route 10 (Good Rod), Route 11 (Good Rod), Route 12 (Good Rod), Route 13 (Good Rod), Route 19 (Good Rod), Route 20 (Good Rod), Route 21 (Good Rod), Vermilion City Port (Good Rod), Route 24 (Good Rod), Pallet Town (Good Rod), Cerulean City (Good Rod), Vermilion City (Good Rod), Cinnabar Island (Good Rod), Seafoam Islands B3f (Good Rod), Seafoam Islands B4f (Good Rod)", sec: 4 },
    100: { loc: "Power Plant, Route10", sec: 4 },
    101: { loc: "Cerulean Cave", sec: 7 },
    102: { loc: "Safari Zone, Three Island Berry Forest", sec: 3 },
    104: { loc: "Pokemon Tower, Seven Island Sevault Canyon", sec: 3 },
    105: { loc: "Victory Road, Seven Island Sevault Canyon", sec: 6 },
    108: { loc: "Route 18 (Trade)", sec: 7 },
    109: { loc: "Pokemon Mansion, Celadon City", sec: 4 },
    110: { loc: "Pokemon Mansion", sec: 4 },
    111: { loc: "Safari Zone", sec: 3 },
    113: { loc: "Safari Zone", sec: 3 },
    114: { loc: "One Island Treasure Beach, Route21 North, Route21 South", sec: 7 },
    115: { loc: "Safari Zone", sec: 3 },
    116: { loc: "Seafoam Islands, One Island... (Surf), Route 04 (Good Rod), Route 04 (Super Rod), Route 10 (Good Rod), Route 10 (Super Rod), Route 11 (Good Rod), Route 11 (Super Rod), Route 12 (Good Rod), Route 12 (Super Rod), Route 13 (Good Rod), Route 13 (Super Rod), Route 19 (Good Rod), Route 19 (Super Rod), Route 20 (Good Rod), Route 20 (Super Rod), Route 21 (Good Rod), Route 21 (Super Rod), Route 24 (Good Rod), Route 24 (Super Rod), Pallet Town (Good Rod), Pallet Town (Super Rod), Cerulean City (Good Rod), Cerulean City (Super Rod), Vermilion City (Good Rod), Vermilion City (Super Rod), Vermilion City Port (Good Rod), Vermilion City Port (Super Rod), Cinnabar Island (Good Rod), Cinnabar Island (Super Rod), Seafoam Islands B3f (Good Rod), Seafoam Islands B3f (Super Rod), Seafoam Islands B4f (Good Rod), Seafoam Islands B4f (Super Rod), One Island (Good Rod), One Island (Super Rod), Five Island (Good Rod), Five Island (Super Rod), Treasure Beach (Good Rod), Treasure Beach (Super Rod), Kindle Road (Good Rod), Kindle Road (Super Rod), Bond Bridge (Good Rod), Bond Bridge (Super Rod), Resort Gorgeous (Good Rod), Resort Gorgeous (Super Rod), Water Labyrinth (Good Rod), Water Labyrinth (Super Rod), Five Isle Meadow (Good Rod), Five Isle Meadow (Super Rod), Memorial Pillar (Good Rod), Memorial Pillar (Super Rod), Outcast Island (Good Rod), Outcast Island (Super Rod), Green Path (Good Rod), Green Path (Super Rod), Water Path (Good Rod), Water Path (Super Rod), Trainer Tower (Good Rod), Trainer Tower (Super Rod), Tanoby Ruins (Good Rod), Tanoby Ruins (Super Rod), Icefall Cave Back Cave (Good Rod), Icefall Cave Back Cave (Super Rod)", sec: 4 },
    117: { loc: "One Island, Four Island Icefall Cave... (Fish), Route 19 (Super Rod), Route 20 (Super Rod), Route 21 (Super Rod), Pallet Town (Super Rod), Cinnabar Island (Super Rod), One Island (Super Rod), Five Island (Super Rod), Treasure Beach (Super Rod), Kindle Road (Super Rod), Bond Bridge (Super Rod), Resort Gorgeous (Super Rod), Water Labyrinth (Super Rod), Five Isle Meadow (Super Rod), Memorial Pillar (Super Rod), Outcast Island (Super Rod), Green Path (Super Rod), Water Path (Super Rod), Trainer Tower (Super Rod), Tanoby Ruins (Super Rod), Icefall Cave Back Cave (Super Rod)", sec: 5 },
    118: { loc: "Safari Zone, Cerulean Cave... (Fish)", sec: 3 },
    119: { loc: "Safari Zone, Three Island Berry Forest, Fuchsia City (Fish)", sec: 3 },
    123: { loc: "Safari Zone", sec: 3 },
    125: { loc: "Power Plant", sec: 4 },
    128: { loc: "Safari Zone", sec: 3 },
    129: { loc: "Safari Zone, Seafoam Islands... (Fish)", sec: 3 },
    130: { loc: "Seafoam Islands, One Island... (Fish)", sec: 4 },
    131: { loc: "Four Island Icefall Cave (Surf)", sec: 7 },
    132: { loc: "Pokemon Mansion, Cerulean Cave...", sec: 4 },
    147: { loc: "Safari Zone (Fish)", sec: 3 },
    148: { loc: "Safari Zone (Fish)", sec: 3 },
    161: { loc: "Five Island Meadow, Six Island Water Path, Seven Island Sevault Canyon Entrance", sec: 7 },
    165: { loc: "Six Island Pattern Bush", sec: 7 },
    167: { loc: "Six Island Pattern Bush", sec: 7 },
    177: { loc: "Six Island Ruin Valley", sec: 7 },
    179: { loc: "Six Island Altering Cave", sec: 7 },
    187: { loc: "Five Island Resort Gorgeous, Five Island Water Labyrinth...", sec: 7 },
    190: { loc: "Six Island Altering Cave", sec: 7 },
    193: { loc: "Six Island Ruin Valley", sec: 7 },
    194: { loc: "Four Island Icefall Cave, Six Island Ruin Valley, Four Island", sec: 7 },
    198: { loc: "Five Island Lost Cave", sec: 7 },
    201: { loc: "Seven Island Tanoby Ruins Monean Chamber, Seven Island Tanoby Ruins Liptoo Chamber...", sec: 7 },
    202: { loc: "Cerulean Cave, Six Island Ruin Valley", sec: 7 },
    204: { loc: "Six Island Altering Cave", sec: 7 },
    206: { loc: "Three Island Port", sec: 7 },
    211: { loc: "Five Island Resort Gorgeous, Five Island Water Labyrinth... (Fish), Resort Gorgeous (Super Rod), Water Labyrinth (Super Rod), Five Isle Meadow (Super Rod), Memorial Pillar (Super Rod), Outcast Island (Super Rod), Green Path (Super Rod), Water Path (Super Rod), Trainer Tower (Super Rod), Tanoby Ruins (Super Rod)", sec: 7 },
    213: { loc: "Six Island Altering Cave", sec: 7 },
    214: { loc: "Six Island Pattern Bush", sec: 7 },
    216: { loc: "Six Island Altering Cave", sec: 7 },
    218: { loc: "Mt. Ember", sec: 5 },
    219: { loc: "Mt. Ember (Rock Smash)", sec: 5 },
    220: { loc: "Four Island Icefall Cave", sec: 7 },
    225: { loc: "Four Island Icefall Cave", sec: 7 },
    227: { loc: "Seven Island Sevault Canyon", sec: 7 },
    228: { loc: "Six Island Altering Cave", sec: 7 },
    231: { loc: "Seven Island Sevault Canyon Entrance, Seven Island Sevault Canyon", sec: 7 },
    234: { loc: "Six Island Altering Cave", sec: 7 },
    235: { loc: "Six Island Altering Cave", sec: 7 },
    246: { loc: "Seven Island Sevault Canyon", sec: 7 },
  },
  leafgreen: {
    33: { loc: "Route 11 (Trade)", sec: 7 },
    79: { loc: "Route 04 (Super Rod), Route 06 (Super Rod), Route 10 (Super Rod), Route 11 (Super Rod), Route 12 (Super Rod), Route 13 (Super Rod), Route 19 (Super Rod), Route 20 (Super Rod), Route 21 (Super Rod), Route 22 (Super Rod), Route 23 (Super Rod), Route 24 (Super Rod), Route 25 (Super Rod), Pallet Town (Super Rod), Viridian City (Super Rod), Cerulean City (Super Rod), Vermilion City (Super Rod), Vermilion City Port (Super Rod), Fuchsia City (Super Rod), Cinnabar Island (Super Rod), Cerulean Cave 1f (Super Rod), Cerulean Cave B2f (Super Rod), Safari Zone  Center Area (Super Rod), Safari Zone  Area 1 (Super Rod), Safari Zone  Area 2 (Super Rod), Safari Zone  Area 3 (Super Rod), Seafoam Islands B3f (Super Rod), Seafoam Islands B4f (Super Rod), One Island (Super Rod), Four Island (Super Rod), Five Island (Super Rod), Treasure Beach (Super Rod), Kindle Road (Super Rod), Cape Brink (Super Rod), Bond Bridge (Super Rod), Resort Gorgeous (Super Rod), Water Labyrinth (Super Rod), Five Isle Meadow (Super Rod), Memorial Pillar (Super Rod), Outcast Island (Super Rod), Green Path (Super Rod), Water Path (Super Rod), Ruin Valley (Super Rod), Trainer Tower (Super Rod), Tanoby Ruins (Super Rod), Berry Forest (Super Rod), Icefall Cave Entrance (Super Rod), Icefall Cave Back Cave (Super Rod)", sec: 7 },
    80: { loc: "Cinnabar Island (Super Rod)", sec: 7 },
    98: { loc: "Route 04 (Good Rod), Route 04 (Super Rod), Route 10 (Good Rod), Route 10 (Super Rod), Route 11 (Good Rod), Route 11 (Super Rod), Route 12 (Good Rod), Route 12 (Super Rod), Route 13 (Good Rod), Route 13 (Super Rod), Route 19 (Good Rod), Route 19 (Super Rod), Route 20 (Good Rod), Route 20 (Super Rod), Route 21 (Good Rod), Route 21 (Super Rod), Route 24 (Good Rod), Route 24 (Super Rod), Pallet Town (Good Rod), Pallet Town (Super Rod), Cerulean City (Good Rod), Cerulean City (Super Rod), Vermilion City (Good Rod), Vermilion City (Super Rod), Vermilion City Port (Good Rod), Vermilion City Port (Super Rod), Cinnabar Island (Good Rod), Cinnabar Island (Super Rod), Seafoam Islands B3f (Good Rod), Seafoam Islands B3f (Super Rod), Seafoam Islands B4f (Good Rod), Seafoam Islands B4f (Super Rod), One Island (Good Rod), One Island (Super Rod), Five Island (Good Rod), Five Island (Super Rod), Treasure Beach (Good Rod), Treasure Beach (Super Rod), Kindle Road (Good Rod), Kindle Road (Super Rod), Bond Bridge (Good Rod), Bond Bridge (Super Rod), Resort Gorgeous (Good Rod), Resort Gorgeous (Super Rod), Water Labyrinth (Good Rod), Water Labyrinth (Super Rod), Five Isle Meadow (Good Rod), Five Isle Meadow (Super Rod), Memorial Pillar (Good Rod), Memorial Pillar (Super Rod), Outcast Island (Good Rod), Outcast Island (Super Rod), Green Path (Good Rod), Green Path (Super Rod), Water Path (Good Rod), Water Path (Super Rod), Trainer Tower (Good Rod), Trainer Tower (Super Rod), Tanoby Ruins (Good Rod), Tanoby Ruins (Super Rod), Icefall Cave Back Cave (Good Rod), Icefall Cave Back Cave (Super Rod)", sec: 7 },
    99: { loc: "Route 19 (Super Rod), Route 20 (Super Rod), Route 21 (Super Rod), Pallet Town (Super Rod), One Island (Super Rod), Five Island (Super Rod), Treasure Beach (Super Rod), Kindle Road (Super Rod), Bond Bridge (Super Rod), Resort Gorgeous (Super Rod), Water Labyrinth (Super Rod), Five Isle Meadow (Super Rod), Memorial Pillar (Super Rod), Outcast Island (Super Rod), Green Path (Super Rod), Water Path (Super Rod), Trainer Tower (Super Rod), Tanoby Ruins (Super Rod), Icefall Cave Back Cave (Super Rod)", sec: 7 },
    108: { loc: "Route 18 (Trade)", sec: 7 },
    116: { loc: "Route 04 (Good Rod), Route 10 (Good Rod), Route 11 (Good Rod), Route 12 (Good Rod), Route 13 (Good Rod), Route 19 (Good Rod), Route 20 (Good Rod), Route 21 (Good Rod), Route 24 (Good Rod), Pallet Town (Good Rod), Cerulean City (Good Rod), Vermilion City (Good Rod), Vermilion City (Super Rod), Vermilion City Port (Good Rod), Cinnabar Island (Good Rod), Seafoam Islands B3f (Good Rod), Seafoam Islands B4f (Good Rod)", sec: 7 },
    120: { loc: "Pallet Town (Super Rod), Vermilion City (Super Rod), Vermilion City Port (Good Rod), Cinnabar Island (Super Rod), One Island (Super Rod), Five Island (Super Rod), Icefall Cave Back Cave (Super Rod)", sec: 7 },
    223: { loc: "Resort Gorgeous (Super Rod), Water Labyrinth (Super Rod), Five Isle Meadow (Super Rod), Memorial Pillar (Super Rod), Outcast Island (Super Rod), Green Path (Super Rod), Water Path (Super Rod), Trainer Tower (Super Rod), Tanoby Ruins (Super Rod)", sec: 7 },
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
 * Manual minimum section overrides for evolutions that require late-game items.
 * Without this, they inherit their base form's section (e.g. Pre-Badge 1).
 */
const evoSectionOverrides = {
  62: 7, // Poliwrath (Water Stone)
  186: 7 // Politoed (King's Rock)
};

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
      if (preReqs.length > 0) {
        const nativePreReqs = preReqs.filter(r => r.action_type !== 'TRADE' || r.location_details !== 'Link Trade');
        if (nativePreReqs.length > 0) {
          // Use earliest section of native pre-evolution as the section for the evo entry
          let preSecId = Math.min(...nativePreReqs.map(r => r.section_id));
          
          if (evoSectionOverrides[pokemonId]) {
            preSecId = Math.max(preSecId, evoSectionOverrides[pokemonId]);
          }
          
          const preName = pokemonMap[evo.from].name;
          push({
            action_type: 'EVOLVE',
            location_details: `Evolve ${preName}`,
            notes: `Evolves from ${preName} (${evo.method}).`,
            section_id: preSecId
          });
        }
      }
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
          if (['red', 'blue', 'yellow', 'firered', 'leafgreen'].includes(gameId)) minSecId = 7;
          else if (['ruby', 'sapphire', 'emerald'].includes(gameId)) minSecId = 9;

          obtainableDescendants.forEach(dId => {
            const reqs = resolveRequirements(gameId, dId, pokemonMap, new Set(visited));
            const secIds = reqs.filter(r => r.action_type !== 'TRADE' || r.location_details !== 'Link Trade').map(r => r.section_id);
            if (secIds.length > 0) {
              minSecId = Math.min(minSecId, ...secIds);
            }
          });

          const daycareSec = gameId.includes('firered') || gameId.includes('leafgreen') ? 7 : 3;
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
    let maxSec = 10;
    if (['red', 'blue', 'yellow', 'firered', 'leafgreen'].includes(gameId)) maxSec = 7;
    else if (['ruby', 'sapphire', 'emerald'].includes(gameId)) maxSec = 9;

    results.push({
      action_type: 'TRADE',
      location_details: 'Link Trade',
      notes: `Not natively available in ${gameId} — obtain by trading from another version.`,
      section_id: maxSec
    });
  }

  return results;
}

// Legacy single-result shim (used nowhere after rewrite but kept for safety)
export function resolveRequirement(gameId, pokemonId, pokemonMap) {
  const results = resolveRequirements(gameId, pokemonId, pokemonMap);
  return results[0];
}
