(() => {
  const notice = document.querySelector('#cpsmMaintenanceNotice');
  const confirmButton = document.querySelector('#cpsmMaintenanceConfirm');
  const confirmText = document.querySelector('#cpsmMaintenanceConfirmText');
  const feedbackForm = document.querySelector('#cpsmFeedbackForm');
  const feedbackConfirmation = document.querySelector('#cpsmFeedbackConfirmation');
  const noticeKey = 'cpsmNoticeConfirmedBefore20260724';

  const portalNav = document.querySelector('.portal-panel-nav');
  if (portalNav && !portalNav.querySelector('a[href="settings.html"]')) {
    const settingsLink = document.createElement('a');
    const settingsLabel = document.createElement('strong');
    const settingsAction = document.createElement('span');
    settingsLink.href = 'settings.html';
    settingsLabel.textContent = 'Settings & Configuration';
    settingsAction.textContent = 'Open';
    settingsLink.appendChild(settingsLabel);
    settingsLink.appendChild(settingsAction);
    portalNav.appendChild(settingsLink);
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
