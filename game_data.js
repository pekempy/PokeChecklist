// Define evolution chains (national dex IDs)
export const evolutions = {
  // Gen 1
  2: { from: 1, method: "Level 16" },
  3: { from: 2, method: "Level 32" },
  5: { from: 4, method: "Level 16" },
  6: { from: 5, method: "Level 36" },
  8: { from: 7, method: "Level 16" },
  9: { from: 8, method: "Level 36" },
  11: { from: 10, method: "Level 7" },
  12: { from: 11, method: "Level 10" },
  14: { from: 13, method: "Level 7" },
  15: { from: 14, method: "Level 10" },
  17: { from: 16, method: "Level 18" },
  18: { from: 17, method: "Level 36" },
  20: { from: 19, method: "Level 20" },
  22: { from: 21, method: "Level 20" },
  24: { from: 23, method: "Level 22" },
  26: { from: 25, method: "Thunder Stone" },
  28: { from: 27, method: "Level 22" },
  30: { from: 29, method: "Level 16" },
  31: { from: 30, method: "Moon Stone" },
  33: { from: 32, method: "Level 16" },
  34: { from: 33, method: "Moon Stone" },
  36: { from: 35, method: "Moon Stone" },
  38: { from: 37, method: "Fire Stone" },
  40: { from: 39, method: "Moon Stone" },
  42: { from: 41, method: "Level 22" },
  44: { from: 43, method: "Level 21" },
  45: { from: 44, method: "Leaf Stone" },
  47: { from: 46, method: "Level 24" },
  49: { from: 48, method: "Level 31" },
  51: { from: 50, method: "Level 26" },
  53: { from: 52, method: "Level 28" },
  55: { from: 54, method: "Level 33" },
  57: { from: 56, method: "Level 28" },
  59: { from: 58, method: "Fire Stone" },
  61: { from: 60, method: "Level 25" },
  62: { from: 61, method: "Water Stone" },
  64: { from: 63, method: "Level 16" },
  65: { from: 64, method: "Trade Link" },
  67: { from: 66, method: "Level 28" },
  68: { from: 67, method: "Trade Link" },
  70: { from: 69, method: "Level 21" },
  71: { from: 70, method: "Leaf Stone" },
  73: { from: 72, method: "Level 30" },
  75: { from: 74, method: "Level 25" },
  76: { from: 75, method: "Trade Link" },
  78: { from: 77, method: "Level 40" },
  80: { from: 79, method: "Level 37" },
  82: { from: 81, method: "Level 30" },
  85: { from: 84, method: "Level 31" },
  87: { from: 86, method: "Level 34" },
  89: { from: 88, method: "Level 38" },
  91: { from: 90, method: "Water Stone" },
  93: { from: 92, method: "Level 25" },
  94: { from: 93, method: "Trade Link" },
  97: { from: 96, method: "Level 26" },
  99: { from: 98, method: "Level 28" },
  101: { from: 100, method: "Level 30" },
  103: { from: 102, method: "Leaf Stone" },
  105: { from: 104, method: "Level 28" },
  110: { from: 109, method: "Level 35" },
  112: { from: 111, method: "Level 42" },
  117: { from: 116, method: "Level 32" },
  119: { from: 118, method: "Level 33" },
  121: { from: 120, method: "Water Stone" },
  130: { from: 129, method: "Level 20" },
  134: { from: 133, method: "Water Stone" },
  135: { from: 133, method: "Thunder Stone" },
  136: { from: 133, method: "Fire Stone" },
  139: { from: 138, method: "Level 40" },
  141: { from: 140, method: "Level 40" },
  148: { from: 147, method: "Level 30" },
  149: { from: 148, method: "Level 55" },

  // Gen 2
  153: { from: 152, method: "Level 16" },
  154: { from: 153, method: "Level 32" },
  156: { from: 155, method: "Level 14" },
  157: { from: 156, method: "Level 36" },
  159: { from: 158, method: "Level 18" },
  160: { from: 159, method: "Level 30" },
  162: { from: 161, method: "Level 15" },
  164: { from: 163, method: "Level 20" },
  166: { from: 165, method: "Level 18" },
  168: { from: 167, method: "Level 22" },
  169: { from: 42, method: "Friendship" },
  171: { from: 170, method: "Level 26" },
  25: { from: 172, method: "Friendship" }, // Pichu -> Pikachu
  35: { from: 173, method: "Friendship" }, // Cleffa -> Clefairy
  39: { from: 174, method: "Friendship" }, // Igglybuff -> Jigglypuff
  176: { from: 175, method: "Friendship" },
  178: { from: 177, method: "Level 25" },
  180: { from: 179, method: "Level 15" },
  181: { from: 180, method: "Level 30" },
  182: { from: 44, method: "Sun Stone" },
  184: { from: 183, method: "Level 18" },
  186: { from: 61, method: "Trade with King's Rock" },
  188: { from: 187, method: "Level 18" },
  189: { from: 188, method: "Level 27" },
  192: { from: 191, method: "Sun Stone" },
  195: { from: 194, method: "Level 20" },
  196: { from: 133, method: "Friendship (Day)" },
  197: { from: 133, method: "Friendship (Night)" },
  199: { from: 79, method: "Trade with King's Rock" },
  208: { from: 95, method: "Trade with Metal Coat" },
  212: { from: 123, method: "Trade with Metal Coat" },
  217: { from: 216, method: "Level 30" },
  219: { from: 218, method: "Level 38" },
  221: { from: 220, method: "Level 33" },
  224: { from: 223, method: "Level 25" },
  230: { from: 117, method: "Trade with Dragon Scale" },
  232: { from: 231, method: "Level 25" },
  233: { from: 137, method: "Trade with Up-Grade" },
  106: { from: 236, method: "Level 20 (Attack > Defense)" },
  107: { from: 236, method: "Level 20 (Attack < Defense)" },
  237: { from: 236, method: "Level 20 (Attack = Defense)" },
  124: { from: 238, method: "Level 30" },
  125: { from: 239, method: "Level 30" },
  126: { from: 240, method: "Level 30" },
  242: { from: 113, method: "Friendship" },
  247: { from: 246, method: "Level 30" },
  248: { from: 247, method: "Level 55" },

  // Gen 3
  253: { from: 252, method: "Level 16" },
  254: { from: 253, method: "Level 36" },
  256: { from: 255, method: "Level 16" },
  257: { from: 256, method: "Level 36" },
  259: { from: 258, method: "Level 16" },
  260: { from: 259, method: "Level 36" },
  262: { from: 261, method: "Level 18" },
  264: { from: 263, method: "Level 20" },
  266: { from: 265, method: "Level 7 (Silcoon)" },
  267: { from: 266, method: "Level 10 (Beautifly)" },
  268: { from: 265, method: "Level 7 (Cascoon)" },
  269: { from: 268, method: "Level 10 (Dustox)" },
  271: { from: 270, method: "Level 14" },
  272: { from: 271, method: "Water Stone" },
  274: { from: 273, method: "Level 14" },
  275: { from: 274, method: "Leaf Stone" },
  277: { from: 276, method: "Level 22" },
  279: { from: 278, method: "Level 25" },
  281: { from: 280, method: "Level 20" },
  282: { from: 281, method: "Level 30" },
  284: { from: 283, method: "Level 22" },
  286: { from: 285, method: "Level 23" },
  288: { from: 287, method: "Level 18" },
  289: { from: 288, method: "Level 36" },
  291: { from: 290, method: "Level 20 (Ninjask)" },
  292: { from: 290, method: "Level 20 (Shedinja - Empty party slot)" },
  294: { from: 293, method: "Level 20" },
  295: { from: 294, method: "Level 40" },
  297: { from: 296, method: "Level 24" },
  183: { from: 298, method: "Friendship" }, // Azurill -> Marill
  301: { from: 300, method: "Moon Stone" },
  305: { from: 304, method: "Level 32" },
  306: { from: 305, method: "Level 42" },
  308: { from: 307, method: "Level 37" },
  310: { from: 309, method: "Level 26" },
  317: { from: 316, method: "Level 26" },
  319: { from: 318, method: "Level 30" },
  321: { from: 320, method: "Level 40" },
  323: { from: 322, method: "Level 33" },
  326: { from: 325, method: "Level 30" },
  329: { from: 328, method: "Level 35" },
  330: { from: 329, method: "Level 45" },
  332: { from: 331, method: "Level 32" },
  334: { from: 333, method: "Level 35" },
  340: { from: 339, method: "Level 30" },
  342: { from: 341, method: "Level 30" },
  344: { from: 343, method: "Level 36" },
  346: { from: 345, method: "Level 40" },
  348: { from: 347, method: "Level 40" },
  350: { from: 349, method: "Max Beauty / Prism Scale" },
  354: { from: 353, method: "Level 37" },
  356: { from: 355, method: "Level 37" },
  202: { from: 360, method: "Level 15" }, // Wynaut -> Wobbuffet
  362: { from: 361, method: "Level 42" },
  364: { from: 363, method: "Level 32" },
  365: { from: 364, method: "Level 44" },
  367: { from: 366, method: "Trade with DeepSeaTooth" },
  368: { from: 366, method: "Trade with DeepSeaScale" },
  372: { from: 371, method: "Level 30" },
  373: { from: 372, method: "Level 50" },
  375: { from: 374, method: "Level 20" },
  376: { from: 375, method: "Level 45" }
};

