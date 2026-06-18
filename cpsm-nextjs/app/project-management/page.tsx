import { CpsmShell } from '../../components/CpsmShell';

export default function ProjectManagementPage() {
  return (
    <CpsmShell>
      <div className="container">
        <section className="settings-page-card">
          <p className="tile-kicker">Client Portfolio Service Manager</p>
          <h1>Project Management</h1>
          <p>Manage project status, milestones, deliverables, and project tasks from one CPSM view.</p>
          <div className="settings-config-list">
            <section><h2>Project Status</h2><p>Track current state, risks, and project-level summaries.</p></section>
            <section><h2>Milestones</h2><p>Organize key events and delivery checkpoints.</p></section>
            <section><h2>Deliverables</h2><p>Manage deliverable names, status, owners, and visibility.</p></section>
            <section><h2>Project Tasks</h2><p>Review tasks assigned to internal teams and client stakeholders.</p></section>
          </div>
        </section>
      </div>
    </CpsmShell>
  );
}
