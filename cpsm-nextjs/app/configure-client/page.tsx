import { CpsmShell } from '../../components/CpsmShell';

export default function ConfigureClientPage() {
  return (
    <CpsmShell>
      <div className="container">
        <section className="settings-page-card">
          <p className="tile-kicker">Client Portfolio Service Manager</p>
          <h1>Configure Client</h1>
          <p>Set up client identity, teams, portal preferences, project setup, calendar sync, and email sync.</p>
          <div className="settings-config-list">
            <section><h2>Client Identity</h2><p>Maintain client name, ID, status, and ownership details.</p></section>
            <section><h2>Teams</h2><p>Assign internal team members and client stakeholders.</p></section>
            <section><h2>Client Portal</h2><p>Configure portal layout, labels, and client-facing preferences.</p></section>
            <section><h2>Project Setup</h2><p>Define project defaults, deliverables, and visibility rules.</p></section>
            <section><h2>Calendar Sync</h2><p>Prepare meeting and due-date sync options.</p></section>
            <section><h2>Email Sync</h2><p>Prepare communication routing and notification options.</p></section>
          </div>
        </section>
      </div>
    </CpsmShell>
  );
}
