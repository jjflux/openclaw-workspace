/* ============================================================================
   Meta Conversions API relay (server-side tracking)
   ----------------------------------------------------------------------------
   Receives conversion events (Lead / Schedule / Purchase) and forwards them to
   Meta's Conversions API server-to-server. De-duplicated with the browser pixel
   via a shared `event_id`, so Meta counts each conversion once.

   Sources of events:
     • The epoxy funnel  → Lead (qualified 25k+) + Schedule (booking)
     • GoHighLevel webhook → Purchase (when you mark a deal Won/Closed) with value

   SECRET HANDLING: the access token is read from the Netlify env var
   META_CAPI_TOKEN (never committed to git). The pixel ID from META_PIXEL_ID.
   If either is missing the function safely no-ops, so it's harmless to deploy
   before you've configured them.
   ========================================================================== */

const crypto = require('crypto');

const PIXEL_ID     = process.env.META_PIXEL_ID  || '';
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN || '';
const TEST_CODE    = process.env.META_TEST_EVENT_CODE || ''; // optional, for Meta's Test Events screen
const API_VERSION  = 'v21.0';

/* SHA-256 hash, normalized (lowercase + trimmed) — required by Meta for PII */
function hashNorm(v) {
  if (!v) return undefined;
  return crypto.createHash('sha256').update(String(v).trim().toLowerCase()).digest('hex');
}
/* Phone: strip everything but digits, then hash */
function hashPhone(v) {
  if (!v) return undefined;
  const digits = String(v).replace(/[^0-9]/g, '');
  if (!digits) return undefined;
  return crypto.createHash('sha256').update(digits).digest('hex');
}

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors(), body: '' };
  if (event.httpMethod !== 'POST')    return { statusCode: 405, headers: cors(), body: 'Method Not Allowed' };

  // Dormant until configured — safe no-op so it can ship before creds are set.
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return { statusCode: 200, headers: cors(), body: JSON.stringify({ ok: false, skipped: 'capi_not_configured' }) };
  }

  let d;
  try { d = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, headers: cors(), body: JSON.stringify({ ok: false, error: 'bad_json' }) }; }

  if (!d.event_name) {
    return { statusCode: 400, headers: cors(), body: JSON.stringify({ ok: false, error: 'missing_event_name' }) };
  }

  const headers = event.headers || {};
  const ip = (headers['x-nf-client-connection-ip'] || headers['x-forwarded-for'] || '').split(',')[0].trim();

  const user_data = {};
  if (d.email)      user_data.em = hashNorm(d.email);
  if (d.phone)      user_data.ph = hashPhone(d.phone);
  if (d.first_name) user_data.fn = hashNorm(d.first_name);
  if (d.last_name)  user_data.ln = hashNorm(d.last_name);
  if (d.fbp)        user_data.fbp = d.fbp;   // Facebook browser id — NOT hashed
  if (d.fbc)        user_data.fbc = d.fbc;   // Facebook click id   — NOT hashed
  if (ip)                       user_data.client_ip_address = ip;
  if (headers['user-agent'])    user_data.client_user_agent = headers['user-agent'];

  const data = {
    event_name: d.event_name,                                   // Lead | Schedule | Purchase
    event_time: d.event_time || Math.floor(Date.now() / 1000),  // seconds
    action_source: d.action_source || 'website',
    event_source_url: d.event_source_url,
    event_id: d.event_id,                                       // dedup key shared with browser pixel
    user_data,
  };
  if (d.value != null && d.value !== '') {
    data.custom_data = { value: Number(d.value), currency: d.currency || 'USD' };
  }
  if (d.content_name || d.content_category) {
    data.custom_data = Object.assign(data.custom_data || {}, {
      content_name: d.content_name,
      content_category: d.content_category,
    });
  }

  const payload = { data: [data] };
  const testCode = d.test_event_code || TEST_CODE;
  if (testCode) payload.test_event_code = testCode;

  const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const text = await resp.text();
    return { statusCode: resp.ok ? 200 : 502, headers: cors(), body: text };
  } catch (e) {
    return { statusCode: 502, headers: cors(), body: JSON.stringify({ ok: false, error: String(e) }) };
  }
};
