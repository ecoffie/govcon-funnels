/**
 * Backend lead scoring for Fireflies-synced transcripts.
 * Buckets: high_ticket, low_ticket, no_ticket
 */

const RULES = {
  weights: {
    // Primary signal: person agreed to / scheduled a second call → high ticket ($5,997)
    second_call_intent: 40,
    consulting_intent: 20,
    budget_readiness: 18,
    revenue_signal: 20,
    white_glove_intent: 16,
    contract_signal: 14,
    urgency: 12,
    // Low ticket product signal ($99/mo or $997 plan)
    low_ticket_product: 15,
  },
  keywords: {
    second_call_intent: [
      'second call', 'another call', 'follow-up call', 'follow up call',
      'strategy call', 'closing call', 'next call', 'schedule a call',
      'book a call', 'set up a call', 'schedule another', 'book another',
      "let's schedule", 'want to schedule', 'schedule a time', 'book a time',
      'calendar link', 'calendly', 'ready to move forward', 'next steps call',
    ],
    consulting_intent: ['consulting', 'consultant', 'advisory', 'done for you', 'help me do this'],
    budget_readiness: ['budget', 'pricing', 'monthly', 'retainer', 'cost', '$', '7k', '5k', '99 a month'],
    revenue_signal: ['million', '$1m', '$10m', 'annual revenue', '7 figure', '8 figure'],
    white_glove_intent: ['white glove', 'done for you', 'managed service', 'concierge', 'hands-on support'],
    contract_signal: ['contracts', 'contract awards', 'awards', 'vehicles', 'prime contracts', 'subcontracts'],
    urgency: ['asap', 'immediately', 'this month', 'urgent', 'deadline'],
    low_ticket_product: [
      '$99', '99 a month', '99/month', '99 per month',
      '$997', '997 program', '997 course', '997 plan', '997 package',
      'monthly membership', 'self-paced', 'diy program', 'online course',
    ],
  },
  thresholds: {
    hot: 65,
    warm: 40,
  },
};

function containsAny(text, terms) {
  const t = text.toLowerCase();
  return terms.some((k) => t.includes(k));
}

function scoreTranscript(transcript) {
  // Combine sentences and summary so both sources are scored
  const sentenceText = (transcript.sentences || []).map((s) => s.text || '').join(' ');
  const summaryText = transcript.summary || '';
  const fullText = `${sentenceText} ${summaryText}`.toLowerCase();

  const reasons = [];
  let score = 0;

  for (const [rule, weight] of Object.entries(RULES.weights)) {
    if (containsAny(fullText, RULES.keywords[rule])) {
      score += weight;
      reasons.push(rule);
    }
  }

  // HIGH TICKET: person agreed to schedule a second call (→ $5,997 offer)
  const wantsSecondCall = reasons.includes('second_call_intent');
  // LOW TICKET: person only interested in $99/mo or $997 plan
  const wantsLowTicketProduct = reasons.includes('low_ticket_product');
  const hasAnyIntent = reasons.includes('consulting_intent') || reasons.includes('budget_readiness') || reasons.includes('white_glove_intent');

  let lead_type = 'no_ticket';
  if (hasAnyIntent || wantsLowTicketProduct) lead_type = 'low_ticket';
  if (wantsSecondCall) lead_type = 'high_ticket';

  let stage = 'nurture';
  if (score >= RULES.thresholds.hot) stage = 'hot';
  else if (score >= RULES.thresholds.warm) stage = 'warm';

  let confidence = 'low';
  if (score >= 60) confidence = 'high';
  else if (score >= 35) confidence = 'medium';

  // Pull evidence quotes from both sentences and summary
  const allKeywords = Object.values(RULES.keywords).flat();
  const sentenceQuotes = (transcript.sentences || [])
    .map((s) => s.text || '')
    .filter((txt) => containsAny(txt, allKeywords));
  const summaryQuotes = summaryText
    ? summaryText.split(/[.!?\n]+/).map((s) => s.trim()).filter((txt) => txt && containsAny(txt, allKeywords))
    : [];
  const evidence_quotes = [...sentenceQuotes, ...summaryQuotes].slice(0, lead_type === 'high_ticket' ? 3 : 4);

  return {
    lead_id: `${transcript.id}:lead`,
    transcript_id: transcript.id,
    name: (transcript.participants && transcript.participants[0]) || transcript.title || transcript.id,
    company: (transcript.participants && transcript.participants[1]) || 'Unknown',
    date: transcript.date || '',
    source: transcript.source || 'unknown',
    lead_type,
    stage,
    score,
    confidence,
    reason_codes: reasons,
    evidence_quotes,
    updated_at: new Date().toISOString(),
  };
}

export function scoreLeadsFromTranscripts(transcripts = []) {
  return transcripts.map(scoreTranscript);
}

export function summarizeLeads(leads = []) {
  const byType = {};
  const byStage = {};
  for (const l of leads) {
    byType[l.lead_type] = (byType[l.lead_type] || 0) + 1;
    byStage[l.stage] = (byStage[l.stage] || 0) + 1;
  }
  return {
    total: leads.length,
    byType,
    byStage,
  };
}
