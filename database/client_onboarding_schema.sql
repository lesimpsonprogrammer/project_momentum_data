-- Momentum Data - Client Onboarding Database Schema
-- Target: Supabase / PostgreSQL
-- Purpose: Store structured onboarding submissions while avoiding plaintext banking/tax storage.
-- Production pattern: collect sensitive fields in the browser, submit to a secure server-side endpoint,
-- encrypt the sensitive payload server-side, and store only encrypted payload + last-four references.

create extension if not exists pgcrypto;

create table if not exists public.client_onboarding_submissions (
  id uuid primary key default gen_random_uuid(),
  client_reference text not null unique,
  status text not null default 'submitted' check (
    status in ('submitted', 'under_review', 'needs_follow_up', 'approved_for_kickoff', 'project_created')
  ),

  -- Company profile
  legal_business_name text not null,
  dba_name text,
  entity_type text not null,
  business_address_line1 text not null,
  business_address_line2 text,
  business_city text not null,
  business_state text not null,
  business_zip text not null,
  business_country text not null default 'United States',
  website text,

  -- Contacts
  primary_contact_name text not null,
  primary_contact_title text,
  primary_contact_email text not null,
  primary_contact_phone text not null,
  billing_contact_name text,
  billing_contact_email text,
  billing_contact_phone text,

  -- Project setup
  requested_services text[] not null default '{}',
  current_systems text,
  data_sources text,
  file_types text,
  desired_outputs text,
  project_goal text not null,
  target_start_date date,
  target_due_date date,
  special_instructions text,

  -- Tax information references only
  taxpayer_legal_name text not null,
  tax_classification text not null,
  federal_tax_id_last4 text,
  tax_address_matches_business boolean not null default true,
  tax_address_line1 text,
  tax_address_line2 text,
  tax_city text,
  tax_state text,
  tax_zip text,
  backup_withholding_notes text,

  -- Banking information references only
  account_holder_name text not null,
  bank_name text not null,
  routing_number_last4 text,
  bank_account_last4 text,
  account_type text not null,
  payment_authorization boolean not null default false,

  -- Encrypted sensitive payload handled by a server-side function.
  -- Payload may include full federal tax ID, routing number, and account number after encryption.
  sensitive_payload_encrypted text,
  sensitive_payload_algorithm text default 'server-side-encryption-required',
  sensitive_payload_key_id text,

  -- Acknowledgements
  accuracy_acknowledgement boolean not null default false,
  sensitive_data_acknowledgement boolean not null default false,
  signature_name text not null,
  signature_date date not null default current_date,

  -- System metadata
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source_page text default 'client-onboarding.html',
  user_agent text,

  constraint valid_acknowledgement check (
    payment_authorization = true
    and accuracy_acknowledgement = true
    and sensitive_data_acknowledgement = true
  )
);

create index if not exists idx_client_onboarding_status
  on public.client_onboarding_submissions(status);

create index if not exists idx_client_onboarding_submitted_at
  on public.client_onboarding_submissions(submitted_at desc);

create index if not exists idx_client_onboarding_business_name
  on public.client_onboarding_submissions(legal_business_name);

create or replace function public.set_client_onboarding_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_client_onboarding_updated_at on public.client_onboarding_submissions;
create trigger trg_client_onboarding_updated_at
before update on public.client_onboarding_submissions
for each row
execute function public.set_client_onboarding_updated_at();

alter table public.client_onboarding_submissions enable row level security;

-- Direct anonymous inserts are intentionally not allowed for production sensitive intake.
-- Submit through a server-side endpoint / Supabase Edge Function that validates, encrypts,
-- and inserts using server-side credentials. Add authenticated admin read policies only after
-- an admin portal is built.

-- Recommended production hardening:
-- 1. Route form submissions through a Supabase Edge Function.
-- 2. Encrypt federal tax ID, routing number, and account number server-side.
-- 3. Store only last-four values in normal operational columns.
-- 4. Never expose the Supabase service_role key in browser code.
-- 5. Keep Row Level Security enabled and avoid public select/update/delete policies.
-- 6. Add audit logging before allowing admin reads of sensitive records.
