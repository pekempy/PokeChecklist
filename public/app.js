// PokéChecklist Frontend Application Logic

// Application State
let state = {
  games: [],
  selectedGameId: 'yellow',
  sections: [],
  selectedSectionId: null,
  checklistItems: [], // Holds all requirements + progress for the selected game
  filters: {
    hideCaught: false,
    onlyCarryover: false,
    hideCarryover: false,
    tradeLink: 'all'
  },
  gameFilters: {}, // Maps gameId -> { surf: false, rod: 'none' }
  evolutions: {}, // Static evolution map from database/server
  searchQuery: '',
  searchResults: []
};

// DOM Elements
const gameSelect = document.getElementById('game-select');
const sectionNav = document.getElementById('section-nav');
const activeSectionDetails = document.getElementById('active-section-details');
const sectionTitle = document.getElementById('section-title');
const sectionDesc = document.getElementById('section-desc');
const checklistGrid = document.getElementById('checklist-grid');
const stubWarning = document.getElementById('stub-warning');
const progressFill = document.getElementById('progress-fill');
const progressPercentage = document.getElementById('progress-percentage');
const progressRatio = document.getElementById('progress-ratio');

// Initialize Application
window.addEventListener('DOMContentLoaded', async () => {
  // Load evolutions metadata
  try {
    const evolRes = await fetch('/api/evolutions');
    state.evolutions = await evolRes.json();
  } catch (err) {
    console.error('Failed to load evolutions mapping:', err);
  }

  await loadGames();
  
  // Set default game from localStorage if available, otherwise Yellow, otherwise first game
  const savedDefault = localStorage.getItem('default_game');
  const hasSavedDefault = savedDefault && state.games.some(g => g.id === savedDefault);
  const defaultGame = hasSavedDefault ? savedDefault : 'yellow';

  if (state.games.some(g => g.id === defaultGame)) {
    state.selectedGameId = defaultGame;
    gameSelect.value = defaultGame;
  } else if (state.games.length > 0) {
    state.selectedGameId = state.games[0].id;
    gameSelect.value = state.games[0].id;
  }
  
  await handleGameChange();

  // Helper for custom confirmation modals
  function showCustomConfirm({ title, message, okText, okClass, onConfirm }) {
    const modal = document.getElementById('confirm-modal');
    const titleEl = document.getElementById('confirm-modal-title');
    const msgEl = document.getElementById('confirm-modal-message');
    const cancelBtn = document.getElementById('confirm-modal-cancel-btn');
    const okBtn = document.getElementById('confirm-modal-ok-btn');
    const closeBtn = document.getElementById('close-confirm-modal-btn');
    const overlay = document.getElementById('confirm-modal-overlay');

    if (!modal || !titleEl || !msgEl || !cancelBtn || !okBtn) return;

    titleEl.textContent = title;
    msgEl.textContent = message;
    okBtn.textContent = okText || 'Confirm';
    okBtn.className = `btn ${okClass || 'btn-primary'}`;

    modal.classList.remove('hidden');

    const cleanup = () => {
      modal.classList.add('hidden');
      okBtn.replaceWith(okBtn.cloneNode(true));
      cancelBtn.replaceWith(cancelBtn.cloneNode(true));
      closeBtn.replaceWith(closeBtn.cloneNode(true));
      overlay.replaceWith(overlay.cloneNode(true));
    };

    document.getElementById('confirm-modal-cancel-btn').addEventListener('click', cleanup);
    document.getElementById('close-confirm-modal-btn').addEventListener('click', cleanup);
    document.getElementById('confirm-modal-overlay').addEventListener('click', cleanup);

    document.getElementById('confirm-modal-ok-btn').addEventListener('click', () => {
      cleanup();
      if (onConfirm) onConfirm();
    });
  }

  // Reset Game Event Listener
  const resetGameBtn = document.getElementById('reset-game-btn');
  if (resetGameBtn) {
    resetGameBtn.addEventListener('click', () => {
      const activeGame = state.games.find(g => g.id === state.selectedGameId);
      const gameName = activeGame ? activeGame.name : state.selectedGameId;
      
      showCustomConfirm({
        title: 'Reset Game Progress',
        message: `Are you sure you want to reset all catch and evolution progress for ${gameName}?`,
        okText: 'Yes, Reset',
        okClass: 'btn-danger',
        onConfirm: () => {
          showCustomConfirm({
            title: '⚠️ Irreversible Action',
            message: `WARNING: This action is completely irreversible. All caught status and checklists for ${gameName} will be wiped. Are you absolutely sure?`,
            okText: "I'm Sure, Reset Progress",
            okClass: 'btn-danger',
            onConfirm: async () => {
              try {
                const response = await fetch('/api/reset_game', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ game_id: state.selectedGameId })
                });
                const result = await response.json();
                if (result.success) {
                  await handleGameChange();
                } else {
                  alert('Failed to reset game progress: ' + (result.error || 'Unknown error'));
                }
              } catch (err) {
                console.error(err);
                alert('Failed to reset game progress due to network/server error.');
              }
            }
          });
        }
      });
    });
  }

  // Set Default Game Event Listener
  const setDefaultGameBtn = document.getElementById('set-default-game-btn');
  if (setDefaultGameBtn) {
    setDefaultGameBtn.addEventListener('click', () => {
      localStorage.setItem('default_game', state.selectedGameId);
      updateDefaultGameButton();
    });
  }

  // Filters Event Listeners
  const filterHideCaught = document.getElementById('filter-hide-caught');
  const filterOnlyCarryover = document.getElementById('filter-only-carryover');
  const filterHideCarryover = document.getElementById('filter-hide-carryover');

  if (filterHideCaught) {
    filterHideCaught.addEventListener('click', () => {
      state.filters.hideCaught = !state.filters.hideCaught;
      filterHideCaught.classList.toggle('active', state.filters.hideCaught);
      renderChecklistCards();
    });
  }

  if (filterOnlyCarryover) {
    filterOnlyCarryover.addEventListener('click', () => {
      state.filters.onlyCarryover = !state.filters.onlyCarryover;
      filterOnlyCarryover.classList.toggle('active', state.filters.onlyCarryover);
      
      if (state.filters.onlyCarryover && state.filters.hideCarryover) {
        state.filters.hideCarryover = false;
        if (filterHideCarryover) filterHideCarryover.classList.remove('active');
      }
      renderChecklistCards();
    });
  }

  if (filterHideCarryover) {
    filterHideCarryover.addEventListener('click', () => {
      state.filters.hideCarryover = !state.filters.hideCarryover;
      filterHideCarryover.classList.toggle('active', state.filters.hideCarryover);
      
      if (state.filters.hideCarryover && state.filters.onlyCarryover) {
        state.filters.onlyCarryover = false;
        if (filterOnlyCarryover) filterOnlyCarryover.classList.remove('active');
      }
      renderChecklistCards();
    });
  }

  const filterTradeLink = document.getElementById('filter-trade-link');
  if (filterTradeLink) {
    filterTradeLink.addEventListener('change', (e) => {
      if (!state.gameFilters[state.selectedGameId]) {
        state.gameFilters[state.selectedGameId] = { surf: false, rod: 'none', trade_link: 'all', active_section_id: null };
      }
      state.gameFilters[state.selectedGameId].trade_link = e.target.value;
      state.filters.tradeLink = e.target.value;
      saveGameFilters();
      renderChecklistCards();
    });
  }
  // Search Input Event Listener
  const searchInput = document.getElementById('global-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (searchInput) {
    let searchTimeout = null;
    searchInput.addEventListener('input', (e) => {
      if (searchTimeout) clearTimeout(searchTimeout);
      const queryText = e.target.value;
      searchTimeout = setTimeout(() => {
        performSearch(queryText);
      }, 250);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      performSearch('');
    });
  }
  
  // Event Listeners
  gameSelect.addEventListener('change', async (e) => {
    state.selectedGameId = e.target.value;
    await handleGameChange();
  });

  // Tool Filters Event Listeners
  const surfCheckbox = document.getElementById('tool-surf');
  if (surfCheckbox) {
    surfCheckbox.addEventListener('change', (e) => {
      if (!state.gameFilters[state.selectedGameId]) {
        state.gameFilters[state.selectedGameId] = { surf: false, rod: 'none', trade_link: 'all', active_section_id: null };
      }
      state.gameFilters[state.selectedGameId].surf = e.target.checked;
      saveGameFilters();
      renderChecklistCards();
    });
  }

  const rodSelect = document.getElementById('tool-rod');
  if (rodSelect) {
    rodSelect.addEventListener('change', (e) => {
      if (!state.gameFilters[state.selectedGameId]) {
        state.gameFilters[state.selectedGameId] = { surf: false, rod: 'none', trade_link: 'all', active_section_id: null };
      }
      state.gameFilters[state.selectedGameId].rod = e.target.value;
      saveGameFilters();
      renderChecklistCards();
    });
  }
});

