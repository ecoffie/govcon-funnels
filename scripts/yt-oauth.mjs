#!/usr/bin/env node
/**
 * One-time helper to get a YouTube Analytics refresh token (for 28-day views +
 * retention on the /team/yt scoreboard). Run locally; authorize in the browser as
 * the CHANNEL OWNER. Prints a refresh token to add to Vercel env.
 *
 * Prereqs (done in Google Cloud Console, project "market-assasin"):
 *   1. Enable "YouTube Analytics API".
 *   2. OAuth consent screen: External, add YOUR Google account as a Test user.
 *   3. Credentials → Create OAuth client ID → type "Desktop app" → download the JSON.
 *
 * Usage:
 *   node scripts/yt-oauth.mjs /path/to/client_secret_XXX.json
 *
 * Then set in Vercel (govcon-funnels, Production):
 *   YT_OAUTH_CLIENT_ID, YT_OAUTH_CLIENT_SECRET, YT_OAUTH_REFRESH_TOKEN
 */
import { readFileSync } from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';

const jsonPath = process.argv[2];
if (!jsonPath) { console.error('Usage: node scripts/yt-oauth.mjs <client_secret.json>'); process.exit(1); }
const conf = JSON.parse(readFileSync(jsonPath, 'utf8'));
const c = conf.installed || conf.web;
if (!c?.client_id) { console.error('Not a valid OAuth client JSON (no installed/web.client_id).'); process.exit(1); }

const PORT = 53682;
const REDIRECT = `http://localhost:${PORT}`;
const SCOPES = [
  'https://www.googleapis.com/auth/yt-analytics.readonly',
  'https://www.googleapis.com/auth/youtube.readonly',
].join(' ');

const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
  client_id: c.client_id,
  redirect_uri: REDIRECT,
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
}).toString();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get('code');
  if (!code) { res.end('No code.'); return; }
  res.end('Authorized. You can close this tab and return to the terminal.');
  server.close();
  const tok = await (await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code, client_id: c.client_id, client_secret: c.client_secret,
      redirect_uri: REDIRECT, grant_type: 'authorization_code',
    }),
  })).json();
  if (tok.error) { console.error('\nToken error:', tok.error, tok.error_description); process.exit(1); }
  console.log('\n=== ADD THESE TO VERCEL (govcon-funnels, Production) ===');
  console.log('YT_OAUTH_CLIENT_ID     =', c.client_id);
  console.log('YT_OAUTH_CLIENT_SECRET =', c.client_secret);
  console.log('YT_OAUTH_REFRESH_TOKEN =', tok.refresh_token || '(none — re-run; you may have already granted. Revoke at myaccount.google.com/permissions then retry.)');
  process.exit(0);
});
server.listen(PORT, () => {
  console.log('Opening browser to authorize (sign in as the CHANNEL OWNER)...');
  console.log('If it does not open, visit:\n', authUrl, '\n');
  spawn('open', [authUrl]);
});
