(() => {
  const navItems = [
    ['client-portal.html', 'Dashboard'],
    ['workflow.html', 'Workflow Center'],
    ['project-management.html', 'Project Management'],
    ['financial-management.html', 'Financial Management'],
    ['utilities.html', 'Utilities'],
    ['client-profile-directory.html', 'Client Directory'],
    ['settings.html', 'Settings & Configuration'],
    ['configure-client.html', 'Configure Client'],
  ];

  function createBanner() {
    if (document.querySelector('.cpsm-top-banner')) return null;
    const banner = document.createElement('div');
    banner.className = 'cpsm-top-banner';
    banner.innerHTML = '<div class="container"><span>Client Portfolio Service Manager</span><strong>Momentum Data Solutions Software Company</strong></div>';
    return banner;
  }

  function createHeader() {
    const header = document.createElement('header');
    header.className = 'site-header client-portfolio-header cpsm-global-header';
    header.id = 'top';
    header.innerHTML = `
      <nav aria-label="CPSM navigation" class="nav container">
        <a class="brand brand-image-only" href="client-portal.html" aria-label="CPSM dashboard">
          <img src="assets/momentum-data-logo-transparent.svg" alt="Momentum Data logo" class="brand-logo brand-logo-transparent" />
        </a>
        <div class="nav-links"></div>
      </nav>
    `;
    return header;
  }

  function renderNavLinks(container) {
    if (!container) return;
    container.innerHTML = '';
    navItems.forEach(([href, label]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (window.location.pathname.endsWith(href)) link.classList.add('is-active');
      container.appendChild(link);
    });
  }

  let header = document.querySelector('.client-portfolio-header');
  const banner = createBanner();

  if (!header) {
    header = createHeader();
    document.body.prepend(header);
  }

  if (banner) {
    header.before(banner);
  }

  renderNavLinks(header.querySelector('.nav-links'));
})();
