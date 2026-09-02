with submissions as (

    select * from {{ ref('stg_client_onboarding_submissions') }}

)

select
    status,
    count(*) as submission_count,
    min(submitted_at) as earliest_submitted_at,
    max(submitted_at) as latest_submitted_at,
    avg(date_part('day', now() - submitted_at)) as avg_days_since_submission
from submissions
group by status
