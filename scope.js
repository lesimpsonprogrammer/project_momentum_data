(() => {
  const scopeKey = 'cpsmActiveClientScope';
  const form = document.querySelector('#scopeSearchForm');
  const searchInput = document.querySelector('#scopeSearch');
  const results = document.querySelector('#scopeResults');
  const emptyState = document.querySelector('#scopeEmptyState');
  const activeTitle = document.querySelector('#activeScopeTitle');
  const activeDescription = document.querySelector('#activeScopeDescription');
  const activeDashboard = document.querySelector('#activeScopeDashboard');
  const clearButton = document.querySelector('#clearScopeButton');

  const clients = [
    { id: 'CPSM-1001', name: 'Sample Client Alpha', status: 'Active', team: 'Implementation' },
    { id: 'CPSM-1002', name: 'Sample Client Beta', status: 'Active', team: 'Data Services' },
    { id: 'CPSM-1003', name: 'Sample Client Gamma', status: 'Onboarding', team: 'Project Management' },
  ];

  function clientDashboardHref(client) {
    return `client-portal.html?clientId=${encodeURIComponent(client.id)}`;
  }

  function readScope() {
    try {
      return JSON.parse(localStorage.getItem(scopeKey) || 'null');
    } catch {
      return null;
    }
  }

  function writeScope(client) {
    localStorage.setItem(scopeKey, JSON.stringify({ ...client, selectedAt: new Date().toISOString() }));
    renderActiveScope();
  }

  function clearScope() {
    localStorage.removeItem(scopeKey);
    renderActiveScope();
  }

  function renderActiveScope() {
    const activeScope = readScope();
    if (!activeTitle || !activeDescription || !activeDashboard) return;

    if (!activeScope) {
      activeTitle.textContent = 'No client scope selected';
      activeDescription.textContent = 'Once a client is selected, CPSM will use that client as the active viewing scope for this browser session.';
      activeDashboard.href = 'client-portal.html';
      return;
    }

    activeTitle.textContent = `${activeScope.id} — ${activeScope.name}`;
    activeDescription.textContent = `Active client scope: ${activeScope.status} · ${activeScope.team}. CPSM views should now filter around this client context.`;
    activeDashboard.href = clientDashboardHref(activeScope);
  }

  function createResultRow(client) {
    const row = document.createElement('div');
    row.className = 'directory-result-row scope-result-row';

    const idLink = document.createElement('a');
    idLink.href = clientDashboardHref(client);
    idLink.textContent = client.id;
    idLink.addEventListener('click', () => writeScope(client));
    idLink.setAttribute('aria-label', `Set scope and open ${client.name} dashboard`);

    const name = document.createElement('span');
    name.textContent = client.name;

    const status = document.createElement('span');
    status.textContent = client.status;

    const team = document.createElement('span');
    team.textContent = client.team;

    const scopeButton = document.createElement('button');
    scopeButton.className = 'scope-select-button';
    scopeButton.type = 'button';
    scopeButton.textContent = 'Set Scope';
    scopeButton.addEventListener('click', () => writeScope(client));

    row.appendChild(idLink);
    row.appendChild(name);
    row.appendChild(status);
    row.appendChild(team);
    row.appendChild(scopeButton);
    return row;
  }

  function renderResults(items) {
    if (!results) return;
    results.innerHTML = '';
    items.forEach((client) => results.appendChild(createResultRow(client)));
    if (emptyState) {
      emptyState.hidden = items.length > 0;
      if (!items.length) emptyState.textContent = 'No matching clients found. Try searching by Client ID or Client Name.';
    }
  }

  function handleSearch(event) {
    event?.preventDefault();
    const query = (searchInput?.value || '').trim().toLowerCase();
    if (!query) {
      renderResults(clients);
      return;
    }
    const matches = clients.filter((client) => [client.id, client.name, client.status, client.team].some((value) => value.toLowerCase().includes(query)));
    renderResults(matches);
  }

  form?.addEventListener('submit', handleSearch);
  searchInput?.addEventListener('input', handleSearch);
  clearButton?.addEventListener('click', clearScope);
  renderResults(clients);
  renderActiveScope();
})();