// Gift/Static Lists for Gen 1
export const gen1Gifts = {
  yellow: {
    25: { loc: "Pallet Town (Oak's Lab)", sec: 1 },
    1: { loc: "Cerulean City (From girl)", sec: 2 },
    4: { loc: "Route 24 (From trainer)", sec: 2 },
    7: { loc: "Vermilion City (Officer Jenny)", sec: 3 },
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 },
    133: { loc: "Celadon Mansion Back Room", sec: 4 },
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 },
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 },
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 },
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 },
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 },
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 },
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 },
    145: { loc: "Power Plant (Static)", sec: 8 },
    146: { loc: "Victory Road (Static)", sec: 9 },
    150: { loc: "Cerulean Cave (Static)", sec: 10 }
  },
  red: {
    1: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    4: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    7: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 },
    133: { loc: "Celadon Mansion Back Room", sec: 4 },
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 },
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 },
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 },
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 },
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 },
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 },
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 },
    145: { loc: "Power Plant (Static)", sec: 8 },
    146: { loc: "Victory Road (Static)", sec: 9 },
    150: { loc: "Cerulean Cave (Static)", sec: 10 }
  },
  blue: {
    1: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    4: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    7: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 },
    133: { loc: "Celadon Mansion Back Room", sec: 4 },
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 },
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 },
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 },
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 },
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 },
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 },
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 },
    145: { loc: "Power Plant (Static)", sec: 8 },
    146: { loc: "Victory Road (Static)", sec: 9 },
    150: { loc: "Cerulean Cave (Static)", sec: 10 }
  }
};

// In-game Trades for Gen 1
export const gen1Trades = {
  yellow: {
    122: { loc: "Route 2 (House)", notes: "Trade Clefairy -> Mr. Mime" },
    124: { loc: "Cerulean City (House)", notes: "Trade Poliwhirl -> Jynx" },
    83: { loc: "Route 11 (Gate 2F)", notes: "Trade Spearow -> Farfetch'd" },
    108: { loc: "Route 18 (Gate 2F)", notes: "Trade Parasect -> Lickitung" }
  },
  red: {
    122: { loc: "Route 2 (House)", notes: "Trade Abra -> Mr. Mime" },
    124: { loc: "Cerulean City (House)", notes: "Trade Poliwhirl -> Jynx" },
    83: { loc: "Vermilion City (House)", notes: "Trade Spearow -> Farfetch'd" },
    108: { loc: "Route 18 (Gate 2F)", notes: "Trade Slowbro -> Lickitung" }
  },
  blue: {
    122: { loc: "Route 2 (House)", notes: "Trade Abra -> Mr. Mime" },
    124: { loc: "Cerulean City (House)", notes: "Trade Poliwhirl -> Jynx" },
    83: { loc: "Vermilion City (House)", notes: "Trade Spearow -> Farfetch'd" },
    108: { loc: "Route 18 (Gate 2F)", notes: "Trade Slowbro -> Lickitung" }
  }
};

