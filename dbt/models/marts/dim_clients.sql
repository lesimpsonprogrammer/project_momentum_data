with submissions as (

    select * from {{ ref('stg_client_onboarding_submissions') }}

),

-- One onboarding submission per client_reference today; ranking here means
-- this still works once a client is allowed to re-submit or update intake.
ranked as (

    select
        *,
        row_number() over (
            partition by client_reference
            order by submitted_at desc
        ) as submission_rank

    from submissions

)

select
    client_reference,
    legal_business_name,
    dba_name,
    entity_type,
    business_address_line1,
    business_address_line2,
    business_city,
    business_state,
    business_zip,
    business_country,
    website,
    primary_contact_name,
    primary_contact_title,
    primary_contact_email,
    primary_contact_phone,
    billing_contact_name,
    billing_contact_email,
    billing_contact_phone,
    status as latest_status,
    submitted_at as first_submitted_at,
    updated_at as latest_updated_at
from ranked
where submission_rank = 1
