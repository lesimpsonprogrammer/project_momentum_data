# CPSM Role Model

## Purpose

This document defines the initial role model for CPSM: Client Project Service Manager. The role model should support both near-term portal operations and future business growth.

## Role Tiers

### System Ownership

#### Superuser

Full system control. This role should be limited to system owners or highest-trust operators.

Primary access:

- Manage all organizations and clients
- Manage all users and roles
- Manage global system settings
- View and manage all projects
- Access audit, security, and configuration controls
- Override records when necessary

#### Admin

Broad internal administration role. Admins can manage most operational areas but may not need full owner-level privileges.

Primary access:

- Manage internal users
- Manage client accounts
- Manage projects and operational records
- Configure standard application settings
- Support account, project, and delivery teams

### Leadership and Operations

#### Regional Director

Future leadership role for multi-region or territory-based oversight.

Primary access:

- View regional client accounts
- View regional project portfolio performance
- Monitor project health and delivery metrics
- Support escalation management
- Review regional team activity

#### Manager

Internal management role for operational visibility and team oversight.

Primary access:

- View assigned teams, clients, and projects
- Monitor deadlines, status updates, and workload
- Support project escalation and prioritization
- Review reporting dashboards

#### Account Manager

Owns or supports the client relationship.

Primary access:

- View assigned client accounts
- View client projects and status
- Add client notes and relationship updates
- Coordinate communication and account follow-up
- Monitor client satisfaction and issue escalation

#### Project Manager

Manages project execution, deliverables, timelines, milestones, and updates.

Primary access:

- Create and manage assigned projects
- Update project status
- Manage deliverables and due dates
- Track milestones and blockers
- Coordinate internal project activity

#### Project Consultant

Future delivery/support role for consultants assigned to specific client projects.

Primary access:

- View assigned projects
- Update assigned tasks or deliverables
- Add project notes or findings
- Upload or reference work products if permitted
- Collaborate with project managers and account managers

### Technical Operations

#### Engineering Admin

Technical administration role for integrations, data workflows, system configuration, and technical troubleshooting.

Primary access:

- Manage technical setup and integrations
- Support data workflows and system configuration
- Troubleshoot application or data issues
- Manage technical project tools
- Support migration, extraction, and transformation workflows

### External Users

#### Client

External client-facing role. Client users should only see information tied to their own company, account, or assigned project.

Primary access:

- View their own company profile
- View their own projects
- View project status and deliverables
- View due dates and project details
- Access approved files, documents, or messages
- Submit information only where permitted

## Security Principle

Client users must never have access to global system data. Client access should be scoped to their company/account and assigned projects only.

## Suggested Role Hierarchy

```text
Superuser
  Admin
    Regional Director
      Manager
        Account Manager
        Project Manager
          Project Consultant
        Engineering Admin
Client
```

The hierarchy is not final permission logic. CPSM-2 should implement permissions by capability, not only by job title.

## CPSM-2 Authorization Direction

CPSM-2 should use role-based access control with clear permission groups, such as:

- User management
- Client account management
- Project management
- Project viewing
- Deliverable management
- File/document access
- Technical configuration
- Reporting/analytics
- Billing or commercial access, if added later
- Audit/security access

This will allow future roles to be added without rebuilding the entire permission model.