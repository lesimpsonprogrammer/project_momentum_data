import Link from 'next/link';
import { CpsmShell } from '../../components/CpsmShell';

export default function WorkflowPage() {
  return (
    <CpsmShell>
      <div className="container">
        <section className="settings-page-card">
          <p className="tile-kicker">Client Portfolio Service Manager</p>
          <h1>Workflow Center</h1>
          <p>Create, monitor, archive, and configure board-centered business workflows.</p>
          <div className="settings-config-list">
            <section><h2>Active</h2><p>00 workflows currently active.</p></section>
            <section><h2>Conditions</h2><p>00 workflow conditions configured.</p></section>
            <section><h2>Archived</h2><p>00 archived workflows.</p></section>
            <section><h2>Exceptions</h2><p>00 workflow exceptions.</p></section>
          </div>
          <div className="scope-action-row">
            <Link className="btn primary" href="/scope">Set Client Scope</Link>
            <Link className="btn secondary" href="/client-portal">Back to Portal</Link>
          </div>
        </section>
      </div>
    </CpsmShell>
  );
}
