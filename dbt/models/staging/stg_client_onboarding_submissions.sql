with source as (

    select * from {{ source('momentum_data', 'client_onboarding_submissions') }}

),

renamed as (

    select
        id as submission_id,
        client_reference,
        status,

        -- company profile
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

        -- contacts
        primary_contact_name,
        primary_contact_title,
        primary_contact_email,
        primary_contact_phone,
        billing_contact_name,
        billing_contact_email,
        billing_contact_phone,

        -- project setup
        requested_services,
        current_systems,
        data_sources,
        file_types,
        desired_outputs,
        project_goal,
        target_start_date,
        target_due_date,
        special_instructions,

        -- non-sensitive tax context (no ids, no addresses)
        tax_classification,

        -- system metadata
        submitted_at,
        updated_at,
        source_page

        -- Intentionally excluded from analytics models: taxpayer_legal_name,
        -- federal_tax_id_last4, tax_address_*, backup_withholding_notes,
        -- account_holder_name, bank_name, routing_number_last4,
        -- bank_account_last4, account_type, payment_authorization,
        -- sensitive_payload_*, signature_name, signature_date, user_agent.

    from source

)

select * from renamed