async function loadAndSyncGameFilters() {
  try {
    const res = await fetch(`/api/settings?game_id=${state.selectedGameId}`);
    const settings = await res.json();
    state.gameFilters[state.selectedGameId] = {
      surf: !!settings.surf,
      rod: settings.rod || 'none',
      trade_link: settings.trade_link || 'all',
      active_section_id: settings.active_section_id || null
    };
  } catch (err) {
    console.error('Failed to load settings from server, falling back to defaults:', err);
    state.gameFilters[state.selectedGameId] = {
      surf: false,
      rod: 'none',
      trade_link: 'all',
      active_section_id: null
    };
  }

  // Sync to UI
  const currentFilters = state.gameFilters[state.selectedGameId];
  const surfCheckbox = document.getElementById('tool-surf');
  if (surfCheckbox) {
    surfCheckbox.checked = !!currentFilters.surf;
  }
  const rodSelect = document.getElementById('tool-rod');
  if (rodSelect) {
    rodSelect.value = currentFilters.rod || 'none';
  }
  const tradeSelect = document.getElementById('filter-trade-link');
  if (tradeSelect) {
    tradeSelect.value = currentFilters.trade_link || 'all';
  }
  state.filters.tradeLink = currentFilters.trade_link || 'all';
}

async function saveGameFilters() {
  const current = state.gameFilters[state.selectedGameId] || { surf: false, rod: 'none', trade_link: 'all', active_section_id: null };
  try {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        game_id: state.selectedGameId,
        surf: current.surf,
        rod: current.rod,
        trade_link: current.trade_link,
        active_section_id: current.active_section_id
      })
    });
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
}

function updateDefaultGameButton() {
  const setDefaultGameBtn = document.getElementById('set-default-game-btn');
  if (!setDefaultGameBtn) return;
  const savedDefault = localStorage.getItem('default_game');
  if (savedDefault === state.selectedGameId) {
    setDefaultGameBtn.classList.add('is-default');
    setDefaultGameBtn.textContent = 'Default Game';
  } else {
    setDefaultGameBtn.classList.remove('is-default');
    setDefaultGameBtn.textContent = 'Set Default Game';
  }
}

// Load games from API and populate selector
async function loadGames() {
  try {
    const response = await fetch('/api/games');
    state.games = await response.json();
    
    gameSelect.innerHTML = '';
    
    const groups = [
      { label: 'Gen 1 (Kanto)', ids: ['red', 'blue', 'yellow'] },
      { label: 'Gen 2 (Johto)', ids: ['gold', 'silver', 'crystal'] },
      { label: 'Gen 3 (Hoenn)', ids: ['ruby', 'sapphire', 'emerald'] },
      { label: 'Gen 1 Remake (Kanto)', ids: ['firered', 'leafgreen'] }
    ];

    groups.forEach(group => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = group.label;
      
      group.ids.forEach(id => {
        const game = state.games.find(g => g.id === id);
        if (game) {
          const option = document.createElement('option');
          option.value = game.id;
          option.textContent = game.name;
          optgroup.appendChild(option);
        }
      });
      
      if (optgroup.children.length > 0) {
        gameSelect.appendChild(optgroup);
      }
    });
  } catch (err) {
    console.error('Failed to load games:', err);
  }
}

// Handle switching to a different game
async function handleGameChange() {
  try {
    await loadAndSyncGameFilters();
    // Clear search when switching game
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.value = '';
    state.searchQuery = '';
    state.searchResults = [];
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');

    updateDefaultGameButton();
    // 1. Fetch sections for the selected game
    const sectionsRes = await fetch(`/api/sections?game_id=${state.selectedGameId}`);
    state.sections = await sectionsRes.json();

    // If game is a stub (no sections)
    if (state.sections.length === 0) {
      showStubWarning(true);
      sectionNav.innerHTML = '';
      activeSectionDetails.classList.add('hidden');
      checklistGrid.innerHTML = '';
      updateProgressBar(0, 0);
      return;
    }

    showStubWarning(false);
    activeSectionDetails.classList.remove('hidden');

    // 2. Fetch all checklist items + progress for the selected game
    const checklistRes = await fetch(`/api/checklist?game_id=${state.selectedGameId}`);
    state.checklistItems = await checklistRes.json();

    // 3. Render section pills (navigation)
    renderSectionPills();

    // 4. Restore saved section or default to the first section
    if (state.sections.length > 0) {
      const dbSectionId = state.gameFilters[state.selectedGameId] && state.gameFilters[state.selectedGameId].active_section_id;
      const dbSectionExists = dbSectionId && state.sections.some(s => Number(s.id) === Number(dbSectionId));
      if (dbSectionExists) {
        selectSection(Number(dbSectionId));
      } else {
        const savedSectionId = localStorage.getItem(`pokechecklist_active_section_${state.selectedGameId}`);
        const sectionExists = savedSectionId && state.sections.some(s => String(s.id) === String(savedSectionId));
        if (sectionExists) {
          selectSection(Number(savedSectionId));
        } else {
          selectSection(state.sections[0].id);
        }
      }
    }
    
    // 5. Update progress bar
    calculateAndRenderProgress();
  } catch (err) {
    console.error('Error switching game:', err);
  }
}

// Toggle warning card for stubs
function showStubWarning(show) {
  if (show) {
    stubWarning.classList.remove('hidden');
  } else {
    stubWarning.classList.add('hidden');
  }
}

// Render horizontal navigation pills
function renderSectionPills() {
  sectionNav.innerHTML = '';
  
  state.sections.forEach(section => {
    const pill = document.createElement('button');
    pill.className = 'nav-pill';
    pill.dataset.id = section.id;
    
    // Get completion ratio for this section
    const sectionItems = state.checklistItems.filter(item => item.section_id === section.id);
    const completedCount = sectionItems.filter(item => item.completed === 1).length;
    const totalCount = sectionItems.length;

    const titleText = section.name.replace('Pre-', 'Pre ').replace('Post-', 'Post ');
    pill.innerHTML = `
      <span class="pill-title">${titleText}</span>
      <span class="pill-ratio">${completedCount} / ${totalCount}</span>
    `;
    
    if (totalCount > 0 && completedCount === totalCount) {
      pill.classList.add('completed');
    }

    pill.addEventListener('click', () => {
      selectSection(section.id);
    });

    sectionNav.appendChild(pill);
  });
}

// Select and display a checklist section
function selectSection(sectionId) {
  state.selectedSectionId = sectionId;
  if (!state.gameFilters[state.selectedGameId]) {
    state.gameFilters[state.selectedGameId] = { surf: false, rod: 'none', trade_link: 'all', active_section_id: null };
  }
  state.gameFilters[state.selectedGameId].active_section_id = sectionId;
  saveGameFilters();
  localStorage.setItem(`pokechecklist_active_section_${state.selectedGameId}`, sectionId);
  
  // Highlight active pill
  const pills = sectionNav.querySelectorAll('.nav-pill');
  pills.forEach(pill => {
    if (Number(pill.dataset.id) === sectionId) {
      pill.classList.add('active');
      pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      pill.classList.remove('active');
    }
  });

  // Render header details
  const section = state.sections.find(s => s.id === sectionId);
  if (section) {
    sectionTitle.textContent = section.name;
    sectionDesc.textContent = section.description || '';
  }

  // Render cards
  renderChecklistCards();
}

