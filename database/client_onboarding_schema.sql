-- Momentum Data - Client Onboarding Database Schema
-- Target: Supabase / PostgreSQL
-- Purpose: Store new client onboarding submissions from the onboarding form.

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

  -- Tax information
  taxpayer_legal_name text not null,
  tax_classification text not null,
  federal_tax_id text not null,
  federal_tax_id_last4 text,
  tax_address_matches_business boolean not null default true,
  tax_address_line1 text,
  tax_address_line2 text,
  tax_city text,
  tax_state text,
  tax_zip text,
  backup_withholding_notes text,

  -- Banking information
  account_holder_name text not null,
  bank_name text not null,
  routing_number text not null,
  bank_account_number text not null,
  bank_account_last4 text,
  account_type text not null,
  payment_authorization boolean not null default false,

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

-- Browser form policy: allow public insert only.
-- This is intended for a static website using a Supabase anon key.
-- Do NOT create public select/update/delete policies for sensitive banking or tax data.
drop policy if exists "Allow public onboarding inserts" on public.client_onboarding_submissions;
create policy "Allow public onboarding inserts"
on public.client_onboarding_submissions
for insert
to anon
with check (
  status = 'submitted'
  and payment_authorization = true
  and accuracy_acknowledgement = true
  and sensitive_data_acknowledgement = true
);

-- Recommended production hardening:
-- 1. Replace direct browser insert with a Supabase Edge Function.
-- 2. Encrypt federal_tax_id and bank_account_number before insert.
-- 3. Store only last four digits in standard operational views.
-- 4. Add an authenticated admin-only read policy when an admin portal is built.
-- 5. Never expose the Supabase service_role key in browser code.
