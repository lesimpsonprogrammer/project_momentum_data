(() => {
  const board = document.querySelector('#logicBoard');
  const searchInput = document.querySelector('.workflow-toolbar input[type="search"]');
  const statusFilter = document.querySelector('.workflow-toolbar select');
  const filterButton = document.querySelector('.workflow-toolbar button');
  const builder = document.querySelector('#workflowBuilder');
  const dashboardCards = document.querySelectorAll('.workflow-dashboard article strong');
  const storageKey = 'cpsmWorkflowCenterPreviewItems';

  if (!board) return;

  const columns = Array.from(board.querySelectorAll('.workflow-column'));
  const columnNames = columns.map((column) => column.querySelector('h2')?.textContent?.trim() || 'Intake');

  function getColumnStatus(card) {
    const column = card.closest('.workflow-column');
    return column?.querySelector('h2')?.textContent?.trim() || 'Intake';
  }

  function decorateCard(card) {
    if (card.dataset.workflowReady === 'true') return;
    card.dataset.workflowReady = 'true';
    card.dataset.status = getColumnStatus(card);

    const controls = document.createElement('div');
    controls.className = 'workflow-card-controls';

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.textContent = 'Back';

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.textContent = 'Move';

    controls.appendChild(backButton);
    controls.appendChild(nextButton);
    card.appendChild(controls);

    backButton.addEventListener('click', () => moveCard(card, -1));
    nextButton.addEventListener('click', () => moveCard(card, 1));
  }

  function moveCard(card, direction) {
    const currentColumn = card.closest('.workflow-column');
    const currentIndex = columns.indexOf(currentColumn);
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= columns.length) return;
    columns[targetIndex].appendChild(card);
    card.dataset.status = columnNames[targetIndex];
    saveCustomCards();
    updateDashboard();
    applyFilters();
  }

  function updateDashboard() {
    const cards = Array.from(board.querySelectorAll('.workflow-column article'));
    const activeCount = cards.filter((card) => getColumnStatus(card) !== 'Complete').length;
    const reviewCount = cards.filter((card) => getColumnStatus(card) === 'Logic Check').length;
    const completeCount = cards.filter((card) => getColumnStatus(card) === 'Complete').length;
    const exceptionCount = cards.filter((card) => card.textContent.toLowerCase().includes('exception') || card.textContent.toLowerCase().includes('escalat')).length;
    const values = [activeCount, reviewCount, completeCount, exceptionCount];

    dashboardCards.forEach((card, index) => {
      card.textContent = String(values[index] || 0).padStart(2, '0');
    });
  }

  function applyFilters() {
    const searchValue = (searchInput?.value || '').trim().toLowerCase();
    const selectedStatus = statusFilter?.value || 'All statuses';

    board.querySelectorAll('.workflow-column article').forEach((card) => {
      const text = card.textContent.toLowerCase();
      const status = getColumnStatus(card);
      const matchesSearch = !searchValue || text.includes(searchValue);
      const matchesStatus = selectedStatus === 'All statuses' || status.toLowerCase().includes(selectedStatus.toLowerCase());
      card.hidden = !(matchesSearch && matchesStatus);
    });
  }

  function createBuilderForm() {
    if (!builder || builder.querySelector('form')) return;

    const form = document.createElement('form');
    form.className = 'workflow-builder-form';
    form.innerHTML = `
      <label>Workflow name<input name="name" type="text" placeholder="Example: Client file review" required></label>
      <label>Trigger<input name="trigger" type="text" placeholder="Example: Client uploads file" required></label>
      <label>Rule<input name="rule" type="text" placeholder="Example: File type requires review" required></label>
      <label>Owner<input name="owner" type="text" placeholder="Example: Project Manager" required></label>
      <button class="btn primary" type="submit">Add to board</button>
    `;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const item = {
        name: data.get('name'),
        trigger: data.get('trigger'),
        rule: data.get('rule'),
        owner: data.get('owner'),
        status: 'Intake',
        custom: true,
      };
      addCard(item);
      saveCustomCards();
      updateDashboard();
      applyFilters();
      form.reset();
    });

    builder.appendChild(form);
  }

  function addCard(item) {
    const targetColumn = columns.find((column) => column.querySelector('h2')?.textContent?.trim() === item.status) || columns[0];
    const card = document.createElement('article');
    card.dataset.custom = item.custom ? 'true' : 'false';
    card.innerHTML = `<strong>${item.name}</strong><p>Trigger: ${item.trigger}. Rule: ${item.rule}.</p><span>Owner: ${item.owner}</span>`;
    targetColumn.appendChild(card);
    decorateCard(card);
  }

  function saveCustomCards() {
    const customCards = Array.from(board.querySelectorAll('article[data-custom="true"]')).map((card) => ({
      name: card.querySelector('strong')?.textContent || 'Untitled Workflow',
      trigger: card.querySelector('p')?.textContent?.replace(/^Trigger: /, '').split('. Rule: ')[0] || '',
      rule: card.querySelector('p')?.textContent?.split('. Rule: ')[1]?.replace('.', '') || '',
      owner: card.querySelector('span')?.textContent?.replace(/^Owner: /, '') || '',
      status: getColumnStatus(card),
      custom: true,
    }));
    localStorage.setItem(storageKey, JSON.stringify(customCards));
  }

  function loadCustomCards() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      saved.forEach(addCard);
    } catch (error) {
      localStorage.removeItem(storageKey);
    }
  }

  board.querySelectorAll('.workflow-column article').forEach(decorateCard);
  loadCustomCards();
  createBuilderForm();
  updateDashboard();

  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);
  filterButton?.addEventListener('click', applyFilters);
})();