// Wild Encounters for Gen 1
export const gen1Wild = {
  yellow: {
    16: { loc: "Route 1 & 2 (Grass)", sec: 1 },
    19: { loc: "Route 1 & 2 (Grass)", sec: 1 },
    21: { loc: "Route 22 (Grass)", sec: 1 },
    56: { loc: "Route 22 (Grass)", sec: 1 },
    29: { loc: "Route 2 & 22 (Grass)", sec: 1 },
    32: { loc: "Route 2 & 22 (Grass)", sec: 1 },
    10: { loc: "Viridian Forest (Grass)", sec: 1 },
    11: { loc: "Viridian Forest (Grass)", sec: 1 },
    17: { loc: "Viridian Forest (Grass - Rare)", sec: 1 },

    27: { loc: "Route 3 & 4 (Grass)", sec: 2 },
    39: { loc: "Route 3 (Grass)", sec: 2 },
    41: { loc: "Mt. Moon (Cave)", sec: 2 },
    74: { loc: "Mt. Moon (Cave)", sec: 2 },
    46: { loc: "Mt. Moon (Cave)", sec: 2 },
    35: { loc: "Mt. Moon (Cave)", sec: 2 },
    43: { loc: "Route 24 & 25 (Grass)", sec: 2 },
    69: { loc: "Route 24 & 25 (Grass)", sec: 2 },
    48: { loc: "Route 24 & 25 (Grass)", sec: 2 },
    63: { loc: "Route 5 & 6 (Grass)", sec: 2 },

    50: { loc: "Diglett's Cave", sec: 3 },
    51: { loc: "Diglett's Cave (Rare)", sec: 3 },
    96: { loc: "Route 11 (Grass)", sec: 3 },
    98: { loc: "Route 11 (Fishing - Good Rod)", sec: 3 },
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    54: { loc: "Route 6 (Surfing - Rare)", sec: 3 },
    90: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 },
    116: { loc: "Route 10 (Fishing - Good Rod)", sec: 3 },
    72: { loc: "Vermilion City Harbor (Surfing)", sec: 3 },

    66: { loc: "Rock Tunnel (Cave)", sec: 4 },
    95: { loc: "Rock Tunnel (Cave)", sec: 4 },
    100: { loc: "Route 9 & 10 (Grass)", sec: 4 },

    92: { loc: "Pokémon Tower (Ghost)", sec: 5 },
    93: { loc: "Pokémon Tower (Ghost)", sec: 5 },
    104: { loc: "Pokémon Tower (Ground)", sec: 5 },
    84: { loc: "Route 16, 17, 18 (Grass)", sec: 5 },
    77: { loc: "Route 17 (Grass)", sec: 5 },
    111: { loc: "Safari Zone (Grass)", sec: 5 },
    113: { loc: "Safari Zone (Grass)", sec: 5 },
    102: { loc: "Safari Zone (Grass)", sec: 5 },
    123: { loc: "Safari Zone (Grass)", sec: 5 },
    127: { loc: "Safari Zone (Grass)", sec: 5 },
    114: { loc: "Safari Zone (Grass)", sec: 5 },
    115: { loc: "Safari Zone (Grass)", sec: 5 },
    128: { loc: "Safari Zone (Grass)", sec: 5 },
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 },
    148: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 },
    20: { loc: "Route 16, 17, 18 (Grass)", sec: 5 },

    88: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    89: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    86: { loc: "Seafoam Islands (Cave)", sec: 7 },
    87: { loc: "Seafoam Islands (Cave)", sec: 7 },
    79: { loc: "Route 12 & 13 (Surfing)", sec: 7 },

    81: { loc: "Power Plant (Electric Room)", sec: 8 },
    82: { loc: "Power Plant (Electric Room)", sec: 8 },

    67: { loc: "Victory Road (Cave)", sec: 9 },
    75: { loc: "Victory Road (Cave)", sec: 9 },

    132: { loc: "Cerulean Cave (B1F)", sec: 10 }
  },
  red: {
    25: [{ loc: "Viridian Forest (Grass - Rare)", sec: 1 }, { loc: "Power Plant (Electric Room)", sec: 8 }],
    10: { loc: "Viridian Forest (Grass)", sec: 1 },
    11: { loc: "Viridian Forest (Grass)", sec: 1 },
    13: { loc: "Viridian Forest (Grass)", sec: 1 },
    14: { loc: "Viridian Forest (Grass)", sec: 1 },
    16: { loc: "Route 1 & 2 (Grass)", sec: 1 },
    19: { loc: "Route 1 & 2 (Grass)", sec: 1 },
    21: { loc: "Route 22 (Grass)", sec: 1 },
    56: { loc: "Route 22 (Grass)", sec: 1 },
    29: { loc: "Route 2 & 22 (Grass)", sec: 1 },
    32: { loc: "Route 2 & 22 (Grass)", sec: 1 },

    23: { loc: "Route 4 (Grass)", sec: 2 },
    39: { loc: "Route 3 (Grass)", sec: 2 },
    41: { loc: "Mt. Moon (Cave)", sec: 2 },
    74: { loc: "Mt. Moon (Cave)", sec: 2 },
    46: { loc: "Mt. Moon (Cave)", sec: 2 },
    35: { loc: "Mt. Moon (Cave)", sec: 2 },
    43: { loc: "Route 24 & 25 (Grass)", sec: 2 },
    48: { loc: "Route 24 & 25 (Grass)", sec: 2 },
    63: { loc: "Route 5 & 6 (Grass)", sec: 2 },

    50: { loc: "Diglett's Cave", sec: 3 },
    51: { loc: "Diglett's Cave (Rare)", sec: 3 },
    96: { loc: "Route 11 (Grass)", sec: 3 },
    98: { loc: "Route 11 (Fishing - Good Rod)", sec: 3 },
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    54: { loc: "Route 6 (Surfing - Rare)", sec: 3 },
    90: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 },
    116: { loc: "Route 10 (Fishing - Good Rod)", sec: 3 },
    72: { loc: "Vermilion City Harbor (Surfing)", sec: 3 },

    66: { loc: "Rock Tunnel (Cave)", sec: 4 },
    95: { loc: "Rock Tunnel (Cave)", sec: 4 },
    100: { loc: "Route 9 (Grass)", sec: 4 },

    92: { loc: "Pokémon Tower (Ghost)", sec: 5 },
    93: { loc: "Pokémon Tower (Ghost)", sec: 5 },
    104: { loc: "Pokémon Tower (Ground)", sec: 5 },
    84: { loc: "Route 16, 17, 18 (Grass)", sec: 5 },
    77: { loc: "Route 17 (Grass)", sec: 5 },
    111: { loc: "Safari Zone (Grass)", sec: 5 },
    113: { loc: "Safari Zone (Grass)", sec: 5 },
    102: { loc: "Safari Zone (Grass)", sec: 5 },
    123: { loc: "Safari Zone (Grass)", sec: 5 },
    115: { loc: "Safari Zone (Grass)", sec: 5 },
    128: { loc: "Safari Zone (Grass)", sec: 5 },
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 },
    20: { loc: "Route 16, 17, 18 (Grass)", sec: 5 },
    58: { loc: "Route 7 & 8 (Grass)", sec: 5 },

    88: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    89: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    109: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    110: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    86: { loc: "Seafoam Islands (Cave)", sec: 7 },
    87: { loc: "Seafoam Islands (Cave)", sec: 7 },
    114: { loc: "Route 21 (Grass)", sec: 7 },

    81: { loc: "Power Plant (Electric Room)", sec: 8 },
    82: { loc: "Power Plant (Electric Room)", sec: 8 },
    125: { loc: "Power Plant (Electric Room)", sec: 8 },

    67: { loc: "Victory Road (Cave)", sec: 9 },
    75: { loc: "Victory Road (Cave)", sec: 9 },

    132: { loc: "Cerulean Cave (B1F)", sec: 10 }
  },
  blue: {
    25: [{ loc: "Viridian Forest (Grass - Rare)", sec: 1 }, { loc: "Power Plant (Electric Room)", sec: 8 }],
    10: { loc: "Viridian Forest (Grass)", sec: 1 },
    11: { loc: "Viridian Forest (Grass)", sec: 1 },
    13: { loc: "Viridian Forest (Grass)", sec: 1 },
    14: { loc: "Viridian Forest (Grass)", sec: 1 },
    16: { loc: "Route 1 & 2 (Grass)", sec: 1 },
    19: { loc: "Route 1 & 2 (Grass)", sec: 1 },
    21: { loc: "Route 22 (Grass)", sec: 1 },
    29: { loc: "Route 2 & 22 (Grass)", sec: 1 },
    32: { loc: "Route 2 & 22 (Grass)", sec: 1 },

    27: { loc: "Route 3 & 4 (Grass)", sec: 2 },
    39: { loc: "Route 3 (Grass)", sec: 2 },
    41: { loc: "Mt. Moon (Cave)", sec: 2 },
    74: { loc: "Mt. Moon (Cave)", sec: 2 },
    46: { loc: "Mt. Moon (Cave)", sec: 2 },
    35: { loc: "Mt. Moon (Cave)", sec: 2 },
    69: { loc: "Route 24 & 25 (Grass)", sec: 2 },
    48: { loc: "Route 24 & 25 (Grass)", sec: 2 },
    63: { loc: "Route 5 & 6 (Grass)", sec: 2 },
    52: { loc: "Route 5 & 6 (Grass)", sec: 2 },

    50: { loc: "Diglett's Cave", sec: 3 },
    51: { loc: "Diglett's Cave (Rare)", sec: 3 },
    96: { loc: "Route 11 (Grass)", sec: 3 },
    98: { loc: "Route 11 (Fishing - Good Rod)", sec: 3 },
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    54: { loc: "Route 6 (Surfing - Rare)", sec: 3 },
    90: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 },
    116: { loc: "Route 10 (Fishing - Good Rod)", sec: 3 },
    72: { loc: "Vermilion City Harbor (Surfing)", sec: 3 },

    66: { loc: "Rock Tunnel (Cave)", sec: 4 },
    95: { loc: "Rock Tunnel (Cave)", sec: 4 },
    100: { loc: "Route 9 (Grass)", sec: 4 },

    92: { loc: "Pokémon Tower (Ghost)", sec: 5 },
    93: { loc: "Pokémon Tower (Ghost)", sec: 5 },
    104: { loc: "Pokémon Tower (Ground)", sec: 5 },
    84: { loc: "Route 16, 17, 18 (Grass)", sec: 5 },
    77: { loc: "Route 17 (Grass)", sec: 5 },
    111: { loc: "Safari Zone (Grass)", sec: 5 },
    113: { loc: "Safari Zone (Grass)", sec: 5 },
    102: { loc: "Safari Zone (Grass)", sec: 5 },
    127: { loc: "Safari Zone (Grass)", sec: 5 },
    115: { loc: "Safari Zone (Grass)", sec: 5 },
    128: { loc: "Safari Zone (Grass)", sec: 5 },
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 },
    20: { loc: "Route 16, 17, 18 (Grass)", sec: 5 },
    37: { loc: "Route 7 & 8 (Grass)", sec: 5 },

    88: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    89: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    109: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    110: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    126: { loc: "Pokémon Mansion (Grassy Rooms)", sec: 7 },
    86: { loc: "Seafoam Islands (Cave)", sec: 7 },
    87: { loc: "Seafoam Islands (Cave)", sec: 7 },
    114: { loc: "Route 21 (Grass)", sec: 7 },

    81: { loc: "Power Plant (Electric Room)", sec: 8 },
    82: { loc: "Power Plant (Electric Room)", sec: 8 },

    67: { loc: "Victory Road (Cave)", sec: 9 },
    75: { loc: "Victory Road (Cave)", sec: 9 },

    132: { loc: "Cerulean Cave (B1F)", sec: 10 }
  }
};

// Seeder logic for Gen 2 (Johto)
export const gen2Gifts = {
  gold: {
    152: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 },
    155: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 },
    158: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 },
    175: { loc: "Violet City Pokémon Center (Egg)", sec: 1 },
    213: { loc: "Cianwood City (From Mania)", sec: 5 },
    147: { loc: "Dragon's Den Shrine (Elder's Quiz)", sec: 8 },
    236: { loc: "Mt. Mortar B1F (From Kiyo)", sec: 8 },
    133: { loc: "Goldenrod City (From Bill)", sec: 3 }
  },
  silver: {
    152: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 },
    155: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 },
    158: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 },
    175: { loc: "Violet City Pokémon Center (Egg)", sec: 1 },
    213: { loc: "Cianwood City (From Mania)", sec: 5 },
    147: { loc: "Dragon's Den Shrine (Elder's Quiz)", sec: 8 },
    236: { loc: "Mt. Mortar B1F (From Kiyo)", sec: 8 },
    133: { loc: "Goldenrod City (From Bill)", sec: 3 }
  },
  crystal: {
    152: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 },
    155: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 },
    158: { loc: "New Bark Town (Elm's Lab Choice)", sec: 1 },
    175: { loc: "Violet City Pokémon Center (Egg)", sec: 1 },
    213: { loc: "Cianwood City (From Mania)", sec: 5 },
    147: { loc: "Dragon's Den Shrine (ExtremeSpeed Dratini)", sec: 8 },
    236: { loc: "Mt. Mortar B1F (From Kiyo)", sec: 8 },
    133: { loc: "Goldenrod City (From Bill)", sec: 3 },
    172: { loc: "Goldenrod Daycare (Odd Egg Gift)", sec: 3 }
  }
};

