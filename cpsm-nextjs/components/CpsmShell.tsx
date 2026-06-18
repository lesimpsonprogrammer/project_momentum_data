import Link from 'next/link';
import { ReactNode } from 'react';

const navItems = [
  ['Client Portal', '/client-portal'],
  ['Scope', '/scope'],
  ['Workflow Center', '/workflow'],
  ['Project Management', '/project-management'],
  ['Financial Management', '/financial-management'],
  ['Utilities', '/utilities'],
  ['Client Directory', '/client-directory'],
  ['Settings', '/settings'],
  ['Configure Client', '/configure-client'],
];

const portalGroups = [
  {
    label: 'Workspace',
    links: [
      ['Dashboard', '/client-portal', 'Project overview'],
      ['Scope', '/scope', 'Filter client view'],
      ['Client Feedback', '/client-portal#client-feedback', 'Submit notes'],
    ],
  },
  {
    label: 'Management',
    links: [
      ['Workflow Center', '/workflow', 'Automation'],
      ['Project Management', '/project-management', 'Milestones'],
      ['Financial Management', '/financial-management', 'Invoices'],
      ['Client Directory', '/client-directory', 'Records'],
    ],
  },
  {
    label: 'Configuration',
    links: [
      ['Settings', '/settings', 'System setup'],
      ['Configure Client', '/configure-client', 'Client setup'],
    ],
  },
  {
    label: 'Tools',
    links: [
      ['Utilities', '/utilities', 'Import and export'],
      ['Project Estimator', '/project-management', 'Estimate scope'],
    ],
  },
];

export function CpsmShell({ children, showSideNav = false }: { children: ReactNode; showSideNav?: boolean }) {
  return (
    <>
      <div className="cpsm-top-banner">
        <div className="container">
          <span>Client Portfolio Service Manager, A Momentum Data Solutions Software Company</span>
        </div>
      </div>
      <header className="client-portfolio-header">
        <nav className="nav container cpsm-nav-no-logo" aria-label="CPSM navigation">
          <div className="cpsm-nav-spacer" aria-hidden="true" />
          <div className="nav-links">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      {showSideNav ? (
        <div className="cpsm-portal-shell">
          <aside className="workflow-sidebar cpsm-portal-side-nav" aria-label="CPSM portal menu">
            <div className="workflow-sidebar-brand cpsm-portal-brand">
              <strong>CPSM</strong>
              <span>Portal Menu</span>
            </div>
            {portalGroups.map((group) => (
              <section className="cpsm-side-menu-section" key={group.label}>
                <h3>{group.label}</h3>
                <nav className="workflow-side-nav cpsm-portal-side-menu" aria-label={group.label}>
                  {group.links.map(([label, href, note]) => (
                    <Link key={href} href={href}>
                      <span>{label}</span>
                      <small>{note}</small>
                    </Link>
                  ))}
                </nav>
              </section>
            ))}
          </aside>
          <main className="client-portal-main clean-card-portal">{children}</main>
        </div>
      ) : (
        <main className="tool-page-main">{children}</main>
      )}
      <footer className="cpsm-footer">
        <small>Client Portfolio Service Manager, a Momentum Data Solutions Software Company.</small>
      </footer>
    </>
  );
}
