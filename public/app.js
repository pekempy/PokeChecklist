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
    hideCarryover: false
  },
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
});

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

    // 4. Default to the first section
    if (state.sections.length > 0) {
      selectSection(state.sections[0].id);
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

// Render checklist item cards for the selected section
function renderChecklistCards() {
  checklistGrid.innerHTML = '';

  const currentSection = state.sections.find(s => s.id === state.selectedSectionId);
  const currentOrderIndex = currentSection ? currentSection.order_index : 1;

  let filteredItems = state.checklistItems.filter(item => {
    if (item.section_id === state.selectedSectionId) {
      return true;
    }
    const itemSection = state.sections.find(s => s.id === item.section_id);
    if (itemSection && itemSection.order_index < currentOrderIndex) {
      return item.completed === 0 && item.action_type === 'EVOLVE';
    }
    return false;
  });

  if (state.filters.hideCaught) {
    filteredItems = filteredItems.filter(item => item.completed === 0);
  }

  if (state.filters.onlyCarryover) {
    filteredItems = filteredItems.filter(item => item.section_id !== state.selectedSectionId);
  }

  if (state.filters.hideCarryover) {
    filteredItems = filteredItems.filter(item => item.section_id === state.selectedSectionId);
  }

  if (filteredItems.length === 0) {
    const hasActiveFilters = state.filters.hideCaught || state.filters.onlyCarryover || state.filters.hideCarryover;
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

  filteredItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.setAttribute('data-requirement-id', item.requirement_id);

    const stageClass = item.evolution_stage === 2 ? 'evo-stage-2' : (item.evolution_stage >= 3 ? 'evo-stage-3' : '');
    card.className = `checklist-card ${item.completed ? 'checked' : ''} ${stageClass}`;
    card.style.animationDelay = `${index * 0.04}s`;
    const typesHtml = [item.pokemon_type1, item.pokemon_type2]
      .filter(t => t !== null && t !== '')
      .map(t => `<span class="badge type-${t.toLowerCase()}">${t}</span>`).join(' ');
    const paddedDex = String(item.pokemon_id).padStart(3, '0');
    const actionClass = `action-${item.action_type.toLowerCase()}`;
    const notesHtml = item.notes ? `<div class="notes-row">${item.notes}</div>` : '';
    const caughtGames = item.caught_games ? item.caught_games.split(',') : [];
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
  const groupEndClass = g.groupEnd ? 'group-end' : '';
  return `<span class="game-badge ${isCaught ? g.class : 'placeholder'} ${groupEndClass}" title="Caught in ${g.id}">${g.code}</span>`;
}).join('');
    const isCaughtInCurrent = caughtGames.includes(state.selectedGameId);
    let tradeButtonHtml = '';
    if (isCaughtInCurrent) {
      const otherGames = gamesList.filter(g => g.id !== state.selectedGameId);
      const optionsHtml = otherGames.map(g => `\n        <button class="trade-option ${g.id}-opt" data-to="${g.id}">Trade to ${g.id.charAt(0).toUpperCase() + g.id.slice(1)}</button>`).join('');
      tradeButtonHtml = `\n        <div class="trade-trigger-container">\n          <button class="trade-btn">⇄ Trade</button>\n          <div class="trade-menu">${optionsHtml}</div>\n        </div>`;
    }
    const isCarryOver = item.section_id !== state.selectedSectionId;
    const carryOverHtml = isCarryOver ? `<span class="carry-over-badge">↩ Carry Over</span>` : '';
    card.innerHTML = `\n      <div class="checkbox-container"><div class="custom-checkbox"></div></div>\n      <div class="card-content">\n        <div class="pokemon-header"><span class="dex-number">#${paddedDex}</span><span class="pokemon-name">${item.pokemon_name}</span>${carryOverHtml}<div class="pokemon-types">${typesHtml}</div></div>\n        <div class="location-row"><span class="action-badge ${actionClass}">${item.action_type}</span><span class="location-text">${item.location_details}</span></div>\n        ${notesHtml}\n        <div class="card-footer-row"><div class="game-ownership-icons">${ownershipHtml}</div>${tradeButtonHtml}</div>\n      </div>`;
    card.addEventListener('click', async (e) => {
      if (e.target.closest('.card-footer-row')) return;
      e.stopPropagation();
      await toggleItemCompletion(item.requirement_id);
    });
    if (isCaughtInCurrent) {
      const tradeBtn = card.querySelector('.trade-btn');
      const tradeMenu = card.querySelector('.trade-menu');
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
          await openTradeModal(item.pokemon_id, item.pokemon_name, state.selectedGameId, opt.dataset.to);
        });
      });
    }
    checklistGrid.appendChild(card);
  });
  checklistGrid.scrollTop = previousScroll;
}

  
  const currentSection = state.sections.find(s => s.id === state.selectedSectionId);
  const currentOrderIndex = currentSection ? currentSection.order_index : 1;

  let filteredItems = state.checklistItems.filter(item => {
    // 1. Current section items
    if (item.section_id === state.selectedSectionId) {
      return true;
    }
    // 2. Uncompleted evolutions from previous sections (carry over)
    const itemSection = state.sections.find(s => s.id === item.section_id);
    if (itemSection && itemSection.order_index < currentOrderIndex) {
      return item.completed === 0 && item.action_type === 'EVOLVE';
    }
    return false;
  });

  // Apply Hide Caught filter
  if (state.filters.hideCaught) {
    filteredItems = filteredItems.filter(item => item.completed === 0);
  }

  // Apply Only Carry-Over filter
  if (state.filters.onlyCarryover) {
    filteredItems = filteredItems.filter(item => item.section_id !== state.selectedSectionId);
  }

  // Apply Hide Carry-Over filter
  if (state.filters.hideCarryover) {
    filteredItems = filteredItems.filter(item => item.section_id === state.selectedSectionId);
  }

  if (filteredItems.length === 0) {
    const hasActiveFilters = state.filters.hideCaught || state.filters.onlyCarryover || state.filters.hideCarryover;
    const msg = hasActiveFilters 
      ? 'No catch/evolution actions match your active filters.' 
      : 'No catch/evolution actions in this section.';
    checklistGrid.innerHTML = `<div class="no-items">${msg}</div>`;
// return; // disabled stray return
  }

  // Check if all items in active section are completed
  const allCompleted = filteredItems.every(item => item.completed === 1);
  if (allCompleted) {
    activeSectionDetails.classList.add('section-complete');
  } else {
    activeSectionDetails.classList.remove('section-complete');
  }

  filteredItems.forEach((item, index) => {
    const card = document.createElement('div');
    const stageClass = item.evolution_stage === 2 ? 'evo-stage-2' : (item.evolution_stage >= 3 ? 'evo-stage-3' : '');
    card.className = `checklist-card ${item.completed ? 'checked' : ''} ${stageClass}`;
    // Delay animation slightly per card for a staggered entrance effect
    card.style.animationDelay = `${index * 0.04}s`;
    
    // Create badges for types
    const typesHtml = [item.pokemon_type1, item.pokemon_type2]
      .filter(t => t !== null && t !== '')
      .map(t => `<span class="badge type-${t.toLowerCase()}">${t}</span>`)
      .join(' ');

    // Pad pokedex number
    const paddedDex = String(item.pokemon_id).padStart(3, '0');

    // Create Action Badge Class
    const actionClass = `action-${item.action_type.toLowerCase()}`;

    // Notes HTML
    const notesHtml = item.notes ? `<div class="notes-row">${item.notes}</div>` : '';

    // Parse caught games
    const caughtGames = item.caught_games ? item.caught_games.split(',') : [];

    // Render game badges
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
      const isCaught = caughtGames.includes(g.id);
      const groupEndClass = g.groupEnd ? 'group-end' : '';
      return `<span class="game-badge ${isCaught ? g.class : ''} ${groupEndClass}" title="Caught in ${g.id}">${g.code}</span>`;
    }).join('');

    // Generate trade options if caught in current game
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
          </div>
        </div>
      `;
    }

    const isCarryOver = item.section_id !== state.selectedSectionId;
    const carryOverHtml = isCarryOver ? `<span class="carry-over-badge">↩ Carry Over</span>` : '';

    card.innerHTML = `
      <div class="checkbox-container">
        <div class="custom-checkbox"></div>
      </div>
      <div class="card-content">
        <div class="pokemon-header">
          <span class="dex-number">#${paddedDex}</span>
          <span class="pokemon-name">${item.pokemon_name}</span>
          ${carryOverHtml}
          <div class="pokemon-types">${typesHtml}</div>
        </div>
        <div class="location-row">
          <span class="action-badge ${actionClass}">${item.action_type}</span>
          <span class="location-text">${item.location_details}</span>
        </div>
        ${notesHtml}
        <div class="card-footer-row">
          <div class="game-ownership-icons">
            ${ownershipHtml}
          </div>
          ${tradeButtonHtml}
        </div>
      </div>
    `;

    // Click on checkbox or card itself toggles completion (ignoring footer interactions)
    card.addEventListener('click', async (e) => {
      if (e.target.closest('.card-footer-row')) {
        return;
      }
      e.stopPropagation();
      await toggleItemCompletion(item.requirement_id);
    });

    // Set up trade dropdown toggling
    if (isCaughtInCurrent) {
      const tradeBtn = card.querySelector('.trade-btn');
      const tradeMenu = card.querySelector('.trade-menu');
      
      tradeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close all other open trade menus first
        document.querySelectorAll('.trade-menu.show').forEach(menu => {
          if (menu !== tradeMenu) menu.classList.remove('show');
        });
        tradeMenu.classList.toggle('show');
      });

      // Handle trade options
      const options = card.querySelectorAll('.trade-option');
      options.forEach(opt => {
        opt.addEventListener('click', async (e) => {
          e.stopPropagation();
          tradeMenu.classList.remove('show');
          const toGame = opt.dataset.to;
          await openTradeModal(item.pokemon_id, item.pokemon_name, state.selectedGameId, toGame);
        });
      });
    }

    checklistGrid.appendChild(card);
  });


// Toggle status of a checklist item (completed <-> incomplete)
async function toggleItemCompletion(requirementId) {
  // Find item in checklistItems (active game)
  const itemIndex = state.checklistItems.findIndex(i => i.requirement_id === requirementId);
  
  // Find item in search results (global search)
  let searchReq = null;
  let searchPkmn = null;
  for (const pkmn of state.searchResults) {
    const req = pkmn.requirements.find(r => r.requirement_id === requirementId);
    if (req) {
      searchReq = req;
      searchPkmn = pkmn;
      break;
    }
  }

  if (itemIndex === -1 && !searchReq) return;

  // Determine current status
  const currentStatus = itemIndex !== -1 
    ? state.checklistItems[itemIndex].completed 
    : searchReq.completed;
  
  const newStatus = currentStatus === 1 ? 0 : 1;

  // Optimistic UI updates
  if (itemIndex !== -1) {
    state.checklistItems[itemIndex].completed = newStatus;
  }
  if (searchReq) {
    searchReq.completed = newStatus;
  }

  // Get pokemonId
  const pokemonId = itemIndex !== -1 
    ? state.checklistItems[itemIndex].pokemon_id 
    : searchPkmn.pokemon_id;

  // Optimistic caught_games update (add/remove the game where the requirement belongs)
  const reqGameId = itemIndex !== -1
    ? state.selectedGameId
    : searchReq.game_id;

  const currentCaughtGames = itemIndex !== -1
    ? (state.checklistItems[itemIndex].caught_games ? state.checklistItems[itemIndex].caught_games.split(',') : [])
    : (searchPkmn.caught_games ? searchPkmn.caught_games : []);

  let newCaughtGames;
  if (newStatus === 1) {
    newCaughtGames = [...new Set([...currentCaughtGames, reqGameId])];
  } else {
    newCaughtGames = currentCaughtGames.filter(g => g !== reqGameId);
  }

  // Sync caught_games to all instances of this pokemon
  state.checklistItems.forEach(item => {
    if (item.pokemon_id === pokemonId) {
      item.caught_games = newCaughtGames.join(',');
    }
  });
  if (searchPkmn) {
    searchPkmn.caught_games = newCaughtGames;
  }

  // Re-render UI
  if (state.searchQuery) {
    renderSearchResults();
  } else {
    renderChecklistCards();
  }
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
        }
      });
      if (searchPkmn) {
        searchPkmn.caught_games = result.caught_games;
      }
      
      // Re-render UI with authoritative data
      if (state.searchQuery) {
        renderSearchResults();
      } else {
        renderChecklistCards();
      }
    }
  } catch (err) {
    console.error('Failed to sync progress with database, reverting:', err);
    // Revert state on error
    if (itemIndex !== -1) {
      state.checklistItems[itemIndex].completed = currentStatus;
    }
    if (searchReq) {
      searchReq.completed = currentStatus;
    }
    state.checklistItems.forEach(item => {
      if (item.pokemon_id === pokemonId) {
        item.caught_games = currentCaughtGames.join(',');
      }
    });
    if (searchPkmn) {
      searchPkmn.caught_games = currentCaughtGames;
    }
    
    if (state.searchQuery) {
      renderSearchResults();
    } else {
      renderChecklistCards();
    }
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
    const ownershipHtml = gamesList.map(g => {
      const isCaught = caughtGames.includes(g.id);
      const groupEndClass = g.groupEnd ? 'group-end' : '';
      return `<span class="game-badge ${isCaught ? g.class : 'placeholder'} ${groupEndClass}" title="Caught in ${g.id}">${g.code}</span>`;
    }).join('');

    // Encounters html
    let encountersHtml = '';
    if (item.requirements && item.requirements.length > 0) {
      const rowsHtml = item.requirements.map(req => {
        const actionClass = `action-${req.action_type.toLowerCase()}`;
        const notesHtml = req.notes ? `<div class="encounter-notes">${req.notes}</div>` : '';
        return `
          <div class="search-encounter-item ${req.completed ? 'checked' : ''}" data-requirement-id="${req.requirement_id}">
            <div class="checkbox-container">
              <div class="custom-checkbox"></div>
            </div>
            <div class="encounter-info">
              <div class="encounter-details">
                <span class="game-tag tag-${req.game_id}">${req.game_name}</span>
                <span class="location-text">${req.location_details}</span>
              </div>
              <span class="action-badge ${actionClass} encounter-action">${req.action_type}</span>
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
        const reqId = parseInt(encItem.dataset.requirementId);
        await toggleItemCompletion(reqId);
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
  
  optionsContainer.innerHTML = '';
  emptyMessage.classList.add('hidden');
  confirmBtn.disabled = true;
  
  activeTradeData = { pokemonId, pokemonName, fromGame, toGame, targetPokemonId: null };
  
  const modal = document.getElementById('trade-modal');
  modal.classList.remove('hidden');
  
  try {
    const res = await fetch(`/api/caught_pokemon?game_id=${toGame}`);
    const caughtPkmnList = await res.json();
    
    if (caughtPkmnList.length === 0) {
      emptyMessage.classList.remove('hidden');
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
        document.querySelectorAll('.trade-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
        
        activeTradeData.targetPokemonId = pkmn.id;
        confirmBtn.disabled = false;
      });
      
      optionsContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Error loading trade options:', err);
    optionsContainer.innerHTML = '<p class="error">Failed to load trade options.</p>';
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
  
  if (closeBtn) closeBtn.addEventListener('click', closeTradeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeTradeModal);
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      if (!activeTradeData || !activeTradeData.targetPokemonId) return;
      
      const { pokemonId, targetPokemonId, fromGame, toGame } = activeTradeData;
      
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
            to_game: toGame
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
            // Update target Pokémon
            if (item.pokemon_id === targetPokemonId) {
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