export const gen2Trades = {
  gold: {
    95: { loc: "Violet City", notes: "Trade Bellsprout -> Onix" },
    66: { loc: "Goldenrod Dept. Store 5F", notes: "Trade Drowzee -> Machop" }
  },
  silver: {
    95: { loc: "Violet City", notes: "Trade Bellsprout -> Onix" },
    66: { loc: "Goldenrod Dept. Store 5F", notes: "Trade Drowzee -> Machop" }
  },
  crystal: {
    95: { loc: "Violet City", notes: "Trade Bellsprout -> Onix" },
    66: { loc: "Goldenrod Dept. Store 5F", notes: "Trade Drowzee -> Machop" }
  }
};

export const gen2Wild = {
  gold: {
    161: { loc: "Route 29 (Morning/Day)", sec: 1 },
    163: { loc: "Route 29 (Night)", sec: 1 },
    167: { loc: "Route 30 & 31 (Night)", sec: 1 },
    16: { loc: "Route 29 & 30 (Morning/Day)", sec: 1 },
    19: { loc: "Route 29 & 30 (All day)", sec: 1 },
    10: { loc: "Route 30 & 31 (Morning/Day)", sec: 1 },
    41: { loc: "Dark Cave", sec: 1 },
    74: { loc: "Dark Cave & Route 46", sec: 1 },
    21: { loc: "Route 46 (Morning/Day)", sec: 1 },
    69: { loc: "Route 31 & 32", sec: 1 },
    92: { loc: "Sprout Tower (Night)", sec: 1 },

    179: { loc: "Route 32 (Morning/Day)", sec: 2 },
    194: { loc: "Route 32 (Night)", sec: 2 },
    27: { loc: "Union Cave", sec: 2 },
    23: { loc: "Route 32 & Union Cave", sec: 2 },
    79: { loc: "Slowpoke Well", sec: 2 },
    95: { loc: "Union Cave", sec: 2 },

    63: { loc: "Route 34 & 35", sec: 3 },
    96: { loc: "Route 34 & 35", sec: 3 },
    132: { loc: "Route 34 & 35", sec: 3 },
    209: { loc: "Route 38", sec: 3 },
    193: { loc: "Route 35 (Rare / Swarm)", sec: 3 },
    29: { loc: "Route 35 & 36", sec: 3 },
    32: { loc: "Route 35 & 36", sec: 3 },
    185: { loc: "Route 36 (Static SquirtBottle)", sec: 3 },
    123: { loc: "National Park (Bug Catching Contest)", sec: 3 },
    127: { loc: "National Park (Bug Catching Contest)", sec: 3 },

    109: { loc: "Burned Tower", sec: 4 },
    20: { loc: "Burned Tower", sec: 4 },
    58: { loc: "Route 36 & 37", sec: 4 },
    234: { loc: "Route 36 & 37", sec: 4 },
    81: { loc: "Route 38 & 39", sec: 4 },
    241: { loc: "Route 38 & 39", sec: 4 },
    128: { loc: "Route 38 & 39", sec: 4 },

    72: { loc: "Route 40 & 41 (Surfing)", sec: 5 },
    73: { loc: "Route 40 & 41 (Surfing)", sec: 5 },
    98: { loc: "Route 40 (Rock Smash)", sec: 5 },

    220: { loc: "Ice Path", sec: 7 },
    124: { loc: "Ice Path", sec: 7 },

    116: { loc: "Whirl Islands (Whirlpool)", sec: 8 },
    202: { loc: "Dark Cave (Back Area)", sec: 8 },
    206: { loc: "Dark Cave (Front Area)", sec: 8 },

    216: { loc: "Route 45 (Morning/Day)", sec: 9 },
    207: { loc: "Route 45 (All Day)", sec: 9 },
    111: { loc: "Victory Road", sec: 9 },
    75: { loc: "Victory Road (Cave)", sec: 9 },

    25: { loc: "Route 2 (Grass)", sec: 10 },
    246: { loc: "Mt. Silver (Cave)", sec: 10 },
    200: { loc: "Mt. Silver (Night)", sec: 10 },
    143: { loc: "Vermilion City (Static)", sec: 10 },
    249: { loc: "Whirl Islands B4F (Static)", sec: 10 },
    250: { loc: "Tin Tower (Static)", sec: 10 },
    245: { loc: "Roaming Johto", sec: 10 },
    243: { loc: "Roaming Johto", sec: 10 },
    244: { loc: "Roaming Johto", sec: 10 }
  },
  silver: {
    161: { loc: "Route 29 (Morning/Day)", sec: 1 },
    163: { loc: "Route 29 (Night)", sec: 1 },
    165: { loc: "Route 30 & 31 (Morning)", sec: 1 },
    16: { loc: "Route 29 & 30 (Morning/Day)", sec: 1 },
    19: { loc: "Route 29 & 30 (All day)", sec: 1 },
    13: { loc: "Route 30 & 31 (Morning/Day)", sec: 1 },
    41: { loc: "Dark Cave", sec: 1 },
    74: { loc: "Dark Cave & Route 46", sec: 1 },
    21: { loc: "Route 46 (Morning/Day)", sec: 1 },
    69: { loc: "Route 31 & 32", sec: 1 },
    92: { loc: "Sprout Tower (Night)", sec: 1 },

    179: { loc: "Route 32 (Morning/Day)", sec: 2 },
    194: { loc: "Route 32 (Night)", sec: 2 },
    79: { loc: "Slowpoke Well", sec: 2 },
    95: { loc: "Union Cave", sec: 2 },

    63: { loc: "Route 34 & 35", sec: 3 },
    96: { loc: "Route 34 & 35", sec: 3 },
    132: { loc: "Route 34 & 35", sec: 3 },
    209: { loc: "Route 38", sec: 3 },
    193: { loc: "Route 35 (Rare / Swarm)", sec: 3 },
    29: { loc: "Route 35 & 36", sec: 3 },
    32: { loc: "Route 35 & 36", sec: 3 },
    185: { loc: "Route 36 (Static SquirtBottle)", sec: 3 },
    123: { loc: "National Park (Bug Catching Contest)", sec: 3 },
    127: { loc: "National Park (Bug Catching Contest)", sec: 3 },

    109: { loc: "Burned Tower", sec: 4 },
    20: { loc: "Burned Tower", sec: 4 },
    37: { loc: "Route 36 & 37", sec: 4 },
    234: { loc: "Route 36 & 37", sec: 4 },
    81: { loc: "Route 38 & 39", sec: 4 },
    241: { loc: "Route 38 & 39", sec: 4 },
    128: { loc: "Route 38 & 39", sec: 4 },
    52: { loc: "Route 38 & 39 (Morning/Night)", sec: 4 },

    72: { loc: "Route 40 & 41 (Surfing)", sec: 5 },
    73: { loc: "Route 40 & 41 (Surfing)", sec: 5 },
    98: { loc: "Route 40 (Rock Smash)", sec: 5 },

    220: { loc: "Ice Path", sec: 7 },
    124: { loc: "Ice Path", sec: 7 },
    225: { loc: "Ice Path (All Day)", sec: 7 },

    116: { loc: "Whirl Islands (Whirlpool)", sec: 8 },
    202: { loc: "Dark Cave (Back Area)", sec: 8 },
    206: { loc: "Dark Cave (Front Area)", sec: 8 },

    231: { loc: "Route 45 (Morning/Day)", sec: 9 },
    227: { loc: "Route 45 (All Day)", sec: 9 },
    111: { loc: "Victory Road", sec: 9 },
    75: { loc: "Victory Road", sec: 9 },

    25: { loc: "Route 2 (Grass)", sec: 10 },
    246: { loc: "Mt. Silver (Cave)", sec: 10 },
    200: { loc: "Mt. Silver (Night)", sec: 10 },
    143: { loc: "Vermilion City (Static)", sec: 10 },
    249: { loc: "Whirl Islands B4F (Static)", sec: 10 },
    250: { loc: "Tin Tower (Static)", sec: 10 },
    245: { loc: "Roaming Johto", sec: 10 },
    243: { loc: "Roaming Johto", sec: 10 },
    244: { loc: "Roaming Johto", sec: 10 }
  },
  crystal: {
    161: { loc: "Route 29 (Morning/Day)", sec: 1 },
    163: { loc: "Route 29 (Night)", sec: 1 },
    165: { loc: "Route 30 & 31 (Morning)", sec: 1 },
    167: { loc: "Route 30 & 31 (Night)", sec: 1 },
    16: { loc: "Route 29 & 30 (Morning/Day)", sec: 1 },
    19: { loc: "Route 29 & 30 (All day)", sec: 1 },
    10: { loc: "Route 30 & 31 (Morning/Day)", sec: 1 },
    13: { loc: "Route 30 & 31 (Morning/Day)", sec: 1 },
    41: { loc: "Dark Cave", sec: 1 },
    74: { loc: "Dark Cave & Route 46", sec: 1 },
    21: { loc: "Route 46 (Morning/Day)", sec: 1 },
    69: { loc: "Route 31 & 32", sec: 1 },
    92: { loc: "Sprout Tower (Night)", sec: 1 },

    194: { loc: "Route 32 (Night)", sec: 2 },
    27: { loc: "Union Cave (B1F/B2F)", sec: 2 },
    79: { loc: "Slowpoke Well", sec: 2 },
    95: { loc: "Union Cave", sec: 2 },

    63: { loc: "Route 34 & 35", sec: 3 },
    96: { loc: "Route 34 & 35", sec: 3 },
    132: { loc: "Route 34 & 35", sec: 3 },
    209: { loc: "Route 38", sec: 3 },
    193: { loc: "Route 35 (Rare / Swarm)", sec: 3 },
    29: { loc: "Route 35 & 36", sec: 3 },
    32: { loc: "Route 35 & 36", sec: 3 },
    185: { loc: "Route 36 (Static SquirtBottle)", sec: 3 },
    123: { loc: "National Park (Bug Catching Contest)", sec: 3 },
    127: { loc: "National Park (Bug Catching Contest)", sec: 3 },

    109: { loc: "Burned Tower", sec: 4 },
    20: { loc: "Burned Tower", sec: 4 },
    58: { loc: "Route 36 & 37", sec: 4 },
    234: { loc: "Route 36 & 37", sec: 4 },
    81: { loc: "Route 38 & 39", sec: 4 },
    241: { loc: "Route 38 & 39", sec: 4 },
    128: { loc: "Route 38 & 39", sec: 4 },
    52: { loc: "Route 38 & 39 (Morning/Night)", sec: 4 },

    72: { loc: "Route 40 & 41 (Surfing)", sec: 5 },
    73: { loc: "Route 40 & 41 (Surfing)", sec: 5 },
    98: { loc: "Route 40 (Rock Smash)", sec: 5 },

    220: { loc: "Ice Path", sec: 7 },
    124: { loc: "Ice Path", sec: 7 },
    215: { loc: "Ice Path (Night)", sec: 7 },

    116: { loc: "Whirl Islands (Whirlpool)", sec: 8 },
    202: { loc: "Dark Cave (Back Area)", sec: 8 },
    206: { loc: "Dark Cave (Front Area)", sec: 8 },

    231: { loc: "Route 45 (Morning/Day)", sec: 9 },
    207: { loc: "Route 45 (All Day)", sec: 9 },
    227: { loc: "Route 45 (All Day)", sec: 9 },
    111: { loc: "Victory Road", sec: 9 },
    75: { loc: "Victory Road", sec: 9 },

    25: { loc: "Route 2 (Grass)", sec: 10 },
    246: { loc: "Mt. Silver (Cave)", sec: 10 },
    200: { loc: "Mt. Silver (Night)", sec: 10 },
    143: { loc: "Vermilion City (Static)", sec: 10 },
    249: { loc: "Whirl Islands B4F (Static)", sec: 10 },
    250: { loc: "Tin Tower (Static)", sec: 10 },
    245: { loc: "Tin Tower (Static Event)", sec: 4 }, // Suicune static in Crystal!
    243: { loc: "Roaming Johto", sec: 10 },
    244: { loc: "Roaming Johto", sec: 10 }
  }
};