// Map action type + location/method to an icon badge
function getActionIconHtml(actionType, locationDetails, notes) {
  if (actionType === 'CATCH_EVOLVE') {
    const catchIcon = getActionIconHtml('CATCH', locationDetails, notes);
    const evolveIcon = getActionIconHtml('EVOLVE', locationDetails, notes);
    return `${catchIcon}${evolveIcon}`;
  }
  const loc = (locationDetails || '').toLowerCase();
  const n = (notes || '').toLowerCase();
  let icon = '';
  let label = actionType;
  let cls = `action-${actionType.toLowerCase()}`;

  if (actionType === 'CATCH') {
    if (loc.includes('surf')) {
      icon = '/icons/icons8-water-element-100.png';
      label = 'Surf';
      cls = 'action-surf';
    } else if (loc.includes('fish') || loc.includes('rod')) {
      icon = '/icons/icons8-fishing-pole-100.png';
      if (loc.includes('super')) {
        label = 'Super Rod';
      } else if (loc.includes('good')) {
        label = 'Good Rod';
      } else {
        label = 'Old Rod';
      }
      cls = 'action-fish';
    } else {
      icon = '/icons/icons8-grass-100.png';
      label = 'Catch';
      cls = 'action-catch';
    }
  } else if (actionType === 'TRADE') {
    icon = '/icons/icons8-swap-100.png';
    label = 'Trade';
    cls = 'action-trade';
  } else if (actionType === 'EVOLVE') {
    // Item evolutions: stones, trade items, etc.
    const itemKeywords = ['stone', 'scale', 'tooth', 'coat', 'upgrade', 'friendship', 'beauty', 'trade link', 'prism'];
    const isItemEvo = itemKeywords.some(k => n.includes(k));
    if (isItemEvo) {
      icon = '/icons/icons8-holding-box-100.png';
      label = 'Evolve';
      cls = 'action-evolve-item';
    } else {
      icon = '/icons/icons8-level-up-100.png';
      label = 'Evolve';
      cls = 'action-evolve';
    }
  } else if (actionType === 'GIFT') {
    icon = '/icons/icons8-grass-100.png';
    label = 'Gift';
    cls = 'action-gift';
  } else if (actionType === 'BREED') {
    icon = '/icons/icons8-holding-box-100.png';
    label = 'Breed';
    cls = 'action-breed';
  }

  if (icon) {
    return `<img src="${icon}" alt="${label}" class="action-icon" title="${label}">`;
  }
  return '';
}
function getRegionForRoute(routeNum, gameId) {
  // Hoenn routes: 101-134
  if (routeNum >= 101 && routeNum <= 134) {
    return 'Hoenn';
  }
  // Johto routes: 29-48
  if (routeNum >= 29 && routeNum <= 48) {
    return 'Johto';
  }
  // Kanto routes: 1-28
  if (routeNum >= 1 && routeNum <= 28) {
    return 'Kanto';
  }
  // Fallback to the game's region
  const game = state.games.find(g => g.id === gameId);
  if (game && game.region) {
    return game.region;
  }
  return 'Kanto';
}

function linkifyLocation(locationText, gameId) {
  if (!locationText) return '';
  // Match "Route \d+" followed by optional list of routes separated by comma, ampersand, or "and"
  const routeListRegex = /Route\s+\d+(?:(?:\s*(?:,|&|and)\s*)\d+)*/gi;
  
  return locationText.replace(routeListRegex, (match) => {
    const numbers = match.match(/\d+/g);
    if (!numbers) return match;
    
    const separators = match.split(/\d+/);
    let result = '';
    
    for (let i = 0; i < numbers.length; i++) {
      const numStr = numbers[i];
      const routeNum = parseInt(numStr, 10);
      const region = getRegionForRoute(routeNum, gameId);
      const pageName = `${region}_Route_${routeNum}`;
      const url = `https://bulbapedia.bulbagarden.net/wiki/${pageName}`;
      
      const prefix = separators[i] || '';
      if (i === 0) {
        const cleanPrefix = prefix.replace(/Route\s*/i, '');
        const routeWord = prefix.match(/Route\s*/i)?.[0] || 'Route ';
        result += cleanPrefix + `<a href="${url}" target="_blank" class="location-link" rel="noopener noreferrer" onclick="event.stopPropagation()">${routeWord}${numStr}</a>`;
      } else {
        result += prefix + `<a href="${url}" target="_blank" class="location-link" rel="noopener noreferrer" onclick="event.stopPropagation()">${numStr}</a>`;
      }
    }
    result += separators[separators.length - 1] || '';
    return result;
  });
}


// Helper to check if a single requirement passes progression tool filters (Surf, Fishing Rods)
function passesProgressionFilters(req, currentFilters) {
  const loc = (req.location_details || '').toLowerCase();
  
  // Check HM03 Surf
  if (loc.includes('surf') && !currentFilters.surf) {
    return false;
  }
  
  // Check Fishing Rods
  if (loc.includes('fishing') || loc.includes('rod')) {
    let requiredRod = 'old';
    if (loc.includes('super')) {
      requiredRod = 'super';
    } else if (loc.includes('good')) {
      requiredRod = 'good';
    }
    
    const rodValues = { none: 0, old: 1, good: 2, super: 3 };
    const userRodVal = rodValues[currentFilters.rod] || 0;
    const reqRodVal = rodValues[requiredRod];
    
    if (userRodVal < reqRodVal) {
      return false;
    }
  }
  
  return true;
}

// Helper to check recursively if a Pokémon is obtainable in the active game under current progression filters
function isPokemonObtainable(pokemonId, currentFilters, memo = {}) {
  if (pokemonId in memo) return memo[pokemonId];
  
  // Prevent infinite loops by temporarily setting to false
  memo[pokemonId] = false;
  
  const pkmn = state.checklistItems.find(p => p.pokemon_id === pokemonId);
  if (!pkmn) {
    return false;
  }
  
  // If already completed in the current game, it's obtainable/obtained
  if (pkmn.completed === 1) {
    memo[pokemonId] = true;
    return true;
  }
  
  const isObtainable = pkmn.requirements.some(req => {
    if (req.action_type === 'CATCH' || req.action_type === 'GIFT') {
      return passesProgressionFilters(req, currentFilters);
    }
    if (req.action_type === 'TRADE') {
      return true;
    }
    if (req.action_type === 'EVOLVE') {
      const evo = state.evolutions && state.evolutions[pokemonId];
      if (evo && evo.from) {
        return isPokemonObtainable(evo.from, currentFilters, memo);
      }
    }
    if (req.action_type === 'BREED') {
      const babyEvoTargetId = Object.keys(state.evolutions).find(key => state.evolutions[key].from === pokemonId);
      if (babyEvoTargetId) {
        return isPokemonObtainable(Number(babyEvoTargetId), currentFilters, memo);
      }
    }
    return false;
  });
  
  memo[pokemonId] = isObtainable;
  return isObtainable;
}

