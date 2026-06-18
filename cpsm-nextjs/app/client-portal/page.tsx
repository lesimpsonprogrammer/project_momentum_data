import { CpsmShell } from '../../components/CpsmShell';

export default function ClientPortalPage() {
  return (
    <CpsmShell showSideNav>
      <section className="client-portal-dashboard" aria-labelledby="clientWelcome">
        <div className="container">
          <div className="portal-heading-bar" id="dashboard">
            <h1 id="clientWelcome">Hi, Client, welcome to your project.</h1>
            <form className="portal-google-search" role="search">
              <label className="sr-only" htmlFor="portalSearch">Search CPSM</label>
              <input id="portalSearch" name="portalSearch" type="search" placeholder="Search CPSM from your Client Portfolio" />
              <button className="btn primary" type="submit">Search</button>
            </form>
          </div>
          <section className="cpsm-maintenance-alert" aria-labelledby="maintenanceTitle">
            <div>
              <h2 id="maintenanceTitle">Notification of Scheduled Maintenance</h2>
              <p>Client Portfolio Service Manager will undergo scheduled update on July 24, 2026. Users may continue to utilize CPSM, but may experience intermittent and or lagging business processes.</p>
              <p>Please acknowledge that you have reviewed this notice.</p>
            </div>
            <button className="btn primary" type="button">Acknowledge</button>
          </section>
          <div className="portal-workspace">
            <div className="portal-main-content">
              <div className="portal-card-grid">
                <section className="portal-tile portal-tile-large">
                  <h2>Current status update</h2>
                  <p>Project is on track. Data mapping is underway and validation notes are being prepared.</p>
                </section>
                <section className="portal-tile">
                  <h2>Deliverables</h2>
                  <div className="clean-list">
                    <div><strong>Project brief</strong><span>Approved</span></div>
                    <div><strong>Data mapping workbook</strong><span>In progress</span></div>
                    <div><strong>Validation summary</strong><span>Due next</span></div>
                  </div>
                </section>
                <section className="portal-tile">
                  <h2>Next actions</h2>
                  <ul className="clean-action-list">
                    <li>Review sample column labels</li>
                    <li>Confirm preferred delivery format</li>
                    <li>Send any additional source files</li>
                  </ul>
                </section>
                <section className="portal-tile portal-tile-wide" id="client-feedback">
                  <h2>Client Feedback</h2>
                  <p>Submit feedback, questions, or follow-up notes for your Client Portfolio Service Manager workspace.</p>
                </section>
              </div>
            </div>
            <aside className="portal-side-panel" aria-label="Client Portfolio side panel">
              <section className="side-panel-card">
                <h2>Authorized representatives</h2>
                <div className="clean-list">
                  <div><strong>Authorized Representative 1</strong><span>Job Title</span></div>
                  <div><strong>Authorized Representative 2</strong><span>Job Title</span></div>
                </div>
              </section>
              <section className="side-panel-card">
                <h2>Invoices</h2>
                <div className="clean-list">
                  <div><strong>Invoice #001</strong><span>Pending</span></div>
                  <div><strong>Invoice #002</strong><span>Not issued</span></div>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </CpsmShell>
  );
}
