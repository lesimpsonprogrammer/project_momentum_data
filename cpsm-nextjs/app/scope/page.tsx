import { CpsmShell } from '../../components/CpsmShell';
import { ScopeSelector } from '../../components/ScopeSelector';

export default function ScopePage() {
  return (
    <CpsmShell>
      <div className="container">
        <section className="settings-page-card scope-page-card">
          <p className="tile-kicker">Client Portfolio Service Manager</p>
          <h1>Scope</h1>
          <p>Scope is a business process that filters CPSM views to a selected client. Search and select a client to set the active client scope.</p>
          <ScopeSelector />
        </section>
      </div>
    </CpsmShell>
  );
}