// Render checklist item cards for the selected section
function renderChecklistCards() {
  checklistGrid.innerHTML = '';

  const currentSection = state.sections.find(s => s.id === state.selectedSectionId);
  const currentOrderIndex = currentSection ? currentSection.order_index : 1;

  // 1. Current section items
  const currentSectionItems = state.checklistItems.filter(item => item.section_id === state.selectedSectionId);

  // 2. Direct carry over items (uncompleted pokemon from previous sections)
  const finalCarryOvers = state.checklistItems.filter(item => {
    const itemSection = state.sections.find(s => s.id === item.section_id);
    return itemSection && itemSection.order_index < currentOrderIndex && item.completed === 0;
  });

  let filteredItems = [...currentSectionItems, ...finalCarryOvers];

  if (state.filters.hideCaught) {
    filteredItems = filteredItems.filter(item => item.completed === 0);
  }

  if (state.filters.onlyCarryover) {
    filteredItems = filteredItems.filter(item => item.section_id !== state.selectedSectionId);
  }

  if (state.filters.hideCarryover) {
    filteredItems = filteredItems.filter(item => item.section_id === state.selectedSectionId);
  }

  // Apply Trade Link & Trade Evolution filter
  if (state.filters.tradeLink && state.filters.tradeLink !== 'all') {
    filteredItems = filteredItems.filter(item => {
      const hasTrade = item.requirements.some(req => {
        const evo = state.evolutions && state.evolutions[item.pokemon_id];
        const isTradeEvo = evo && evo.method && evo.method.toLowerCase().includes('trade');
        const isTradeLinkNotes = req.notes && req.notes.toLowerCase().includes('trade link');
        return req.action_type === 'TRADE' || isTradeEvo || isTradeLinkNotes;
      });

      if (state.filters.tradeLink === 'hide') {
        return !hasTrade;
      } else if (state.filters.tradeLink === 'only') {
        return hasTrade;
      }
      return true;
    });
  }

  // Apply HM03 Surf and Fishing Rod filters (per-game progression tools), including recursive evolution obtainability
  const currentFilters = state.gameFilters[state.selectedGameId] || { surf: false, rod: 'none' };
  
  filteredItems = filteredItems.map(item => {
    // Filter the requirements inside this item
    const validReqs = item.requirements.filter(req => {
      if (req.action_type === 'CATCH' || req.action_type === 'GIFT') {
        return passesProgressionFilters(req, currentFilters);
      }
      if (req.action_type === 'EVOLVE') {
        const evo = state.evolutions && state.evolutions[item.pokemon_id];
        if (evo && evo.from) {
          // If the pre-evolution isn't obtainable, hide the evolution card/method
          return isPokemonObtainable(evo.from, currentFilters);
        }
      }
      if (req.action_type === 'BREED') {
        const babyEvoTargetId = Object.keys(state.evolutions).find(key => state.evolutions[key].from === item.pokemon_id);
        if (babyEvoTargetId) {
          return isPokemonObtainable(Number(babyEvoTargetId), currentFilters);
        }
      }
      return true;
    });

    return {
      ...item,
      requirements: validReqs
    };
  }).filter(item => item.requirements.length > 0);

  if (filteredItems.length === 0) {
    const hasActiveFilters = state.filters.hideCaught || state.filters.onlyCarryover || state.filters.hideCarryover || state.filters.tradeLink !== 'all' || !currentFilters.surf || currentFilters.rod !== 'super';
    const msg = hasActiveFilters ? 'No catch/evolution actions match your active filters.' : 'No catch/evolution actions in this section.';
    checklistGrid.innerHTML = `<div class="no-items">${msg}</div>`;
    return;
  }

  const previousScroll = checklistGrid.scrollTop;

  const allCompleted = filteredItems.every(item => item.completed === 1);
  if (allCompleted) {
    activeSectionDetails.classList.add('section-complete');
  } else {
    activeSectionDetails.classList.remove('section-complete');
  }

  // ── Inject missing pre-evolution ancestors for carry-over chains ──
  // If a carry-over is mid-chain (evo stage ≥ 2) and its ancestor is
  // not already in the list (e.g. already caught), insert it before
  // the carry-over so the horizontal chain renders with full context
  // and the ancestor's caught status is visible.
  if (state.evolutions) {
    const existingIds = new Set(filteredItems.map(i => i.pokemon_id));
    const toInsert = []; // { index, ancestors[] }

    filteredItems.forEach((item, idx) => {
      // Only for carry-over mid-chain items
      if (item.section_id === state.selectedSectionId) return;
      if ((item.evolution_stage || 1) <= 1) return;

      const ancestors = [];
      let currentId = item.pokemon_id;
      while (true) {
        const evo = state.evolutions[currentId];
        if (!evo) break;
        const parentId = evo.from;
        if (!existingIds.has(parentId)) {
          const parent = state.checklistItems.find(ci => ci.pokemon_id === parentId);
          if (parent) {
            ancestors.unshift(parent);   // oldest first
            existingIds.add(parentId);   // prevent duplicates
          }
        }
        currentId = parentId;
      }
      if (ancestors.length) toInsert.push({ index: idx, ancestors });
    });

    // Apply in reverse order so earlier splices don't shift later indices
    toInsert.reverse().forEach(({ index, ancestors }) => {
      filteredItems.splice(index, 0, ...ancestors);
    });
  }

  // ── Build all card elements ─────────────────────────────
  const cardElements = filteredItems.map((item, index) => {
    const card = document.createElement('div');
    card.setAttribute('data-pokemon-id', item.pokemon_id);

    const stageClass = item.evolution_stage === 2 ? 'evo-stage-2' : (item.evolution_stage >= 3 ? 'evo-stage-3' : '');
    card.className = `checklist-card ${item.completed ? 'checked' : ''} ${stageClass}`.trim();
    card.style.animationDelay = `${index * 0.04}s`;

    const typesHtml = [item.pokemon_type1, item.pokemon_type2]
      .filter(t => t !== null && t !== '')
      .map(t => `<span class="badge type-${t.toLowerCase()}">${t}</span>`).join(' ');

    const paddedDex = String(item.pokemon_id).padStart(3, '0');

    const rowsHtml = item.requirements.map(req => {
      const actionIconHtml = getActionIconHtml(req.action_type, req.location_details, req.notes);
      const notesHtml = req.notes ? `<div class="notes-row">${req.notes}</div>` : '';
      return `
        <div class="checklist-encounter-item ${req.completed ? 'checked' : ''}" data-requirement-id="${req.requirement_id}">
          <div class="checkbox-container">
            <div class="custom-checkbox"></div>
          </div>
          <div class="encounter-info">
            <div class="location-row">
              ${actionIconHtml}
              <span class="location-text">${linkifyLocation(req.location_details, state.selectedGameId)}</span>
            </div>
            ${notesHtml}
          </div>
        </div>
      `;
    }).join('');

    const caughtGames = item.caught_games ? item.caught_games.split(',') : [];
    const obtainableGames = item.obtainable_games ? item.obtainable_games.split(',') : [];
    const gamesList = [
      { id: 'red', code: 'R', class: 'active-red' },
      { id: 'blue', code: 'B', class: 'active-blue' },
      { id: 'yellow', code: 'Y', class: 'active-yellow', groupEnd: true },
      { id: 'gold', code: 'G', class: 'active-gold' },
      { id: 'silver', code: 'S', class: 'active-silver' },
      { id: 'crystal', code: 'C', class: 'active-crystal', groupEnd: true },
      { id: 'ruby', code: 'R', class: 'active-ruby' },
      { id: 'sapphire', code: 'S', class: 'active-sapphire' },
      { id: 'emerald', code: 'E', class: 'active-emerald', groupEnd: true },
      { id: 'firered', code: 'FR', class: 'active-firered' },
      { id: 'leafgreen', code: 'LG', class: 'active-leafgreen' }
    ];
    const ownershipHtml = gamesList.map(g => {
      const isCaught = caughtGames.includes(g.id) || caughtGames.includes(g.code);
      const isObtainable = obtainableGames.includes(g.id);
      const unobtainableClass = (!isCaught && !isObtainable) ? 'unobtainable' : 'placeholder';
      const groupEndClass = g.groupEnd ? 'group-end' : '';
      return `<span class="game-badge ${isCaught ? g.class : unobtainableClass} ${groupEndClass}" title="${isCaught ? 'Caught' : (isObtainable ? 'Obtainable' : 'Unobtainable')} in ${g.id.charAt(0).toUpperCase() + g.id.slice(1)}">${g.code}</span>`;
    }).join('');

    const isCaughtInCurrent = caughtGames.includes(state.selectedGameId);
    let tradeButtonHtml = '';
    if (isCaughtInCurrent) {
      const otherGames = gamesList.filter(g => g.id !== state.selectedGameId);
      const optionsHtml = otherGames.map(g => `
        <button class="trade-option ${g.id}-opt" data-to="${g.id}">Trade to ${g.id.charAt(0).toUpperCase() + g.id.slice(1)}</button>
      `).join('');
      tradeButtonHtml = `
        <div class="trade-trigger-container">
          <button class="trade-btn">⇄ Trade</button>
          <div class="trade-menu">
            ${optionsHtml}
            <button class="trade-option release-option" style="color: #ff5555; border-top: 1px solid rgba(255,255,255,0.08);" data-to="release">Release (Mark NOT Caught)</button>
          </div>
        </div>
      `;
    }

    const isCarryOver = item.section_id !== state.selectedSectionId;
    const carryOverHtml = isCarryOver ? `<span class="carry-over-badge">↩ Carry Over</span>` : '';

    card.innerHTML = `
      <div class="card-content">
        <div class="pokemon-header">
          <span class="dex-number">#${paddedDex}</span>
          <span class="pokemon-name">${item.pokemon_name}</span>
          ${carryOverHtml}
          <div class="pokemon-types">${typesHtml}</div>
        </div>
        <div class="checklist-encounters-list">
          ${rowsHtml}
        </div>
        <div class="card-footer-row">
          <div class="game-ownership-icons">${ownershipHtml}</div>
          ${tradeButtonHtml}
        </div>
      </div>
    `;

    // Click listener for checking/unchecking individual encounters
    card.querySelectorAll('.checklist-encounter-item').forEach(encItem => {
      encItem.addEventListener('click', async (e) => {
        e.stopPropagation();
        const reqId = parseInt(encItem.dataset.requirementId);
        await toggleItemCompletion(reqId);
      });
    });

    if (isCaughtInCurrent) {
      const tradeBtn = card.querySelector('.trade-btn');
      const tradeMenu = card.querySelector('.trade-menu');
      if (tradeBtn && tradeMenu) {
        tradeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.trade-menu.show').forEach(menu => {
            if (menu !== tradeMenu) menu.classList.remove('show');
          });
          tradeMenu.classList.toggle('show');
        });
        const options = card.querySelectorAll('.trade-option');
        options.forEach(opt => {
          opt.addEventListener('click', async (e) => {
            e.stopPropagation();
            tradeMenu.classList.remove('show');
            if (opt.dataset.to === 'release') {
              await releasePokemon(item.pokemon_id, item.pokemon_name);
            } else {
              await openTradeModal(item.pokemon_id, item.pokemon_name, state.selectedGameId, opt.dataset.to);
            }
          });
        });
      }
    }

    // Attach metadata so the grouping pass can use it
    card._evoStage = item.evolution_stage || 1;
    card._pokemonId = item.pokemon_id;
    return card;
  });

  // ── Group evolution chains into horizontal rows ─────────
  // Handles both linear (A→B→C) and branching (A→[B,C,D]) chains.
  // For branching, the base card is shown left, with all branch
  // sub-chains (which can themselves be linear or branching) stacked
  // vertically on the right (e.g. Silcoon→Beautifly and Cascoon→Dustox).
  
  // Build the evolution tree nodes
  const nodes = {};
  cardElements.forEach(card => {
    nodes[card._pokemonId] = {
      card: card,
      children: []
    };
  });

  // Link children to parents
  const roots = [];
  cardElements.forEach(card => {
    const id = card._pokemonId;
    const evo = state.evolutions && state.evolutions[id];
    if (card._evoStage > 1 && evo && evo.from && nodes[evo.from]) {
      nodes[evo.from].children.push(nodes[id]);
    } else {
      roots.push(nodes[id]);
    }
  });

  // Helper to check if subtree is linear
  function isLinearSubtree(node) {
    if (node.children.length === 0) return true;
    if (node.children.length === 1) return isLinearSubtree(node.children[0]);
    return false;
  }

  // Recursive function to render a node
  function renderEvoNode(node) {
    if (isLinearSubtree(node)) {
      // Linear chain: card1 -> card2 -> card3
      const chain = [];
      let curr = node;
      while (curr) {
        chain.push(curr.card);
        curr = curr.children[0];
      }

      if (chain.length === 1) {
        return chain[0];
      }

      const row = document.createElement('div');
      row.className = 'evo-chain-row';
      chain.forEach((card, idx) => {
        if (idx > 0) {
          const arrow = document.createElement('div');
          arrow.className = 'evo-arrow';
          arrow.textContent = '→';
          row.appendChild(arrow);
        }
        row.appendChild(card);
      });
      return row;
    } else {
      // Branching: card -> [ child1_subtree, child2_subtree ] stacked vertically
      const row = document.createElement('div');
      row.className = 'evo-chain-row evo-chain-branching';

      row.appendChild(node.card);

      const arrow = document.createElement('div');
      arrow.className = 'evo-arrow';
      arrow.textContent = '→';
      row.appendChild(arrow);

      const branchContainer = document.createElement('div');
      branchContainer.className = 'evo-branches';
      
      node.children.forEach(child => {
        const childRendered = renderEvoNode(child);
        branchContainer.appendChild(childRendered);
      });

      row.appendChild(branchContainer);
      return row;
    }
  }

  // Render all roots to the grid
  roots.forEach(root => {
    const rendered = renderEvoNode(root);
    checklistGrid.appendChild(rendered);
  });

  checklistGrid.scrollTop = previousScroll;
}


