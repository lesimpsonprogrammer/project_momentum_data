# Momentum Data Analytics (dbt)

dbt Core project that transforms Supabase/Postgres data into analytics-ready
models, following an Extract & Load (Supabase) → Transform (dbt) → BI layout.

## Sources

- `client_onboarding_submissions` (see `database/client_onboarding_schema.sql`)

Sensitive columns (tax IDs, banking references, the encrypted sensitive
payload, signature fields) are intentionally excluded starting at the
staging layer and never reach the marts.

## Models

- `models/staging/stg_client_onboarding_submissions.sql` — renamed, cleaned,
  non-sensitive columns only.
- `models/marts/dim_clients.sql` — one row per client (`client_reference`).
- `models/marts/fct_onboarding_submissions.sql` — one row per submission,
  for funnel/pipeline analysis.
- `models/marts/mart_onboarding_status_summary.sql` — submission counts and
  pipeline aging by status, for a status dashboard.

## Setup

1. Install dbt: `pip install dbt-postgres`
2. Copy `profiles.yml.example` to `~/.dbt/profiles.yml` (or set
   `DBT_PROFILES_DIR=$(pwd)`), and set the referenced environment variables
   (`SUPABASE_DB_HOST`, `SUPABASE_DB_USER`, `SUPABASE_DB_PASSWORD`,
   `SUPABASE_DB_PORT`, `SUPABASE_DB_NAME`) — get connection details from the
   Supabase project settings. Never commit a populated `profiles.yml`.
3. From this directory: `dbt deps && dbt build`

## Adding more sources

As more tables land in Supabase (clients, projects, deliverables, etc.),
add them to `models/staging/_sources.yml`, add a matching `stg_*` model,
and build marts on top of those staging models rather than querying raw
tables directly.
