(() => {
  const navItems = [
    ['client-portal.html', 'Dashboard'],
    ['scope.html', 'Scope'],
    ['workflow.html', 'Workflow Center'],
    ['project-management.html', 'Project Management'],
    ['financial-management.html', 'Financial Management'],
    ['utilities.html', 'Utilities'],
    ['client-profile-directory.html', 'Client Directory'],
    ['settings.html', 'Settings & Configuration'],
    ['configure-client.html', 'Configure Client'],
  ];

  function injectNavLinkColorStyle() {
    if (document.querySelector('#cpsmNavLinkColorStyle')) return;
    const style = document.createElement('style');
    style.id = 'cpsmNavLinkColorStyle';
    style.textContent = `
      .client-portfolio-header .nav-links a {
        color: #0b1f3a !important;
      }
      .client-portfolio-header .nav-links a:hover,
      .client-portfolio-header .nav-links a.is-active {
        color: #0b1f3a !important;
        text-decoration-color: #0b1f3a;
      }
    `;
    document.head.appendChild(style);
  }

  function createBanner() {
    if (document.querySelector('.cpsm-top-banner')) return null;
    const banner = document.createElement('div');
    banner.className = 'cpsm-top-banner';
    banner.innerHTML = '<div class="container"><span>Client Portfolio Service Manager, A Momentum Data Solutions Software Company</span></div>';
    return banner;
  }

  function createHeader() {
    const header = document.createElement('header');
    header.className = 'site-header client-portfolio-header cpsm-global-header';
    header.id = 'top';
    header.innerHTML = `
      <nav aria-label="CPSM navigation" class="nav container cpsm-nav-no-logo">
        <div class="cpsm-nav-spacer" aria-hidden="true"></div>
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

  injectNavLinkColorStyle();

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
