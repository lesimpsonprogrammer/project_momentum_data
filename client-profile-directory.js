(() => {
  const form = document.querySelector('#clientDirectorySearchForm');
  const searchInput = document.querySelector('#clientDirectorySearch');
  const results = document.querySelector('#clientDirectoryResults');
  const emptyState = document.querySelector('#clientDirectoryEmpty');

  const clients = [
    { id: 'CPSM-1001', name: 'Sample Client Alpha', status: 'Active', team: 'Implementation' },
    { id: 'CPSM-1002', name: 'Sample Client Beta', status: 'Active', team: 'Data Services' },
    { id: 'CPSM-1003', name: 'Sample Client Gamma', status: 'Onboarding', team: 'Project Management' },
  ];

  function clientDashboardHref(client) {
    return `client-portal.html?clientId=${encodeURIComponent(client.id)}`;
  }

  function createResultRow(client) {
    const row = document.createElement('div');
    row.className = 'directory-result-row';

    const idLink = document.createElement('a');
    idLink.href = clientDashboardHref(client);
    idLink.textContent = client.id;
    idLink.setAttribute('aria-label', `Open ${client.name} dashboard`);

    const name = document.createElement('span');
    name.textContent = client.name;

    const status = document.createElement('span');
    status.textContent = client.status;

    const team = document.createElement('span');
    team.textContent = client.team;

    const dashboard = document.createElement('a');
    dashboard.href = clientDashboardHref(client);
    dashboard.textContent = 'Open';

    row.appendChild(idLink);
    row.appendChild(name);
    row.appendChild(status);
    row.appendChild(team);
    row.appendChild(dashboard);
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
  renderResults(clients);
})();