// Update a card's DOM state without reloading the list
function updateCardDOM(requirementId, pokemonId, isCompleted, caughtGames) {
  // Update regular checklist card
  const cards = document.querySelectorAll(`.checklist-card[data-pokemon-id="${pokemonId}"]`);
  cards.forEach(card => {
    const isCaughtInCurrent = caughtGames.includes(state.selectedGameId);
    if (isCaughtInCurrent) {
      card.classList.add('checked');
    } else {
      card.classList.remove('checked');
    }

    // Update the specific encounter item's checked class (works for both main and search cards)
    const encItem = card.querySelector(`.checklist-encounter-item[data-requirement-id="${requirementId}"], .search-encounter-item[data-requirement-id="${requirementId}"]`);
    if (encItem) {
      if (isCompleted) {
        encItem.classList.add('checked');
      } else {
        encItem.classList.remove('checked');
      }
    }

    // Update game ownership badges dynamically
    const ownershipContainer = card.querySelector('.game-ownership-icons');
    if (ownershipContainer) {
      const gamesList = [
        { id: 'red', code: 'R', class: 'active-red' },
        { id: 'blue', code: 'B', class: 'active-blue' },
        { id: 'yellow', code: 'Y', class: 'active-yellow', groupEnd: true },
        { id: 'gold', code: 'G', class: 'active-gold' },
        { id: 'silver', code: 'S', class: 'active-silver' },
        { id: 'crystal', code: 'C', class: 'active-crystal', groupEnd: true },
        { id: 'ruby', code: 'R', class: 'active-ruby' },
        { id: 'sapphire', code: 'S', class: 'active-sapphire' },
        { id: 'emerald', code: 'E', class: 'active-emerald', groupEnd: true },
        { id: 'firered', code: 'FR', class: 'active-firered' },
        { id: 'leafgreen', code: 'LG', class: 'active-leafgreen' }
      ];
      const isSearchCard = card.querySelector('.search-encounter-group') !== null;
      let ownershipHtml = '';
      if (isSearchCard) {
        let obtainableGames = [];
        const searchPkmn = state.searchResults.find(p => p.pokemon_id === pokemonId);
        if (searchPkmn && searchPkmn.obtainable_games) {
          obtainableGames = searchPkmn.obtainable_games;
        }
        ownershipHtml = gamesList.map(g => {
          const isCaught = caughtGames.includes(g.id);
          const isObtainable = obtainableGames.includes(g.id);
          const unobtainableClass = (!isCaught && !isObtainable) ? 'unobtainable' : 'placeholder';
          const groupEndClass = g.groupEnd ? 'group-end' : '';
          return `<span class="game-badge ${isCaught ? g.class : unobtainableClass} ${groupEndClass}" title="${isCaught ? 'Caught' : (isObtainable ? 'Obtainable' : 'Unobtainable')} in ${g.id.charAt(0).toUpperCase() + g.id.slice(1)}">${g.code}</span>`;
        }).join('');
      } else {
        ownershipHtml = gamesList.map(g => {
          const isOwned = caughtGames.includes(g.id);
          const isCurrent = g.id === state.selectedGameId;
          const highlightClass = isOwned ? g.class : '';
          const borderClass = isCurrent ? 'current-game-badge' : '';
          return `<span class="badge ${highlightClass} ${borderClass}">${g.code}</span>`;
        }).join('');
      }
      ownershipContainer.innerHTML = ownershipHtml;
    }

    // Update trade button dynamically
    const footerRow = card.querySelector('.card-footer-row');
    if (footerRow) {
      const existingTrade = footerRow.querySelector('.trade-trigger-container');
      if (existingTrade) {
        existingTrade.remove();
      }

      if (isCaughtInCurrent) {
        const gamesList = [
          { id: 'red', code: 'R', class: 'active-red' },
          { id: 'blue', code: 'B', class: 'active-blue' },
          { id: 'yellow', code: 'Y', class: 'active-yellow', groupEnd: true },
          { id: 'gold', code: 'G', class: 'active-gold' },
          { id: 'silver', code: 'S', class: 'active-silver' },
          { id: 'crystal', code: 'C', class: 'active-crystal', groupEnd: true },
          { id: 'ruby', code: 'R', class: 'active-ruby' },
          { id: 'sapphire', code: 'S', class: 'active-sapphire' },
          { id: 'emerald', code: 'E', class: 'active-emerald', groupEnd: true },
          { id: 'firered', code: 'FR', class: 'active-firered' },
          { id: 'leafgreen', code: 'LG', class: 'active-leafgreen' }
        ];
        const otherGames = gamesList.filter(g => g.id !== state.selectedGameId);
        const optionsHtml = otherGames.map(g => `
          <button class="trade-option ${g.id}-opt" data-to="${g.id}">Trade to ${g.id.charAt(0).toUpperCase() + g.id.slice(1)}</button>
        `).join('');

        const tradeContainer = document.createElement('div');
        tradeContainer.className = 'trade-trigger-container';
        tradeContainer.innerHTML = `
          <button class="trade-btn">⇄ Trade</button>
          <div class="trade-menu">
            ${optionsHtml}
            <button class="trade-option release-option" style="color: #ff5555; border-top: 1px solid rgba(255,255,255,0.08);" data-to="release">Release (Mark NOT Caught)</button>
          </div>
        `;
        footerRow.appendChild(tradeContainer);

        const tradeBtn = tradeContainer.querySelector('.trade-btn');
        const tradeMenu = tradeContainer.querySelector('.trade-menu');
        
        if (tradeBtn && tradeMenu) {
          tradeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.trade-menu.show').forEach(menu => {
              if (menu !== tradeMenu) menu.classList.remove('show');
            });
            tradeMenu.classList.toggle('show');
          });

          const options = tradeContainer.querySelectorAll('.trade-option');
          options.forEach(opt => {
            opt.addEventListener('click', async (e) => {
              e.stopPropagation();
              tradeMenu.classList.remove('show');
              const toGame = opt.dataset.to;
              const cardName = card.querySelector('.pokemon-name').textContent;
              if (toGame === 'release') {
                await releasePokemon(pokemonId, cardName);
              } else {
                await openTradeModal(pokemonId, cardName, state.selectedGameId, toGame);
              }
            });
          });
        }
      }
    }

    // If Hide Caught filter is active, fade out and remove card from DOM
    if (state.filters.hideCaught && isCaughtInCurrent) {
      card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.remove();
        if (checklistGrid.querySelectorAll('.checklist-card').length === 0) {
          const msg = 'No catch/evolution actions match your active filters.';
          checklistGrid.innerHTML = `<div class="no-items">${msg}</div>`;
        }
      }, 250);
    }
  });

  // Update search encounter item in the global search view
  const searchItems = document.querySelectorAll(`.search-encounter-item[data-requirement-id="${requirementId}"]`);
  searchItems.forEach(searchItem => {
    if (isCompleted) {
      searchItem.classList.add('checked');
    } else {
      searchItem.classList.remove('checked');
    }
  });

  // Update the game ownership badges (the R/B/Y/G/S/C badges) for all instances (both checklist and search view) of this pokemon
  const gamesList = [
    { id: 'red', code: 'R', class: 'active-red' },
    { id: 'blue', code: 'B', class: 'active-blue' },
    { id: 'yellow', code: 'Y', class: 'active-yellow', groupEnd: true },
    { id: 'gold', code: 'G', class: 'active-gold' },
    { id: 'silver', code: 'S', class: 'active-silver' },
    { id: 'crystal', code: 'C', class: 'active-crystal', groupEnd: true },
    { id: 'ruby', code: 'R', class: 'active-ruby' },
    { id: 'sapphire', code: 'S', class: 'active-sapphire' },
    { id: 'emerald', code: 'E', class: 'active-emerald', groupEnd: true },
    { id: 'firered', code: 'FR', class: 'active-firered' },
    { id: 'leafgreen', code: 'LG', class: 'active-leafgreen' }
  ];

  const item = state.checklistItems.find(i => i.pokemon_id === pokemonId) || state.searchResults.find(i => i.pokemon_id === pokemonId);
  const obtainableGames = (item && item.obtainable_games)
    ? (Array.isArray(item.obtainable_games) ? item.obtainable_games : item.obtainable_games.split(','))
    : [];

  // Checklist cards
  const allChecklistCards = document.querySelectorAll(`.checklist-card[data-pokemon-id="${pokemonId}"]`);
  allChecklistCards.forEach(pCard => {
    const badgeContainer = pCard.querySelector('.game-ownership-icons');
    if (badgeContainer) {
      badgeContainer.innerHTML = gamesList.map(g => {
        const isCaught = caughtGames.includes(g.id);
        const isObtainable = obtainableGames.includes(g.id);
        const unobtainableClass = (!isCaught && !isObtainable) ? 'unobtainable' : 'placeholder';
        const groupEndClass = g.groupEnd ? 'group-end' : '';
        return `<span class="game-badge ${isCaught ? g.class : unobtainableClass} ${groupEndClass}" title="${isCaught ? 'Caught' : (isObtainable ? 'Obtainable' : 'Unobtainable')} in ${g.id.charAt(0).toUpperCase() + g.id.slice(1)}">${g.code}</span>`;
      }).join('');
    }
  });

  // Search result cards
  const allSearchCards = document.querySelectorAll(`.search-card[data-pokemon-id="${pokemonId}"]`);
  allSearchCards.forEach(sCard => {
    const badgeContainer = sCard.querySelector('.game-ownership-icons');
    if (badgeContainer) {
      badgeContainer.innerHTML = gamesList.map(g => {
        const isCaught = caughtGames.includes(g.id);
        const isObtainable = obtainableGames.includes(g.id);
        const unobtainableClass = (!isCaught && !isObtainable) ? 'unobtainable' : 'placeholder';
        const groupEndClass = g.groupEnd ? 'group-end' : '';
        return `<span class="game-badge ${isCaught ? g.class : unobtainableClass} ${groupEndClass}" title="${isCaught ? 'Caught' : (isObtainable ? 'Obtainable' : 'Unobtainable')} in ${g.id.charAt(0).toUpperCase() + g.id.slice(1)}">${g.code}</span>`;
      }).join('');
    }
  });
}

