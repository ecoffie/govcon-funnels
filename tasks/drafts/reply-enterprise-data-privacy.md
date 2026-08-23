# Reply draft — Enterprise / data-privacy question

**To:** [prospect]
**Re:** "Can you set up an Enterprise connection so our data questions or pulls do not become common knowledge…"
**Drafted:** 2026-08-21
**Every claim below is verified in code — see the proof table at the bottom. Do not add claims to this email without verifying them first.**

---

## The email

Subject: **Your questions are already private — here's exactly how**

Hey [Name],

Good question, and honestly it's the right one to ask before you put strategy work into any tool.

The short answer: **what you and Sandeep ask Mindy is already private.** Not as a setting you turn on — it's how the thing is built. If you ask her to compare North Star against a teaming partner, that comparison is yours. It does not become part of what she knows, and no other customer can surface it.

Here's the part most tools won't tell you, so I will:

→ <strong>Mindy doesn't learn from your questions.</strong> What she knows comes from federal award data and our own training library. Your searches don't feed back into that. There's no path for it — <u>we'd have to build one on purpose</u>, and we didn't.

→ <strong>Your chat history is locked to your login.</strong> Every read checks that the session belongs to you before it returns a single line.

→ <strong>Anything you upload is walled off at the database itself</strong>, not just in the code. We ran an audit last July, found that the vault was only protected by application logic, and fixed it at the database level. <strong><u>We also found the AI provider chain could theoretically be pointed at an unvetted model — so we locked sensitive data to providers that contractually don't train on it, and wrote tests that make the app fail loudly rather than quietly route your data somewhere new.</u></strong>

You can read all of it here — plain language, no legalese: <a href="https://getmindy.ai/app/trust">getmindy.ai/app/trust</a>

Two things I won't oversell you on:

→ We're a commercial platform, not a classified environment. Your data sits in our system, and we can reach it to support you. If your strategy work ever touches CUI, that's a different conversation and I'd tell you so rather than sell you something that doesn't fit.

→ You can pull your whole vault out or delete it whenever you want. That's a button, not an email to me.

On your last point — you're right that there's more here. A written agreement covering confidentiality and no-training-on-your-data, plus a shared workspace where you and Sandeep work under one account, is something I'd put together for a company that wants it in writing. <u>That part isn't self-serve yet.</u> If that's what you need, let's get on a call and I'll walk you through what it covers and what it costs.

— Eric

<strong>P.S.</strong> Enough customers asked me some version of your question that we went and audited it last July. Turns out we couldn't back up three of the things we would have wanted to say. We fixed those first, then wrote the trust page. <u>The page came second on purpose.</u>

---

## Proof table — every claim ↔ its evidence

| Claim in the email | Verified where |
|---|---|
| Questions don't feed back into what Mindy knows | **No user-facing path writes to `mindy_rag_documents`.** Writers are operator-run ingest scripts (`ingest-vault-docs.js`, `ingest-govcon-podcast.js`, `ingest-mcp-docs.js`) plus ONE admin route, `src/app/api/admin/rag-library/route.ts` (`.update`/`.upsert`), gated on `ADMIN_PASSWORD` — that is Eric curating the corpus, never user activity. The user-facing routes (`app/rag-doc`, `app/knowledge-base`) are **read-only** (verified: no write verbs). ⚠️ Re-verified 2026-08-23 — the earlier wording "zero application writers" was imprecise; say "nothing a user does writes to it," which is what is true and what the customer asked |
| Chat locked to your login | `src/app/api/app/chat-sessions/route.ts:64` re-verifies `session.user_email?.toLowerCase() !== userEmail` before returning messages, on top of `.eq('user_email', …)`. ✅ Re-verified 2026-08-23, still line 64 |
| Searches are per-user, not pooled | `src/lib/search-history.ts:55-60` requires an email; `aggregate-profiles` builds one profile **per user** |
| Uploads walled off at the DB | `supabase/migrations/20260705_vault_rls_backstop.sql` — RLS enabled + FORCE'd on all 5 vault tables. Pre-flight: anon key **could** read the vault. Post: anon BLOCKED 5/5, service OK 5/5 (210 rows). ✅ **Re-verified against LIVE PROD 2026-08-23** via `pg_class`: all 5 tables `relrowsecurity=true`, `relforcerowsecurity=true`, 2 policies each — not just asserted by a migration file |
| Sensitive data pinned to no-training providers | Data Trust Layer Phase 3.1 — `src/lib/llm/call-llm.ts:180` — a `dataClass:'sensitive'` call rebuilds its chain from `jobChain`, **never** `envChain()`, so `LLM_CHAIN` cannot route PII; grok excluded; **throws** `No no-training LLM provider available for sensitive data` rather than falling back. ✅ Re-verified in code 2026-08-23 |
| Export / delete is self-serve | `GET /api/app/vault/export`; `DELETE /api/app/vault?confirm=DELETE`; canonical table list `src/lib/vault/vault-data.ts` |
| Trust page is real | `src/app/app/trust/page.tsx` — **live, HTTP 200** at getmindy.ai/app/trust (✅ re-checked 2026-08-23) |
| Org workspace "not self-serve yet" | `organizations`/`org_members`/`org_clients` exist (`20260702_coach_org_rls.sql`) but Data Trust Layer **Phase 4 is "later, contract-driven"** |

## Deliberately NOT said

- **No invented customer anecdote.** The P.S. originally read *"a customer asked me the same thing last summer"* — unverifiable and effectively a fabricated person. The PRD only supports "multiple have asked, in effect: *is my data safe in here? can another company see it?*" The P.S. now says "enough customers asked me some version of your question," which is what the record supports. **The audit itself (3 claims false, fixed before publishing) is true and is the strongest line in the email — keep it, just don't attach it to a specific customer.**

- **No CMMC / CUI / FedRAMP claim.** `docs/strategy/PRD-cmmc-cui-custody-strategy.md` is an exploration draft (2026-07-12), not shipped. Naming it would create an expectation we can't meet.
- **No ship date on the org tier.** Phase 4 is contract-driven; the PRD says "only for the 1–2 who pay, never default."
- **No "we can't see your data."** Untrue — we use the service-role key and can support you. The email says so plainly.
- **No pricing.** He raised "for a fee" — better to scope on a call than anchor a number cold.

## Before sending

- [ ] Confirm the prospect's name + company spelling from the original email
- [ ] Decide whether to name Sandeep directly (draft does, once — it shows you read his note)
- [ ] Eric's call: attach a mutual NDA now, or wait for the call?