// Seeder logic for Gen 3 (Hoenn)
export const gen3Gifts = {
  ruby: {
    252: { loc: "Route 101 (Starter Choice)", sec: 1 },
    255: { loc: "Route 101 (Starter Choice)", sec: 1 },
    258: { loc: "Route 101 (Starter Choice)", sec: 1 },
    345: { loc: "Rustboro City (Devon Corp - Root Fossil)", sec: 5 },
    347: { loc: "Rustboro City (Devon Corp - Claw Fossil)", sec: 5 },
    360: { loc: "Lavaridge Town (Egg)", sec: 7 },
    351: { loc: "Weather Institute (From Scientist)", sec: 6 },
    374: { loc: "Mossdeep City (Steven's House Post-Game)", sec: 10 }
  },
  sapphire: {
    252: { loc: "Route 101 (Starter Choice)", sec: 1 },
    255: { loc: "Route 101 (Starter Choice)", sec: 1 },
    258: { loc: "Route 101 (Starter Choice)", sec: 1 },
    345: { loc: "Rustboro City (Devon Corp - Root Fossil)", sec: 5 },
    347: { loc: "Rustboro City (Devon Corp - Claw Fossil)", sec: 5 },
    360: { loc: "Lavaridge Town (Egg)", sec: 7 },
    351: { loc: "Weather Institute (From Scientist)", sec: 6 },
    374: { loc: "Mossdeep City (Steven's House Post-Game)", sec: 10 }
  },
  emerald: {
    252: { loc: "Route 101 (Starter Choice)", sec: 1 },
    255: { loc: "Route 101 (Starter Choice)", sec: 1 },
    258: { loc: "Route 101 (Starter Choice)", sec: 1 },
    345: { loc: "Rustboro City (Devon Corp - Root Fossil)", sec: 5 },
    347: { loc: "Rustboro City (Devon Corp - Claw Fossil)", sec: 5 },
    360: { loc: "Lavaridge Town (Egg)", sec: 7 },
    351: { loc: "Weather Institute (From Scientist)", sec: 6 },
    374: { loc: "Mossdeep City (Steven's House Post-Game)", sec: 10 }
  },
  firered: {
    1: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    4: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    7: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 },
    35: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    63: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    123: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    133: { loc: "Celadon Mansion Back Room", sec: 4 },
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 },
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 },
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 },
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 },
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 },
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 },
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 },
    145: { loc: "Power Plant (Static)", sec: 8 },
    146: { loc: "Mt. Ember Summit (Static)", sec: 10 },
    150: { loc: "Cerulean Cave (Static)", sec: 10 },
    175: { loc: "Water Labyrinth (From Gentleman)", sec: 10 }
  },
  leafgreen: {
    1: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    4: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    7: { loc: "Pallet Town (Starter Choice)", sec: 1 },
    129: { loc: "Route 4 Pokémon Center (Buy for 500 ₽)", sec: 2 },
    35: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    63: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    127: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    137: { loc: "Celadon Game Corner (Exchange Coins)", sec: 4 },
    133: { loc: "Celadon Mansion Back Room", sec: 4 },
    106: { loc: "Saffron Fighting Dojo (Choose Lee)", sec: 6 },
    107: { loc: "Saffron Fighting Dojo (Choose Chan)", sec: 6 },
    131: { loc: "Silph Co. 7F (From Employee)", sec: 6 },
    138: { loc: "Cinnabar Lab (Helix Fossil)", sec: 7 },
    140: { loc: "Cinnabar Lab (Dome Fossil)", sec: 7 },
    142: { loc: "Cinnabar Lab (Old Amber)", sec: 7 },
    144: { loc: "Seafoam Islands B4F (Static)", sec: 7 },
    145: { loc: "Power Plant (Static)", sec: 8 },
    146: { loc: "Mt. Ember Summit (Static)", sec: 10 },
    150: { loc: "Cerulean Cave (Static)", sec: 10 },
    175: { loc: "Water Labyrinth (From Gentleman)", sec: 10 }
  }
};

