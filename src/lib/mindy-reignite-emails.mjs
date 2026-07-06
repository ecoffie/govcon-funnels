// Mindy Re-Ignite — 5-email fear-of-loss drip content.
// Voice modeled on /bootcamp (proposal-bootcamp): "there's a hidden world of
// matched opportunities you're blind to while you fight over the wrong ones."
// Payoff: finish your Mindy profile -> Mindy surfaces MATCHED opportunities.
//
// Each stage exports { key, daysAfterPrev, subject, fn(firstName, profileUrl) }.
// The runner imports STAGES and walks a contact through them via GHL tags.

// ClickFunnels / Brunson style: plain-text *feel* (no graphics, no gradient card),
// heavy inline emphasis. Renders like a personal letter, which also lands better
// in the inbox than a designed "marketing" template.

// Inline emphasis helpers
const B = (t) => `<strong>${t}</strong>`;                                  // bold
const U = (t) => `<span style="text-decoration:underline;">${t}</span>`;    // underline
const BU = (t) => `<strong style="text-decoration:underline;">${t}</strong>`; // bold+underline

// Text-link CTA (inline, letter-style) — used inside body copy.
const LINK = (url, label) =>
  `<a href="${url}" style="color:#1d4ed8;font-weight:700;text-decoration:underline;">${label}</a>`;

// Simple, flat button (kept minimal — no rounded gradient pill).
const BTN = (url, label) =>
  `<a href="${url}" style="color:#1d4ed8;font-weight:800;font-size:17px;text-decoration:underline;">${label}</a>`;

// P.S. line — appended after the signature, Brunson-style. Optional per stage.
const PS = (t) => `__PS__${t}`;

