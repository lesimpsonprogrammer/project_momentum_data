import { CpsmShell } from '../../components/CpsmShell';

export default function FinancialManagementPage() {
  return (
    <CpsmShell>
      <div className="container">
        <section className="settings-page-card">
          <p className="tile-kicker">Client Portfolio Service Manager</p>
          <h1>Financial Management</h1>
          <p>Review invoices, payment status, project costs, and financial notes for CPSM accounts.</p>
          <div className="settings-config-list">
            <section><h2>Invoices</h2><p>View issued, pending, and draft invoices.</p></section>
            <section><h2>Payment Status</h2><p>Track payment state, due dates, and outstanding balances.</p></section>
            <section><h2>Project Costs</h2><p>Review project estimates, fees, and cost notes.</p></section>
            <section><h2>Financial Notes</h2><p>Store account-level financial comments and follow-up items.</p></section>
          </div>
        </section>
      </div>
    </CpsmShell>
  );
}
