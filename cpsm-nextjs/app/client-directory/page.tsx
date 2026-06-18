import { ClientDirectoryTable } from '../../components/ClientDirectoryTable';
import { CpsmShell } from '../../components/CpsmShell';

export default function ClientDirectoryPage() {
  return (
    <CpsmShell>
      <div className="container">
        <section className="settings-page-card">
          <p className="tile-kicker">Client Portfolio Service Manager</p>
          <h1>Client Profile Directory</h1>
          <p>Search onboarded clients by Client ID, client name, status, or team assignment.</p>
          <ClientDirectoryTable />
          <div className="settings-config-list" id="advancedClientSearch">
            <section><h2>Advanced Search</h2><p>Use Client ID, client name, team, or status to narrow directory records.</p></section>
            <section><h2>Teams</h2><p>Group client contacts, authorized representatives, and project stakeholders.</p></section>
            <section><h2>Client Records</h2><p>Review client status, onboarding status, and active project assignments.</p></section>
          </div>
        </section>
      </div>
    </CpsmShell>
  );
}
