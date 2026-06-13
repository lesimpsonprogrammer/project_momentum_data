# CPSM Product Roadmap

## Product Naming

The current Client Portal will begin transitioning into **CPSM**: Client Project Service Manager.

- **CPSM-1**: Current in-progress client portal build inside the Momentum Data website repository.
- **CPSM-1.2**: Stabilized static application baseline to be copied into its own separate repository.
- **CPSM-2**: Next-generation application build with authentication, role-based access, database-backed records, and scalable app operations.

## Approved Direction

The Momentum Data public website and CPSM should become separate codebases once CPSM-1 is stable enough to preserve as CPSM-1.2.

- **Momentum Data website**: Public marketing site, services, contact pages, landing pages, and general brand presence.
- **CPSM application**: Client portal, project operations, project service management, secure client access, internal work tracking, and role-based dashboards.

## Recommended Future Repository

Preferred repository name:

```text
cpsm-client-portal
```

Alternative names:

```text
cpsm-platform
cpsm-app
client-project-service-manager
```

## Proposed Execution Path

### Phase 1: Continue CPSM-1 inside current repo

Continue improving the current client portal until the experience is stable, visually strong, and functionally clear.

Primary goals:

- Confirm final CPSM-1 navigation and page structure.
- Stabilize login, client dashboard, project table, tools, and visual design.
- Clean up file organization and remove unnecessary experimental files.
- Define which files belong to the CPSM app versus the public website.

### Phase 2: Preserve CPSM-1.2 baseline

Once the current version is approved, copy the CPSM-related build into its own repo as **CPSM-1.2**.

CPSM-1.2 should represent the stable static baseline before the larger app rebuild.

Potential baseline scope:

- Client login page
- Client welcome/dashboard page
- Project details table
- Project tools/calculator pages
- CPSM-specific CSS and JavaScript
- CPSM assets
- Initial README and product notes

### Phase 3: Begin CPSM-2 app foundation

CPSM-2 should move from static portal pages toward a real application foundation.

Recommended CPSM-2 goals:

- Next.js/React application structure
- User authentication
- Role-based access control
- Organization/client account records
- Database-backed projects and deliverables
- Project status updates and audit history
- Internal and external dashboards
- File/document areas
- Notifications or update logs
- Admin configuration screens
- Deployment through Vercel

## CPSM-2 Technical Direction

Recommended stack direction:

- **Frontend/App Framework**: Next.js with React
- **Hosting**: Vercel
- **Source Control**: GitHub
- **Database**: To be selected during CPSM-2 planning
- **Authentication**: To be selected during CPSM-2 planning
- **Authorization**: Role-based access control mapped to CPSM roles

## Key Product Principle

CPSM should be treated as a product application, not just a website page.

The public website should sell, explain, and support the brand. CPSM should operate the client experience and internal delivery workflows.