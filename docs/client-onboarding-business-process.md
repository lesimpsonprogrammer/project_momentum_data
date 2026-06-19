# Client Onboarding Business Process

## Purpose
Create a structured, repeatable onboarding process for new Momentum Data clients so business, billing, tax, banking, and project setup information is collected in one organized workflow and stored in a database for internal review.

## Business Process Overview

### 1. New Client Intake
**Trigger:** A prospect becomes a new client or is ready to begin a project.

**Client actions**
- Opens the New Client Onboarding page.
- Reviews the information needed before starting.
- Completes company, contact, project, tax, and banking sections.
- Confirms authorization and data accuracy.

**Momentum Data actions**
- Confirms the client is ready to onboard.
- Sends the onboarding link.
- Reviews the submitted information after it is saved to the database.

### 2. Company and Contact Setup
**Objective:** Capture the official client record.

**Data collected**
- Legal business name
- DBA / trade name
- Entity type
- Business address
- Primary contact
- Billing contact
- Email and phone

**Outcome**
- A standard client profile is created for project, billing, and communication purposes.

### 3. Project Setup
**Objective:** Understand what services the client needs and what systems or files are involved.

**Data collected**
- Requested services
- Current data sources
- File types
- Current pain points
- Desired output
- Target due date
- Special instructions

**Outcome**
- Momentum Data can scope the onboarding conversation and prepare a project plan.

### 4. Tax Information Collection
**Objective:** Collect the tax information needed for vendor/client records and accounting setup.

**Data collected**
- Taxpayer legal name
- Tax classification
- Federal Tax ID / EIN / SSN, based on client type
- Tax address
- Backup withholding / exemption notes, if applicable

**Control recommendation**
- For production, route sensitive tax information through a secure server-side function and encrypt before database storage.

### 5. Banking Information Collection
**Objective:** Collect payment information in a consistent format.

**Data collected**
- Account holder name
- Bank name
- Routing number
- Account number
- Account type
- Payment authorization acknowledgement

**Control recommendation**
- Limit database read access to authorized administrators only.
- Do not expose bank account data through public client-facing APIs.
- Use HTTPS, database row-level security, and encryption for production.

### 6. Database Submission
**Objective:** Store the onboarding form data in a structured table.

**System actions**
- Validate required fields.
- Generate a client reference number.
- Submit form data to the database.
- Store submission status as `submitted`.
- Return a confirmation message to the client.

### 7. Internal Review
**Objective:** Review the new onboarding submission and determine next steps.

**Momentum Data actions**
- Confirm company, contact, project, tax, and banking details.
- Mark missing items for follow-up.
- Assign project manager or internal owner.
- Move client into project kickoff.

### 8. Project Kickoff
**Objective:** Convert onboarding data into an active client project.

**Momentum Data actions**
- Schedule kickoff call.
- Confirm project scope.
- Confirm deliverables and timeline.
- Create project tracker / client portal record.

## New Client Onboarding Workflow

```text
New Client Ready
      ↓
Send Onboarding Link
      ↓
Client Completes Organized Form
      ↓
Required Fields Validated
      ↓
Form Data Submitted to Database
      ↓
Confirmation Number Generated
      ↓
Internal Review
      ↓
Missing Information Follow-up, if needed
      ↓
Project Setup + Kickoff
      ↓
Active Client Project
```

## Workflow Status Values
Use these statuses in the database or internal tracker:

- `submitted` — client completed the onboarding form
- `under_review` — Momentum Data is reviewing the submission
- `needs_follow_up` — missing or unclear information exists
- `approved_for_kickoff` — onboarding is complete
- `project_created` — client has been moved into an active project

## Recommended Security Controls
Because banking and tax information are sensitive:

1. Use HTTPS only.
2. Never store Supabase service-role keys in browser code.
3. Use a public anon key only for insert operations.
4. Enable Row Level Security.
5. Do not allow anonymous select/update/delete access.
6. Limit admin access to authorized users only.
7. Use a server-side Edge Function for production encryption.
8. Log access to sensitive records.
9. Consider storing only last four digits in general views and keeping full values encrypted.
10. Add a privacy notice and payment authorization acknowledgement before submission.
