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
    ['client-profile-directory.html', 'Client Directory'],
    ['settings.html', 'Settings & Configuration'],
    ['configure-client.html', 'Configure Client'],
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

  if (!document.querySelector('.cpsm-footer')) {
    const footer = document.createElement('footer');
    const small = document.createElement('small');
    footer.className = 'cpsm-footer';
    small.textContent = 'Client Portfolio Service Manager, a Momentum Data Solutions Software Company.';
    footer.appendChild(small);
    document.body.appendChild(footer);
  }

  const portalNav = document.querySelector('.portal-panel-nav');
  function addPortalLink(href, label, action) {
    if (!portalNav || portalNav.querySelector('a[href="' + href + '"]')) return;
    const link = document.createElement('a');
    const labelNode = document.createElement('strong');
    const actionNode = document.createElement('span');
    link.href = href;
    labelNode.textContent = label;
    actionNode.textContent = action;
    link.appendChild(labelNode);
    link.appendChild(actionNode);
    portalNav.appendChild(link);
  }

  addPortalLink('workflow.html', 'Workflow Center', 'Open');
  addPortalLink('project-management.html', 'Project Management', 'Open');
  addPortalLink('financial-management.html', 'Financial Management', 'Open');
  addPortalLink('client-profile-directory.html', 'Client Profile Directory', 'Open');
  addPortalLink('settings.html', 'Settings & Configuration', 'Open');
  addPortalLink('configure-client.html', 'Configure Client', 'Open');

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
