'use client';

import { useState } from 'react';

export function UtilitiesPanel() {
  const [importMessage, setImportMessage] = useState('');
  const [exportMessage, setExportMessage] = useState('');

  function handleImport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const file = data.get('importFile') as File | null;
    const importType = String(data.get('importType') || 'selected data');
    const importAction = String(data.get('importAction') || 'Validate only');
    const fileName = file?.name || 'selected file';
    setImportMessage(`${fileName} has been received for ${importType}. Action: ${importAction}.`);
  }

  function handleExport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const exportType = String(data.get('exportType') || 'CPSM data');
    const exportFormat = String(data.get('exportFormat') || 'CSV');
    const exportScope = String(data.get('exportScope') || 'Current active records');
    const payload = {
      exportType,
      exportFormat,
      exportScope,
      generatedAt: new Date().toISOString(),
      records: [],
      note: 'Preview export generated from CPSM Utilities.',
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${exportType.toLowerCase().replaceAll(' ', '-')}-export-preview.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    setExportMessage(`${exportType} export generated as ${exportFormat}. Scope: ${exportScope}.`);
  }

  return (
    <div className="settings-config-list utilities-grid">
      <section>
        <h2>Data Import</h2>
        <p>Upload CSV, XLSX, or JSON files and prepare them for client records, project tasks, deliverables, workflow rules, or invoice records.</p>
        <form className="utility-form" onSubmit={handleImport}>
          <label>
            Import type
            <select name="importType" required>
              <option value="">Select import type</option>
              <option>Client records</option>
              <option>Project tasks</option>
              <option>Deliverables</option>
              <option>Workflow rules</option>
              <option>Financial records</option>
            </select>
          </label>
          <label>
            Source file
            <input name="importFile" type="file" accept=".csv,.xlsx,.json" required />
          </label>
          <label>
            Import action
            <select name="importAction" required>
              <option>Validate only</option>
              <option>Prepare import package</option>
              <option>Stage for review</option>
            </select>
          </label>
          <button className="btn primary" type="submit">
            Validate Import
          </button>
          {importMessage && <p className="utility-confirmation">{importMessage}</p>}
        </form>
      </section>
      <section>
        <h2>Data Export</h2>
        <p>Generate export-ready files for reporting, backup, reconciliation, or client review.</p>
        <form className="utility-form" onSubmit={handleExport}>
          <label>
            Export data set
            <select name="exportType" required>
              <option value="">Select export data</option>
              <option>Client records</option>
              <option>Project dashboard</option>
              <option>Deliverables</option>
              <option>Workflow dashboard</option>
              <option>Financial records</option>
            </select>
          </label>
          <label>
            Export format
            <select name="exportFormat" required>
              <option>CSV</option>
              <option>JSON</option>
              <option>XLSX-ready CSV</option>
            </select>
          </label>
          <label>
            Export scope
            <select name="exportScope" required>
              <option>Current active records</option>
              <option>Archived records</option>
              <option>All records</option>
            </select>
          </label>
          <button className="btn primary" type="submit">
            Generate Export
          </button>
          {exportMessage && <p className="utility-confirmation">{exportMessage}</p>}
        </form>
      </section>
      <section>
        <h2>Import Review Queue</h2>
        <p>Review staged imports before they are approved for production use.</p>
        <div className="utility-status-list">
          <div><strong>Pending validation</strong><span>0 files</span></div>
          <div><strong>Ready for review</strong><span>0 files</span></div>
          <div><strong>Import exceptions</strong><span>0 files</span></div>
        </div>
      </section>
      <section>
        <h2>Export History</h2>
        <p>View export activity and generated files for review.</p>
        <div className="utility-status-list">
          <div><strong>Generated today</strong><span>0 files</span></div>
          <div><strong>Scheduled exports</strong><span>0 jobs</span></div>
          <div><strong>Failed exports</strong><span>0 files</span></div>
        </div>
      </section>
    </div>
  );
}
