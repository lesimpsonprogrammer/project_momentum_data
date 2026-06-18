import Link from 'next/link';
import { CpsmShell } from '../../components/CpsmShell';

export default function SettingsPage() {
  return (
    <CpsmShell>
      <div className="container">
        <section className="settings-page-card">
          <p className="tile-kicker">Client Portfolio Service Manager</p>
          <h1>Settings & Configuration</h1>
          <p>Manage client directory records, project display, utilities, notifications, and feedback preferences.</p>
          <div className="settings-config-list">
            <section><h2><Link href="/client-directory">Client Profile Directory</Link></h2><p>Locate onboarded clients, company records, teams, contacts, and authorized representatives.</p></section>
            <section><h2><Link href="/workflow">Workflow Center</Link></h2><p>Configure how board-centered workflows behave.</p></section>
            <section><h2><Link href="/configure-client">Configure Client</Link></h2><p>Set up client identity, teams, project visibility, and workspace preferences.</p></section>
            <section><h2><Link href="/utilities">Utilities</Link></h2><p>Import and export client, project, workflow, deliverable, and financial data.</p></section>
            <section><h2>Project Display</h2><p>Status labels, deliverables, due dates, and client-facing visibility.</p></section>
            <section><h2>Notifications</h2><p>Maintenance notices, project alerts, reminders, and feedback responses.</p></section>
          </div>
        </section>
      </div>
    </CpsmShell>
  );
}
