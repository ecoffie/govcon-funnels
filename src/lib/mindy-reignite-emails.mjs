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
<p style="color:#999999;font-size:11px;line-height:1.5;margin:0;">GovCon Giants &middot; Mindy &middot; You're receiving this because you started a Mindy profile.<br><a href="{{unsubscribe}}" style="color:#999999;">Unsubscribe</a></p>
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

export const STAGES = [
  {
    key: 'd0',
    daysAfterPrev: 0,
    subject: '{{first}}, opportunities are matching to you right now (you just can’t see them)',
    fn: (n, url) => shell(n,
      'Your Mindy profile is blank — so the matches go to someone else.',
      P(`${n},`) +
      P(`Every day, federal opportunities get matched to contractors based on their profile — ${B('NAICS, set-asides, past work')}, the agencies they serve.`) +
      P(`Yours is ${BU('blank')}.`) +
      P(`So when an opportunity that fits you ${U('perfectly')} hits the system, Mindy can’t surface it to you. It goes to the contractor who took two minutes to finish their profile.`) +
      P(`That’s the whole game:`) +
      LIST([
        `The matches are happening ${B('right now')}`,
        `They’re going to contractors with ${B('complete')} profiles`,
        `You’re just ${BU('not in the room')}`,
      ]) +
      P(`Two minutes fixes it.`),
      url,
      PS(`The opportunity that matched to someone else this week? It might have been ${B('yours')}.`)),
  },
  {
    key: 'd2',
    daysAfterPrev: 2,
    subject: 'There are two worlds of federal contracting. You’re stuck in the wrong one.',
    fn: (n, url) => shell(n,
      '20–100 competitors vs 5–10. Which side are you on?',
      P(`${n},`) +
      P(`There are ${B('two worlds')} of federal contracting.`) +
      P(`${BU('World 1')} — where most contractors are stuck:`) +
      LIST([
        `${B('20–100+')} competitors per opportunity`,
        `A ${B('2–5%')} win rate`,
        `Everyone fighting over the same SAM.gov postings`,
      ]) +
      P(`${BU('World 2')} — matched opportunities tuned to ${U('your')} profile:`) +
      LIST([
        `${B('5–10')} competitors`,
        `A ${B('15–30%')} win rate`,
        `Most contractors don’t even know these exist`,
      ]) +
      P(`Mindy puts you in World 2 — but ${B('only once your profile tells it who you are')}. Right now, it can’t.`),
      url,
      PS(`You’re not losing because you’re not good enough. You’re losing because you’re in the ${B('wrong room')}.`)),
  },
  {
    key: 'd4',
    daysAfterPrev: 2,
    subject: 'The contractors winning aren’t smarter. They just finished step one.',
    fn: (n, url) => shell(n,
      'A blank profile costs you every match, every day.',
      P(`${n},`) +
      P(`The difference between the contractors getting matched opportunities and the ones who aren’t usually ${B('isn’t')} skill, capital, or connections.`) +
      P(`It’s that one group ${BU('finished their profile')} and the other didn’t.`) +
      P(`A complete profile is what lets Mindy do the work ${U('for')} you:`) +
      LIST([
        `Pulls the opportunities that fit ${B('you')}`,
        `Instead of making you dig through ${B('thousands')} that don’t`,
      ]) +
      P(`Every day it sits empty is ${B('a day of matches you’ll never see')}.`),
      url,
      PS(`This is the one that keeps costing you — quietly, every single day.`)),
  },
  {
    key: 'd6',
    daysAfterPrev: 2,
    subject: '{{first}}, here’s what matched while your profile sat empty',
    fn: (n, url) => shell(n,
      'Opportunities that fit your business — gone to someone else.',
      P(`${n},`) +
      P(`This is the ${B('uncomfortable')} one.`) +
      P(`While your profile’s been blank, opportunities that could have matched your business have come and gone. Other contractors:`) +
      LIST([
        `${B('Saw')} them`,
        `${B('Responded')} to them`,
        `Some ${B('won')} them`,
      ]) +
      P(`You didn’t see any of it — ${U('not')} because you weren’t qualified, but because Mindy had ${B('nothing to match you against')}.`) +
      P(`That’s fixable. The ${BU('next')} round of matches is coming — be in it this time.`),
      url,
      PS(`The qualified contractor who misses the match still loses to the one who showed up. Show up.`)),
  },
  {
    key: 'd8',
    daysAfterPrev: 2,
    subject: 'Last one — then I’ll stop emailing you about this',
    fn: (n, url) => shell(n,
      'Finish your profile, or we’ll assume you’ve stepped back from contracting.',
      P(`${n},`) +
      P(`I’ve sent a few of these because I ${B('genuinely')} don’t want you missing matches that are sitting right there.`) +
      P(`This is the ${BU('last one')}.`) +
      P(`If your profile’s complete, Mindy works for you — surfacing the opportunities that fit your business so you stop fighting over the ones that don’t.`) +
      P(`If it stays blank, I’ll assume you’ve stepped back from contracting and ${B('leave you be')}.`),
      url,
      PS(`Two minutes now, or matches you’ll never know you missed. Your call — this is the last time I’ll ask.`)),
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
