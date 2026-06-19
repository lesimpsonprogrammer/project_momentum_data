const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function requiredEnv(name: string) {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function textEncoder(value: string) {
  return new TextEncoder().encode(value);
}

function toBase64(bytes: Uint8Array) {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function fromBase64(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function importEncryptionKey() {
  const rawKey = fromBase64(requiredEnv('ONBOARDING_ENCRYPTION_KEY_B64'));
  if (rawKey.byteLength !== 32) {
    throw new Error('ONBOARDING_ENCRYPTION_KEY_B64 must decode to 32 bytes for AES-256-GCM.');
  }

  return crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, ['encrypt']);
}

async function encryptSensitivePayload(payload: unknown) {
  const key = await importEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedPayload = textEncoder(JSON.stringify(payload || {}));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encodedPayload);

  return `${toBase64(iv)}.${toBase64(new Uint8Array(encrypted))}`;
}

function cleanRecord(body: Record<string, unknown>) {
  const { sensitive_payload, ...record } = body;
  return { record, sensitivePayload: sensitive_payload };
}

function validateRecord(record: Record<string, unknown>, sensitivePayload: unknown) {
  const requiredFields = [
    'client_reference',
    'legal_business_name',
    'entity_type',
    'primary_contact_name',
    'primary_contact_email',
    'project_goal',
    'taxpayer_legal_name',
    'tax_classification',
    'account_holder_name',
    'bank_name',
    'account_type',
    'signature_name',
  ];

  const missingFields = requiredFields.filter((field) => !record[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  if (record.payment_authorization !== true || record.accuracy_acknowledgement !== true || record.sensitive_data_acknowledgement !== true) {
    throw new Error('Required acknowledgements were not completed.');
  }

  if (!sensitivePayload || typeof sensitivePayload !== 'object') {
    throw new Error('Sensitive payload is missing.');
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const supabaseUrl = requiredEnv('SUPABASE_URL').replace(/\/$/, '');
    const serviceRoleKey = requiredEnv('SUPABASE_SERVICE_ROLE_KEY');
    const encryptionKeyId = Deno.env.get('ONBOARDING_ENCRYPTION_KEY_ID') || 'onboarding-key-v1';

    const body = await request.json();
    const { record, sensitivePayload } = cleanRecord(body);
    validateRecord(record, sensitivePayload);

    const encryptedPayload = await encryptSensitivePayload(sensitivePayload);
    const insertPayload = {
      ...record,
      sensitive_payload_encrypted: encryptedPayload,
      sensitive_payload_algorithm: 'AES-256-GCM',
      sensitive_payload_key_id: encryptionKeyId,
    };

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/client_onboarding_submissions`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(insertPayload),
    });

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();
      return new Response(errorText || 'Database insert failed.', {
        status: insertResponse.status,
        headers: corsHeaders,
      });
    }

    const insertedRows = await insertResponse.json();
    return new Response(JSON.stringify({
      ok: true,
      client_reference: record.client_reference,
      id: insertedRows?.[0]?.id,
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : 'Unexpected onboarding submission error.', {
      status: 400,
      headers: corsHeaders,
    });
  }
});
