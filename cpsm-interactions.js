(() => {
  const notice = document.querySelector('#cpsmMaintenanceNotice');
  const confirmButton = document.querySelector('#cpsmMaintenanceConfirm');
  const confirmText = document.querySelector('#cpsmMaintenanceConfirmText');
  const feedbackForm = document.querySelector('#cpsmFeedbackForm');
  const feedbackConfirmation = document.querySelector('#cpsmFeedbackConfirmation');
  const noticeKey = 'cpsmNoticeConfirmedBefore20260724';

  const portalNav = document.querySelector('.portal-panel-nav');
  function addPortalLink(href, label, action) {
    if (!portalNav || portalNav.querySelector(`a[href="${href}"]`)) return;
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
  addPortalLink('client-profile-directory.html', 'Client Profile Directory', 'Open');
  addPortalLink('configure-client.html', 'Configure Client', 'Open');
  addPortalLink('settings.html', 'Settings & Configuration', 'Open');

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
