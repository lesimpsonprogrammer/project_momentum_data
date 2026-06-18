(() => {
  const importForm = document.querySelector('#dataImportForm');
  const exportForm = document.querySelector('#dataExportForm');
  const importConfirmation = document.querySelector('#importConfirmation');
  const exportConfirmation = document.querySelector('#exportConfirmation');

  importForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(importForm);
    const file = data.get('importFile');
    const importType = data.get('importType');
    const importAction = data.get('importAction');
    const fileName = file && file.name ? file.name : 'selected file';

    if (importConfirmation) {
      importConfirmation.hidden = false;
      importConfirmation.textContent = `${fileName} has been received for ${importType}. Action: ${importAction}.`;
    }
  });

  exportForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(exportForm);
    const exportType = data.get('exportType') || 'CPSM data';
    const exportFormat = data.get('exportFormat') || 'CSV';
    const exportScope = data.get('exportScope') || 'Current active records';
    const timestamp = new Date().toISOString();
    const payload = {
      exportType,
      exportFormat,
      exportScope,
      generatedAt: timestamp,
      records: [],
      note: 'Preview export generated from CPSM Utilities.',
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${String(exportType).toLowerCase().replaceAll(' ', '-')}-export-preview.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);

    if (exportConfirmation) {
      exportConfirmation.hidden = false;
      exportConfirmation.textContent = `${exportType} export generated as ${exportFormat}. Scope: ${exportScope}.`;
    }
  });
})();
