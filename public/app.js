// PokéChecklist Frontend Application Logic

// Application State
let state = {
  games: [],
  selectedGameId: 'yellow',
  sections: [],
  selectedSectionId: null,
  selectedSubTab: 'All',
  checklistItems: [], // Holds all requirements + progress for the selected game
  filters: {
    hideCaught: false,
    showEvolutions: true,
    onlyCarryover: false,
    hideCarryover: false,
    tradeLink: 'all',
    timeOfDay: 'all',
    showHeadbutt: true
  },
  gameFilters: {}, // Maps gameId -> { surf: false, rod: 'none' }
  evolutions: {}, // Static evolution map from database/server
  searchQuery: '',
  searchResults: []
};
const gameColors = {
  red: '#ef4444',
  blue: '#3b82f6',
  yellow: '#eab308',
  gold: '#d97706',
  silver: '#94a3b8',
  crystal: '#38bdf8',
  ruby: '#f43f5e',
  sapphire: '#2563eb',
  emerald: '#10b981',
  firered: '#f97316',
  leafgreen: '#22c55e'
};

// DOM Elements
const dropdownContainer = document.getElementById('game-select-container');
const dropdownTrigger = document.getElementById('dropdown-trigger');
const dropdownMenu = document.getElementById('dropdown-menu');
const sectionNav = document.getElementById('section-nav');
const activeSectionDetails = document.getElementById('active-section-details');
const sectionTitle = document.getElementById('section-title');
const sectionDesc = document.getElementById('section-desc');
const subTabsContainer = document.getElementById('sub-tabs-container');
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

  // Load games from API first
  await loadGames();

  // Set default game from localStorage if available, otherwise Yellow, otherwise first game
  const savedDefault = localStorage.getItem('default_game');
  const hasSavedDefault = savedDefault && state.games.some(g => g.id === savedDefault);
  const defaultGame = hasSavedDefault ? savedDefault : 'yellow';

  // Select the default game
  selectGame(defaultGame);

  // Custom Dropdown Event Listeners
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !dropdownMenu.classList.contains('hidden');
      if (isOpen) {
        dropdownMenu.classList.add('hidden');
        dropdownContainer.classList.remove('open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      } else {
        dropdownMenu.classList.remove('hidden');
        dropdownContainer.classList.add('open');
        dropdownTrigger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Global click listener to close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (dropdownContainer && !dropdownContainer.contains(e.target)) {
      dropdownMenu.classList.add('hidden');
      dropdownContainer.classList.remove('open');
      if (dropdownTrigger) dropdownTrigger.setAttribute('aria-expanded', 'false');
    }
  });

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

  const filterShowEvolutions = document.getElementById('filter-show-evolutions');
  if (filterShowEvolutions) {
    filterShowEvolutions.addEventListener('click', () => {
      state.filters.showEvolutions = !state.filters.showEvolutions;
      filterShowEvolutions.classList.toggle('active', state.filters.showEvolutions);
      saveGameFilters();
      renderChecklistCards();
    });
  }

  const toolHeadbutt = document.getElementById('tool-headbutt');
  if (toolHeadbutt) {
    toolHeadbutt.addEventListener('change', (e) => {
      state.filters.showHeadbutt = e.target.checked;
      saveGameFilters();
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

  const filterTimeOfDay = document.getElementById('filter-time-of-day');
  if (filterTimeOfDay) {
    filterTimeOfDay.addEventListener('change', (e) => {
      state.filters.timeOfDay = e.target.value;
      saveGameFilters();
      renderSubTabs(state.sections.find(s => s.section_id === state.selectedSectionId)?.items);
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

  // Sidebar toggle (mobile)
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const openSidebar = () => { sidebar?.classList.add('open'); sidebarOverlay?.classList.add('open'); menuToggle?.setAttribute('aria-expanded','true'); };
  const closeSidebar = () => { sidebar?.classList.remove('open'); sidebarOverlay?.classList.remove('open'); menuToggle?.setAttribute('aria-expanded','false'); };
  menuToggle?.addEventListener('click', () => sidebar?.classList.contains('open') ? closeSidebar() : openSidebar());
  sidebarOverlay?.addEventListener('click', closeSidebar);
  document.getElementById('section-nav')?.addEventListener('click', () => { if (window.innerWidth < 900) closeSidebar(); });
});

async function loadAndSyncGameFilters() {
  const gameId = state.selectedGameId;
  
  // 1. Read from localStorage for instant, zero-delay settings
  const localSurf = localStorage.getItem(`pokechecklist_${gameId}_surf`) === 'true';
  const localRod = localStorage.getItem(`pokechecklist_${gameId}_rod`) || 'none';
  const localTradeLink = localStorage.getItem(`pokechecklist_${gameId}_trade_link`) || 'all';
  const localSectionId = localStorage.getItem(`pokechecklist_active_section_${gameId}`);
  const localRoute = localStorage.getItem(`pokechecklist_active_route_${gameId}_${localSectionId || 'All'}`) || 'All';
  const localShowHeadbutt = localStorage.getItem(`pokechecklist_${gameId}_show_headbutt`) !== 'false';
  const localShowEvos = localStorage.getItem(`pokechecklist_${gameId}_show_evolutions`) !== 'false';
  const localTimeOfDay = localStorage.getItem(`pokechecklist_${gameId}_time_of_day`) || 'all';

  // Apply to state
  state.gameFilters[gameId] = {
    surf: localSurf,
    rod: localRod,
    trade_link: localTradeLink,
    active_section_id: localSectionId ? Number(localSectionId) : null
  };
  state.selectedSubTab = localRoute;
  state.filters.showHeadbutt = localShowHeadbutt;
  state.filters.showEvolutions = localShowEvos;
  state.filters.timeOfDay = localTimeOfDay;
  state.filters.tradeLink = localTradeLink;

  // Sync to UI
  syncFiltersToUi();

  // 2. Fetch settings from server as backup / cloud sync
  try {
    const res = await fetch(`/api/settings?game_id=${gameId}`);
    const settings = await res.json();
    if (settings) {
      // Server loaded ok, but local state takes precedence for instant response
    }
  } catch (err) {
    console.error('Failed to load settings from server, falling back to local settings:', err);
  }
}

function syncFiltersToUi() {
  const gameId = state.selectedGameId;
  const currentFilters = state.gameFilters[gameId] || { surf: false, rod: 'none', trade_link: 'all' };
  
  const surfCheckbox = document.getElementById('tool-surf');
  if (surfCheckbox) surfCheckbox.checked = !!currentFilters.surf;
  
  const rodSelect = document.getElementById('tool-rod');
  if (rodSelect) rodSelect.value = currentFilters.rod || 'none';
  
  const tradeSelect = document.getElementById('filter-trade-link');
  if (tradeSelect) tradeSelect.value = currentFilters.trade_link || 'all';
  
  const toolHeadbutt = document.getElementById('tool-headbutt');
  if (toolHeadbutt) toolHeadbutt.checked = !!state.filters.showHeadbutt;
  
  const filterShowEvolutions = document.getElementById('filter-show-evolutions');
  if (filterShowEvolutions) {
    filterShowEvolutions.classList.toggle('active', !!state.filters.showEvolutions);
  }
  
  const filterTimeOfDay = document.getElementById('filter-time-of-day');
  if (filterTimeOfDay) filterTimeOfDay.value = state.filters.timeOfDay || 'all';
}

async function saveGameFilters() {
  const gameId = state.selectedGameId;
  const current = state.gameFilters[gameId] || { surf: false, rod: 'none', trade_link: 'all', active_section_id: null };
  
  // Save to localStorage
  localStorage.setItem(`pokechecklist_${gameId}_surf`, current.surf);
  localStorage.setItem(`pokechecklist_${gameId}_rod`, current.rod);
  localStorage.setItem(`pokechecklist_${gameId}_trade_link`, current.trade_link);
  if (current.active_section_id) {
    localStorage.setItem(`pokechecklist_active_section_${gameId}`, current.active_section_id);
  }
  localStorage.setItem(`pokechecklist_active_route_${gameId}_${current.active_section_id || 'All'}`, state.selectedSubTab || 'All');
  localStorage.setItem(`pokechecklist_${gameId}_show_headbutt`, state.filters.showHeadbutt);
  localStorage.setItem(`pokechecklist_${gameId}_show_evolutions`, state.filters.showEvolutions);
  localStorage.setItem(`pokechecklist_${gameId}_time_of_day`, state.filters.timeOfDay);

  // Save to server
  try {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        game_id: gameId,
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
    setDefaultGameBtn.title = 'This is your default game';
  } else {
    setDefaultGameBtn.classList.remove('is-default');
    setDefaultGameBtn.title = 'Set as default game';
  }
}

// Load games from API and populate custom selector
async function loadGames() {
  try {
    const response = await fetch('/api/games');
    state.games = await response.json();
    
    if (!dropdownMenu) return;
    dropdownMenu.innerHTML = '';
    
    const groups = [
      { label: 'Gen 1 (Kanto)', ids: ['red', 'blue', 'yellow'] },
      { label: 'Gen 2 (Johto)', ids: ['gold', 'silver', 'crystal'] },
      { label: 'Gen 3 (Hoenn)', ids: ['ruby', 'sapphire', 'emerald'] },
      { label: 'Gen 1 Remake (Kanto)', ids: ['firered', 'leafgreen'] }
    ];

    groups.forEach(group => {
      const activeGroupGames = group.ids.map(id => state.games.find(g => g.id === id)).filter(Boolean);
      if (activeGroupGames.length === 0) return;

      const groupLabel = document.createElement('div');
      groupLabel.className = 'dropdown-group-label';
      groupLabel.textContent = group.label;
      dropdownMenu.appendChild(groupLabel);

      activeGroupGames.forEach(game => {
        const option = document.createElement('div');
        option.className = 'dropdown-option';
        if (game.id === state.selectedGameId) {
          option.classList.add('active');
        }
        option.setAttribute('role', 'option');
        option.setAttribute('data-value', game.id);

        const color = gameColors[game.id] || '#71717a';
        const pct = game.percentage || 0;
        
        option.innerHTML = `
          <div class="dropdown-option-bar" style="width: ${pct}%; background-color: ${color};"></div>
          <span>${game.name}</span>
          <span class="dropdown-option-percentage">${pct}%</span>
        `;

        option.addEventListener('click', async (e) => {
          e.stopPropagation();
          selectGame(game.id);
          dropdownMenu.classList.add('hidden');
          dropdownContainer.classList.remove('open');
        });

        dropdownMenu.appendChild(option);
      });
    });
    
    updateDropdownTrigger();
  } catch (err) {
    console.error('Failed to load games:', err);
  }
}

function selectGame(gameId) {
  state.selectedGameId = gameId;
  localStorage.setItem('default_game', gameId);
  updateDropdownTrigger();
  
  // Highlight active option in menu
  const options = document.querySelectorAll('.dropdown-option');
  options.forEach(opt => {
    if (opt.getAttribute('data-value') === gameId) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  handleGameChange();
}

function updateDropdownTrigger() {
  const game = state.games.find(g => g.id === state.selectedGameId);
  if (!game) return;

  const selectedName = document.getElementById('dropdown-selected-name');
  const selectedPercentage = document.getElementById('dropdown-selected-percentage');
  const triggerBar = document.getElementById('dropdown-trigger-bar');

  if (selectedName) selectedName.textContent = game.name;
  if (selectedPercentage) selectedPercentage.textContent = `${game.percentage || 0}%`;
  
  if (triggerBar) {
    const color = gameColors[game.id] || '#38bdf8';
    triggerBar.style.width = `${game.percentage || 0}%`;
    triggerBar.style.backgroundColor = color;
  }
}

async function updateDropdownPercentages() {
  try {
    const response = await fetch('/api/games');
    state.games = await response.json();
    
    updateDropdownTrigger();

    state.games.forEach(game => {
      const option = document.querySelector(`.dropdown-option[data-value="${game.id}"]`);
      if (option) {
        const bar = option.querySelector('.dropdown-option-bar');
        const pctSpan = option.querySelector('.dropdown-option-percentage');
        
        if (bar) bar.style.width = `${game.percentage || 0}%`;
        if (pctSpan) pctSpan.textContent = `${game.percentage || 0}%`;
      }
    });
  } catch (err) {
    console.error('Failed to update dropdown percentages:', err);
  }
}

function updateActiveGameTheme(gameId) {
  const activeColor = gameColors[gameId] || '#38bdf8';
  document.documentElement.style.setProperty('--game-active-color', activeColor);
  document.documentElement.style.setProperty('--game-active-color-glow', activeColor + '33');
}

// Handle switching to a different game
async function handleGameChange() {
  try {
    updateActiveGameTheme(state.selectedGameId);
    await loadAndSyncGameFilters();
    // Clear search when switching game
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.value = '';
    state.searchQuery = '';
    state.searchResults = [];
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');

    updateDefaultGameButton();

    const timeFilterWrapper = document.getElementById('time-filter-wrapper');
    if (timeFilterWrapper) {
      const isGen2 = ['gold', 'silver', 'crystal'].includes(state.selectedGameId);
      if (isGen2) {
        timeFilterWrapper.style.display = 'block';
      } else {
        timeFilterWrapper.style.display = 'none';
        state.filters.timeOfDay = 'all';
        const filterTimeSelect = document.getElementById('filter-time-of-day');
        if (filterTimeSelect) filterTimeSelect.value = 'all';
      }
    }

    const headbuttFilterLabel = document.getElementById('headbutt-filter-label');
    const toolHeadbutt = document.getElementById('tool-headbutt');
    if (headbuttFilterLabel) {
      const isGen2 = ['gold', 'silver', 'crystal'].includes(state.selectedGameId);
      if (isGen2) {
        headbuttFilterLabel.style.display = 'flex';
      } else {
        headbuttFilterLabel.style.display = 'none';
        state.filters.showHeadbutt = true;
        if (toolHeadbutt) toolHeadbutt.checked = true;
      }
    }
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
    updateDropdownPercentages();
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
      <div class="nav-pill-inner">
        <span class="pill-title">${titleText}</span>
        <span class="pill-ratio">${completedCount} / ${totalCount}</span>
      </div>
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
  
  // Restore saved sub-tab route for this section
  const savedRoute = localStorage.getItem(`pokechecklist_active_route_${state.selectedGameId}_${sectionId}`) || 'All';
  state.selectedSubTab = savedRoute;

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
    // Update eyebrow label with section index
    const idx = state.sections.findIndex(s => s.id === sectionId);
    const eyebrow = document.getElementById('section-eyebrow');
    if (eyebrow) eyebrow.textContent = `Milestone ${idx + 1} of ${state.sections.length}`;
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
    icon = '/icons/icons8-holding-box-100.png';
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

const kantoOrder = [
  'Pallet Town', 'Route 1', 'Viridian City', 'Route 22', 'Route 2', 'Viridian Forest',
  'Pewter City', 'Route 3', 'Mt. Moon', 'Route 4', 'Cerulean City', 'Route 24', 'Route 25',
  'Route 5', 'Route 6', 'Vermilion City', 'Route 11', "Diglett's Cave", 'Route 9', 'Route 10',
  'Rock Tunnel', 'Lavender Town', 'Pokémon Tower', 'Route 7', 'Route 8', 'Celadon City',
  'Route 16', 'Route 17', 'Route 18', 'Fuchsia City', 'Safari Zone', 'Route 12', 'Route 13',
  'Route 14', 'Route 15', 'Route 19', 'Route 20', 'Seafoam Islands', 'Cinnabar Island',
  'Pokémon Mansion', 'Route 21', 'Power Plant', 'Route 23', 'Victory Road', 'Indigo Plateau',
  'Cerulean Cave'
];

const johtoOrder = [
  'New Bark Town', 'Route 29', 'Cherrygrove City', 'Route 30', 'Route 31', 'Dark Cave',
  'Violet City', 'Sprout Tower', 'Route 32', 'Ruins of Alph', 'Union Cave', 'Route 33',
  'Azalea Town', 'Slowpoke Well', 'Ilex Forest', 'Route 34', 'Goldenrod City', 'National Park',
  'Route 35', 'Route 36', 'Route 37', 'Ecruteak City', 'Burned Tower', 'Tin Tower',
  'Bell Tower', 'Route 38', 'Route 39', 'Olivine City', 'Route 40', 'Whirl Islands',
  'Route 41', 'Cianwood City', 'Route 42', 'Mt. Mortar', 'Mahogany Town', 'Route 43',
  'Lake of Rage', 'Route 44', 'Ice Path', 'Blackthorn City', "Dragon's Den", 'Route 45',
  'Route 46', 'Tohjo Falls', 'Route 27', 'Route 26', 'Victory Road', 'Indigo Plateau',
  'Mt. Silver', 'Route 28'
];

const hoennOrder = [
  'Littleroot Town', 'Route 101', 'Oldale Town', 'Route 102', 'Petalburg City', 'Route 104',
  'Petalburg Woods', 'Rustboro City', 'Route 115', 'Route 116', 'Rusturf Tunnel',
  'Dewford Town', 'Granite Cave', 'Route 106', 'Route 107', 'Route 108', 'Route 109',
  'Slateport City', 'Route 110', 'Trick House', 'New Mauville', 'Mauville City', 'Route 117',
  'Verdanturf Town', 'Route 111', 'Route 112', 'Fiery Path', 'Route 113', 'Fallarbor Town',
  'Route 114', 'Meteor Falls', 'Jagged Pass', 'Mt. Chimney', 'Lavaridge Town', 'Route 118',
  'Route 119', 'Fortree City', 'Route 120', 'Route 121', 'Safari Zone', 'Lilycove City',
  'Route 122', 'Mt. Pyre', 'Route 123', 'Aqua Hideout', 'Magma Hideout', 'Route 124',
  'Mossdeep City', 'Route 125', 'Shoal Cave', 'Space Center', 'Route 127', 'Route 128',
  'Seafloor Cavern', 'Route 126', 'Sootopolis City', 'Cave of Origin', 'Route 129',
  'Route 130', 'Route 131', 'Sky Pillar', 'Pacifidlog Town', 'Route 132', 'Route 133',
  'Route 134', 'Ever Grande City', 'Victory Road', 'Pokémon League', 'Battle Frontier'
];

function getLocationProgressionScore(locName, region) {
  const cleanName = locName.replace(/\s*\([^)]+\)/g, '').trim().toLowerCase();
  
  let orderArray = kantoOrder;
  if (region === 'Johto') orderArray = johtoOrder;
  else if (region === 'Hoenn') orderArray = hoennOrder;
  
  const idx = orderArray.findIndex(name => {
    const lowerName = name.toLowerCase();
    return lowerName.includes(cleanName) || cleanName.includes(lowerName);
  });
  
  return idx !== -1 ? idx : 999;
}

function parseLocations(locationDetails) {
  if (!locationDetails) return [];
  
  let suffix = '';
  let mainText = locationDetails.trim();
  const parenMatch = mainText.match(/\s*\(([^)]+)\)$/);
  if (parenMatch) {
    suffix = ` (${parenMatch[1]})`;
    mainText = mainText.slice(0, parenMatch.index).trim();
  }
  
  const parts = [];
  let depth = 0;
  let current = '';
  for (const ch of mainText) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if ((ch === ',' || ch === '&') && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  
  return parts
    .map(p => {
      let cleaned = p.replace(/\s*\.\.\.\s*$/, '').trim();
      if (suffix && !cleaned.includes(suffix.trim())) {
        cleaned += suffix;
      }
      return cleaned;
    })
    .filter(Boolean);
}

function parseEncounterNotes(locationDetails, notes, gameId) {
  if (!locationDetails) return [];

  let rawEncounters = [];

  // New format: each note segment is prefixed with @Location:method
  if (notes && notes.includes('@') && notes.includes(':')) {
    const noteSegments = notes.split('|').map(n => n.trim()).filter(Boolean);
    const prefixedSegs = noteSegments.filter(s => s.startsWith('@'));

    if (prefixedSegs.length > 0) {
      rawEncounters = prefixedSegs.map(seg => {
        // Format: @CanonicalLocation:Method [Lvl X, Y%]
        const colonIdx = seg.indexOf(':');
        const location = seg.slice(1, colonIdx).trim(); // strip '@'
        const rest = seg.slice(colonIdx + 1).trim();
        return { location, ...parseNoteMeta(rest) };
      });
    }
  }

  // Legacy / fallback: flat pipe-separated notes without location prefix
  if (rawEncounters.length === 0) {
    const locations = parseLocations(locationDetails);

    if (!notes || !notes.includes('|')) {
      const meta = parseNoteMeta(notes || '');
      rawEncounters = locations.map(loc => ({ location: loc, ...meta }));
    } else {
      const noteSegments = notes.split('|').map(n => n.trim());

      if (noteSegments.length === locations.length) {
        rawEncounters = locations.map((loc, i) => ({
          location: loc,
          ...parseNoteMeta(noteSegments[i])
        }));
      } else {
        // Cannot reliably map — just show each location with a generic entry
        rawEncounters = locations.map(loc => ({ location: loc, method: '', level: '', rate: '' }));
      }
    }
  }

  if (gameId) {
    let region = 'Kanto';
    if (['gold', 'silver', 'crystal'].includes(gameId)) region = 'Johto';
    if (['ruby', 'sapphire', 'emerald'].includes(gameId)) region = 'Hoenn';

    rawEncounters.sort((a, b) => {
      const scoreA = getLocationProgressionScore(a.location, region);
      const scoreB = getLocationProgressionScore(b.location, region);
      return scoreA - scoreB;
    });
  }

  // Filter raw encounters by time of day
  const locationsWithTime = parseLocations(locationDetails);
  rawEncounters = rawEncounters.filter(enc => {
    const fullLoc = locationsWithTime.find(l => {
      const canonical = l.replace(/\s*\.\.\.\s*/g, '').replace(/\s*\([^)]*\)\s*$/, '').trim();
      return canonical === enc.location;
    });
    if (fullLoc) {
      return passesTimeOfDayFilter({ location_details: fullLoc }, state.filters.timeOfDay);
    }
    return true;
  });

  const uniqueEncounters = [];
  const seenEnc = new Set();
  for (const enc of rawEncounters) {
    const key = `${enc.location}|${enc.method}|${enc.level}|${enc.rate}`;
    if (!seenEnc.has(key)) {
      seenEnc.add(key);
      uniqueEncounters.push(enc);
    }
  }

  return uniqueEncounters;
}

/**
 * Normalize a method name — collapses Headbutt variants, cleans whitespace.
 */
function normalizeMethod(method) {
  if (!method) return '';
  // Headbutt low / normal / high → Headbutt
  const hb = method.replace(/\bheadbutt\s+(low|normal|high)\b/gi, 'Headbutt');
  // Capitalise first letter
  return hb.trim().replace(/^./, c => c.toUpperCase());
}

/**
 * Parse a level string like "Lv 3" or "Lv 3-6" into { min, max }.
 */
function parseLevelRange(lvl) {
  if (!lvl) return null;
  const m = lvl.match(/(\d+)(?:-(\d+))?/);
  if (!m) return null;
  const min = parseInt(m[1], 10);
  const max = m[2] ? parseInt(m[2], 10) : min;
  return { min, max };
}

/**
 * Merge two level strings into a combined range, e.g. "Lv 3" + "Lv 6" → "Lv 3-6".
 */
function mergeLevels(a, b) {
  const ra = parseLevelRange(a);
  const rb = parseLevelRange(b);
  if (!ra || !rb) return a || b;
  const min = Math.min(ra.min, rb.min);
  const max = Math.max(ra.max, rb.max);
  return min === max ? `Lv ${min}` : `Lv ${min}-${max}`;
}

/**
 * Group flat parsed encounters by location for clean categorized display.
 * Within each location group, normalise method names and deduplicate/merge
 * entries with the same method but different level or rate values.
 */
function groupEncounters(encounters) {
  const groups = [];
  const groupMap = {};

  encounters.forEach(enc => {
    const locKey = enc.location;
    if (!groupMap[locKey]) {
      groupMap[locKey] = { location: locKey, methods: [] };
      groups.push(groupMap[locKey]);
    }
    const normMethod = normalizeMethod(enc.method);
    // Try to merge with an existing entry of the same method
    const existing = groupMap[locKey].methods.find(m => m.method === normMethod);
    if (existing) {
      // Merge level ranges
      if (enc.level && enc.level !== existing.level) {
        existing.level = mergeLevels(existing.level, enc.level);
      }
      // Keep the highest rate (or the first one if they differ)
      // We just keep whatever is already there; no need to change
    } else {
      groupMap[locKey].methods.push({
        method: normMethod,
        level: enc.level,
        rate: enc.rate
      });
    }
  });

  return groups;
}

/**
 * Parse a single note segment like "Walk [Lvl 3-6, 50%]" or "Gift [Lvl 5, 100%]"
 * Returns { method, level, rate }
 */
function parseNoteMeta(noteStr) {
  if (!noteStr) return { method: '', level: '', rate: '' };
  const bracketMatch = noteStr.match(/\[([^\]]+)\]/);
  let method = noteStr.replace(/\[.*\]/, '').trim();
  let level = '';
  let rate = '';
  if (bracketMatch) {
    const inner = bracketMatch[1];
    const lvlMatch = inner.match(/Lvl\s*([\d\-]+)/i);
    const rateMatch = inner.match(/(\d+)%/);
    if (lvlMatch) level = `Lv ${lvlMatch[1]}`;
    if (rateMatch) rate = `${rateMatch[1]}%`;
  }
  return { method, level, rate };
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

  const landmarks = [
    // Cities and Towns
    { name: 'Pallet Town', page: 'Pallet_Town' },
    { name: 'Viridian City', page: 'Viridian_City' },
    { name: 'Pewter City', page: 'Pewter_City' },
    { name: 'Cerulean City', page: 'Cerulean_City' },
    { name: 'Vermilion City', page: 'Vermilion_City' },
    { name: 'Lavender Town', page: 'Lavender_Town' },
    { name: 'Celadon City', page: 'Celadon_City' },
    { name: 'Saffron City', page: 'Saffron_City' },
    { name: 'Fuchsia City', page: 'Fuchsia_City' },
    { name: 'Cinnabar Island', page: 'Cinnabar_Island' },
    { name: 'Indigo Plateau', page: 'Indigo_Plateau' },
    { name: 'New Bark Town', page: 'New_Bark_Town' },
    { name: 'Cherrygrove City', page: 'Cherrygrove_City' },
    { name: 'Violet City', page: 'Violet_City' },
    { name: 'Azalea Town', page: 'Azalea_Town' },
    { name: 'Goldenrod City', page: 'Goldenrod_City' },
    { name: 'Ecruteak City', page: 'Ecruteak_City' },
    { name: 'Olivine City', page: 'Olivine_City' },
    { name: 'Cianwood City', page: 'Cianwood_City' },
    { name: 'Mahogany Town', page: 'Mahogany_Town' },
    { name: 'Blackthorn City', page: 'Blackthorn_City' },
    { name: 'Littleroot Town', page: 'Littleroot_Town' },
    { name: 'Oldale Town', page: 'Oldale_Town' },
    { name: 'Petalburg City', page: 'Petalburg_City' },
    { name: 'Rustboro City', page: 'Rustboro_City' },
    { name: 'Dewford Town', page: 'Dewford_Town' },
    { name: 'Slateport City', page: 'Slateport_City' },
    { name: 'Mauville City', page: 'Mauville_City' },
    { name: 'Verdanturf Town', page: 'Verdanturf_Town' },
    { name: 'Fallarbor Town', page: 'Fallarbor_Town' },
    { name: 'Lavaridge Town', page: 'Lavaridge_Town' },
    { name: 'Fortree City', page: 'Fortree_City' },
    { name: 'Lilycove City', page: 'Lilycove_City' },
    { name: 'Mossdeep City', page: 'Mossdeep_City' },
    { name: 'Sootopolis City', page: 'Sootopolis_City' },
    { name: 'Pacifidlog Town', page: 'Pacifidlog_Town' },
    { name: 'Ever Grande City', page: 'Ever_Grande_City' },

    // Landmarks
    { name: 'Pokémon Mansion', page: 'Pokémon_Mansion' },
    { name: 'Pokemon Mansion', page: 'Pokémon_Mansion' },
    { name: 'Cerulean Cave', page: 'Cerulean_Cave' },
    { name: 'Power Plant', page: 'Power_Plant_(Kanto)' },
    { name: 'Seafoam Islands', page: 'Seafoam_Islands' },
    { name: 'Mt. Moon', page: 'Mt._Moon' },
    { name: 'Mt Moon', page: 'Mt._Moon' },
    { name: 'Rock Tunnel', page: 'Rock_Tunnel' },
    { name: 'Victory Road', page: ['red', 'blue', 'yellow', 'firered', 'leafgreen'].includes(gameId) ? 'Victory_Road_(Kanto)' : 'Victory_Road' },
    { name: 'Viridian Forest', page: 'Viridian_Forest' },
    { name: 'Safari Zone', page: ['ruby', 'sapphire', 'emerald'].includes(gameId) ? 'Safari_Zone_(Hoenn)' : 'Safari_Zone_(Kanto)' },
    { name: "Diglett's Cave", page: "Diglett's_Cave" },
    { name: "Digletts Cave", page: "Diglett's_Cave" },
    { name: 'Pokémon Tower', page: 'Pokémon_Tower' },
    { name: 'Pokemon Tower', page: 'Pokémon_Tower' },
    { name: 'Ruins of Alph', page: 'Ruins_of_Alph' },
    { name: 'Slowpoke Well', page: 'Slowpoke_Well' },
    { name: 'Ilex Forest', page: 'Ilex_Forest' },
    { name: 'National Park', page: 'National_Park_(Johto)' },
    { name: 'Burned Tower', page: 'Burned_Tower' },
    { name: 'Bell Tower', page: 'Bell_Tower' },
    { name: 'Tin Tower', page: 'Bell_Tower' },
    { name: 'Whirl Islands', page: 'Whirl_Islands' },
    { name: 'Mt. Mortar', page: 'Mt._Mortar' },
    { name: 'Mt Mortar', page: 'Mt._Mortar' },
    { name: 'Lake of Rage', page: 'Lake_of_Rage' },
    { name: 'Lake Of Rage', page: 'Lake_of_Rage' },
    { name: 'Ice Path', page: 'Ice_Path' },
    { name: "Dragon's Den", page: "Dragon's_Den" },
    { name: "Dragons Den", page: "Dragon's_Den" },
    { name: 'Tohjo Falls', page: 'Tohjo_Falls' },
    { name: 'Mt. Silver', page: 'Mt._Silver' },
    { name: 'Mt Silver', page: 'Mt._Silver' },
    { name: 'Petalburg Woods', page: 'Petalburg_Woods' },
    { name: 'Rusturf Tunnel', page: 'Rusturf_Tunnel' },
    { name: 'Granite Cave', page: 'Granite_Cave' },
    { name: 'New Mauville', page: 'New_Mauville' },
    { name: 'Fiery Path', page: 'Fiery_Path' },
    { name: 'Meteor Falls', page: 'Meteor_Falls' },
    { name: 'Jagged Pass', page: 'Jagged_Pass' },
    { name: 'Mt. Chimney', page: 'Mt._Chimney' },
    { name: 'Mt Chimney', page: 'Mt._Chimney' },
    { name: 'Mt. Pyre', page: 'Mt._Pyre' },
    { name: 'Mt Pyre', page: 'Mt._Pyre' },
    { name: 'Shoal Cave', page: 'Shoal_Cave' },
    { name: 'Seafloor Cavern', page: 'Seafloor_Cavern' },
    { name: 'Cave of Origin', page: 'Cave_of_Origin' },
    { name: 'Sky Pillar', page: 'Sky_Pillar' }
  ];

  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sortedLandmarks = [...landmarks].sort((a, b) => b.name.length - a.name.length);
  
  const routeRegexStr = `Route\\s+\\d+(?:(?:\\s*(?:,|&|and)\\s*)\\d+)*`;
  const landmarkRegexStr = sortedLandmarks.map(l => escapeRegExp(l.name)).join('|');
  const combinedRegex = new RegExp(`(${routeRegexStr})|(${landmarkRegexStr})`, 'gi');

  return locationText.replace(combinedRegex, (match, routeMatch, landmarkMatch) => {
    if (routeMatch) {
      const numbers = routeMatch.match(/\d+/g);
      if (!numbers) return match;
      
      const separators = routeMatch.split(/\d+/);
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
    }
    
    if (landmarkMatch) {
      const landmark = sortedLandmarks.find(l => l.name.toLowerCase() === landmarkMatch.toLowerCase());
      if (landmark) {
        const page = typeof landmark.page === 'function' ? landmark.page(gameId) : landmark.page;
        const url = `https://bulbapedia.bulbagarden.net/wiki/${page}`;
        return `<a href="${url}" target="_blank" class="location-link" rel="noopener noreferrer" onclick="event.stopPropagation()">${landmarkMatch}</a>`;
      }
    }
    
    return match;
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

// Helper to check if a single requirement passes time of day filters (Morning, Day, Night) for Gen 2
function passesTimeOfDayFilter(req, timeFilter) {
  if (timeFilter === 'all') return true;
  
  const loc = (req.location_details || '').toLowerCase();
  
  // If there are no parenthesis, it's available all day
  if (!loc.includes('(')) return true;
  
  // Extract the text inside parenthesis
  const timeMatch = loc.match(/\(([^)]+)\)/);
  if (!timeMatch) return true;
  
  const timeText = timeMatch[1].toLowerCase();
  
  // If it says "all day", it's always available
  if (timeText.includes('all day')) return true;
  
  // Let's check other keywords: morning, day, night
  const hasMorning = timeText.includes('morning');
  const hasDay = timeText.includes('day');
  const hasNight = timeText.includes('night');
  
  // If the timeText doesn't have morning/day/night, it's not a time filter (e.g. "grass", "surf", "headbutt")
  if (!hasMorning && !hasDay && !hasNight) return true;
  
  if (timeFilter === 'day') {
    // Return true if it is available in Morning or Day
    return hasDay || hasMorning;
  }
  
  if (timeFilter === 'night') {
    // Return true if it is available in Night
    return hasNight;
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
      const passesHeadbutt = state.filters.showHeadbutt || !(req.location_details || '').toLowerCase().includes('headbutt');
      return passesProgressionFilters(req, currentFilters) && passesTimeOfDayFilter(req, state.filters.timeOfDay) && passesHeadbutt;
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

// Helper to extract all clean locations/routes for a given Pokémon ID (recursively resolving pre-evolutions)
function getPokemonLocations(pokemonId, visited = new Set()) {
  if (visited.has(pokemonId)) return [];
  visited.add(pokemonId);

  const item = state.checklistItems.find(i => i.pokemon_id === pokemonId);
  if (!item) return [];
  
  let locations = [];
  item.requirements.forEach(req => {
    if (req.action_type === 'EVOLVE') {
      const evo = state.evolutions && state.evolutions[pokemonId];
      if (evo && evo.from) {
        locations = locations.concat(getPokemonLocations(evo.from, visited));
      }
    } else if (req.action_type === 'BREED') {
      const babyEvoTargetId = Object.keys(state.evolutions).find(key => state.evolutions[key].from === pokemonId);
      if (babyEvoTargetId) {
        locations = locations.concat(getPokemonLocations(Number(babyEvoTargetId), visited));
      }
    } else {
      locations = locations.concat(getCleanLocationNames(req, pokemonId, visited));
    }
  });
  return Array.from(new Set(locations));
}

// Helper to extract clean location/route names from a requirement
function getCleanLocationNames(req, pokemonId, visited = new Set()) {
  if (req.action_type === 'TRADE') {
    if (req.location_details === 'Link Trade') return ['Link Trade'];
    const match = req.location_details.match(/^([^(]+)/);
    return match ? [match[1].trim()] : [req.location_details];
  }
  if (req.action_type === 'EVOLVE') {
    const evo = state.evolutions && state.evolutions[pokemonId];
    if (evo && evo.from) {
      return ['Evolve'].concat(getPokemonLocations(evo.from, visited));
    }
    return ['Evolve'];
  }
  if (req.action_type === 'BREED') {
    const babyEvoTargetId = Object.keys(state.evolutions).find(key => state.evolutions[key].from === pokemonId);
    if (babyEvoTargetId) {
      return ['Breed'].concat(getPokemonLocations(Number(babyEvoTargetId), visited));
    }
    return ['Breed'];
  }
  
  // Robust parsing of CATCH / GIFT location details to extract all unique route/location names
  const details = req.location_details || '';
  const parts = [];
  let depth = 0;
  let current = '';
  for (const ch of details) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  
  const locations = [];
  parts.forEach(part => {
    let clean = part.replace(/\([^)]*\)/g, '').replace(/\.\.\./g, '').trim();
    const subParts = clean.split(/&|\band\b/gi).map(p => p.trim());
    subParts.forEach(sp => {
      if (sp) {
        const routeMatch = sp.match(/Route\s+(\d+)/i);
        if (routeMatch) {
          locations.push(`Route ${routeMatch[1]}`);
        } else {
          locations.push(sp);
        }
      }
    });
  });
  
  return Array.from(new Set(locations));
}


// Render sub-tabs for route-based filtering
function renderSubTabs(sectionItems) {
  if (!subTabsContainer) return;
  
  if (!sectionItems || sectionItems.length === 0) {
    subTabsContainer.innerHTML = '';
    subTabsContainer.classList.add('hidden');
    return;
  }

  const currentFilters = state.gameFilters[state.selectedGameId] || { surf: false, rod: 'none' };
  const locations = new Set();

  sectionItems.forEach(item => {
    item.requirements.forEach(req => {
      let passes = true;
      if (req.action_type === 'CATCH' || req.action_type === 'GIFT') {
        const passesHeadbutt = state.filters.showHeadbutt || !(req.location_details || '').toLowerCase().includes('headbutt');
        passes = passesProgressionFilters(req, currentFilters) && passesTimeOfDayFilter(req, state.filters.timeOfDay) && passesHeadbutt;
      } else if (req.action_type === 'EVOLVE') {
        if (!state.filters.showEvolutions) {
          passes = false;
        } else {
          const evo = state.evolutions && state.evolutions[item.pokemon_id];
          if (evo && evo.from) {
            passes = isPokemonObtainable(evo.from, currentFilters);
          }
        }
      } else if (req.action_type === 'BREED') {
        if (!state.filters.showEvolutions) {
          passes = false;
        } else {
          const babyEvoTargetId = Object.keys(state.evolutions).find(key => state.evolutions[key].from === item.pokemon_id);
          if (babyEvoTargetId) {
            passes = isPokemonObtainable(Number(babyEvoTargetId), currentFilters);
          }
        }
      }

      if (passes) {
        const names = getCleanLocationNames(req, item.pokemon_id);
        names.forEach(name => locations.add(name));
      }
    });
  });

  if (locations.size === 0) {
    subTabsContainer.innerHTML = '';
    subTabsContainer.classList.add('hidden');
    return;
  }

  const locList = Array.from(locations).sort((a, b) => {
    const aRoute = a.startsWith('Route ');
    const bRoute = b.startsWith('Route ');
    if (aRoute && !bRoute) return -1;
    if (!aRoute && bRoute) return 1;
    if (aRoute && bRoute) {
      const aNum = parseInt(a.replace('Route ', ''), 10);
      const bNum = parseInt(b.replace('Route ', ''), 10);
      if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
      return a.localeCompare(b);
    }
    
    const specials = ['Evolve', 'Breed', 'Link Trade'];
    const aSpec = specials.indexOf(a);
    const bSpec = specials.indexOf(b);
    if (aSpec !== -1 && bSpec === -1) return 1;
    if (aSpec === -1 && bSpec !== -1) return -1;
    if (aSpec !== -1 && bSpec !== -1) return aSpec - bSpec;
    
    return a.localeCompare(b);
  });

  locList.unshift('All');

  if (!locList.includes(state.selectedSubTab)) {
    state.selectedSubTab = 'All';
  }

  // Check if identical to existing buttons to prevent layout thrashing
  const currentRendered = Array.from(subTabsContainer.querySelectorAll('.sub-tab')).map(b => b.textContent);
  const isIdentical = currentRendered.length === locList.length && currentRendered.every((val, index) => val === locList[index]);
  
  if (isIdentical) {
    const buttons = subTabsContainer.querySelectorAll('.sub-tab');
    buttons.forEach(btn => {
      if (btn.textContent === state.selectedSubTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    return;
  }

  subTabsContainer.innerHTML = '';
  locList.forEach(loc => {
    const btn = document.createElement('button');
    btn.className = `sub-tab ${state.selectedSubTab === loc ? 'active' : ''}`;
    btn.textContent = loc;
    btn.addEventListener('click', () => {
      const siblings = subTabsContainer.querySelectorAll('.sub-tab');
      siblings.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      
      state.selectedSubTab = loc;
      saveGameFilters();
      renderChecklistCards();
    });
    subTabsContainer.appendChild(btn);
  });

  subTabsContainer.classList.remove('hidden');
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
        const passesHeadbutt = state.filters.showHeadbutt || !(req.location_details || '').toLowerCase().includes('headbutt');
        return passesProgressionFilters(req, currentFilters) && passesTimeOfDayFilter(req, state.filters.timeOfDay) && passesHeadbutt;
      }
      if (req.action_type === 'EVOLVE') {
        if (!state.filters.showEvolutions) return false;
        const evo = state.evolutions && state.evolutions[item.pokemon_id];
        if (evo && evo.from) {
          // If the pre-evolution isn't obtainable, hide the evolution card/method
          return isPokemonObtainable(evo.from, currentFilters);
        }
      }
      if (req.action_type === 'BREED') {
        if (!state.filters.showEvolutions) return false;
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

  // Render sub-tabs for route-based filtering based on visible items
  renderSubTabs(filteredItems);

  // Apply Sub-Tab Route Filter
  if (state.selectedSubTab !== 'All') {
    filteredItems = filteredItems.filter(item => {
      return item.requirements.some(req => {
        const names = getCleanLocationNames(req, item.pokemon_id);
        return names.includes(state.selectedSubTab);
      });
    });
  }

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
      // Only inject ancestors for stage-2+ Pokémon whose stage-1 root is missing
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

      // For CATCH/GIFT: parse each location+note as a separate sub-row
      if ((req.action_type === 'CATCH' || req.action_type === 'GIFT') && req.notes) {
        const encounters = parseEncounterNotes(req.location_details, req.notes, state.selectedGameId);
        const groups = groupEncounters(encounters);
        
        const hideAllCaught = req.completed; // Collapse all if caught
        
        const groupsHtml = groups.map((group, groupIdx) => {
          const isTabMatch = state.selectedSubTab !== 'All' && group.location.toLowerCase().includes(state.selectedSubTab.toLowerCase());
          
          let isHiddenClass = '';
          if (hideAllCaught) {
            isHiddenClass = 'hidden-encounter-group hidden';
          } else {
            isHiddenClass = (groupIdx >= 5 && !isTabMatch) ? 'hidden-encounter-group hidden' : '';
          }
          const highlightClass = '';
          
          const methodsHtml = group.methods.map(m => {
            const levelHtml = m.level ? `<span class="enc-level">${m.level}</span>` : '';
            const rateHtml = m.rate ? `<span class="enc-rate">${m.rate}</span>` : '';
            return `
              <div class="method-badge">
                ${m.method ? `<span class="enc-method">${m.method}</span>` : ''}
                ${levelHtml}
                ${rateHtml}
              </div>
            `;
          }).join('');
          
          return `
            <div class="encounter-location-group ${isHiddenClass} ${highlightClass}">
              <div class="location-row">
                ${actionIconHtml}
                <span class="location-text">${linkifyLocation(group.location, state.selectedGameId)}</span>
              </div>
              <div class="methods-inline">
                ${methodsHtml}
              </div>
            </div>
          `;
        }).join('');

        const hiddenCount = groups.filter((g, idx) => {
          if (hideAllCaught) return true;
          const isTabMatch = state.selectedSubTab !== 'All' && g.location.toLowerCase().includes(state.selectedSubTab.toLowerCase());
          return idx >= 5 && !isTabMatch;
        }).length;
        
        let expandBtnHtml = '';
        if (hiddenCount > 0) {
          const text = hideAllCaught ? `Caught - Show ${hiddenCount} locations...` : `Show ${hiddenCount} more locations...`;
          expandBtnHtml = `
            <button class="expand-encounters-btn collapsed" onclick="event.stopPropagation();">
              ${text}
            </button>
          `;
        }

        return `
          <div class="checklist-encounter-item ${req.completed ? 'checked' : ''}" data-requirement-id="${req.requirement_id}">
            <div class="checkbox-container">
              <div class="custom-checkbox"></div>
            </div>
            <div class="encounter-info">
              <div class="encounter-groups-container">
                ${groupsHtml}
              </div>
              ${expandBtnHtml}
            </div>
          </div>
        `;
      }

      // For EVOLVE/TRADE/BREED: use notes as plain text
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
          <div class="pokemon-title-row">
            <span class="dex-number">#${paddedDex}</span>
            <span class="pokemon-name">${item.pokemon_name}</span>
          </div>
          <div class="pokemon-header-badges">
            ${carryOverHtml}
            <div class="pokemon-types">${typesHtml}</div>
          </div>
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
        if (e.target.closest('.expand-encounters-btn')) {
          return;
        }
        e.stopPropagation();
        const reqId = parseInt(encItem.dataset.requirementId);
        await toggleItemCompletion(reqId);
      });
    });

    card.querySelectorAll('.expand-encounters-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const infoContainer = btn.closest('.encounter-info');
        const hiddenGroups = infoContainer.querySelectorAll('.hidden-encounter-group');
        const isCollapsed = btn.classList.contains('collapsed');
        
        if (isCollapsed) {
          hiddenGroups.forEach(g => g.classList.remove('hidden'));
          btn.textContent = 'Show less';
          btn.classList.remove('collapsed');
          btn.classList.add('expanded');
        } else {
          hiddenGroups.forEach(g => g.classList.add('hidden'));
          btn.textContent = `Show ${hiddenGroups.length} more locations...`;
          btn.classList.remove('expanded');
          btn.classList.add('collapsed');
        }
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
  updateDropdownPercentages();

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
      updateDropdownPercentages();
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
    updateDropdownPercentages();
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

        if ((req.action_type === 'CATCH' || req.action_type === 'GIFT' || req.action_type === 'CATCH_EVOLVE') && req.notes) {
          const encounters = parseEncounterNotes(req.location_details, req.notes, req.game_id);
          const groups = groupEncounters(encounters);
          const hideAllCaught = req.completed; // Collapse all if caught
            
          const groupsHtml = groups.map((group, groupIdx) => {
            const isTabMatch = req.game_id === state.selectedGameId && state.selectedSubTab !== 'All' && group.location.toLowerCase().includes(state.selectedSubTab.toLowerCase());
            
            let isHiddenClass = '';
            if (hideAllCaught) {
              isHiddenClass = 'hidden-encounter-group hidden';
            } else {
              isHiddenClass = (groupIdx >= 5 && !isTabMatch) ? 'hidden-encounter-group hidden' : '';
            }
            const highlightClass = '';
            
            const methodsHtml = group.methods.map(m => {
              const levelHtml = m.level ? `<span class="enc-level">${m.level}</span>` : '';
              const rateHtml = m.rate ? `<span class="enc-rate">${m.rate}</span>` : '';
              return `
                <div class="method-badge">
                  ${m.method ? `<span class="enc-method">${m.method}</span>` : ''}
                  ${levelHtml}
                  ${rateHtml}
                </div>
              `;
            }).join('');
            
            return `
              <div class="encounter-location-group ${isHiddenClass} ${highlightClass}">
                <div class="location-row">
                  ${actionIconHtml}
                  <span class="location-text">${linkifyLocation(group.location, req.game_id)}</span>
                </div>
                <div class="methods-inline">
                  ${methodsHtml}
                </div>
              </div>
            `;
          }).join('');

          const hiddenCount = groups.filter((g, idx) => {
            if (hideAllCaught) return true;
            const isTabMatch = req.game_id === state.selectedGameId && state.selectedSubTab !== 'All' && g.location.toLowerCase().includes(state.selectedSubTab.toLowerCase());
            return idx >= 5 && !isTabMatch;
          }).length;
          
          let expandBtnHtml = '';
          if (hiddenCount > 0) {
            const text = hideAllCaught ? `Caught - Show ${hiddenCount} locations...` : `Show ${hiddenCount} more locations...`;
            expandBtnHtml = `
              <button class="expand-encounters-btn collapsed" onclick="event.stopPropagation();">
                ${text}
              </button>
            `;
          }

          return `
            <div class="search-encounter-item ${req.completed ? 'checked' : ''}" 
                 data-requirement-id="${req.requirement_id}" 
                 data-requirement-ids="${req.requirement_ids.join(',')}">
              <div class="checkbox-container">
                <div class="custom-checkbox"></div>
              </div>
              <div class="encounter-info">
                <div class="encounter-details" style="margin-bottom: 6px;">
                  <span class="game-tag tag-${req.game_id}">${req.game_name}</span>
                </div>
                <div class="encounter-groups-container">
                  ${groupsHtml}
                </div>
                ${expandBtnHtml}
              </div>
            </div>
          `;
        }

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
          <div class="pokemon-title-row">
            <span class="dex-number">#${paddedDex}</span>
            <span class="pokemon-name">${item.pokemon_name}</span>
          </div>
          <div class="pokemon-header-badges">
            <div class="pokemon-types">${typesHtml}</div>
          </div>
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
        if (e.target.closest('.expand-encounters-btn')) {
          return;
        }
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

    card.querySelectorAll('.expand-encounters-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const infoContainer = btn.closest('.encounter-info');
        const hiddenGroups = infoContainer.querySelectorAll('.hidden-encounter-group');
        const isCollapsed = btn.classList.contains('collapsed');
        
        if (isCollapsed) {
          hiddenGroups.forEach(g => g.classList.remove('hidden'));
          btn.textContent = 'Show less';
          btn.classList.remove('collapsed');
          btn.classList.add('expanded');
        } else {
          hiddenGroups.forEach(g => g.classList.add('hidden'));
          btn.textContent = `Show ${hiddenGroups.length} more locations...`;
          btn.classList.remove('expanded');
          btn.classList.add('collapsed');
        }
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
          updateDropdownPercentages();
          
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
      updateDropdownPercentages();
      
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