function shell(firstName, preview, bodyHtml, profileUrl, ps) {
  const psHtml = ps
    ? `<p style="font-size:16px;line-height:1.6;margin:16px 0 0;">${B('P.S.')} ${ps.replace('__PS__','')}</p>`
    : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#222222;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:28px 16px;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;">
<tr><td style="padding:8px 8px 24px;font-size:16px;line-height:1.6;color:#222222;">
${bodyHtml}
<p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${BTN(profileUrl, '&rarr; Finish my profile')}<br>
<span style="color:#888888;font-size:14px;">(takes about two minutes)</span></p>
<p style="font-size:16px;line-height:1.6;margin:22px 0 4px;">&mdash; Eric</p>
${psHtml}
</td></tr>
<tr><td style="padding:18px 8px 0;border-top:1px solid #eeeeee;">
<p style="color:#999999;font-size:11px;line-height:1.5;margin:0;">GovCon Giants &middot; Mindy &middot; You're receiving this because you attended a GovCon Giants bootcamp and started a Mindy profile.<br><a href="{{unsubscribe}}" style="color:#999999;">Unsubscribe</a></p>
</td></tr>
</table></td></tr></table></body></html>`;
}

const P = (t) => `<p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${t}</p>`;
// asterisk / index-style bullet lines (Brunson uses these instead of graphics)
const LIST = (items) =>
  `<table cellpadding="0" cellspacing="0" style="margin:0 0 16px;">` +
  items.map((t) => `<tr><td valign="top" style="font-size:16px;line-height:1.6;padding:0 8px 6px 0;color:#222;">&rarr;</td><td style="font-size:16px;line-height:1.6;padding:0 0 6px;">${t}</td></tr>`).join('') +
  `</table>`;
const STRONG = (t) => B(t);

// AUDIENCE: warm GovCon Giants bootcamp alumni who started a Mindy profile and
// went quiet without finishing it (tag mindy-profile-incomplete). The arc leans
// on SUNK COST + belonging + last-call — "you already invested a day learning
// this" — not "your profile is blank," because these people already did the work.
export const STAGES = [
  // 1 — SUNK COST: you did the hard part, don't let it go cold.
  {
    key: 'd0',
    daysAfterPrev: 0,
    subject: '{{first}}, you already learned how to win these. Your account went quiet.',
    fn: (n, url) => shell(n,
      "You did the hard part already. Your Mindy account just went cold.",
      P(`${n},`) +
      P(`You sat through a GovCon Giants bootcamp. You already know the part most contractors ${B('never')} figure out — where the real opportunities hide and how to get in front of them ${B('before')} they hit SAM.gov.`) +
      P(`Then your Mindy account went ${U('quiet')}.`) +
      P(`Here's what bugs me about that. The training only pays off if something's ${B('working the pipeline for you')} every day. Right now, nothing is:`) +
      LIST([
        `Matches go out ${B('daily')} — to contractors with finished profiles`,
        `Yours is ${B('blank')}, so Mindy has nothing to match you against`,
        `Everything you learned is ${BU('just sitting there')}`,
      ]) +
      P(`You did the hard part. This is the ${U('easy')} part — two minutes that turns what you learned into opportunities landing in your inbox.`),
      url,
      PS(`You didn't spend a day learning this to let it go cold. The next round of matches is coming — be in it.`)),
  },

  // 2 — THE GAP: the classmates still in the game vs the ones who drifted.
  {
    key: 'd2',
    daysAfterPrev: 2,
    subject: 'The people from your bootcamp who are winning did one thing you didn’t',
    fn: (n, url) => shell(n,
      "Same training. Different results. Here's the split.",
      P(`${n},`) +
      P(`Everyone in that room got the ${B('same')} playbook. A year later the results split hard — and it usually isn't talent or timing.`) +
      P(`${BU('The ones landing work')} did one unglamorous thing:`) +
      LIST([
        `They let Mindy ${B('run the pipeline')} for them daily`,
        `So opportunities that fit ${U('them')} showed up automatically`,
      ]) +
      P(`${BU('The ones still stuck')} are doing it the old way — logging into SAM.gov, scrolling, guessing, competing with ${B('everybody')}.`) +
      P(`The difference wasn't the bootcamp. It was whether they ${B('turned the tool on')} after it.`),
      url,
      PS(`You're one finished profile away from the first group.`)),
  },

  // 3 — VALUE / REMINDER: what Mindy actually does for a trained operator.
  {
    key: 'd4',
    daysAfterPrev: 2,
    subject: '{{first}}, remember what Mindy does while you sleep?',
    fn: (n, url) => shell(n,
      "The whole point was to stop hunting. Mindy hunts for you.",
      P(`${n},`) +
      P(`Quick reminder of why you started, because it's easy to forget once life gets busy.`) +
      P(`The whole point of the bootcamp was to stop ${B('hunting')} for opportunities one by one. Mindy does that hunting ${U('for')} you — every day, in the background:`) +
      LIST([
        `Scans federal opportunities against ${B('your')} business`,
        `Surfaces the ones you can actually ${B('win')}`,
        `So you skip the ${B('thousands')} that were never a fit`,
      ]) +
      P(`But it can only do that once it knows who you are. A finished profile is the switch. ${U('Yours is still off.')}`),
      url,
      PS(`A trained contractor with the tool off still loses to an average one with it on.`)),
  },

  // 4 — LOSS: the uncomfortable one — what already went by.
  {
    key: 'd6',
    daysAfterPrev: 2,
    subject: 'This is the uncomfortable email',
    fn: (n, url) => shell(n,
      "Opportunities that fit you have already come and gone.",
      P(`${n},`) +
      P(`This is the ${B('uncomfortable')} one, so I'll keep it short.`) +
      P(`Since your bootcamp, opportunities that fit your business have come and gone. Other contractors — some with ${U('less')} training than you now have —`) +
      LIST([
        `${B('Saw')} them`,
        `${B('Bid')} on them`,
        `Some ${B('won')} them`,
      ]) +
      P(`You didn't see any of it. ${U('Not')} because you weren't qualified — because Mindy had ${B('nothing to match you against')}.`) +
      P(`That stops the moment your profile's done. The ${BU('next')} round is coming.`),
      url,
      PS(`You can't get the last one back. You can be in the next one.`)),
  },

  // 5 — LAST CALL: clean, respectful, door-closing.
  {
    key: 'd8',
    daysAfterPrev: 2,
    subject: 'Last one, {{first}} — then I’ll stop',
    fn: (n, url) => shell(n,
      "Finish your profile, or I'll assume you've stepped back and leave you be.",
      P(`${n},`) +
      P(`I've sent a few of these because you ${B('did the work')} — you sat through the training — and it genuinely bothers me to watch that go to waste.`) +
      P(`This is the ${BU('last one')}.`) +
      P(`If you finish your profile, Mindy goes to work: surfacing the opportunities that fit you so you stop fighting over the ones that don't. Everything you learned finally ${U('compounds')}.`) +
      P(`If it stays blank, I'll assume you've stepped back from contracting and ${B('leave you be')}. No hard feelings.`),
      url,
      PS(`Two minutes now, or a playbook that never gets used. Your call — this is the last time I'll ask.`)),
  },
];

// Render a stage for a given recipient. subject {{first}} -> firstName.
export function renderStage(stage, firstName, profileUrl) {
  const name = firstName || 'there';
  return {
    subject: stage.subject.replaceAll('{{first}}', name),
    html: stage.fn(name, profileUrl),
  };
}