export const gen3Trades = {
  ruby: {
    296: { loc: "Rustboro City", notes: "Trade Slakoth -> Makuhita" }
  },
  sapphire: {
    296: { loc: "Rustboro City", notes: "Trade Slakoth -> Makuhita" }
  },
  emerald: {
    296: { loc: "Rustboro City", notes: "Trade Slakoth -> Makuhita" }
  },
  firered: {
    122: { loc: "Route 2 (House)", notes: "Trade Abra -> Mr. Mime", sec: 1 },
    124: { loc: "Cerulean City (House)", notes: "Trade Poliwhirl -> Jynx", sec: 2 },
    83: { loc: "Vermilion City (House)", notes: "Trade Spearow -> Farfetch'd", sec: 3 },
    108: { loc: "Route 18 Gate 2F", notes: "Trade Golduck -> Lickitung", sec: 5 },
    29: { loc: "Route 5 Underground Path", notes: "Trade Nidoran♂ -> Nidoran♀", sec: 2 }
  },
  leafgreen: {
    122: { loc: "Route 2 (House)", notes: "Trade Abra -> Mr. Mime", sec: 1 },
    124: { loc: "Cerulean City (House)", notes: "Trade Poliwhirl -> Jynx", sec: 2 },
    83: { loc: "Vermilion City (House)", notes: "Trade Spearow -> Farfetch'd", sec: 3 },
    108: { loc: "Route 18 Gate 2F", notes: "Trade Slowbro -> Lickitung", sec: 5 },
    32: { loc: "Route 5 Underground Path", notes: "Trade Nidoran♀ -> Nidoran♂", sec: 2 }
  }
};

