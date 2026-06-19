# Client Onboarding Setup Guide

This setup connects the New Client Onboarding form to a secure Supabase database workflow.

## Files added

- `client-onboarding.html` — client-facing onboarding page
- `onboarding.css` — onboarding page styling
- `onboarding.js` — form validation and secure endpoint submission
- `onboarding-config.js` — browser configuration pointing to the secure endpoint
- `database/client_onboarding_schema.sql` — database table schema
- `supabase/functions/submit-client-onboarding/index.ts` — secure Edge Function for encrypted sensitive payload storage
- `docs/client-onboarding-business-process.md` — business process and workflow documentation

## Setup steps

### 1. Create the database table
Run the SQL in:

```text
database/client_onboarding_schema.sql
```

This creates the `client_onboarding_submissions` table with Row Level Security enabled. The table stores normal onboarding fields plus last-four references for tax and banking information. Full sensitive values are designed to be encrypted by the Edge Function before storage.

### 2. Deploy the Edge Function
Deploy:

```text
supabase/functions/submit-client-onboarding/index.ts
```

Function name:

```text
submit-client-onboarding
```

### 3. Set required Edge Function secrets
Set these secrets in Supabase:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
ONBOARDING_ENCRYPTION_KEY_B64
ONBOARDING_ENCRYPTION_KEY_ID
```

`ONBOARDING_ENCRYPTION_KEY_B64` must decode to exactly 32 bytes for AES-256-GCM.

Example key generation:

```bash
openssl rand -base64 32
```

### 4. Update browser config
Edit `onboarding-config.js` and replace the placeholder endpoint:

```js
window.MOMENTUM_ONBOARDING_CONFIG = {
  submissionEndpoint: 'https://YOUR-PROJECT-REF.supabase.co/functions/v1/submit-client-onboarding'
};
```

### 5. Test the form
Open:

```text
client-onboarding.html
```

Submit a test onboarding record and confirm that a row appears in:

```text
client_onboarding_submissions
```

## Security notes

- Do not store Supabase `service_role` keys in browser code.
- Do not add public read policies to this table.
- Keep Row Level Security enabled.
- Use the Edge Function so sensitive values can be encrypted before database insertion.
- Store only last-four values in operational columns.
- Add authenticated admin-only read policies later when an admin portal is built.
