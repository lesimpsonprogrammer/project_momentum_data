const onboardingForm = document.querySelector('#clientOnboardingForm');
const onboardingStatus = document.querySelector('#onboardingStatus');
const submitButton = document.querySelector('#onboardingSubmit');
const sameTaxAddress = document.querySelector('#taxAddressMatchesBusiness');
const taxAddressFields = document.querySelector('#taxAddressFields');
const yearNode = document.querySelector('#year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

function setStatus(message, type = '') {
  if (!onboardingStatus) return;
  onboardingStatus.textContent = message;
  onboardingStatus.className = `form-status ${type}`.trim();
}

function cleanValue(value) {
  return String(value || '').trim();
}

function onlyDigits(value) {
  return cleanValue(value).replace(/\D/g, '');
}

function lastFour(value) {
  const digits = onlyDigits(value);
  return digits.slice(-4) || null;
}

function checkedValues(formData, fieldName) {
  return formData.getAll(fieldName).map(cleanValue).filter(Boolean);
}

function requireConfig() {
  const config = window.MOMENTUM_ONBOARDING_CONFIG || {};
  const submissionEndpoint = cleanValue(config.submissionEndpoint);

  if (!submissionEndpoint || submissionEndpoint.includes('YOUR-PROJECT-REF')) {
    throw new Error('Secure onboarding endpoint is not configured yet. Update onboarding-config.js with your Supabase Edge Function URL.');
  }

  return { submissionEndpoint };
}

function buildPayload(formData) {
  const taxId = cleanValue(formData.get('federalTaxId'));
  const routingNumber = onlyDigits(formData.get('routingNumber'));
  const bankAccountNumber = onlyDigits(formData.get('bankAccountNumber'));
  const clientReference = `MD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  return {
    client_reference: clientReference,
    status: 'submitted',

    legal_business_name: cleanValue(formData.get('legalBusinessName')),
    dba_name: cleanValue(formData.get('dbaName')) || null,
    entity_type: cleanValue(formData.get('entityType')),
    business_address_line1: cleanValue(formData.get('businessAddressLine1')),
    business_address_line2: cleanValue(formData.get('businessAddressLine2')) || null,
    business_city: cleanValue(formData.get('businessCity')),
    business_state: cleanValue(formData.get('businessState')),
    business_zip: cleanValue(formData.get('businessZip')),
    business_country: cleanValue(formData.get('businessCountry')) || 'United States',
    website: cleanValue(formData.get('website')) || null,

    primary_contact_name: cleanValue(formData.get('primaryContactName')),
    primary_contact_title: cleanValue(formData.get('primaryContactTitle')) || null,
    primary_contact_email: cleanValue(formData.get('primaryContactEmail')),
    primary_contact_phone: cleanValue(formData.get('primaryContactPhone')),
    billing_contact_name: cleanValue(formData.get('billingContactName')) || null,
    billing_contact_email: cleanValue(formData.get('billingContactEmail')) || null,
    billing_contact_phone: cleanValue(formData.get('billingContactPhone')) || null,

    requested_services: checkedValues(formData, 'requestedServices'),
    current_systems: cleanValue(formData.get('currentSystems')) || null,
    data_sources: cleanValue(formData.get('dataSources')) || null,
    file_types: cleanValue(formData.get('fileTypes')) || null,
    desired_outputs: cleanValue(formData.get('desiredOutputs')) || null,
    project_goal: cleanValue(formData.get('projectGoal')),
    target_start_date: cleanValue(formData.get('targetStartDate')) || null,
    target_due_date: cleanValue(formData.get('targetDueDate')) || null,
    special_instructions: cleanValue(formData.get('specialInstructions')) || null,

    taxpayer_legal_name: cleanValue(formData.get('taxpayerLegalName')),
    tax_classification: cleanValue(formData.get('taxClassification')),
    federal_tax_id_last4: lastFour(taxId),
    tax_address_matches_business: formData.get('taxAddressMatchesBusiness') === 'on',
    tax_address_line1: cleanValue(formData.get('taxAddressLine1')) || null,
    tax_address_line2: cleanValue(formData.get('taxAddressLine2')) || null,
    tax_city: cleanValue(formData.get('taxCity')) || null,
    tax_state: cleanValue(formData.get('taxState')) || null,
    tax_zip: cleanValue(formData.get('taxZip')) || null,
    backup_withholding_notes: cleanValue(formData.get('backupWithholdingNotes')) || null,

    account_holder_name: cleanValue(formData.get('accountHolderName')),
    bank_name: cleanValue(formData.get('bankName')),
    routing_number_last4: lastFour(routingNumber),
    bank_account_last4: lastFour(bankAccountNumber),
    account_type: cleanValue(formData.get('accountType')),
    payment_authorization: formData.get('paymentAuthorization') === 'on',

    accuracy_acknowledgement: formData.get('accuracyAcknowledgement') === 'on',
    sensitive_data_acknowledgement: formData.get('sensitiveDataAcknowledgement') === 'on',
    signature_name: cleanValue(formData.get('signatureName')),
    signature_date: cleanValue(formData.get('signatureDate')) || new Date().toISOString().slice(0, 10),
    source_page: 'client-onboarding.html',
    user_agent: navigator.userAgent,

    sensitive_payload: {
      federal_tax_id: taxId,
      routing_number: routingNumber,
      bank_account_number: bankAccountNumber,
    },
  };
}

function validateSensitiveFields(payload) {
  if (payload.sensitive_payload.routing_number.length !== 9) {
    throw new Error('Routing number must contain exactly 9 digits.');
  }

  if (payload.sensitive_payload.bank_account_number.length < 4) {
    throw new Error('Bank account number must contain at least 4 digits.');
  }

  if (onlyDigits(payload.sensitive_payload.federal_tax_id).length < 4) {
    throw new Error('Federal Tax ID must contain at least 4 digits.');
  }

  if (payload.requested_services.length === 0) {
    throw new Error('Please select at least one requested service.');
  }

  if (!payload.payment_authorization || !payload.accuracy_acknowledgement || !payload.sensitive_data_acknowledgement) {
    throw new Error('Please complete all required acknowledgements before submitting.');
  }
}

async function submitToSecureEndpoint(payload) {
  const { submissionEndpoint } = requireConfig();
  const response = await fetch(submissionEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Onboarding submission failed with status ${response.status}.`);
  }

  return response.json();
}

if (sameTaxAddress && taxAddressFields) {
  const toggleTaxAddress = () => {
    const isSame = sameTaxAddress.checked;
    taxAddressFields.hidden = isSame;
    taxAddressFields.querySelectorAll('input').forEach((input) => {
      input.required = !isSame && input.dataset.requiredWhenVisible === 'true';
    });
  };

  sameTaxAddress.addEventListener('change', toggleTaxAddress);
  toggleTaxAddress();
}

if (onboardingForm) {
  onboardingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      setStatus('Validating onboarding information...', '');
      submitButton.disabled = true;

      const formData = new FormData(onboardingForm);
      const payload = buildPayload(formData);
      validateSensitiveFields(payload);

      setStatus('Submitting through the secure onboarding endpoint...', '');
      await submitToSecureEndpoint(payload);

      onboardingForm.reset();
      if (sameTaxAddress && taxAddressFields) {
        sameTaxAddress.checked = true;
        taxAddressFields.hidden = true;
      }

      setStatus(`Onboarding submitted successfully. Confirmation: ${payload.client_reference}`, 'success');
    } catch (error) {
      setStatus(error.message || 'Something went wrong while submitting the onboarding form.', 'error');
    } finally {
      submitButton.disabled = false;
    }
  });
}
