(() => {
  const notice = document.querySelector('#cpsmMaintenanceNotice');
  const confirmButton = document.querySelector('#cpsmMaintenanceConfirm');
  const confirmText = document.querySelector('#cpsmMaintenanceConfirmText');
  const feedbackForm = document.querySelector('#cpsmFeedbackForm');
  const feedbackConfirmation = document.querySelector('#cpsmFeedbackConfirmation');
  const noticeKey = 'cpsmNoticeConfirmedBefore20260724';

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

  const portalMenuGroups = [
    {
      label: 'Workspace',
      links: [
        ['client-portal.html#dashboard', 'Dashboard', 'Project overview'],
        ['client-portal.html#clientFeedback', 'Client Feedback', 'Submit notes'],
      ],
    },
    {
      label: 'Management',
      links: [
        ['workflow.html', 'Workflow Center', 'Automation'],
        ['project-management.html', 'Project Management', 'Milestones'],
        ['financial-management.html', 'Financial Management', 'Invoices'],
        ['client-profile-directory.html', 'Client Directory', 'Records'],
      ],
    },
    {
      label: 'Configuration',
      links: [
        ['settings.html', 'Settings & Configuration', 'System setup'],
        ['configure-client.html', 'Configure Client', 'Client setup'],
      ],
    },
    {
      label: 'Tools',
      links: [
        ['utilities.html', 'Utilities', 'Import and export'],
        ['calculator.html', 'Calculator', 'Open tool'],
        ['project-estimator.html', 'Project Estimator', 'Estimate scope'],
      ],
    },
    {
      label: 'Account',
      links: [
        ['login.html', 'Client Log-in', 'Switch user'],
      ],
    },
  ];

  if (!document.querySelector('.cpsm-top-banner')) {
    const banner = document.createElement('div');
    banner.className = 'cpsm-top-banner';
    banner.innerHTML = '<div class="container"><span>Client Portfolio Service Manager</span><strong>Momentum Data Solutions Software Company</strong></div>';
    const header = document.querySelector('.client-portfolio-header');
    if (header) header.before(banner);
  }

  const headerNav = document.querySelector('.client-portfolio-header .nav-links');
  if (headerNav) {
    headerNav.innerHTML = '';
    navItems.forEach(([href, label]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (window.location.pathname.endsWith(href)) link.classList.add('is-active');
      headerNav.appendChild(link);
    });
  }

  function buildPortalSideMenu() {
    const main = document.querySelector('.client-portal-main');
    const header = document.querySelector('.client-portfolio-header');
    if (!main || !header || document.querySelector('.cpsm-portal-shell')) return;

    const shell = document.createElement('div');
    const sideNav = document.createElement('aside');
    const brand = document.createElement('div');

    shell.className = 'cpsm-portal-shell';
    sideNav.className = 'workflow-sidebar cpsm-portal-side-nav';
    brand.className = 'workflow-sidebar-brand cpsm-portal-brand';
    brand.innerHTML = '<strong>CPSM</strong><span>Portal Menu</span>';

    sideNav.appendChild(brand);

    portalMenuGroups.forEach((group) => {
      const section = document.createElement('section');
      const heading = document.createElement('h3');
      const nav = document.createElement('nav');

      section.className = 'cpsm-side-menu-section';
      heading.textContent = group.label;
      nav.className = 'workflow-side-nav cpsm-portal-side-menu';
      nav.setAttribute('aria-label', group.label);

      group.links.forEach(([href, label, note]) => {
        const link = document.createElement('a');
        const labelNode = document.createElement('span');
        const noteNode = document.createElement('small');

        link.href = href;
        labelNode.textContent = label;
        noteNode.textContent = note;
        link.appendChild(labelNode);
        link.appendChild(noteNode);

        const pagePath = href.split('#')[0];
        if (pagePath && window.location.pathname.endsWith(pagePath)) link.classList.add('active');
        nav.appendChild(link);
      });

      section.appendChild(heading);
      section.appendChild(nav);
      sideNav.appendChild(section);
    });

    header.after(shell);
    shell.appendChild(sideNav);
    shell.appendChild(main);
    document.body.classList.add('cpsm-portal-side-menu-enabled');
  }

  buildPortalSideMenu();

  if (!document.querySelector('.cpsm-footer')) {
    const footer = document.createElement('footer');
    const small = document.createElement('small');
    footer.className = 'cpsm-footer';
    small.textContent = 'Client Portfolio Service Manager, a Momentum Data Solutions Software Company.';
    footer.appendChild(small);
    document.body.appendChild(footer);
  }

  if (notice && confirmButton) {
    const alreadyConfirmed = localStorage.getItem(noticeKey) === 'true';

    if (alreadyConfirmed) {
      notice.classList.add('is-confirmed');
      confirmButton.hidden = true;
      if (confirmText) confirmText.textContent = 'Confirmed for this browser.';
    }

    confirmButton.addEventListener('click', () => {
      localStorage.setItem(noticeKey, 'true');
      notice.classList.add('is-confirmed');
      confirmButton.hidden = true;
      if (confirmText) confirmText.textContent = 'Confirmed for this browser.';
    });
  }

  if (feedbackForm && feedbackConfirmation) {
    feedbackForm.addEventListener('submit', (event) => {
      event.preventDefault();
      feedbackForm.reset();
      feedbackConfirmation.hidden = false;
    });
  }
})();
