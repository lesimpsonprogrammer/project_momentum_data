with submissions as (

    select * from {{ ref('stg_client_onboarding_submissions') }}

)

select
    submission_id,
    client_reference,
    status,
    entity_type,
    requested_services,
    array_length(requested_services, 1) as requested_services_count,
    current_systems,
    data_sources,
    file_types,
    desired_outputs,
    project_goal,
    target_start_date,
    target_due_date,
    special_instructions,
    tax_classification,
    submitted_at,
    updated_at,
    source_page,
    date_part('day', target_due_date - target_start_date) as requested_timeline_days,
    date_part('day', now() - submitted_at) as days_since_submission
from submissions
