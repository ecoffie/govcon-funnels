// One-off: blast the HUBZone "tonight" email to all registrants via MA's
// verified Resend account (sender: alerts@mail.getmindy.ai). Gmail capped at
// ~50/burst; Resend has no such cap. Reads the real 151 from Supabase.
//
// Usage:
//   RESEND_KEY=re_... node scripts/hubzone-blast-resend.mjs --dry
//   RESEND_KEY=re_... node scripts/hubzone-blast-resend.mjs --send
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const RESEND_KEY = process.env.RESEND_KEY;
const FROM = 'GovCon Giants <alerts@mail.getmindy.ai>';
const ZOOM = 'https://us06web.zoom.us/j/87112164591?pwd=bakXu7g8fbSUVCjEKpDcIRxPUH5XwH.1';
const MID = '871 1216 4591';
const PASS = '467983';
const DRY = process.argv.includes('--dry');
// Which email: tonight (default) | one-hour | live
const TYPE = (process.argv.find((a) => a.startsWith('--type='))?.split('=')[1]) || 'tonight';

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
const sb = createClient(url, key, { auth: { persistSession: false } });
const resend = new Resend(RESEND_KEY);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TEST_RE = /\+|@example\.com$|(^|\b)(test|email-test)\b/i;

function html(firstName) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1e293b;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">From Interested To Procurement Ready goes live at 6 PM ET. Your Zoom link is inside.</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
<tr><td style="background:linear-gradient(135deg,#f97316,#ea580c 50%,#c2410c);padding:40px 32px;text-align:center;">
<div style="display:inline-block;background:rgba(255,255,255,0.2);color:#fff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:999px;margin-bottom:16px;">Tonight · Live at 6 PM ET</div>
<h1 style="color:#fff;font-size:30px;line-height:1.2;font-weight:800;margin:0 0 12px;">We Go Live Tonight, ${firstName}!</h1>
<p style="color:#ffedd5;font-size:16px;margin:0;">From Interested To <strong style="color:#fff;">Procurement Ready</strong></p>
</td></tr>
<tr><td style="padding:32px 32px 0;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fff7ed;border:2px solid #fed7aa;border-radius:12px;"><tr><td style="padding:28px 24px;text-align:center;">
<p style="color:#9a3412;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 8px;">Your Join Link</p>
<p style="color:#1e293b;font-size:20px;font-weight:800;margin:0 0 4px;">Wednesday, June 17 · 6:00–8:00 PM EST</p>
<p style="color:#475569;font-size:14px;margin:0 0 20px;">Includes a live ½-hour Q&amp;A</p>
<a href="${ZOOM}" style="display:inline-block;background:#ea580c;color:#fff;padding:18px 40px;border-radius:10px;text-decoration:none;font-weight:800;font-size:18px;">🔗 Join the Webinar</a>
<p style="color:#64748b;font-size:13px;margin:18px 0 0;">Meeting ID: <strong style="color:#0f172a;">${MID}</strong> · Passcode: <strong style="color:#0f172a;">${PASS}</strong></p>
</td></tr></table></td></tr>
<tr><td style="padding:32px 32px 0;">
<p style="color:#475569;font-size:16px;line-height:1.65;margin:0 0 16px;">This is a <strong style="color:#0f172a;">live roundtable</strong>, not a lecture — quick intros, an open discussion across three experts, then a full <strong style="color:#0f172a;">½-hour Q&amp;A</strong> where you can put your situation in front of people who&rsquo;ve actually done it.</p>
<p style="color:#475569;font-size:15px;line-height:1.6;margin:0;">Todd Rogers (LTR) · Chad Eberly (Encore Funding) · Tim Hagerty (TeamingPro), moderated by Eric Coffie. Bring your toughest question.</p>
</td></tr>
<tr><td style="padding:28px 32px 36px;text-align:center;">
<a href="${ZOOM}" style="display:inline-block;background:#ea580c;color:#fff;padding:16px 32px;border-radius:10px;text-decoration:none;font-weight:800;font-size:16px;">Join the Webinar</a>
<p style="color:#94a3b8;font-size:12px;margin:14px 0 0;">By phone: +1 305 224 1968, then ${MID.replace(/ /g,'')} # and ${PASS} #.</p>
</td></tr>
<tr><td style="padding:24px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
<p style="color:#94a3b8;font-size:11px;margin:0;">Hosted by GovCon Giants with Encore Funding, TeamingPro &amp; LTR · govcongiants.com/hubzone</p>
</td></tr>
</table></td></tr></table></body></html>`;
}

function htmlOneHour(firstName) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1e293b;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
<tr><td style="background:linear-gradient(135deg,#f97316,#ea580c 50%,#c2410c);padding:36px 32px;text-align:center;">
<div style="display:inline-block;background:rgba(255,255,255,0.2);color:#fff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:999px;margin-bottom:14px;">Starts in 1 hour</div>
<h1 style="color:#fff;font-size:28px;line-height:1.2;font-weight:800;margin:0;">See you at 6 PM ET, ${firstName}.</h1></td></tr>
<tr><td style="padding:32px;text-align:center;">
<p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 22px;">Doors are about to open for <strong style="color:#0f172a;">From Interested To Procurement Ready</strong>. One tap and you&rsquo;re in:</p>
<a href="${ZOOM}" style="display:inline-block;background:#ea580c;color:#fff;padding:18px 44px;border-radius:10px;text-decoration:none;font-weight:800;font-size:18px;">🔗 Join the Webinar</a>
<p style="color:#64748b;font-size:13px;margin:18px 0 0;">Meeting ID: <strong style="color:#0f172a;">${MID}</strong> · Passcode: <strong style="color:#0f172a;">${PASS}</strong></p>
<p style="color:#94a3b8;font-size:12px;margin:14px 0 0;">By phone: +1 305 224 1968, then ${MID.replace(/ /g,'')} # and ${PASS} #.</p></td></tr>
<tr><td style="padding:0 32px 32px;text-align:center;"><p style="color:#94a3b8;font-size:11px;margin:0;">Hosted by GovCon Giants with Encore Funding, TeamingPro &amp; LTR.</p></td></tr>
</table></td></tr></table></body></html>`;
}
function htmlLive(firstName) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1e293b;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
<tr><td style="background:linear-gradient(135deg,#f97316,#ea580c 50%,#c2410c);padding:36px 32px;text-align:center;">
<h1 style="color:#fff;font-size:30px;line-height:1.2;font-weight:800;margin:0;">🔴 We&rsquo;re live now, ${firstName}!</h1></td></tr>
<tr><td style="padding:32px;text-align:center;">
<p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 22px;">The HUBZone roundtable is starting. Jump in:</p>
<a href="${ZOOM}" style="display:inline-block;background:#ea580c;color:#fff;padding:18px 44px;border-radius:10px;text-decoration:none;font-weight:800;font-size:18px;">Join Now</a>
<p style="color:#64748b;font-size:13px;margin:18px 0 0;">Meeting ID: <strong style="color:#0f172a;">${MID}</strong> · Passcode: <strong style="color:#0f172a;">${PASS}</strong></p></td></tr>
</table></td></tr></table></body></html>`;
}

const TEMPLATES = {
  tonight: { subject: 'Tonight at 6 PM ET — your Zoom link is inside', fn: html },
  'one-hour': { subject: 'Starts in 1 hour — your HUBZone webinar link', fn: htmlOneHour },
  live: { subject: "🔴 We're live — join the HUBZone roundtable now", fn: htmlLive },
};
const tmpl = TEMPLATES[TYPE];
if (!tmpl) { console.error(`Unknown --type=${TYPE}. Use tonight | one-hour | live.`); process.exit(1); }

const { data, error } = await sb
  .from('funnel_leads')
  .select('name,email,created_at')
  .in('source', ['hubzone-webinar', 'hubzone-webinar-bottom'])
  .order('created_at', { ascending: true });
if (error) { console.error('Supabase read failed:', error.message); process.exit(1); }

const byEmail = new Map();
for (const r of data ?? []) {
  const email = (r.email || '').toLowerCase().trim();
  if (!email || TEST_RE.test(email)) continue;
  if (!byEmail.has(email)) byEmail.set(email, { email, name: (r.name || '').trim() });
}
const recipients = [...byEmail.values()];
console.log(`Recipients: ${recipients.length} | type: ${TYPE} | subject: "${tmpl.subject}"`);

if (DRY) {
  console.log('DRY — first 5:', recipients.slice(0, 5).map((r) => r.email).join(', '));
  process.exit(0);
}

let sent = 0, failed = 0;
const failures = [];
for (const r of recipients) {
  const firstName = (r.name || '').split(/\s+/)[0] || 'there';
  try {
    const { error: e } = await resend.emails.send({
      from: FROM,
      to: [r.email],
      subject: tmpl.subject,
      html: tmpl.fn(firstName),
    });
    if (e) throw new Error(e.message);
    sent++;
  } catch (err) {
    failed++;
    failures.push({ email: r.email, error: err.message });
  }
  await sleep(120); // ~8/sec, well within Resend limits
  if ((sent + failed) % 25 === 0) console.log(`  progress: ${sent + failed}/${recipients.length} (sent ${sent}, failed ${failed})`);
}
console.log(`DONE — sent ${sent}, failed ${failed} of ${recipients.length}`);
if (failures.length) console.log('Failures:', JSON.stringify(failures, null, 2));