export const gen3Wild = {
  ruby: {
    261: { loc: "Route 101", sec: 1 },
    263: { loc: "Route 101", sec: 1 },
    265: { loc: "Route 101", sec: 1 },
    278: { loc: "Route 103 & 104", sec: 1 },
    276: { loc: "Route 104", sec: 1 },
    273: { loc: "Route 102 (Grass)", sec: 1 },
    280: { loc: "Route 102 (Rare)", sec: 1 },
    285: { loc: "Petalburg Woods", sec: 1 },
    287: { loc: "Petalburg Woods", sec: 1 },
    290: { loc: "Route 116", sec: 1 },
    293: { loc: "Rusturf Tunnel", sec: 1 },

    296: { loc: "Granite Cave", sec: 2 },
    41: { loc: "Granite Cave & Meteor Falls", sec: 2 },
    74: { loc: "Granite Cave", sec: 2 },
    304: { loc: "Granite Cave", sec: 2 },
    303: { loc: "Granite Cave", sec: 2 },

    309: { loc: "Route 110", sec: 3 },
    311: { loc: "Route 110 (Grass)", sec: 3 },
    316: { loc: "Route 110 (Grass)", sec: 3 },
    81: { loc: "New Mauville", sec: 3 },
    100: { loc: "New Mauville", sec: 3 },

    322: { loc: "Route 112 & Fiery Path", sec: 4 },
    325: { loc: "Jagged Pass", sec: 4 },
    324: { loc: "Fiery Path", sec: 4 },
    66: { loc: "Fiery Path", sec: 4 },
    109: { loc: "Fiery Path", sec: 4 },
    327: { loc: "Route 113", sec: 4 },
    300: { loc: "Route 116 (Grass)", sec: 4 },

    328: { loc: "Route 111 (Desert)", sec: 5 },
    331: { loc: "Route 111 (Desert)", sec: 5 },
    343: { loc: "Route 111 (Desert)", sec: 5 },
    27: { loc: "Route 111 (Desert)", sec: 5 },
    333: { loc: "Route 114 (Grass)", sec: 5 },
    335: { loc: "Route 114 (Grass)", sec: 5 },
    338: { loc: "Meteor Falls", sec: 5 },

    352: { loc: "Route 120 (Static Encounters)", sec: 6 },
    359: { loc: "Route 120 (Grass)", sec: 6 },
    357: { loc: "Route 119 (Grass)", sec: 6 },
    349: { loc: "Route 119 (Fishing - Old Rod)", sec: 6 },
    318: { loc: "Route 118 (Fishing - Good Rod)", sec: 6 },

    353: { loc: "Mt. Pyre (Cave)", sec: 7 },
    358: { loc: "Mt. Pyre (Summit)", sec: 7 },
    202: { loc: "Safari Zone", sec: 7 },
    203: { loc: "Safari Zone", sec: 7 },
    84: { loc: "Safari Zone", sec: 7 },
    25: { loc: "Safari Zone", sec: 7 },
    177: { loc: "Safari Zone", sec: 7 },
    231: { loc: "Safari Zone", sec: 7 },
    214: { loc: "Safari Zone", sec: 7 },
    111: { loc: "Safari Zone", sec: 7 },

    366: { loc: "Route 124 (Underwater Dive)", sec: 8 },
    369: { loc: "Route 124 (Underwater Dive)", sec: 8 },
    170: { loc: "Route 124 (Underwater Dive)", sec: 8 },
    370: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 },
    222: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 },
    363: { loc: "Shoal Cave", sec: 8 },

    371: { loc: "Meteor Falls (Inner B1F)", sec: 9 },
    380: { loc: "Roaming Hoenn (Mascot)", sec: 9 },
    381: { loc: "Roaming Hoenn (Mascot)", sec: 9 },

    377: { loc: "Desert Ruins (Static - Solve Puzzle)", sec: 10 },
    378: { loc: "Island Cave (Static - Solve Puzzle)", sec: 10 },
    379: { loc: "Ancient Tomb (Static - Solve Puzzle)", sec: 10 },
    382: { loc: "Cave of Origin (Static)", sec: 10 },
    383: { loc: "Cave of Origin (Static)", sec: 10 },
    384: { loc: "Sky Pillar (Static)", sec: 10 }
  },
  sapphire: {
    261: { loc: "Route 101", sec: 1 },
    263: { loc: "Route 101", sec: 1 },
    265: { loc: "Route 101", sec: 1 },
    278: { loc: "Route 103 & 104", sec: 1 },
    276: { loc: "Route 104", sec: 1 },
    270: { loc: "Route 102 (Grass)", sec: 1 },
    280: { loc: "Route 102 (Rare)", sec: 1 },
    285: { loc: "Petalburg Woods", sec: 1 },
    287: { loc: "Petalburg Woods", sec: 1 },
    290: { loc: "Route 116", sec: 1 },
    293: { loc: "Rusturf Tunnel", sec: 1 },

    296: { loc: "Granite Cave", sec: 2 },
    41: { loc: "Granite Cave & Meteor Falls", sec: 2 },
    74: { loc: "Granite Cave", sec: 2 },
    304: { loc: "Granite Cave", sec: 2 },
    302: { loc: "Granite Cave", sec: 2 },

    309: { loc: "Route 110", sec: 3 },
    312: { loc: "Route 110 (Grass)", sec: 3 },
    316: { loc: "Route 110 (Grass)", sec: 3 },
    81: { loc: "New Mauville", sec: 3 },
    100: { loc: "New Mauville", sec: 3 },

    322: { loc: "Route 112 & Fiery Path", sec: 4 },
    325: { loc: "Jagged Pass", sec: 4 },
    324: { loc: "Fiery Path", sec: 4 },
    66: { loc: "Fiery Path", sec: 4 },
    109: { loc: "Fiery Path", sec: 4 },
    327: { loc: "Route 113", sec: 4 },
    300: { loc: "Route 116 (Grass)", sec: 4 },

    328: { loc: "Route 111 (Desert)", sec: 5 },
    331: { loc: "Route 111 (Desert)", sec: 5 },
    343: { loc: "Route 111 (Desert)", sec: 5 },
    27: { loc: "Route 111 (Desert)", sec: 5 },
    333: { loc: "Route 114 (Grass)", sec: 5 },
    336: { loc: "Route 114 (Grass)", sec: 5 },
    337: { loc: "Meteor Falls", sec: 5 },

    352: { loc: "Route 120 (Static Encounters)", sec: 6 },
    359: { loc: "Route 120 (Grass)", sec: 6 },
    357: { loc: "Route 119 (Grass)", sec: 6 },
    349: { loc: "Route 119 (Fishing - Old Rod)", sec: 6 },
    318: { loc: "Route 118 (Fishing - Good Rod)", sec: 6 },

    355: { loc: "Mt. Pyre (Cave)", sec: 7 },
    358: { loc: "Mt. Pyre (Summit)", sec: 7 },
    202: { loc: "Safari Zone", sec: 7 },
    203: { loc: "Safari Zone", sec: 7 },
    84: { loc: "Safari Zone", sec: 7 },
    25: { loc: "Safari Zone", sec: 7 },
    177: { loc: "Safari Zone", sec: 7 },
    231: { loc: "Safari Zone", sec: 7 },
    214: { loc: "Safari Zone", sec: 7 },
    111: { loc: "Safari Zone", sec: 7 },

    366: { loc: "Route 124 (Underwater Dive)", sec: 8 },
    369: { loc: "Route 124 (Underwater Dive)", sec: 8 },
    170: { loc: "Route 124 (Underwater Dive)", sec: 8 },
    370: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 },
    222: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 },
    363: { loc: "Shoal Cave", sec: 8 },

    371: { loc: "Meteor Falls (Inner B1F)", sec: 9 },
    380: { loc: "Roaming Hoenn (Mascot)", sec: 9 },
    381: { loc: "Roaming Hoenn (Mascot)", sec: 9 },

    377: { loc: "Desert Ruins (Static - Solve Puzzle)", sec: 10 },
    378: { loc: "Island Cave (Static - Solve Puzzle)", sec: 10 },
    379: { loc: "Ancient Tomb (Static - Solve Puzzle)", sec: 10 },
    382: { loc: "Cave of Origin (Static)", sec: 10 },
    383: { loc: "Cave of Origin (Static)", sec: 10 },
    384: { loc: "Sky Pillar (Static)", sec: 10 }
  },
  emerald: {
    261: { loc: "Route 101", sec: 1 },
    263: { loc: "Route 101", sec: 1 },
    265: { loc: "Route 101", sec: 1 },
    278: { loc: "Route 103 & 104", sec: 1 },
    276: { loc: "Route 104", sec: 1 },
    273: { loc: "Route 102 (Grass)", sec: 1 },
    270: { loc: "Route 102 (Grass)", sec: 1 },
    280: { loc: "Route 102 (Rare)", sec: 1 },
    285: { loc: "Petalburg Woods", sec: 1 },
    287: { loc: "Petalburg Woods", sec: 1 },
    290: { loc: "Route 116", sec: 1 },
    293: { loc: "Rusturf Tunnel", sec: 1 },

    296: { loc: "Granite Cave", sec: 2 },
    41: { loc: "Granite Cave & Meteor Falls", sec: 2 },
    74: { loc: "Granite Cave", sec: 2 },
    304: { loc: "Granite Cave", sec: 2 },
    302: { loc: "Granite Cave (B1F/B2F)", sec: 2 },
    303: { loc: "Granite Cave (B1F/B2F)", sec: 2 },

    309: { loc: "Route 110", sec: 3 },
    311: { loc: "Route 110 (Grass)", sec: 3 },
    312: { loc: "Route 110 (Grass)", sec: 3 },
    316: { loc: "Route 110 (Grass)", sec: 3 },
    81: { loc: "New Mauville", sec: 3 },
    100: { loc: "New Mauville", sec: 3 },

    322: { loc: "Route 112 & Fiery Path", sec: 4 },
    325: { loc: "Jagged Pass", sec: 4 },
    324: { loc: "Fiery Path", sec: 4 },
    66: { loc: "Fiery Path", sec: 4 },
    109: { loc: "Fiery Path", sec: 4 },
    327: { loc: "Route 113", sec: 4 },
    300: { loc: "Route 116 (Grass)", sec: 4 },

    328: { loc: "Route 111 (Desert)", sec: 5 },
    331: { loc: "Route 111 (Desert)", sec: 5 },
    343: { loc: "Route 111 (Desert)", sec: 5 },
    27: { loc: "Route 111 (Desert)", sec: 5 },
    333: { loc: "Route 114 (Grass)", sec: 5 },
    336: { loc: "Route 114 (Grass)", sec: 5 },
    338: { loc: "Meteor Falls", sec: 5 },

    352: { loc: "Route 120 (Static Encounters)", sec: 6 },
    359: { loc: "Route 120 (Grass)", sec: 6 },
    357: { loc: "Route 119 (Grass)", sec: 6 },
    349: { loc: "Route 119 (Fishing - Old Rod)", sec: 6 },
    318: { loc: "Route 118 (Fishing - Good Rod)", sec: 6 },

    353: { loc: "Mt. Pyre (Cave)", sec: 7 },
    355: { loc: "Mt. Pyre (Cave)", sec: 7 },
    358: { loc: "Mt. Pyre (Summit)", sec: 7 },
    202: { loc: "Safari Zone", sec: 7 },
    203: { loc: "Safari Zone", sec: 7 },
    84: { loc: "Safari Zone", sec: 7 },
    25: { loc: "Safari Zone", sec: 7 },
    177: { loc: "Safari Zone", sec: 7 },
    231: { loc: "Safari Zone", sec: 7 },
    214: { loc: "Safari Zone", sec: 7 },
    111: { loc: "Safari Zone", sec: 7 },

    366: { loc: "Route 124 (Underwater Dive)", sec: 8 },
    369: { loc: "Route 124 (Underwater Dive)", sec: 8 },
    170: { loc: "Route 124 (Underwater Dive)", sec: 8 },
    370: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 },
    222: { loc: "Ever Grande City (Fishing - Super Rod)", sec: 8 },
    363: { loc: "Shoal Cave", sec: 8 },

    371: { loc: "Meteor Falls (Inner B1F)", sec: 9 },
    380: { loc: "Roaming Hoenn (Mascot)", sec: 9 },
    381: { loc: "Roaming Hoenn (Mascot)", sec: 9 },

    377: { loc: "Desert Ruins (Static - Solve Puzzle)", sec: 10 },
    378: { loc: "Island Cave (Static - Solve Puzzle)", sec: 10 },
    379: { loc: "Ancient Tomb (Static - Solve Puzzle)", sec: 10 },
    382: { loc: "Marine Cave (Static Event)", sec: 10 },
    383: { loc: "Terra Cave (Static Event)", sec: 10 },
    384: { loc: "Sky Pillar (Static - Pre-Elite Four)", sec: 9 }
  },
  firered: {
    1: { loc: "Link Trade", sec: 10 }, // Starter exclusive fallback
    4: { loc: "Link Trade", sec: 10 },
    7: { loc: "Link Trade", sec: 10 },
    16: { loc: "Route 1", sec: 1 },
    19: { loc: "Route 1", sec: 1 },
    21: { loc: "Route 22", sec: 1 },
    56: { loc: "Route 22", sec: 1 },
    32: { loc: "Route 22", sec: 1 },
    29: { loc: "Route 22", sec: 1 },
    23: { loc: "Route 4", sec: 2 },
    25: [{ loc: "Viridian Forest", sec: 1 }, { loc: "Power Plant", sec: 8 }],
    10: { loc: "Viridian Forest", sec: 1 },
    11: { loc: "Viridian Forest", sec: 1 },
    13: { loc: "Viridian Forest", sec: 1 },
    14: { loc: "Viridian Forest", sec: 1 },
    39: { loc: "Route 3", sec: 2 },
    41: { loc: "Mt. Moon", sec: 2 },
    74: { loc: "Mt. Moon", sec: 2 },
    46: { loc: "Mt. Moon", sec: 2 },
    43: { loc: "Route 24", sec: 2 },
    63: { loc: "Route 24", sec: 2 },
    96: { loc: "Route 11", sec: 3 },
    52: { loc: "Route 5 & 6", sec: 2 },
    54: { loc: "Route 6", sec: 3 },
    58: { loc: "Route 8", sec: 5 },
    50: { loc: "Diglett's Cave", sec: 3 },
    51: { loc: "Diglett's Cave", sec: 3 },
    66: { loc: "Rock Tunnel", sec: 4 },
    95: { loc: "Rock Tunnel", sec: 4 },
    81: { loc: "Power Plant", sec: 8 },
    82: { loc: "Power Plant", sec: 8 },
    100: { loc: "Power Plant", sec: 8 },
    101: { loc: "Power Plant", sec: 8 },
    92: { loc: "Pokémon Tower", sec: 5 },
    93: { loc: "Pokémon Tower", sec: 5 },
    104: { loc: "Pokémon Tower", sec: 5 },
    111: { loc: "Safari Zone", sec: 5 },
    113: { loc: "Safari Zone", sec: 5 },
    123: { loc: "Safari Zone", sec: 5 },
    115: { loc: "Safari Zone", sec: 5 },
    102: { loc: "Safari Zone", sec: 5 },
    128: { loc: "Safari Zone", sec: 5 },
    114: { loc: "Route 21", sec: 7 },
    77: { loc: "Kindle Road", sec: 10 },
    78: { loc: "Kindle Road", sec: 10 },
    84: { loc: "Route 16", sec: 5 },
    85: { loc: "Route 16", sec: 5 },
    109: { loc: "Pokémon Mansion", sec: 7 },
    110: { loc: "Pokémon Mansion", sec: 7 },
    88: { loc: "Pokémon Mansion", sec: 7 },
    89: { loc: "Pokémon Mansion", sec: 7 },
    86: { loc: "Seafoam Islands", sec: 7 },
    87: { loc: "Seafoam Islands", sec: 7 },
    116: { loc: "Route 19 (Fishing - Good Rod)", sec: 7 },
    117: { loc: "Route 19 (Fishing - Super Rod)", sec: 7 },
    90: { loc: "Vermilion City (Fishing - Super Rod)", sec: 3 },
    98: { loc: "Vermilion City (Fishing - Good Rod)", sec: 3 },
    99: { loc: "Vermilion City (Fishing - Super Rod)", sec: 3 },
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    119: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 },
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    61: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 },
    72: { loc: "Route 19 (Surfing)", sec: 7 },
    73: { loc: "Route 19 (Surfing)", sec: 7 },
    132: { loc: "Route 13", sec: 5 },
    143: { loc: "Route 12 & 16", sec: 5 },
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 },
    148: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 },
    202: { loc: "Ruin Valley (Grass)", sec: 10 },
    206: { loc: "Three Island Port (Grass)", sec: 10 },
    214: { loc: "Pattern Bush (Grass)", sec: 10 },
    231: { loc: "Canyon Entrance (Grass)", sec: 10 },
    232: { loc: "Canyon Entrance (Grass)", sec: 10 },
    246: { loc: "Mt. Ember Summit", sec: 10 },
    247: { loc: "Mt. Ember Summit", sec: 10 }
  },
  leafgreen: {
    1: { loc: "Link Trade", sec: 10 }, // Starter exclusive fallback
    4: { loc: "Link Trade", sec: 10 },
    7: { loc: "Link Trade", sec: 10 },
    16: { loc: "Route 1", sec: 1 },
    19: { loc: "Route 1", sec: 1 },
    21: { loc: "Route 22", sec: 1 },
    56: { loc: "Route 22", sec: 1 },
    32: { loc: "Route 22", sec: 1 },
    29: { loc: "Route 22", sec: 1 },
    25: [{ loc: "Viridian Forest", sec: 1 }, { loc: "Power Plant", sec: 8 }],
    27: { loc: "Route 4", sec: 2 },
    10: { loc: "Viridian Forest", sec: 1 },
    11: { loc: "Viridian Forest", sec: 1 },
    13: { loc: "Viridian Forest", sec: 1 },
    14: { loc: "Viridian Forest", sec: 1 },
    39: { loc: "Route 3", sec: 2 },
    41: { loc: "Mt. Moon", sec: 2 },
    74: { loc: "Mt. Moon", sec: 2 },
    46: { loc: "Mt. Moon", sec: 2 },
    69: { loc: "Route 24", sec: 2 },
    63: { loc: "Route 24", sec: 2 },
    96: { loc: "Route 11", sec: 3 },
    52: { loc: "Route 5 & 6", sec: 2 },
    79: { loc: "Route 6", sec: 3 },
    37: { loc: "Route 8", sec: 5 },
    50: { loc: "Diglett's Cave", sec: 3 },
    51: { loc: "Diglett's Cave", sec: 3 },
    66: { loc: "Rock Tunnel", sec: 4 },
    95: { loc: "Rock Tunnel", sec: 4 },
    81: { loc: "Power Plant", sec: 8 },
    82: { loc: "Power Plant", sec: 8 },
    100: { loc: "Power Plant", sec: 8 },
    101: { loc: "Power Plant", sec: 8 },
    92: { loc: "Pokémon Tower", sec: 5 },
    93: { loc: "Pokémon Tower", sec: 5 },
    104: { loc: "Pokémon Tower", sec: 5 },
    111: { loc: "Safari Zone", sec: 5 },
    113: { loc: "Safari Zone", sec: 5 },
    127: { loc: "Safari Zone", sec: 5 },
    115: { loc: "Safari Zone", sec: 5 },
    102: { loc: "Safari Zone", sec: 5 },
    128: { loc: "Safari Zone", sec: 5 },
    114: { loc: "Route 21", sec: 7 },
    77: { loc: "Kindle Road", sec: 10 },
    78: { loc: "Kindle Road", sec: 10 },
    84: { loc: "Route 16", sec: 5 },
    85: { loc: "Route 16", sec: 5 },
    109: { loc: "Pokémon Mansion", sec: 7 },
    110: { loc: "Pokémon Mansion", sec: 7 },
    88: { loc: "Pokémon Mansion", sec: 7 },
    89: { loc: "Pokémon Mansion", sec: 7 },
    86: { loc: "Seafoam Islands", sec: 7 },
    87: { loc: "Seafoam Islands", sec: 7 },
    116: { loc: "Route 19 (Fishing - Good Rod)", sec: 7 },
    117: { loc: "Route 19 (Fishing - Super Rod)", sec: 7 },
    120: { loc: "Vermilion City (Fishing - Super Rod)", sec: 3 },
    98: { loc: "Vermilion City (Fishing - Good Rod)", sec: 3 },
    99: { loc: "Vermilion City (Fishing - Super Rod)", sec: 3 },
    118: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    119: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 },
    60: { loc: "Route 6 (Fishing - Good Rod)", sec: 3 },
    61: { loc: "Route 6 (Fishing - Super Rod)", sec: 3 },
    72: { loc: "Route 19 (Surfing)", sec: 7 },
    73: { loc: "Route 19 (Surfing)", sec: 7 },
    132: { loc: "Route 13", sec: 5 },
    143: { loc: "Route 12 & 16", sec: 5 },
    147: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 },
    148: { loc: "Safari Zone (Fishing - Super Rod)", sec: 5 },
    202: { loc: "Ruin Valley (Grass)", sec: 10 },
    206: { loc: "Three Island Port (Grass)", sec: 10 },
    214: { loc: "Pattern Bush (Grass)", sec: 10 },
    215: { loc: "Icefall Cave (Grass)", sec: 10 },
    223: { loc: "Trainer Tower (Fishing - Super Rod)", sec: 10 },
    224: { loc: "Trainer Tower (Fishing - Super Rod)", sec: 10 },
    226: { loc: "Tanoby Ruins (Water)", sec: 10 }
  }
};

function getGeneration(pokemonId) {
  if (pokemonId <= 151) return 1;
  if (pokemonId <= 251) return 2;
  return 3;
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

  // 4b. Breeding method (for baby Pokémon in Gen 2 and Gen 3)
  if (gameGen >= 2) {
    const babyEvoTargetId = Object.keys(evolutions).find(key => evolutions[key].from === pokemonId);
    if (babyEvoTargetId) {
      const parentId = Number(babyEvoTargetId);
      if (getGeneration(parentId) <= gameGen) {
        const parentReqs = resolveRequirements(gameId, parentId, pokemonMap, new Set(visited));
        const parentHasNative = parentReqs.some(r => r.action_type !== 'TRADE' || r.location_details !== 'Link Trade');
        if (parentHasNative) {
          const parentSecId = parentReqs.length > 0 ? Math.min(...parentReqs.map(r => r.section_id)) : 10;
          const daycareSec = gameId.includes('firered') || gameId.includes('leafgreen') ? 10 : 3;
          const resolvedSec = Math.max(parentSecId, daycareSec);
          const parentName = pokemonMap[parentId].name;
          push({
            action_type: 'BREED',
            location_details: `Breed ${parentName}`,
            notes: `Breed ${parentName} at the Day Care.`,
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