// Toggle status of a checklist item (completed <-> incomplete)
async function toggleItemCompletion(requirementId, forcedStatus = null) {
  // Find pokemon and requirement in checklistItems (active game)
  let foundPkmn = null;
  let foundReq = null;
  for (const pkmn of state.checklistItems) {
    const req = pkmn.requirements.find(r => r.requirement_id === requirementId);
    if (req) {
      foundPkmn = pkmn;
      foundReq = req;
      break;
    }
  }

  // Find in search results (global search)
  let searchPkmn = null;
  let searchReq = null;
  for (const pkmn of state.searchResults) {
    const req = pkmn.requirements.find(r => r.requirement_id === requirementId);
    if (req) {
      searchPkmn = pkmn;
      searchReq = req;
      break;
    }
  }

  if (!foundReq && !searchReq) return;

  const currentStatus = foundReq ? foundReq.completed : searchReq.completed;
  const newStatus = forcedStatus !== null ? forcedStatus : (currentStatus === 1 ? 0 : 1);

  // Optimistic UI updates
  if (foundReq) foundReq.completed = newStatus;
  if (searchReq) searchReq.completed = newStatus;

  const pokemonId = foundPkmn ? foundPkmn.pokemon_id : searchPkmn.pokemon_id;
  const reqGameId = foundPkmn ? state.selectedGameId : searchReq.game_id;

  const currentCaughtGames = foundPkmn
    ? (foundPkmn.caught_games ? foundPkmn.caught_games.split(',') : [])
    : (searchPkmn.caught_games ? searchPkmn.caught_games : []);

  // Update optimistic completed status of the pokemon itself for this game
  if (foundPkmn) {
    foundPkmn.completed = foundPkmn.requirements.some(r => r.completed === 1) ? 1 : 0;
  }

  let newCaughtGames;
  if (newStatus === 1) {
    newCaughtGames = [...new Set([...currentCaughtGames, reqGameId])];
  } else {
    // If unchecking, check if any other requirement of this pokemon in this game is still completed
    const hasOtherCompleted = foundPkmn
      ? foundPkmn.requirements.some(r => r.requirement_id !== requirementId && r.completed === 1)
      : searchPkmn.requirements.some(r => r.game_id === reqGameId && r.requirement_id !== requirementId && r.completed === 1);
    
    if (hasOtherCompleted) {
      newCaughtGames = [...currentCaughtGames];
    } else {
      newCaughtGames = currentCaughtGames.filter(g => g !== reqGameId);
    }
  }

  // Sync caught_games and completed to all instances in state
  state.checklistItems.forEach(item => {
    if (item.pokemon_id === pokemonId) {
      item.caught_games = newCaughtGames.join(',');
      item.completed = item.requirements.some(r => r.completed === 1) ? 1 : 0;
    }
  });
  if (searchPkmn) {
    searchPkmn.caught_games = newCaughtGames;
  }

  // Update DOM locally (no full list reload!)
  updateCardDOM(requirementId, pokemonId, newStatus === 1, newCaughtGames);
  calculateAndRenderProgress();
  renderSectionPills();

  try {
    const response = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requirement_id: requirementId, completed: newStatus === 1 })
    });
    if (!response.ok) throw new Error('Server update failed');
    const result = await response.json();
    if (result.success && result.caught_games) {
      // Sync exact caught_games list from server response
      state.checklistItems.forEach(item => {
        if (item.pokemon_id === pokemonId) {
          item.caught_games = result.caught_games.join(',');
          item.completed = item.requirements.some(r => r.completed === 1) ? 1 : 0;
        }
      });
      if (searchPkmn) {
        searchPkmn.caught_games = result.caught_games;
      }
      
      // Update DOM with authoritative data
      updateCardDOM(requirementId, pokemonId, newStatus === 1, result.caught_games);
    }
  } catch (err) {
    console.error('Failed to sync progress with database, reverting:', err);
    // Revert state on error
    if (foundReq) foundReq.completed = currentStatus;
    if (searchReq) searchReq.completed = currentStatus;
    if (foundPkmn) {
      foundPkmn.completed = foundPkmn.requirements.some(r => r.completed === 1) ? 1 : 0;
    }
    state.checklistItems.forEach(item => {
      if (item.pokemon_id === pokemonId) {
        item.caught_games = currentCaughtGames.join(',');
        item.completed = item.requirements.some(r => r.completed === 1) ? 1 : 0;
      }
    });
    if (searchPkmn) {
      searchPkmn.caught_games = currentCaughtGames;
    }
    
    // Revert DOM status
    updateCardDOM(requirementId, pokemonId, currentStatus === 1, currentCaughtGames);
    calculateAndRenderProgress();
    renderSectionPills();
  }
}
// Perform global search
async function performSearch(queryText) {
  state.searchQuery = queryText;
  if (!queryText.trim()) {
    state.searchResults = [];
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
    renderChecklistCards();
    return;
  }

  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(queryText)}`);
    state.searchResults = await res.json();
    renderSearchResults();
  } catch (err) {
    console.error('Search failed:', err);
  }
}

// Render search results in the grid
function renderSearchResults() {
  checklistGrid.innerHTML = '';

  // Render search results banner
  const banner = document.createElement('div');
  banner.className = 'search-results-banner';
  banner.innerHTML = `
    <div>
      <h3>Search Results</h3>
      <p>Found ${state.searchResults.length} matching Pokémon</p>
    </div>
    <button id="search-banner-clear-btn" class="clear-search-btn" style="display: flex;">&times;</button>
  `;
  
  banner.querySelector('#search-banner-clear-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.value = '';
    performSearch('');
  });
  
  checklistGrid.appendChild(banner);

  if (state.searchResults.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'no-items';
    emptyMsg.textContent = 'No Pokémon found matching your query.';
    checklistGrid.appendChild(emptyMsg);
    return;
  }

  state.searchResults.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'checklist-card';
    card.setAttribute('data-pokemon-id', item.pokemon_id);
    card.style.animationDelay = `${index * 0.04}s`;

    // Types html
    const typesHtml = [item.pokemon_type1, item.pokemon_type2]
      .filter(t => t !== null && t !== '')
      .map(t => `<span class="badge type-${t.toLowerCase()}">${t}</span>`)
      .join(' ');

    const paddedDex = String(item.pokemon_id).padStart(3, '0');

    // Ownership badges html
    const gamesList = [
      { id: 'red', code: 'R', class: 'active-red' },
      { id: 'blue', code: 'B', class: 'active-blue' },
      { id: 'yellow', code: 'Y', class: 'active-yellow', groupEnd: true },
      { id: 'gold', code: 'G', class: 'active-gold' },
      { id: 'silver', code: 'S', class: 'active-silver' },
      { id: 'crystal', code: 'C', class: 'active-crystal', groupEnd: true },
      { id: 'ruby', code: 'R', class: 'active-ruby' },
      { id: 'sapphire', code: 'S', class: 'active-sapphire' },
      { id: 'emerald', code: 'E', class: 'active-emerald', groupEnd: true },
      { id: 'firered', code: 'FR', class: 'active-firered' },
      { id: 'leafgreen', code: 'LG', class: 'active-leafgreen' }
    ];

    const caughtGames = item.caught_games ? item.caught_games : [];
    const obtainableGames = item.obtainable_games ? item.obtainable_games : [];
    const ownershipHtml = gamesList.map(g => {
      const isCaught = caughtGames.includes(g.id);
      const isObtainable = obtainableGames.includes(g.id);
      const unobtainableClass = (!isCaught && !isObtainable) ? 'unobtainable' : 'placeholder';
      const groupEndClass = g.groupEnd ? 'group-end' : '';
      return `<span class="game-badge ${isCaught ? g.class : unobtainableClass} ${groupEndClass}" title="${isCaught ? 'Caught' : (isObtainable ? 'Obtainable' : 'Unobtainable')} in ${g.id.charAt(0).toUpperCase() + g.id.slice(1)}">${g.code}</span>`;
    }).join('');

    // Encounters html
    let encountersHtml = '';
    if (item.requirements && item.requirements.length > 0) {
      // Group requirements by game_id
      const groupedReqs = {};
      item.requirements.forEach(req => {
        if (!groupedReqs[req.game_id]) {
          groupedReqs[req.game_id] = [];
        }
        groupedReqs[req.game_id].push(req);
      });

      const processedReqs = [];
      Object.keys(groupedReqs).forEach(gameId => {
        const reqs = groupedReqs[gameId];
        const catchReqs = reqs.filter(r => r.action_type === 'CATCH');
        const evolveReq = reqs.find(r => r.action_type === 'EVOLVE');

        if (catchReqs.length > 0 && evolveReq) {
          // Merge all catch locations and the evolution!
          const wildLocs = catchReqs.map(r => r.location_details.replace(/\s*\(.*\)/, '')).join(' & ');
          const combinedLoc = `${wildLocs} / ${evolveReq.location_details}`;
          const combinedNotes = [...catchReqs.map(r => r.notes), evolveReq.notes].filter(Boolean).join(' | ');
          const isCompleted = catchReqs.some(r => r.completed === 1) || evolveReq.completed === 1;
          const allIds = [...catchReqs.map(r => r.requirement_id), evolveReq.requirement_id];

          processedReqs.push({
            requirement_id: catchReqs[0].requirement_id,
            requirement_ids: allIds,
            game_id: gameId,
            game_name: catchReqs[0].game_name,
            action_type: 'CATCH_EVOLVE',
            location_details: combinedLoc,
            notes: combinedNotes,
            completed: isCompleted ? 1 : 0
          });
        } else {
          reqs.forEach(r => {
            processedReqs.push({
              ...r,
              requirement_ids: [r.requirement_id]
            });
          });
        }
      });

      const rowsHtml = processedReqs.map(req => {
        const actionIconHtml = getActionIconHtml(req.action_type, req.location_details, req.notes);
        const notesHtml = req.notes ? `<div class="encounter-notes">${req.notes}</div>` : '';
        return `
          <div class="search-encounter-item ${req.completed ? 'checked' : ''}" 
               data-requirement-id="${req.requirement_id}" 
               data-requirement-ids="${req.requirement_ids.join(',')}">
            <div class="checkbox-container">
              <div class="custom-checkbox"></div>
            </div>
            <div class="encounter-info">
              <div class="encounter-details">
                <span class="game-tag tag-${req.game_id}">${req.game_name}</span>
                <span class="location-text">${linkifyLocation(req.location_details, req.game_id)}</span>
              </div>
              ${actionIconHtml}
              ${notesHtml}
            </div>
          </div>
        `;
      }).join('');

      encountersHtml = `
        <div class="search-encounter-group">
          <div class="search-encounter-title">Encounters &amp; Actions</div>
          <div class="search-encounter-row">
            ${rowsHtml}
          </div>
        </div>
      `;
    } else {
      encountersHtml = `
        <div class="search-encounter-group">
          <div class="search-encounter-title">Encounters &amp; Actions</div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); font-style: italic; margin-top: 4px;">
            No specific requirements listed for this Pokémon.
          </p>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="card-content">
        <div class="pokemon-header">
          <span class="dex-number">#${paddedDex}</span>
          <span class="pokemon-name">${item.pokemon_name}</span>
          <div class="pokemon-types">${typesHtml}</div>
        </div>
        <div class="card-footer-row" style="margin-top: 8px; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 8px;">
          <div class="game-ownership-icons">
            ${ownershipHtml}
          </div>
        </div>
        ${encountersHtml}
      </div>
    `;

    // Click listener for checking/unchecking individual encounters
    card.querySelectorAll('.search-encounter-item').forEach(encItem => {
      encItem.addEventListener('click', async (e) => {
        e.stopPropagation();
        const reqIds = encItem.dataset.requirementIds.split(',').map(Number);
        const mainReqId = parseInt(encItem.dataset.requirementId);
        
        let searchReq = null;
        for (const pkmn of state.searchResults) {
          const req = pkmn.requirements.find(r => r.requirement_id === mainReqId);
          if (req) { searchReq = req; break; }
        }
        
        const currentStatus = searchReq ? searchReq.completed : 0;
        const newStatus = currentStatus === 1 ? 0 : 1;
        
        await Promise.all(reqIds.map(reqId => toggleItemCompletion(reqId, newStatus)));
      });
    });

    checklistGrid.appendChild(card);
  });
}

let activeTradeData = null;

// Open the trade confirmation modal with target candidates
async function openTradeModal(pokemonId, pokemonName, fromGame, toGame) {
  const targetGameObj = state.games.find(g => g.id === toGame);
  const targetGameName = targetGameObj ? targetGameObj.name : toGame;
  
  document.getElementById('trade-target-game-name').textContent = targetGameName;
  document.getElementById('trade-source-pokemon-name').textContent = pokemonName;
  document.getElementById('trade-target-game-name-empty').textContent = targetGameName;
  
  const optionsContainer = document.getElementById('trade-options-container');
  const emptyMessage = document.getElementById('trade-empty-message');
  const confirmBtn = document.getElementById('confirm-trade-btn');
  const trashCheckbox = document.getElementById('trade-trash-checkbox');
  
  optionsContainer.innerHTML = '';
  emptyMessage.classList.add('hidden');
  confirmBtn.disabled = true;
  if (trashCheckbox) {
    trashCheckbox.checked = false;
  }
  
  activeTradeData = { pokemonId, pokemonName, fromGame, toGame, targetPokemonId: null, isTrash: false };
  
  const modal = document.getElementById('trade-modal');
  modal.classList.remove('hidden');
  
  try {
    const res = await fetch(`/api/caught_pokemon?game_id=${toGame}`);
    const caughtPkmnList = await res.json();
    
    if (caughtPkmnList.length === 0) {
      syncTradeUI();
      return;
    }
    
    caughtPkmnList.forEach(pkmn => {
      const card = document.createElement('div');
      card.className = 'trade-option-card';
      card.dataset.id = pkmn.id;
      
      card.innerHTML = `
        <input type="radio" name="trade-target-radio" value="${pkmn.id}" id="trade-radio-${pkmn.id}">
        <label for="trade-radio-${pkmn.id}" class="trade-option-name">${pkmn.name}</label>
      `;
      
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeTradeData.isTrash) return; // ignore selection if trading for trash
        
        document.querySelectorAll('.trade-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
        
        activeTradeData.targetPokemonId = pkmn.id;
        confirmBtn.disabled = false;
      });
      
      optionsContainer.appendChild(card);
    });

    syncTradeUI();
  } catch (err) {
    console.error('Error loading trade options:', err);
    optionsContainer.innerHTML = '<p class="error">Failed to load trade options.</p>';
    syncTradeUI();
  }
}

// Synchronize UI based on whether trash trade is selected
function syncTradeUI() {
  const trashCheckbox = document.getElementById('trade-trash-checkbox');
  const optionsContainer = document.getElementById('trade-options-container');
  const emptyMessage = document.getElementById('trade-empty-message');
  const confirmBtn = document.getElementById('confirm-trade-btn');
  
  if (!activeTradeData) return;

  const isTrash = trashCheckbox && trashCheckbox.checked;
  if (isTrash) {
    optionsContainer.style.opacity = '0.4';
    optionsContainer.style.pointerEvents = 'none';
    emptyMessage.classList.add('hidden');
    confirmBtn.disabled = false;
    activeTradeData.targetPokemonId = null;
    activeTradeData.isTrash = true;
  } else {
    optionsContainer.style.opacity = '1';
    optionsContainer.style.pointerEvents = 'auto';
    
    const hasOptions = optionsContainer.children.length > 0 && !optionsContainer.querySelector('.error');
    if (!hasOptions) {
      emptyMessage.classList.remove('hidden');
      confirmBtn.disabled = true;
    } else {
      emptyMessage.classList.add('hidden');
      const selectedRadio = optionsContainer.querySelector('input[name="trade-target-radio"]:checked');
      if (selectedRadio) {
        activeTradeData.targetPokemonId = parseInt(selectedRadio.value);
        confirmBtn.disabled = false;
      } else {
        activeTradeData.targetPokemonId = null;
        confirmBtn.disabled = true;
      }
    }
    activeTradeData.isTrash = false;
  }
}

// Close trade modal
function closeTradeModal() {
  const modal = document.getElementById('trade-modal');
  modal.classList.add('hidden');
  activeTradeData = null;
}

// Setup modal event listeners
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('close-trade-modal');
  const cancelBtn = document.getElementById('cancel-trade-btn');
  const confirmBtn = document.getElementById('confirm-trade-btn');
  const trashCheckbox = document.getElementById('trade-trash-checkbox');
  
  if (closeBtn) closeBtn.addEventListener('click', closeTradeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeTradeModal);
  if (trashCheckbox) {
    trashCheckbox.addEventListener('change', () => {
      syncTradeUI();
    });
  }
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      if (!activeTradeData || (!activeTradeData.isTrash && !activeTradeData.targetPokemonId)) return;
      
      const { pokemonId, targetPokemonId, fromGame, toGame, isTrash } = activeTradeData;
      
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'Trading...';
      
      try {
        const response = await fetch('/api/trade_pokemon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pokemon_id: pokemonId,
            target_pokemon_id: targetPokemonId,
            from_game: fromGame,
            to_game: toGame,
            is_trash: !!isTrash
          })
        });
        
        if (!response.ok) throw new Error('Trade request failed');
        
        const result = await response.json();
        if (result.success) {
          // Update in-memory checklistItems state
          state.checklistItems.forEach(item => {
            // Update source Pokémon
            if (item.pokemon_id === pokemonId) {
              item.caught_games = result.caught_games1.join(',');
              if (fromGame === state.selectedGameId) item.completed = 0;
              if (toGame === state.selectedGameId) item.completed = 1;
            }
            // Update target Pokémon (if we swapped for a real caught one)
            if (!isTrash && targetPokemonId && item.pokemon_id === targetPokemonId) {
              item.caught_games = result.caught_games2.join(',');
              if (toGame === state.selectedGameId) item.completed = 0;
              if (fromGame === state.selectedGameId) item.completed = 1;
            }
          });
          
          closeTradeModal();
          
          // Re-render views
          renderChecklistCards();
          calculateAndRenderProgress();
          renderSectionPills();
          
          const activePill = sectionNav.querySelector(`.nav-pill[data-id="${state.selectedSectionId}"]`);
          if (activePill) activePill.classList.add('active');
        }
      } catch (err) {
        console.error('Failed to execute trade:', err);
        alert('Failed to execute Pokémon trade.');
      } finally {
        confirmBtn.textContent = 'Confirm Trade';
        confirmBtn.disabled = false;
      }
    });
  }
});

async function releasePokemon(pokemonId, pokemonName) {
  if (!confirm(`Are you sure you want to release ${pokemonName} and mark it as NOT caught in the current game?`)) {
    return;
  }
  try {
    const response = await fetch('/api/release_pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pokemon_id: pokemonId,
        game_id: state.selectedGameId
      })
    });
    
    if (!response.ok) throw new Error('Release request failed');
    
    const result = await response.json();
    if (result.success) {
      // Update in-memory state
      state.checklistItems.forEach(item => {
        if (item.pokemon_id === pokemonId) {
          item.caught_games = result.caught_games.join(',');
          item.completed = 0;
          item.requirements.forEach(r => {
            r.completed = 0;
          });
        }
      });
      
      // Update search results if active
      const searchPkmn = state.searchResults.find(p => p.pokemon_id === pokemonId);
      if (searchPkmn) {
        searchPkmn.caught_games = result.caught_games;
        searchPkmn.requirements.forEach(r => {
          if (r.game_id === state.selectedGameId) {
            r.completed = 0;
          }
        });
      }
      
      // Re-render
      renderChecklistCards();
      calculateAndRenderProgress();
      renderSectionPills();
      
      const activePill = sectionNav.querySelector(`.nav-pill[data-id="${state.selectedSectionId}"]`);
      if (activePill) activePill.classList.add('active');
    }
  } catch (err) {
    console.error('Failed to release Pokémon:', err);
    alert('Failed to release Pokémon.');
  }
}

// Global click handler to dismiss open trade dropdown menus
document.addEventListener('click', () => {
  document.querySelectorAll('.trade-menu.show').forEach(menu => {
    menu.classList.remove('show');
  });
});

// Calculate progress from in-memory state and update bar
function calculateAndRenderProgress() {
  const total = state.checklistItems.length;
  const completed = state.checklistItems.filter(item => item.completed === 1).length;
  
  updateProgressBar(completed, total);
}

// Update the pinned progress bar elements
function updateProgressBar(completed, total) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  progressFill.style.width = `${percentage}%`;
  progressPercentage.textContent = `${percentage}%`;
  progressRatio.textContent = `${completed} / ${total} Tasks`;
}
