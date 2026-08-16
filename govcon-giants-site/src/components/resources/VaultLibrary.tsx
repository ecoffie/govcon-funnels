import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import VaultSignupModal from '@/components/resources/VaultSignupModal';
import type { VaultDoc } from '@/data/vault';
import { VAULT_CATEGORIES, vaultFormatIcon } from '@/data/vault';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cardCls =
  'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-left transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand';

function VaultCard({ doc, rank, index, onSelect }: { doc: VaultDoc; rank: number; index: number; onSelect: (doc: VaultDoc) => void }) {
  const Icon = vaultFormatIcon(doc.format);
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(doc)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: EASE }}
      className={cardCls}
      aria-label={`Email me ${doc.title}`}
    >
      {/* rank watermark */}
      <span
        className="pointer-events-none absolute -right-1 -top-4 select-none font-mono text-7xl font-bold text-slate-800/80 transition-colors duration-300 group-hover:text-brand/20"
        aria-hidden
      >
        {String(rank).padStart(2, '0')}
      </span>
      {/* top accent bar — draws left→right on hover */}
      <span
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden
      />
      <span className="mb-5 flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-green-400 transition-transform duration-200 group-hover:rotate-[8deg]">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <span className="rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {doc.format}
        </span>
      </span>
      <h3 className="font-display text-xl font-bold leading-[1.2] tracking-normal text-white transition-colors group-hover:text-green-400">
        {doc.title}
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-400">
        {doc.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-green-400">
        Email It to Me
        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden />
      </span>
    </motion.button>
  );
}

/**
 * The Document Vault — dark "vault" themed section matching the homepage hero
 * (slate-950 bg, green glow + blueprint grid, serif italic accent line).
 * Single flat grid of the Top 10 gated downloads; each card opens the vault
 * signup modal and the lead API emails the direct download link.
 */
export default function VaultLibrary() {
  const [activeDoc, setActiveDoc] = useState<VaultDoc | null>(null);
  // Single-category library ("Top 10 Downloads") — rendered flat.
  const docs = VAULT_CATEGORIES.flatMap((c) => c.docs);

  return (
    <section className="relative overflow-hidden border-y border-line bg-slate-950 py-16 md:py-24">
      {/* radial glow top-right + faint blueprint grid — same treatment as the page hero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 85% 0%, rgba(34,197,94,0.14), transparent 60%)',
        }}
        aria-hidden
      />
      <img
        src="/hero-blueprint.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 invert"
      />

      <div className="container-gg relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 md:mb-14"
        >
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-0.5 w-6 origin-left bg-brand"
              aria-hidden
            />
            <span className="font-sans text-sm font-semibold uppercase tracking-[0.22em] text-green-400">
              Free Downloads
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-[1.15] tracking-normal text-white md:text-5xl">
            The Document
            <em className="mt-1 block pl-[0.5em] text-[0.75em] italic text-green-400">Vault.</em>
          </h2>
          <p className="mt-5 max-w-[640px] text-[17px] leading-[1.7] text-slate-300">
            The 10 most-requested documents from the GovCon Giants vault — the
            exact templates, checklists, and samples Eric uses in training.
            Pick one, drop your email, and it's yours.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {docs.map((doc, i) => (
            <VaultCard key={doc.slug} doc={doc} rank={i + 1} index={i} onSelect={setActiveDoc} />
          ))}
        </div>
      </div>

      <VaultSignupModal doc={activeDoc} onClose={() => setActiveDoc(null)} />
    </section>
  );
}
