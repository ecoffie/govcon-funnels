// Send the HUBZone recording email via Microsoft 365 SMTP as
// alerts@govcongiants.com (real domain, great inbox placement, ~10k/day cap).
// Reads M365 creds + Supabase from Market Assassin's .env.local.
//
//   node scripts/hubzone-recording-m365.mjs --test=eric@govcongiants.com
//   node scripts/hubzone-recording-m365.mjs --dry
//   node scripts/hubzone-recording-m365.mjs --send
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

const MA = '/Users/ericcoffie/Market Assasin/market-assassin/.env.local';
const FUNNELS = '/Users/ericcoffie/govcon-funnels/.env.local';
dotenv.config({ path: MA });               // SMTP creds
dotenv.config({ path: FUNNELS });           // (supabase here too, but MA has it)
// Supabase: prefer whichever env has it
const SB_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
const SB_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

const TEST = (process.argv.find((a) => a.startsWith('--test='))?.split('=')[1]) || null;
const DRY = process.argv.includes('--dry');
const SEND = process.argv.includes('--send');

const VIMEO = 'https://vimeo.com/1202429901';
const MINDY = 'https://govcongiants.com/mindy-launch?utm_source=hubzone-webinar&utm_medium=email&utm_campaign=mindy-june27';
const ENCORE = 'https://encoregov.com/?utm_source=hubzone-webinar&utm_medium=email&utm_campaign=working-capital';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});
const FROM = `"GovCon Giants" <${process.env.SMTP_USER || 'alerts@govcongiants.com'}>`;
const SUBJECT = (fn) => `${fn}, your HUBZone recording + what's next (free Mindy demo June 27)`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TEST_RE = /\+|@example\.com$|(^|\b)(test|email-test)\b/i;

function html(firstName) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your HUBZone roundtable recording</title></head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1e293b;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">The recording is ready — plus your next step: the free Mindy demo webinar on June 27.</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
      <tr><td style="background:linear-gradient(135deg,#f97316 0%,#ea580c 50%,#c2410c 100%);padding:36px 32px;text-align:center;">
        <h1 style="color:#ffffff;font-size:27px;line-height:1.2;font-weight:800;margin:0 0 8px;">Thanks for joining, ${firstName}.</h1>
        <p style="color:#ffedd5;font-size:15px;margin:0;">Here&rsquo;s the recording &mdash; and what&rsquo;s next.</p>
      </td></tr>
      <tr><td style="padding:32px 32px 0;text-align:center;">
        <p style="color:#0f172a;font-size:18px;font-weight:800;margin:0 0 14px;">From Interested To Procurement Ready &mdash; the full roundtable</p>
        <a href="${VIMEO}" style="display:inline-block;background-color:#0f172a;color:#ffffff;padding:16px 36px;border-radius:10px;text-decoration:none;font-weight:800;font-size:17px;">&#9654;&nbsp; Watch the Recording</a>
      </td></tr>
      <tr><td style="padding:28px 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:12px;"><tr><td style="padding:26px 24px;text-align:center;">
          <p style="color:#fbbf24;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 8px;">Free &amp; Live &middot; Saturday, June 27</p>
          <p style="color:#ffffff;font-size:21px;font-weight:800;margin:0 0 10px;">🚀 Mindy Demo Webinar</p>
          <p style="color:#cbd5e1;font-size:14px;line-height:1.6;margin:0 0 6px;">Meet <strong style="color:#ffffff;">Mindy &mdash; your 24/7 Federal Market Intelligence Analyst.</strong> She scans <strong style="color:#ffffff;">24,000+ federal opportunities daily</strong>, scores your fit, and tells you which to pursue.</p>
          <p style="color:#94a3b8;font-size:13px;font-style:italic;margin:0 0 18px;">The big contractors have armies. You have Mindy.</p>
          <a href="${MINDY}" style="display:inline-block;background-color:#fbbf24;color:#1e293b;padding:14px 30px;border-radius:8px;text-decoration:none;font-weight:800;font-size:15px;">Save Your Seat &mdash; Free &rarr;</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:24px 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff7ed;border:2px solid #fed7aa;border-radius:12px;"><tr><td style="padding:22px 24px;">
          <p style="color:#9a3412;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;">From tonight&rsquo;s panel</p>
          <p style="color:#0f172a;font-size:17px;font-weight:800;margin:0 0 6px;">How much working capital do your federal contracts qualify for?</p>
          <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 14px;">Find out free. Encore Funding will run a no-cost working-capital assessment &mdash; no obligation. First 10 to book this week get a same-week call.</p>
          <a href="${ENCORE}" style="display:inline-block;background-color:#ea580c;color:#ffffff;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:800;font-size:14px;">Get My Free Assessment</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:28px 32px 0;">
        <h3 style="color:#0f172a;font-size:15px;font-weight:800;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;">Connect with the panel</h3>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;"><p style="color:#0f172a;font-size:14px;font-weight:700;margin:0;">Eric Coffie <span style="color:#64748b;font-weight:500;">&middot; GovCon Giants (Moderator)</span></p><p style="color:#64748b;font-size:13px;margin:2px 0 0;"><a href="mailto:hello@govconedu.com" style="color:#ea580c;text-decoration:none;">hello@govconedu.com</a> &middot; <a href="tel:+15082906692" style="color:#ea580c;text-decoration:none;">+1 508-290-6692</a></p></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;"><p style="color:#0f172a;font-size:14px;font-weight:700;margin:0;">Todd Rogers <span style="color:#64748b;font-weight:500;">&middot; LTR (Agency / IDVs &amp; buyer side)</span></p><p style="color:#64748b;font-size:13px;margin:2px 0 0;"><a href="mailto:T.rogers@oneltr.com" style="color:#ea580c;text-decoration:none;">T.rogers@oneltr.com</a></p></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;"><p style="color:#0f172a;font-size:14px;font-weight:700;margin:0;">Chad Eberly <span style="color:#64748b;font-weight:500;">&middot; Encore Funding</span></p><p style="color:#64748b;font-size:13px;margin:2px 0 0;">Contact: Shelly Sweedler &middot; <a href="mailto:ssweedler@encore-funding.com" style="color:#ea580c;text-decoration:none;">ssweedler@encore-funding.com</a> &middot; <a href="tel:2169989021" style="color:#ea580c;text-decoration:none;">(216) 998-9021</a></p></td></tr>
          <tr><td style="padding:8px 0;"><p style="color:#0f172a;font-size:14px;font-weight:700;margin:0;">Tim Hagerty <span style="color:#64748b;font-weight:500;">&middot; TeamingPro</span></p><p style="color:#64748b;font-size:13px;margin:2px 0 0;"><a href="mailto:tim@teamingpro.com" style="color:#ea580c;text-decoration:none;">tim@teamingpro.com</a></p></td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:28px 32px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">Hosted by <strong style="color:#1e293b;">GovCon Giants</strong> with Encore Funding, TeamingPro &amp; LTR.</p></td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

