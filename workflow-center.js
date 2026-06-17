(() => {
  const activeKey = 'cpsmActiveWorkflows';
  const archiveKey = 'cpsmArchivedWorkflows';
  const activeList = document.querySelector('#activeWorkflowList');
  const archiveList = document.querySelector('#workflowArchiveList');
  const restoreList = document.querySelector('#restoreWorkflowList');
  const emptyState = document.querySelector('#workflowEmptyState');
  const archiveEmptyState = document.querySelector('#archiveEmptyState');
  const restoreEmptyState = document.querySelector('#restoreEmptyState');
  const searchInput = document.querySelector('#workflowSearch');
  const filterButton = document.querySelector('#workflowFilterButton');

  function read(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (error) {
      localStorage.removeItem(key);
      return [];
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function workflowSummary(workflow) {
    if (!workflow.conditions?.length) return 'No conditions saved.';
    return workflow.conditions.map((rule) => `IF ${rule.field} ${rule.condition} ${rule.value || '(blank)'} THEN ${rule.action}`).join(' + ');
  }

  function createWorkflowCard(workflow, mode) {
    const card = document.createElement('article');
    card.className = 'saved-workflow-card';
    card.dataset.workflowText = `${workflow.name} ${workflow.description} ${workflowSummary(workflow)}`.toLowerCase();
    const date = workflow.createdAt ? new Date(workflow.createdAt).toLocaleDateString() : 'Preview';
    card.innerHTML = `<div><span>${workflow.status || 'Active'}</span><h3>${workflow.name}</h3><p>${workflow.description || 'No description added.'}</p><small>${workflowSummary(workflow)}</small><em>Created: ${date}</em></div>`;

    const actions = document.createElement('div');
    actions.className = 'saved-workflow-actions';

    if (mode === 'active') {
      const archiveButton = document.createElement('button');
      archiveButton.type = 'button';
      archiveButton.textContent = 'Archive';
      archiveButton.addEventListener('click', () => archiveWorkflow(workflow.id));
      actions.appendChild(archiveButton);
    }

    if (mode === 'restore') {
      const restoreButton = document.createElement('button');
      restoreButton.type = 'button';
      restoreButton.textContent = 'Restore';
      restoreButton.addEventListener('click', () => restoreWorkflow(workflow.id));
      actions.appendChild(restoreButton);
    }

    if (actions.childElementCount) card.appendChild(actions);
    return card;
  }

  function updateCounts() {
    const active = read(activeKey);
    const archived = read(archiveKey);
    const activeCount = document.querySelector('#activeWorkflowCount');
    const conditionCount = document.querySelector('#conditionCount');
    const archivedCount = document.querySelector('#archivedWorkflowCount');
    const exceptionCount = document.querySelector('#exceptionWorkflowCount');
    const totalConditions = active.reduce((sum, workflow) => sum + (workflow.conditions?.length || 0), 0);

    if (activeCount) activeCount.textContent = String(active.length).padStart(2, '0');
    if (conditionCount) conditionCount.textContent = String(totalConditions).padStart(2, '0');
    if (archivedCount) archivedCount.textContent = String(archived.length).padStart(2, '0');
    if (exceptionCount) exceptionCount.textContent = '00';
  }

  function renderActive() {
    if (!activeList) return;
    const workflows = read(activeKey);
    activeList.innerHTML = '';
    workflows.forEach((workflow) => activeList.appendChild(createWorkflowCard(workflow, 'active')));
    if (emptyState) emptyState.hidden = workflows.length > 0;
    updateCounts();
    applySearch();
  }

  function renderArchive() {
    const workflows = read(archiveKey);
    if (archiveList) {
      archiveList.innerHTML = '';
      workflows.forEach((workflow) => archiveList.appendChild(createWorkflowCard(workflow, 'archive')));
      if (archiveEmptyState) archiveEmptyState.hidden = workflows.length > 0;
    }
    if (restoreList) {
      restoreList.innerHTML = '';
      workflows.forEach((workflow) => restoreList.appendChild(createWorkflowCard(workflow, 'restore')));
      if (restoreEmptyState) restoreEmptyState.hidden = workflows.length > 0;
    }
    updateCounts();
  }

  function archiveWorkflow(id) {
    const active = read(activeKey);
    const archived = read(archiveKey);
    const workflow = active.find((item) => item.id === id);
    if (!workflow) return;
    workflow.status = 'Inactive';
    write(activeKey, active.filter((item) => item.id !== id));
    write(archiveKey, [workflow, ...archived]);
    renderActive();
  }

  function restoreWorkflow(id) {
    const active = read(activeKey);
    const archived = read(archiveKey);
    const workflow = archived.find((item) => item.id === id);
    if (!workflow) return;
    workflow.status = 'Active';
    write(archiveKey, archived.filter((item) => item.id !== id));
    write(activeKey, [workflow, ...active]);
    renderArchive();
  }

  function applySearch() {
    if (!activeList) return;
    const query = (searchInput?.value || '').trim().toLowerCase();
    activeList.querySelectorAll('.saved-workflow-card').forEach((card) => {
      card.hidden = query && !card.dataset.workflowText.includes(query);
    });
  }

  searchInput?.addEventListener('input', applySearch);
  filterButton?.addEventListener('click', applySearch);
  renderActive();
  renderArchive();
})();
