import { CpsmShell } from '../../components/CpsmShell';
import { UtilitiesPanel } from '../../components/UtilitiesPanel';

export default function UtilitiesPage() {
  return (
    <CpsmShell>
      <div className="container">
        <section className="settings-page-card utilities-page-card">
          <p className="tile-kicker">Client Portfolio Service Manager</p>
          <h1>Utilities</h1>
          <p>Import and export client, project, workflow, deliverable, and financial data for CPSM administration.</p>
          <UtilitiesPanel />
        </section>
      </div>
    </CpsmShell>
  );
}