async function sendOne(to, name) {
  const fn = (name || '').split(/\s+/)[0] || 'there';
  await transporter.sendMail({ from: FROM, to, subject: SUBJECT(fn), html: html(fn) });
}

// TEST MODE
if (TEST) {
  await transporter.verify();
  await sendOne(TEST, 'there');
  console.log('TEST sent via M365 to', TEST);
  process.exit(0);
}

// Pull recipients
const sb = createClient(SB_URL, SB_KEY, { auth: { persistSession: false } });
const { data, error } = await sb.from('funnel_leads')
  .select('name,email,created_at')
  .in('source', ['hubzone-webinar', 'hubzone-webinar-bottom'])
  .order('created_at', { ascending: true });
if (error) { console.error('Supabase read failed:', error.message); process.exit(1); }
const byEmail = new Map();
for (const r of data ?? []) {
  const e = (r.email || '').toLowerCase().trim();
  if (!e || TEST_RE.test(e)) continue;
  if (!byEmail.has(e)) byEmail.set(e, { email: e, name: (r.name || '').trim() });
}
const recipients = [...byEmail.values()];
console.log(`Recipients: ${recipients.length}`);

if (DRY || !SEND) {
  console.log('DRY — first 5:', recipients.slice(0, 5).map((r) => r.email).join(', '));
  console.log('(add --send to blast via M365)');
  process.exit(0);
}

await transporter.verify();
let sent = 0, failed = 0; const failures = [];
for (const r of recipients) {
  try { await sendOne(r.email, r.name); sent++; }
  catch (e) { failed++; failures.push({ email: r.email, error: e.message }); }
  await sleep(600); // ~100/min — comfortable for M365
  if ((sent + failed) % 25 === 0) console.log(`  ${sent + failed}/${recipients.length} (sent ${sent}, failed ${failed})`);
}
console.log(`DONE — sent ${sent}, failed ${failed} of ${recipients.length}`);
if (failures.length) console.log('Failures:', JSON.stringify(failures.slice(0, 20), null, 2));
