/**
 * Meeting Intelligence Dashboard – single-page React app.
 * Loads local transcripts (public/transcripts.json), analyzes via Anthropic API proxy,
 * and surfaces commitments, decisions, topics, speaking time, ROI, search, and more.
 * API base: VITE_API_URL or http://localhost:3001
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Sun,
  Moon,
  FileText,
  UserCircle,
  Target,
  MessageSquare,
  Search,
  AlertTriangle,
  TrendingUp,
  Download,
  Loader2,
  Calendar,
  Mail,
  RefreshCw,
  Database,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const LEAD_TYPE_ORDER = ['high_ticket', 'low_ticket', 'no_ticket'];

// ---- Helpers ----
function defaultDateRange() {
  const end = new Date();
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1); // default to last year so older transcripts show
  return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
}

function cacheKey(ids, type, extra = '') {
  return [...ids].sort().join(',') + '|' + type + (extra ? '|' + extra : '');
}

// Format "2025-06" -> "June 25", "2026-01" -> "Jan 26"
function formatMonthLabel(dateStr) {
  if (!dateStr || dateStr.length < 7) return dateStr;
  const [y, m] = dateStr.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[(m || 1) - 1] || '';
  const yearShort = String(y || '').slice(-2);
  return `${monthName} ${yearShort}`;
}

function formatUsDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr || '-';
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
}

const LOCAL_LEAD_RULES = {
  weights: {
    // Primary signal: person agreed to / scheduled a second call → high ticket ($5,997)
    second_call_intent: 40,
    consulting_intent: 20,
    urgency: 12,
    budget_readiness: 18,
    revenue_signal: 20,
    white_glove_intent: 16,
    contract_signal: 14,
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
    urgency: ['asap', 'immediately', 'this month', 'urgent', 'deadline'],
    budget_readiness: ['budget', 'pricing', 'monthly', 'retainer', 'cost', '$', '7k', '5k', '99 a month'],
    revenue_signal: ['million', '$1m', '$10m', 'annual revenue', '7 figure', '8 figure'],
    white_glove_intent: ['white glove', 'done for you', 'managed service', 'concierge', 'hands-on support'],
    contract_signal: ['contracts', 'contract awards', 'awards', 'vehicles', 'prime contracts', 'subcontracts'],
    low_ticket_product: [
      '$99', '99 a month', '99/month', '99 per month',
      '$997', '997 program', '997 course', '997 plan', '997 package',
      'monthly membership', 'self-paced', 'diy program', 'online course',
    ],
  },
  thresholds: { hot: 65, warm: 40 },
};

function containsAny(text, terms) {
  const t = String(text || '').toLowerCase();
  return terms.some((k) => t.includes(k));
}

const INTERNAL_PARTICIPANT_TERMS = [
  'govconedu',
  'govcon edu',
  'govcon giants',
  'govcongiants',
  'eric',
  'brandon',
  'ryan',
  'zach',
  'randy',
];

function normalizeIdentity(text = '') {
  return String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function isInternalParticipant(name = '') {
  const n = normalizeIdentity(name);
  if (!n) return false;
  return INTERNAL_PARTICIPANT_TERMS.some((term) => n.includes(normalizeIdentity(term)));
}

function isExternalParticipant(name = '') {
  const n = normalizeIdentity(name);
  return Boolean(n) && !isInternalParticipant(n);
}

function sanitizeDisplayIdentity(name = '') {
  let value = String(name || '');
  for (const term of INTERNAL_PARTICIPANT_TERMS) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    value = value.replace(new RegExp(escaped, 'ig'), ' ');
  }
  return value.replace(/\s{2,}/g, ' ').trim();
}

function shortQuote(text = '', maxWords = 20) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return words.join(' ');
  return `${words.slice(0, maxWords).join(' ')}...`;
}

function quoteLabelForRule(rule = '') {
  if (rule === 'second_call_intent') return 'Second call scheduled';
  if (rule === 'revenue_signal') return 'Revenue signal';
  if (rule === 'budget_readiness') return 'Budget readiness';
  if (rule === 'white_glove_intent') return 'White-glove intent';
  if (rule === 'contract_signal') return 'Contract signal';
  if (rule === 'urgency') return 'Urgency';
  if (rule === 'consulting_intent') return 'Consulting intent';
  if (rule === 'low_ticket_product') return 'Low-ticket product';
  if (rule === 'business_dev_fit') return 'Business dev fit';
  if (rule === 'beginner_intent') return 'Beginner intent';
  return 'Signal';
}

function toQuoteText(value) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') return value.quote || '';
  return '';
}

function normalizeEvidenceQuotes(quotes = []) {
  return (Array.isArray(quotes) ? quotes : [])
    .map((q) => {
      if (typeof q === 'string') return { label: 'Signal', quote: shortQuote(q, 20) };
      if (q && typeof q === 'object') return { label: q.label || 'Signal', quote: shortQuote(q.quote || '', 20) };
      return null;
    })
    .filter((q) => q && q.quote);
}

function collectSpeakerRuleHits(transcript) {
  const hitsByRule = {};
  for (const rule of Object.keys(LOCAL_LEAD_RULES.keywords)) hitsByRule[rule] = [];
  for (const s of transcript.sentences || []) {
    const text = String(s.text || '');
    if (!text) continue;
    const speaker = String(s.speaker || '');
    const speakerClass = isExternalParticipant(speaker) ? 'external' : isInternalParticipant(speaker) ? 'internal' : 'unknown';
    for (const [rule, terms] of Object.entries(LOCAL_LEAD_RULES.keywords)) {
      if (containsAny(text, terms)) {
        hitsByRule[rule].push({ text, speaker, speakerClass });
      }
    }
  }
  return hitsByRule;
}

function buildEvidenceQuotes(transcript, reasons = [], leadType = '', hitsByRule = {}) {
  const sentences = (transcript.sentences || []).map((s) => ({ text: String(s.text || ''), speaker: String(s.speaker || '') })).filter((s) => s.text);
  const preferredRules =
    leadType === 'high_ticket'
      ? ['second_call_intent', 'revenue_signal', 'contract_signal', 'budget_readiness', 'white_glove_intent', 'consulting_intent']
      : leadType === 'low_ticket'
      ? ['low_ticket_product', 'consulting_intent', 'budget_readiness', ...reasons]
      : reasons;
  const seen = new Set();
  const out = [];
  const maxQuotes = leadType === 'high_ticket' ? 3 : 4;
  const pushQuote = (txt, rule) => {
    const quote = shortQuote(txt, 20);
    const key = quote.toLowerCase();
    if (!quote || seen.has(key)) return;
    seen.add(key);
    out.push({ label: quoteLabelForRule(rule), quote });
  };

  for (const rule of preferredRules) {
    const hits = (hitsByRule[rule] || []).filter((h) => (leadType === 'high_ticket' ? h.speakerClass === 'external' : true));
    for (const hit of hits) {
      pushQuote(hit.text, rule);
      if (out.length >= maxQuotes) return out.slice(0, maxQuotes);
    }
  }
  for (const s of sentences) {
    if (out.length >= maxQuotes) break;
    if (leadType === 'high_ticket' && !isExternalParticipant(s.speaker)) continue;
    pushQuote(s.text, reasons[0] || '');
  }
  return out.slice(0, maxQuotes);
}

function scoreLocalLead(transcript) {
  // Combine sentences and summary so both sources are scored
  const sentenceText = (transcript.sentences || []).map((s) => s.text || '').join(' ');
  const summaryText = transcript.summary || '';
  const fullText = `${sentenceText} ${summaryText}`.toLowerCase();

  const hitsByRule = collectSpeakerRuleHits(transcript);
  const reasons = [];
  let score = 0;
  for (const [rule, weight] of Object.entries(LOCAL_LEAD_RULES.weights)) {
    if ((hitsByRule[rule] || []).length > 0 || containsAny(fullText, LOCAL_LEAD_RULES.keywords[rule])) {
      score += weight;
      reasons.push(rule);
    }
  }

  // HIGH TICKET: person agreed to schedule a second call (→ $5,997 offer)
  const wantsSecondCall = reasons.includes('second_call_intent');
  // LOW TICKET: interested in $99/mo or $997 plan only
  const wantsLowTicketProduct = reasons.includes('low_ticket_product');
  const hasAnyIntent = reasons.includes('consulting_intent') || reasons.includes('budget_readiness') || reasons.includes('white_glove_intent');

  let lead_type = 'no_ticket';
  if (hasAnyIntent || wantsLowTicketProduct) lead_type = 'low_ticket';
  if (wantsSecondCall) lead_type = 'high_ticket';

  const is_external_verified_high_ticket = wantsSecondCall;

  let stage = 'nurture';
  if (score >= LOCAL_LEAD_RULES.thresholds.hot) stage = 'hot';
  else if (score >= LOCAL_LEAD_RULES.thresholds.warm) stage = 'warm';

  let confidence = 'low';
  if (score >= 60) confidence = 'high';
  else if (score >= 35) confidence = 'medium';

  const participants = transcript.participants || [];
  const externalParticipants = participants.filter(isExternalParticipant);
  const personName = sanitizeDisplayIdentity(externalParticipants[0] || participants[0] || transcript.title || transcript.id) || 'Unknown';
  const companyName = sanitizeDisplayIdentity(externalParticipants[1] || participants[1] || 'Unknown') || 'Unknown';
  const evidence_quotes = buildEvidenceQuotes(transcript, reasons, lead_type, hitsByRule);

  return {
    lead_id: `${transcript.id}:local`,
    transcript_id: transcript.id,
    name: personName,
    company: companyName,
    call_name: transcript.title || transcript.id,
    date: transcript.date || '',
    source: 'local',
    lead_type,
    stage,
    score,
    confidence,
    reason_codes: reasons,
    evidence_quotes,
    is_external_verified_high_ticket,
  };
}

function sanitizeLeadName(name = '') {
  return sanitizeDisplayIdentity(String(name)
    .replace(/\b(gcg|discovery)\s*call\b/gi, '')
    .replace(/\bdiscovery\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim());
}

function stageRank(stage) {
  if (stage === 'hot') return 0;
  if (stage === 'warm') return 1;
  return 2;
}

function sortLeadsForPipeline(leads = []) {
  return [...leads].sort((a, b) => {
    const typeDelta = LEAD_TYPE_ORDER.indexOf(a.lead_type) - LEAD_TYPE_ORDER.indexOf(b.lead_type);
    if (typeDelta !== 0) return typeDelta;
    const stageDelta = stageRank(a.stage) - stageRank(b.stage);
    if (stageDelta !== 0) return stageDelta;
    const scoreDelta = Number(b.score || 0) - Number(a.score || 0);
    if (scoreDelta !== 0) return scoreDelta;
    return String(b.date || '').localeCompare(String(a.date || ''));
  });
}

function leadMatchesPainPoint(lead, painPoint = '') {
  const needle = String(painPoint || '').toLowerCase().trim();
  if (!needle) return true;
  const quotes = (lead.evidence_quotes || []).map(toQuoteText).join(' ');
  const hay = `${lead.call_name || ''} ${lead.name || ''} ${lead.company || ''} ${(lead.reason_codes || []).join(' ')} ${quotes}`.toLowerCase();
  return hay.includes(needle);
}

function isInternalMeetingText(text = '') {
  const t = String(text || '').toLowerCase();
  const internalTerms = [
    'weekly meeting',
    'weekly sync',
    'team sync',
    'internal',
    'marketing meeting',
    'standup',
    'all hands',
    'check-in',
    'staff meeting',
  ];
  return internalTerms.some((term) => t.includes(term));
}

function isSalesLeadText(text = '') {
  const t = String(text || '').toLowerCase();
  const salesTerms = [
    'discovery call',
    'sales call',
    'lead',
    'prospect',
    'proposal',
    'pricing',
    'budget',
    'consulting',
    'business development',
    'federal contract',
    'government contract',
    'close',
  ];
  return salesTerms.some((term) => t.includes(term));
}

function isSalesLeadTranscript(transcript) {
  const participants = Array.isArray(transcript?.participants) ? transcript.participants : [];
  if (participants.length > 0 && participants.every((p) => isInternalParticipant(p))) return false;
  const title = String(transcript?.title || '');
  const body = (transcript?.sentences || []).map((s) => s.text || '').join(' ');
  const full = `${title} ${body}`;
  return isSalesLeadText(full);
}

function isSalesLeadEntry(lead) {
  const quotes = (lead.evidence_quotes || []).map(toQuoteText).join(' ');
  const leadName = sanitizeDisplayIdentity(lead.name || '');
  const leadCompany = sanitizeDisplayIdentity(lead.company || '');
  const callName = sanitizeDisplayIdentity(lead.call_name || '');
  const hasExternalIdentity = isExternalParticipant(leadName) || isExternalParticipant(leadCompany);
  if ((!leadName || isInternalParticipant(leadName)) && (!leadCompany || isInternalParticipant(leadCompany))) return false;
  if (isInternalParticipant(callName) && !hasExternalIdentity) return false;
  const full = `${callName} ${leadName} ${leadCompany} ${(lead.reason_codes || []).join(' ')} ${quotes}`;
  return isSalesLeadText(full);
}

function summarizeLeadsLocal(leads = []) {
  const byType = {};
  const byStage = {};
  for (const l of leads) {
    byType[l.lead_type] = (byType[l.lead_type] || 0) + 1;
    byStage[l.stage] = (byStage[l.stage] || 0) + 1;
  }
  return { total: leads.length, byType, byStage };
}

function suggestFollowUp(lead) {
  if (!lead) return { action: 'Review transcript', urgency: 'low', owner: 'Sales', snippet: '' };
  const firstSnippet = toQuoteText((lead.evidence_quotes && lead.evidence_quotes[0]) || '');
  if (lead.lead_type === 'high_ticket') {
    return {
      action: 'Confirm second call on calendar and send $5,997 offer details within 24h.',
      urgency: 'high',
      owner: 'Closer / Sales Lead',
      snippet: firstSnippet,
    };
  }
  if (lead.lead_type === 'low_ticket') {
    return {
      action: 'Send $99/mo or $997 program link and onboarding info.',
      urgency: 'medium',
      owner: 'Sales Rep',
      snippet: firstSnippet,
    };
  }
  if (lead.stage === 'hot') {
    return {
      action: 'Schedule follow-up call within 24h and send proposal options.',
      urgency: 'high',
      owner: 'Closer / Sales Lead',
      snippet: firstSnippet,
    };
  }
  return {
    action: 'Send case studies + next-step CTA and follow up this week.',
    urgency: 'medium',
    owner: 'Sales Rep',
    snippet: firstSnippet,
  };
}

// ---- Main component ----
export default function App() {
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('dark') === '1';
    } catch (_) {
      return false;
    }
  });
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [participantFilter, setParticipantFilter] = useState('');
  const [keywordFilter, setKeywordFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [tab, setTab] = useState('executive');
  const [analysisCache, setAnalysisCache] = useState({});
  const [analysisLoading, setAnalysisLoading] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState(null);
  const [pipelineLeads, setPipelineLeads] = useState([]);
  const [pipelineSummary, setPipelineSummary] = useState(null);
  const [pipelineLoading, setPipelineLoading] = useState(false);
  const [pipelineSyncing, setPipelineSyncing] = useState(false);
  const [googleStatus, setGoogleStatus] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [integrationHealth, setIntegrationHealth] = useState(null);
  const [integrationError, setIntegrationError] = useState('');
  const [pipelineFilters, setPipelineFilters] = useState({
    leadType: '',
    stage: '',
    confidence: '',
    q: '',
    callName: '',
    startDate: '',
    endDate: '',
    outreachStatus: '',
    upcomingOnly: false,
    needsFollowUp: false,
    noOutreachLogged: false,
    hotOnly: false,
    externalHighTicketOnly: false,
  });
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedPainPoint, setSelectedPainPoint] = useState('');

  // Persist dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('dark', dark ? '1' : '0');
    } catch (_) {}
  }, [dark]);

  // Load transcripts.json on mount (relative path so it works when opening index.html without a server)
  useEffect(() => {
    fetch('./transcripts.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Failed to load transcripts'))))
      .then((data) => {
        const list = Array.isArray(data.transcripts) ? data.transcripts : [];
        setTranscripts(list);
        setLoadError(null);
      })
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter transcripts by date, participant, keyword, tag
  const filteredTranscripts = useMemo(() => {
    let list = transcripts.filter((t) => {
      const d = t.date || '';
      if (dateRange.start && d < dateRange.start) return false;
      if (dateRange.end && d > dateRange.end) return false;
      if (participantFilter) {
        const p = (t.participants || []).join(' ').toLowerCase();
        if (!p.includes(participantFilter.toLowerCase())) return false;
      }
      if (keywordFilter) {
        const text = (t.sentences || []).map((s) => s.text).join(' ').toLowerCase();
        if (!text.includes(keywordFilter.toLowerCase())) return false;
      }
      return true;
    });
    return list.filter(isSalesLeadTranscript);
  }, [transcripts, dateRange, participantFilter, keywordFilter]);

  const callAnalyze = useCallback(
    async (type, options = {}) => {
      const ids = filteredTranscripts.map((t) => t.id);
      if (ids.length === 0) return null;
      const key = cacheKey(ids, type, options.query || '');
      if (!options.skipCache && analysisCache[key]) return analysisCache[key];

      setAnalysisLoading((prev) => ({ ...prev, [type]: true }));
      try {
        const res = await fetch(`${API_BASE}/api/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            transcripts: filteredTranscripts,
            options: { stream: false },
            query: options.query,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setAnalysisCache((c) => ({ ...c, [key]: data }));
        return data;
      } finally {
        setAnalysisLoading((p) => ({ ...p, [type]: false }));
      }
    },
    [filteredTranscripts, analysisCache]
  );

  // Run high-impact analyses on filtered set (lazy when tab/view requests)
  const [commitments, setCommitments] = useState({ items: [] });
  const [decisions, setDecisions] = useState({ items: [] });
  const [topics, setTopics] = useState({ topics: [] });
  const [meetingTags, setMeetingTags] = useState({ meetings: [] });
  const [customer, setCustomer] = useState({ painPoints: [], reasonsForComing: [], customerInsights: [] });

  const localLeads = useMemo(() => filteredTranscripts.map(scoreLocalLead), [filteredTranscripts]);
  const transcriptById = useMemo(() => {
    const map = {};
    for (const t of filteredTranscripts) map[t.id] = t;
    return map;
  }, [filteredTranscripts]);

  const localLeadInsights = useMemo(() => {
    const painTerms = [
      'sam',
      'proposal',
      'compliance',
      'capability statement',
      'past performance',
      'set aside',
      'registration',
      'pricing',
      'budget',
      'timeline',
    ];
    const reasonTerms = [
      'consulting',
      'business development',
      'pipeline',
      'government contracts',
      'federal contracts',
      'strategy',
      'outreach',
      'proposal support',
    ];
    const painCounter = new Map();
    const reasonCounter = new Map();

    for (const t of filteredTranscripts) {
      const lines = (t.sentences || []).map((s) => String(s.text || ''));
      for (const line of lines) {
        const txt = line.toLowerCase();
        for (const term of painTerms) {
          if (txt.includes(term)) painCounter.set(term, (painCounter.get(term) || 0) + 1);
        }
        for (const term of reasonTerms) {
          if (txt.includes(term)) reasonCounter.set(term, (reasonCounter.get(term) || 0) + 1);
        }
      }
    }

    const painPoints = [...painCounter.entries()]
      .map(([description, count]) => ({ description, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    const reasonsForComing = [...reasonCounter.entries()]
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      painPoints,
      reasonsForComing,
      customerInsights: [
        `Most common lead stage from local data: ${summarizeLeadsLocal(localLeads).byStage.hot ? 'hot leads are present' : 'pipeline is nurture-heavy'}.`,
        `Frequent reasons include consulting and business development support for federal contracts.`,
      ],
    };
  }, [filteredTranscripts, localLeads]);

  const painPointContexts = useMemo(() => {
    if (!selectedPainPoint) return [];
    const needle = selectedPainPoint.toLowerCase();
    const contexts = [];
    for (const t of filteredTranscripts) {
      for (const s of t.sentences || []) {
        const txt = String(s.text || '');
        if (txt.toLowerCase().includes(needle)) {
          contexts.push({
            meetingId: t.id,
            title: t.title || t.id,
            date: t.date || '',
            snippet: txt,
          });
        }
        if (contexts.length >= 20) break;
      }
      if (contexts.length >= 20) break;
    }
    return contexts;
  }, [selectedPainPoint, filteredTranscripts]);

  // meetingId -> tags[] for filtering and display
  const meetingTagsMap = useMemo(() => {
    const map = {};
    for (const m of meetingTags.meetings || []) {
      if (m.meetingId && m.tags) map[m.meetingId] = m.tags;
    }
    return map;
  }, [meetingTags]);

  // Apply tag filter (tags come from AI)
  const tagFilteredTranscripts = useMemo(() => {
    if (!tagFilter) return filteredTranscripts;
    return filteredTranscripts.filter((t) => {
      const tags = meetingTagsMap[t.id] || [];
      return tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()));
    });
  }, [filteredTranscripts, tagFilter, meetingTagsMap]);

  const runExecutive = useCallback(async () => {
    const [c, d, t, tags] = await Promise.all([
      callAnalyze('commitments'),
      callAnalyze('decisions'),
      callAnalyze('topics'),
      callAnalyze('tags'),
    ]);
    if (c?.items) setCommitments(c);
    if (d?.items) setDecisions(d);
    if (t?.topics) setTopics(t);
    if (tags?.meetings) setMeetingTags(tags);
  }, [callAnalyze]);

  const runCustomer = useCallback(async () => {
    const c = await callAnalyze('customer');
    if (c?.painPoints !== undefined) setCustomer(c);
  }, [callAnalyze]);

  const loadPipelineData = useCallback(async () => {
    setPipelineLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(pipelineFilters).forEach(([k, v]) => {
        if (k === 'hotOnly' || k === 'externalHighTicketOnly') return;
        if ((k === 'upcomingOnly' || k === 'needsFollowUp' || k === 'noOutreachLogged') && !v) return;
        if ((k === 'upcomingOnly' || k === 'needsFollowUp' || k === 'noOutreachLogged') && v) {
          params.set(k, '1');
          return;
        }
        if (v && String(v).trim() !== '') params.set(k, String(v));
      });
      const [statusRes, leadsRes, summaryRes] = await Promise.all([
        fetch(`${API_BASE}/api/fireflies/status`),
        fetch(`${API_BASE}/api/leads?${params.toString()}`),
        fetch(`${API_BASE}/api/leads/summary?${params.toString()}`),
      ]);
      const status = await statusRes.json();
      const leads = await leadsRes.json();
      const summary = await summaryRes.json();

      let mergedLeads = Array.isArray(leads.items) ? [...leads.items] : [];
      const existingIds = new Set(mergedLeads.map((l) => l.transcript_id || l.lead_id));
      for (const l of localLeads) {
        const id = l.transcript_id || l.lead_id;
        if (!existingIds.has(id)) mergedLeads.push(l);
      }
      mergedLeads = mergedLeads.map((lead) => ({
        ...lead,
        call_name: lead.call_name || transcriptById[lead.transcript_id || '']?.title || lead.name || 'Unknown call',
        name: sanitizeLeadName(lead.name) || sanitizeLeadName(lead.company) || 'Unknown',
        company: sanitizeDisplayIdentity(lead.company || '') || 'Unknown',
        evidence_quotes: normalizeEvidenceQuotes(lead.evidence_quotes),
        is_external_verified_high_ticket: Boolean(lead.is_external_verified_high_ticket),
      }));

      const filtered = mergedLeads.filter((l) => {
        if (!isSalesLeadEntry(l)) return false;
        if (pipelineFilters.leadType && l.lead_type !== pipelineFilters.leadType) return false;
        if (pipelineFilters.stage && l.stage !== pipelineFilters.stage) return false;
        if (pipelineFilters.hotOnly && l.stage !== 'hot') return false;
        if (pipelineFilters.externalHighTicketOnly && (!l.is_external_verified_high_ticket || l.lead_type !== 'high_ticket')) return false;
        if (pipelineFilters.confidence && l.confidence !== pipelineFilters.confidence) return false;
        if (pipelineFilters.q) {
          const hay = `${l.call_name || ''} ${l.name || ''} ${l.company || ''} ${(l.reason_codes || []).join(' ')} ${(l.evidence_quotes || []).map(toQuoteText).join(' ')}`.toLowerCase();
          if (!hay.includes(String(pipelineFilters.q).toLowerCase())) return false;
        }
        if (pipelineFilters.callName) {
          if (!String(l.call_name || '').toLowerCase().includes(String(pipelineFilters.callName).toLowerCase())) return false;
        }
        if (pipelineFilters.startDate && String(l.date || '') < pipelineFilters.startDate) return false;
        if (pipelineFilters.endDate && String(l.date || '') > pipelineFilters.endDate) return false;
        if (pipelineFilters.outreachStatus && (l.outreach_status || '') !== pipelineFilters.outreachStatus) return false;
        if (pipelineFilters.upcomingOnly && !l.upcoming_call_at) return false;
        if (pipelineFilters.needsFollowUp && !l.next_follow_up_at) return false;
        if (pipelineFilters.noOutreachLogged && l.last_contacted_at) return false;
        if (selectedPainPoint && !leadMatchesPainPoint(l, selectedPainPoint)) return false;
        return true;
      });

      const finalSummary = filtered.length ? summarizeLeadsLocal(filtered) : summary;
      setPipelineStatus(status);
      setPipelineLeads(sortLeadsForPipeline(filtered));
      setPipelineSummary(finalSummary);
      const sortedFiltered = sortLeadsForPipeline(filtered);
      if ((!selectedLead || !sortedFiltered.some((l) => l.lead_id === selectedLead.lead_id)) && sortedFiltered[0]) setSelectedLead(sortedFiltered[0]);
    } catch (e) {
      const filteredLocal = localLeads.filter((l) => {
        if (!isSalesLeadEntry(l)) return false;
        if (pipelineFilters.leadType && l.lead_type !== pipelineFilters.leadType) return false;
        if (pipelineFilters.stage && l.stage !== pipelineFilters.stage) return false;
        if (pipelineFilters.hotOnly && l.stage !== 'hot') return false;
        if (pipelineFilters.externalHighTicketOnly && (!l.is_external_verified_high_ticket || l.lead_type !== 'high_ticket')) return false;
        if (pipelineFilters.confidence && l.confidence !== pipelineFilters.confidence) return false;
        if (pipelineFilters.q) {
          const hay = `${l.call_name || ''} ${l.name || ''} ${l.company || ''} ${(l.reason_codes || []).join(' ')} ${(l.evidence_quotes || []).map(toQuoteText).join(' ')}`.toLowerCase();
          if (!hay.includes(String(pipelineFilters.q).toLowerCase())) return false;
        }
        if (pipelineFilters.callName) {
          if (!String(l.call_name || '').toLowerCase().includes(String(pipelineFilters.callName).toLowerCase())) return false;
        }
        if (pipelineFilters.startDate && String(l.date || '') < pipelineFilters.startDate) return false;
        if (pipelineFilters.endDate && String(l.date || '') > pipelineFilters.endDate) return false;
        if (pipelineFilters.outreachStatus && (l.outreach_status || '') !== pipelineFilters.outreachStatus) return false;
        if (pipelineFilters.upcomingOnly && !l.upcoming_call_at) return false;
        if (pipelineFilters.needsFollowUp && !l.next_follow_up_at) return false;
        if (pipelineFilters.noOutreachLogged && l.last_contacted_at) return false;
        if (selectedPainPoint && !leadMatchesPainPoint(l, selectedPainPoint)) return false;
        return true;
      });
      const sortedLocal = sortLeadsForPipeline(filteredLocal).map((lead) => ({
        ...lead,
        call_name: lead.call_name || transcriptById[lead.transcript_id || '']?.title || lead.name || 'Unknown call',
        name: sanitizeLeadName(lead.name) || 'Unknown',
        company: sanitizeDisplayIdentity(lead.company || '') || 'Unknown',
        evidence_quotes: normalizeEvidenceQuotes(lead.evidence_quotes),
        is_external_verified_high_ticket: Boolean(lead.is_external_verified_high_ticket),
      }));
      setPipelineStatus({ error: e.message, usingLocal: true, sync_state: { source: 'local-fallback' } });
      setPipelineLeads(sortedLocal);
      setPipelineSummary(summarizeLeadsLocal(sortedLocal));
      if ((!selectedLead || !sortedLocal.some((l) => l.lead_id === selectedLead.lead_id)) && sortedLocal[0]) setSelectedLead(sortedLocal[0]);
    } finally {
      setPipelineLoading(false);
    }
  }, [pipelineFilters, selectedLead, localLeads, selectedPainPoint, transcriptById]);

  const syncFireflies = useCallback(async () => {
    setPipelineSyncing(true);
    setIntegrationError('');
    try {
      const today = new Date().toISOString().slice(0, 10);
      const res = await fetch(`${API_BASE}/api/fireflies/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toDate: today, limit: 50, skip: 0 }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || payload.hint || 'Fireflies sync failed');
      }
      await loadPipelineData();
      await loadIntegrationHealth();
      setIntegrationError('');
    } catch (e) {
      setIntegrationError(e.message || 'Fireflies sync failed');
    } finally {
      setPipelineSyncing(false);
    }
  }, [loadPipelineData]);

  const loadGoogleStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/google/status`);
      if (!res.ok) throw new Error('Failed to load Google status');
      const data = await res.json();
      setGoogleStatus(data);
    } catch (e) {
      setGoogleStatus({ connected: false, last_error: e.message });
    }
  }, []);

  const loadIntegrationHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/readiness`);
      if (!res.ok) throw new Error('Failed to load readiness');
      const data = await res.json();
      setIntegrationHealth(data);
    } catch (e) {
      setIntegrationHealth(null);
      setIntegrationError(e.message || 'Failed to load readiness');
    }
  }, []);

  const connectGoogleWorkspace = useCallback(async () => {
    setGoogleLoading(true);
    setIntegrationError('');
    try {
      const res = await fetch(`${API_BASE}/api/google/auth-url`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || data.hint || 'Failed to start Google connect');
      if (data?.url) window.open(data.url, '_blank', 'noopener,noreferrer');
      else throw new Error('Google auth URL missing');
    } catch (e) {
      setIntegrationError(e.message || 'Failed to start Google connect');
    } finally {
      setGoogleLoading(false);
    }
  }, []);

  const syncGoogleWorkspace = useCallback(async () => {
    setGoogleLoading(true);
    setIntegrationError('');
    try {
      const res = await fetch(`${API_BASE}/api/google/sync`, { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) throw new Error(data.error || data.hint || 'Google workspace sync failed');
      await loadGoogleStatus();
      await loadPipelineData();
      await loadIntegrationHealth();
    } catch (e) {
      setIntegrationError(e.message || 'Google workspace sync failed');
    } finally {
      setGoogleLoading(false);
    }
  }, [loadGoogleStatus, loadPipelineData, loadIntegrationHealth]);

  const syncGmail = useCallback(async () => {
    setGoogleLoading(true);
    setIntegrationError('');
    try {
      const res = await fetch(`${API_BASE}/api/gmail/sync`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok || data?.ok === false) throw new Error(data.error || data.hint || 'Gmail sync failed');
      await loadGoogleStatus();
      await loadPipelineData();
      await loadIntegrationHealth();
    } catch (e) {
      setIntegrationError(e.message || 'Gmail sync failed');
    } finally {
      setGoogleLoading(false);
    }
  }, [loadGoogleStatus, loadPipelineData, loadIntegrationHealth]);

  const sendLeadFollowUpEmail = useCallback(async () => {
    if (!selectedLead) return;
    const to = window.prompt('Recipient email address');
    if (!to) return;
    const subject = window.prompt('Email subject', `Follow-up: ${selectedLead.call_name || 'Next Steps'}`) || '';
    if (!subject) return;
    const body =
      window.prompt(
        'Email body',
        `Hi ${selectedLead.name || ''},\n\nGreat speaking with you. I wanted to follow up on next steps.\n\nBest,\n`
      ) || '';
    if (!body) return;
    setGoogleLoading(true);
    setIntegrationError('');
    try {
      const res = await fetch(`${API_BASE}/api/gmail/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body, leadId: selectedLead.lead_id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) throw new Error(data.error || data.hint || 'Failed to send follow-up email');
      await loadGoogleStatus();
      await loadPipelineData();
      await loadIntegrationHealth();
    } catch (e) {
      setIntegrationError(e.message || 'Failed to send follow-up email');
    } finally {
      setGoogleLoading(false);
    }
  }, [selectedLead, loadGoogleStatus, loadPipelineData, loadIntegrationHealth]);

  const updateLeadTracking = useCallback(
    async (leadId, patch) => {
      await fetch(`${API_BASE}/api/leads/${encodeURIComponent(leadId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      await loadPipelineData();
    },
    [loadPipelineData]
  );

  // When tab switches to executive or customer, ensure we have analyses
  useEffect(() => {
    if (tab === 'executive' && filteredTranscripts.length > 0 && !analysisCache[cacheKey(filteredTranscripts.map((t) => t.id), 'commitments')]) {
      runExecutive();
    }
  }, [tab, filteredTranscripts.length]);
  useEffect(() => {
    if (tab === 'customer' && filteredTranscripts.length > 0) {
      const key = cacheKey(filteredTranscripts.map((t) => t.id), 'customer');
      if (!analysisCache[key]) runCustomer();
    }
  }, [tab, filteredTranscripts, analysisCache, runCustomer]);
  useEffect(() => {
    if (filteredTranscripts.length > 0) {
      if ((!customer.painPoints?.length && !customer.reasonsForComing?.length) && (localLeadInsights.painPoints.length || localLeadInsights.reasonsForComing.length)) {
        setCustomer({
          painPoints: localLeadInsights.painPoints,
          reasonsForComing: localLeadInsights.reasonsForComing,
          customerInsights: localLeadInsights.customerInsights,
        });
      }
    }
  }, [filteredTranscripts.length, customer.painPoints, customer.reasonsForComing, localLeadInsights]);
  useEffect(() => {
    if (tab === 'pipeline') {
      loadGoogleStatus();
      loadIntegrationHealth();
    }
  }, [tab, loadGoogleStatus, loadIntegrationHealth]);

  useEffect(() => {
    if (tab !== 'pipeline') return undefined;
    const timer = setTimeout(() => {
      loadPipelineData();
    }, 250);
    return () => clearTimeout(timer);
  }, [tab, loadPipelineData]);

  // Call volume by month with human-readable labels (June 25, Jan 26)
  const callVolumeByMonth = useMemo(() => {
    const byMonth = {};
    for (const t of filteredTranscripts) {
      const d = t.date || '';
      const ym = d.slice(0, 7);
      if (!ym) continue;
      byMonth[ym] = (byMonth[ym] || 0) + 1;
    }
    return Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([ym, count]) => ({ month: formatMonthLabel(ym), monthKey: ym, count }));
  }, [filteredTranscripts]);

  // Smart search
  const doSearch = useCallback(async () => {
    if (!searchQuery.trim() || filteredTranscripts.length === 0) return;
    setSearchLoading(true);
    setSearchResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'search',
          transcripts: filteredTranscripts,
          query: searchQuery.trim(),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setSearchResult(data.text || data.raw || JSON.stringify(data));
    } catch (e) {
      setSearchResult('Error: ' + e.message);
    } finally {
      setSearchLoading(false);
    }
  }, [searchQuery, filteredTranscripts]);

  // Export CSV
  // Export CSV for commitments/decisions; cache key in callAnalyze avoids redundant API calls
  const exportCSV = useCallback((items, headers, filename) => {
    if (!items?.length) return;
    const rows = items.map((i) => headers.map((h) => (i[h] ?? '').toString().replace(/"/g, '""')));
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const exportCommitmentsCSV = useCallback(() => {
    const items = (commitments.items || []).map((i) => ({ Who: i.who, What: i.what, Deadline: i.deadline || '', Meeting: i.meetingTitle || '', Excerpt: (i.excerpt || '').replace(/"/g, '""') }));
    exportCSV(items, ['Who', 'What', 'Deadline', 'Meeting', 'Excerpt'], 'commitments.csv');
  }, [commitments, exportCSV]);

  const exportDecisionsCSV = useCallback(() => {
    const items = (decisions.items || []).map((i) => ({ Decision: i.decision, Who: i.who, Context: (i.context || '').replace(/"/g, '""'), Meeting: i.meetingTitle || '' }));
    exportCSV(items, ['Decision', 'Who', 'Context', 'Meeting'], 'decisions.csv');
  }, [decisions, exportCSV]);

  const allTags = useMemo(() => {
    const set = new Set();
    for (const tags of Object.values(meetingTagsMap)) {
      for (const tag of tags) if (tag) set.add(tag);
    }
    return [...set].sort();
  }, [meetingTagsMap]);

  const leadsByType = useMemo(() => {
    const grouped = { high_ticket: [], low_ticket: [], no_ticket: [] };
    for (const lead of pipelineLeads) {
      if (grouped[lead.lead_type]) grouped[lead.lead_type].push(lead);
    }
    return grouped;
  }, [pipelineLeads]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center gap-4 p-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" aria-hidden />
        <p className="text-gray-600 dark:text-gray-400">Loading transcripts…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-md text-center">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-2" />
          <p className="text-gray-700 dark:text-gray-300">Failed to load transcripts: {loadError}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Ensure public/transcripts.json exists or run npm run build-transcripts from repo root.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'pipeline', label: 'Lead Pipeline', icon: Database },
    { id: 'executive', label: 'Executive', icon: Target },
    { id: 'customer', label: 'Customer Insights', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-semibold">Meeting Intelligence</h1>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange((r) => ({ ...r, start: e.target.value }))}
                className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm px-2 py-1"
              />
              –
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange((r) => ({ ...r, end: e.target.value }))}
                className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm px-2 py-1"
              />
            </label>
            <input
              placeholder="Participant"
              value={participantFilter}
              onChange={(e) => setParticipantFilter(e.target.value)}
              className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm px-2 py-1 w-32"
            />
            <input
              placeholder="Keyword"
              value={keywordFilter}
              onChange={(e) => setKeywordFilter(e.target.value)}
              className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm px-2 py-1 w-32"
            />
            {allTags.length > 0 && (
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm px-2 py-1 w-36"
              >
                <option value="">All topics</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            )}
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-2 flex gap-2 border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${tab === id ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {filteredTranscripts.length === 0 ? (
          <div className="mb-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              No meetings in this date range. Widen the date filter above, or run <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">npm run build-transcripts</code> from the repo root to load your PDFs into <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">public/transcripts.json</code>.
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Showing {tagFilteredTranscripts.length} meeting(s){tagFilter ? ` matching "${tagFilter}"` : ''}. API: {API_BASE}. Run the backend with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">npm run server</code> and set <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ANTHROPIC_API_KEY</code> for AI analysis.
          </p>
        )}

        {/* Things We See a Lot - summary at top when we have data */}
        {filteredTranscripts.length > 0 && (
          <section className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Search className="w-5 h-5" />
              Smart Search
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder='e.g. "What are the main objections this month?"'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && doSearch()}
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2"
              />
              <button onClick={doSearch} disabled={searchLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
                {searchLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                Search
              </button>
            </div>
            {searchResult != null && (
              <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-4 text-sm whitespace-pre-wrap">{searchResult}</div>
            )}
          </section>
        )}

        {filteredTranscripts.length > 0 && (customer.painPoints?.length > 0 || customer.reasonsForComing?.length > 0 || allTags.length > 0) && (
          <section className="mb-6 p-4 rounded-xl bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Things We See a Lot
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              {customer.painPoints?.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Top pain points</h3>
                  <ul className="space-y-0.5 text-gray-600 dark:text-gray-400">
                    {(customer.painPoints.slice(0, 3) || []).map((p, i) => (
                      <li key={i}>{p.description} ({p.count})</li>
                    ))}
                  </ul>
                </div>
              )}
              {customer.reasonsForComing?.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Top reasons they come</h3>
                  <ul className="space-y-0.5 text-gray-600 dark:text-gray-400">
                    {(customer.reasonsForComing.slice(0, 3) || []).map((r, i) => (
                      <li key={i}>{r.reason} ({r.count})</li>
                    ))}
                  </ul>
                </div>
              )}
              {allTags.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Topic tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {allTags.slice(0, 8).map((tag) => {
                      const count = Object.values(meetingTagsMap).filter((tags) => tags.includes(tag)).length;
                      return (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-xs">
                          {tag}: {count}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Executive */}
        {tab === 'executive' && (
          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Pipeline Snapshot</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500">Total leads</div>
                  <div className="font-semibold">{pipelineSummary?.total ?? pipelineLeads.length}</div>
                </div>
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500">High ticket</div>
                  <div className="font-semibold">{(leadsByType.high_ticket || []).length}</div>
                </div>
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500">Low ticket</div>
                  <div className="font-semibold">{(leadsByType.low_ticket || []).length}</div>
                </div>
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500">No ticket</div>
                  <div className="font-semibold">{(leadsByType.no_ticket || []).length}</div>
                </div>
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500">Upcoming calls</div>
                  <div className="font-semibold">{pipelineLeads.filter((l) => l.upcoming_call_at).length}</div>
                </div>
              </div>
            </section>
            {callVolumeByMonth.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Call Volume Over Time</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={callVolumeByMonth} margin={{ bottom: 20 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip formatter={(v) => [v, 'Calls']} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </section>
            )}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Commitment Tracker
                </h2>
                {(commitments.items?.length > 0) && (
                  <button onClick={exportCommitmentsCSV} className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                    <Download className="w-4 h-4" /> Export CSV
                  </button>
                )}
              </div>
              {analysisLoading.commitments ? (
                <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-5 h-5 animate-spin" /> Analyzing…</div>
              ) : (commitments.items?.length > 0) ? (
                <ul className="space-y-2 max-h-80 overflow-y-auto">
                  {commitments.items.map((item, i) => (
                    <li key={i} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-sm">
                      <span className="font-medium">{item.who}</span>: {item.what}
                      {item.deadline && <span className="text-amber-600 dark:text-amber-400 ml-2">Due: {item.deadline}</span>}
                      <div className="text-gray-500 dark:text-gray-400 mt-1">{item.meetingTitle}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No commitments extracted. Ensure backend is running and ANTHROPIC_API_KEY is set.</p>
              )}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Decision Log
                </h2>
                {(decisions.items?.length > 0) && (
                  <button onClick={exportDecisionsCSV} className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                    <Download className="w-4 h-4" /> Export CSV
                  </button>
                )}
              </div>
              {analysisLoading.decisions ? (
                <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-5 h-5 animate-spin" /> Analyzing…</div>
              ) : (decisions.items?.length > 0) ? (
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {decisions.items.map((item, i) => (
                    <li key={i} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-sm">
                      <span className="font-medium">{item.decision}</span> — {item.who}. {item.context && <span className="text-gray-500">{item.context}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No decisions extracted.</p>
              )}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" />
                Topic Clustering
              </h2>
              {analysisLoading.topics ? (
                <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-5 h-5 animate-spin" /> Analyzing…</div>
              ) : (topics.topics?.length > 0) ? (
                <div className="flex flex-wrap gap-2">
                  {topics.topics.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-sm">
                      {t.name} ({t.count})
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No topics extracted.</p>
              )}
            </section>
          </div>
        )}

        {/* Lead Pipeline */}
        {tab === 'pipeline' && (
          <div className="space-y-6">
            {pipelineStatus?.error && (
              <section className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4 text-sm">
                <div className="font-medium text-amber-900 dark:text-amber-200">Using local dataset while Fireflies sync is unavailable.</div>
                <div className="text-amber-800 dark:text-amber-300 mt-1">Sync status error: {pipelineStatus.error}</div>
              </section>
            )}
            {integrationError && (
              <section className="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-4 text-sm">
                <div className="font-medium text-red-900 dark:text-red-200">Integration Error</div>
                <div className="text-red-800 dark:text-red-300 mt-1">{integrationError}</div>
              </section>
            )}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="font-semibold mb-2">Integration Health</h3>
              {integrationHealth ? (
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <div>Storage mode: <span className="font-medium">{integrationHealth.storage}</span></div>
                  <div>Google: {integrationHealth.google?.ready ? 'ready' : `missing ${integrationHealth.google?.missing?.join(', ') || ''}`}</div>
                  <div>Fireflies: {integrationHealth.fireflies?.ready ? 'ready' : `missing ${integrationHealth.fireflies?.missing?.join(', ') || ''}`}</div>
                  <div>KV: {integrationHealth.kv?.ready ? 'ready' : `missing ${integrationHealth.kv?.missing?.join(', ') || ''}`}</div>
                  {integrationHealth.kv?.hint && <div className="text-amber-700 dark:text-amber-300">{integrationHealth.kv.hint}</div>}
                </div>
              ) : (
                <div className="text-sm text-gray-500">Health check unavailable.</div>
              )}
            </section>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-semibold">Google Workspace</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {googleStatus?.connected ? `Calendar connected · ${googleStatus.events_count || 0} events` : 'Calendar not connected'}
                    {googleStatus?.last_sync_at ? ` · Last sync ${googleStatus.last_sync_at}` : ''}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {googleStatus?.gmail_connected ? `Gmail connected · ${googleStatus.gmail_messages_count || 0} recent messages` : 'Gmail not connected'}
                    {googleStatus?.gmail_last_sync_at ? ` · Last sync ${googleStatus.gmail_last_sync_at}` : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={connectGoogleWorkspace} disabled={googleLoading || (integrationHealth && !integrationHealth.google?.ready)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm disabled:opacity-60">
                    Connect Google
                  </button>
                  <button onClick={syncGoogleWorkspace} disabled={googleLoading || !googleStatus?.connected || (integrationHealth && !integrationHealth.google?.ready)} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm disabled:opacity-60">
                    Sync Workspace
                  </button>
                  <button onClick={syncGmail} disabled={googleLoading || !googleStatus?.gmail_connected || (integrationHealth && !integrationHealth.google?.ready)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm disabled:opacity-60">
                    Sync Gmail
                  </button>
                </div>
              </div>
            </section>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-3">Lead Table</h3>
                  {pipelineLoading ? (
                    <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-5 h-5 animate-spin" /> Loading leads…</div>
                  ) : (
                    <div className="space-y-4">
                      {[
                        { key: 'high_ticket', label: 'High Ticket' },
                        { key: 'low_ticket', label: 'Low Ticket' },
                        { key: 'no_ticket', label: 'No Ticket' },
                      ].map((group) => (
                        <div key={group.key} className="border border-gray-200 dark:border-gray-700 rounded">
                          <div className="px-3 py-2 text-sm font-medium bg-gray-50 dark:bg-gray-700/40">
                            {group.label} ({leadsByType[group.key].length})
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            <table className="w-full text-sm">
                              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700">
                                <tr>
                                  <th className="text-left p-2">Call Name</th>
                                  <th className="text-left p-2">Date</th>
                                  <th className="text-left p-2">Stage</th>
                                  <th className="text-left p-2">Outreach</th>
                                  <th className="text-left p-2">Last Contact</th>
                                </tr>
                              </thead>
                              <tbody>
                                {leadsByType[group.key].map((lead) => (
                                  <tr key={lead.lead_id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer" onClick={() => setSelectedLead(lead)}>
                                    <td className="p-2">{lead.call_name || 'Unknown call'}</td>
                                    <td className="p-2">{formatUsDate(lead.date)}</td>
                                    <td className="p-2">{lead.stage}</td>
                                    <td className="p-2">{lead.outreach_status || 'new'}</td>
                                    <td className="p-2">{lead.last_contact_at ? formatUsDate(lead.last_contact_at) : lead.last_contacted_at ? formatUsDate(lead.last_contacted_at) : '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Lead Drill-down</h3>
                  {selectedLead ? (
                    <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-sm space-y-2">
                      <div><span className="font-medium">Call Name:</span> {selectedLead.call_name || 'Unknown call'}</div>
                      <div><span className="font-medium">Name:</span> {selectedLead.name}</div>
                      <div><span className="font-medium">Company:</span> {selectedLead.company}</div>
                      <div><span className="font-medium">Date:</span> {formatUsDate(selectedLead.date)}</div>
                      <div><span className="font-medium">Type:</span> {selectedLead.lead_type}</div>
                      {selectedLead.lead_type === 'high_ticket' && (
                        <div className="text-xs inline-flex px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                          External-Verified High Ticket
                        </div>
                      )}
                      <div><span className="font-medium">Confidence:</span> {selectedLead.confidence}</div>
                      <div><span className="font-medium">Reason codes:</span> {(selectedLead.reason_codes || []).join(', ') || 'n/a'}</div>
                      <div><span className="font-medium">Last contacted:</span> {selectedLead.last_contact_at ? formatUsDate(selectedLead.last_contact_at) : selectedLead.last_contacted_at ? formatUsDate(selectedLead.last_contacted_at) : 'Not logged'}</div>
                      <div><span className="font-medium">Outreach status:</span> {selectedLead.outreach_status || 'new'}</div>
                      <div><span className="font-medium">Next follow-up:</span> {selectedLead.next_follow_up_at ? formatUsDate(selectedLead.next_follow_up_at) : 'Not set'}</div>
                      <div><span className="font-medium">Upcoming call:</span> {selectedLead.upcoming_call_at ? `${formatUsDate(selectedLead.upcoming_call_at)} (${selectedLead.upcoming_call_name || 'Calendar event'})` : 'None'}</div>
                      <div><span className="font-medium">Last email:</span> {selectedLead.last_email_at ? `${formatUsDate(selectedLead.last_email_at)}${selectedLead.last_email_subject ? ` (${selectedLead.last_email_subject})` : ''}` : 'None'}</div>
                      <div className="grid grid-cols-1 gap-2">
                        <button
                          type="button"
                          onClick={() => updateLeadTracking(selectedLead.lead_id, { outreach_status: 'contacted', last_contacted_at: new Date().toISOString() })}
                          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-left text-xs"
                        >
                          Mark as contacted now
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const next = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString();
                            updateLeadTracking(selectedLead.lead_id, { next_follow_up_at: next, outreach_status: selectedLead.outreach_status || 'nurturing' });
                          }}
                          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-left text-xs"
                        >
                          Set follow-up in 3 days
                        </button>
                        <button
                          type="button"
                          onClick={sendLeadFollowUpEmail}
                          disabled={googleLoading || !googleStatus?.gmail_connected}
                          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-left text-xs disabled:opacity-60 inline-flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" /> Send follow-up email
                        </button>
                      </div>
                      <div>
                        <span className="font-medium">Evidence quotes:</span>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {(selectedLead.evidence_quotes || []).map((q, i) => (
                            <li key={i}>
                              {q?.label ? <span className="font-medium">{q.label}:</span> : null} {toQuoteText(q)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="font-medium mb-1">Next Follow-up</div>
                        <div><span className="font-medium">Action:</span> {suggestFollowUp(selectedLead).action}</div>
                        <div><span className="font-medium">Urgency:</span> {suggestFollowUp(selectedLead).urgency}</div>
                        <div><span className="font-medium">Suggested owner:</span> {suggestFollowUp(selectedLead).owner}</div>
                        {suggestFollowUp(selectedLead).snippet && (
                          <div className="text-gray-500 mt-1">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Evidence snippet:</span> "{suggestFollowUp(selectedLead).snippet}"
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Select a lead to inspect details.</p>
                  )}
                </div>
              </div>
            </section>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-lg font-semibold">Pipeline Sync Status</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Source: {pipelineStatus?.sync_state?.source || 'n/a'} · Last sync: {pipelineStatus?.sync_state?.last_sync_at || 'never'}
                  </p>
                </div>
                <button
                  onClick={syncFireflies}
                  disabled={pipelineSyncing || (integrationHealth && !integrationHealth.fireflies?.ready)}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2"
                >
                  {pipelineSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  Sync Fireflies
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500">Transcripts</div>
                  <div className="font-semibold">{pipelineStatus?.counts?.transcripts ?? 0}</div>
                </div>
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500">Leads</div>
                  <div className="font-semibold">{pipelineSummary?.total ?? pipelineStatus?.counts?.leads ?? 0}</div>
                </div>
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500">Hot</div>
                  <div className="font-semibold">{pipelineSummary?.byStage?.hot ?? 0}</div>
                </div>
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-gray-500">Warm</div>
                  <div className="font-semibold">{pipelineSummary?.byStage?.warm ?? 0}</div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="font-semibold mb-3">Filters</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <details className="relative">
                  <summary className="list-none cursor-pointer rounded border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-700">Type: {pipelineFilters.leadType || 'All'}</summary>
                  <div className="absolute z-10 mt-1 w-48 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 shadow">
                    <select value={pipelineFilters.leadType} onChange={(e) => setPipelineFilters((f) => ({ ...f, leadType: e.target.value }))} className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1">
                      <option value="">All lead types</option>
                      <option value="high_ticket">high_ticket</option>
                      <option value="low_ticket">low_ticket</option>
                      <option value="no_ticket">no_ticket</option>
                    </select>
                  </div>
                </details>
                <details className="relative">
                  <summary className="list-none cursor-pointer rounded border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-700">Stage: {pipelineFilters.stage || (pipelineFilters.hotOnly ? 'hot' : 'All')}</summary>
                  <div className="absolute z-10 mt-1 w-44 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 shadow space-y-2">
                    <select value={pipelineFilters.stage} onChange={(e) => setPipelineFilters((f) => ({ ...f, stage: e.target.value }))} className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1">
                      <option value="">All stages</option>
                      <option value="hot">hot</option>
                      <option value="warm">warm</option>
                      <option value="nurture">nurture</option>
                    </select>
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={pipelineFilters.hotOnly} onChange={(e) => setPipelineFilters((f) => ({ ...f, hotOnly: e.target.checked }))} />
                      Hot leads only
                    </label>
                  </div>
                </details>
                <label className="inline-flex items-center gap-2 rounded border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-700">
                  <input
                    type="checkbox"
                    checked={pipelineFilters.externalHighTicketOnly}
                    onChange={(e) =>
                      setPipelineFilters((f) => ({
                        ...f,
                        externalHighTicketOnly: e.target.checked,
                        leadType: e.target.checked ? 'high_ticket' : f.leadType,
                      }))
                    }
                  />
                  High Ticket (External-Verified)
                </label>
                <details className="relative">
                  <summary className="list-none cursor-pointer rounded border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-700">Call name</summary>
                  <div className="absolute z-10 mt-1 w-64 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 shadow">
                    <input value={pipelineFilters.callName} onChange={(e) => setPipelineFilters((f) => ({ ...f, callName: e.target.value }))} placeholder="Filter call name" className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1" />
                  </div>
                </details>
                <details className="relative">
                  <summary className="list-none cursor-pointer rounded border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-700">Date range</summary>
                  <div className="absolute z-10 mt-1 w-64 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 shadow space-y-2">
                    <input type="date" value={pipelineFilters.startDate} onChange={(e) => setPipelineFilters((f) => ({ ...f, startDate: e.target.value }))} className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1" />
                    <input type="date" value={pipelineFilters.endDate} onChange={(e) => setPipelineFilters((f) => ({ ...f, endDate: e.target.value }))} className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1" />
                  </div>
                </details>
                <details className="relative">
                  <summary className="list-none cursor-pointer rounded border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-700">Outreach</summary>
                  <div className="absolute z-10 mt-1 w-64 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 shadow space-y-2">
                    <select value={pipelineFilters.outreachStatus} onChange={(e) => setPipelineFilters((f) => ({ ...f, outreachStatus: e.target.value }))} className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1">
                      <option value="">All outreach statuses</option>
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="nurturing">nurturing</option>
                      <option value="closed_won">closed_won</option>
                      <option value="closed_lost">closed_lost</option>
                    </select>
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={pipelineFilters.upcomingOnly} onChange={(e) => setPipelineFilters((f) => ({ ...f, upcomingOnly: e.target.checked }))} />
                      Upcoming calls only
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={pipelineFilters.needsFollowUp} onChange={(e) => setPipelineFilters((f) => ({ ...f, needsFollowUp: e.target.checked }))} />
                      Needs follow-up
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={pipelineFilters.noOutreachLogged} onChange={(e) => setPipelineFilters((f) => ({ ...f, noOutreachLogged: e.target.checked }))} />
                      No outreach logged
                    </label>
                  </div>
                </details>
                <details className="relative">
                  <summary className="list-none cursor-pointer rounded border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-700">Confidence: {pipelineFilters.confidence || 'All'}</summary>
                  <div className="absolute z-10 mt-1 w-40 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 shadow">
                    <select value={pipelineFilters.confidence} onChange={(e) => setPipelineFilters((f) => ({ ...f, confidence: e.target.value }))} className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1">
                      <option value="">All confidence</option>
                      <option value="high">high</option>
                      <option value="medium">medium</option>
                      <option value="low">low</option>
                    </select>
                  </div>
                </details>
                <details className="relative">
                  <summary className="list-none cursor-pointer rounded border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-700">Search</summary>
                  <div className="absolute z-10 mt-1 w-64 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 shadow">
                    <input value={pipelineFilters.q} onChange={(e) => setPipelineFilters((f) => ({ ...f, q: e.target.value }))} placeholder="Search lead/company" className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1" />
                  </div>
                </details>
              </div>
            </section>

          </div>
        )}

        {/* Customer Insights */}
        {tab === 'customer' && (
          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Customer Analysis (govcon/federal)</h2>
              {analysisLoading.customer ? (
                <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-5 h-5 animate-spin" /> Analyzing…</div>
              ) : (customer.painPoints?.length > 0 || customer.reasonsForComing?.length > 0 || customer.customerInsights?.length > 0) ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Pain Point Frequency</h3>
                      <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={(customer.painPoints || []).slice(0, 8)} layout="vertical" margin={{ top: 8, right: 12, bottom: 8, left: 12 }}>
                          <XAxis type="number" allowDecimals={false} />
                          <YAxis type="category" dataKey="description" width={180} tick={{ fontSize: 11 }} />
                          <Tooltip formatter={(v) => [v, 'Mentions']} />
                          <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Reasons They Come</h3>
                      <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={(customer.reasonsForComing || []).slice(0, 8)} layout="vertical" margin={{ top: 8, right: 12, bottom: 8, left: 12 }}>
                          <XAxis type="number" allowDecimals={false} />
                          <YAxis type="category" dataKey="reason" width={180} tick={{ fontSize: 11 }} />
                          <Tooltip formatter={(v) => [v, 'Mentions']} />
                          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {customer.painPoints?.length > 0 && (
                    <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-3 text-sm">
                      <span className="font-medium">Pain point summary:</span> Main issues are{' '}
                      {customer.painPoints.slice(0, 3).map((p) => p.description).join(', ')}, with{' '}
                      {(customer.painPoints[0]?.count || 0)} mentions for the top issue.
                    </div>
                  )}
                  {customer.painPoints?.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-700 dark:text-gray-300">Top Pain Points (federal contracts)</h3>
                        {selectedPainPoint && (
                          <button
                            type="button"
                            className="text-xs text-blue-600 hover:underline"
                            onClick={() => setSelectedPainPoint('')}
                          >
                            Clear selection
                          </button>
                        )}
                      </div>
                      <ul className="space-y-2">
                        {customer.painPoints.map((p, i) => (
                          <li
                            key={i}
                            className={`border rounded-lg p-3 text-sm flex justify-between items-start cursor-pointer ${
                              selectedPainPoint === p.description
                                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600'
                                : 'border-gray-200 dark:border-gray-600'
                            }`}
                            onClick={() => setSelectedPainPoint((prev) => (prev === p.description ? '' : p.description))}
                          >
                            <span className="font-medium">{p.description}</span>
                            <span className="text-gray-500 font-medium shrink-0 ml-2">{p.count} mentions</span>
                          </li>
                        ))}
                      </ul>
                      {selectedPainPoint && (
                        <div className="mt-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                          <div className="text-sm font-medium mb-2">
                            Context for "{selectedPainPoint}" ({painPointContexts.length} snippets)
                          </div>
                          {painPointContexts.length > 0 ? (
                            <ul className="space-y-2 max-h-64 overflow-y-auto text-sm">
                              {painPointContexts.slice(0, 12).map((ctx, idx) => (
                                <li key={`${ctx.meetingId}-${idx}`} className="border border-gray-200 dark:border-gray-700 rounded p-2">
                                  <div className="text-xs text-gray-500 mb-1">{ctx.title} · {formatUsDate(ctx.date)}</div>
                                  <div>{ctx.snippet}</div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">No snippet context found for this pain point in current date range.</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {customer.reasonsForComing?.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Top Reasons They Come</h3>
                      <ul className="space-y-2">
                        {customer.reasonsForComing.map((r, i) => (
                          <li key={i} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-sm flex justify-between items-start">
                            <span>{r.reason}</span>
                            <span className="text-gray-500 font-medium shrink-0 ml-2">{r.count} mentions</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {customer.customerInsights?.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Customer Insights</h3>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {customer.customerInsights.map((insight, i) => (
                          <li key={i}>• {insight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Run analysis when tab loads, or ensure backend is running.</p>
              )}
            </section>
          </div>
        )}

      </main>
    </div>
  );
}
