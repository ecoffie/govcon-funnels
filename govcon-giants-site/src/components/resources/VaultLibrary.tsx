import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import VaultSignupModal from '@/components/resources/VaultSignupModal';
import type { VaultDoc } from '@/data/vault';
import { VAULT_CATEGORIES, vaultFormatIcon } from '@/data/vault';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cardCls =
  'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-line bg-raised p-6 text-left transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand';

function VaultCard({ doc, index, onSelect }: { doc: VaultDoc; index: number; onSelect: (doc: VaultDoc) => void }) {
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
      {/* top accent bar — draws left→right on hover */}
      <span
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden
      />
      <span className="mb-5 flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand transition-transform duration-200 group-hover:rotate-[8deg]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="rounded-full border border-line bg-inset px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {doc.format}
        </span>
      </span>
      <h3 className="font-display text-xl font-bold leading-[1.2] tracking-normal text-slate-900 dark:text-white transition-colors group-hover:text-brand">
        {doc.title}
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
        {doc.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand">
        Email It to Me
        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden />
      </span>
    </motion.button>
  );
}

/**
 * Gated document library: 59 free downloads grouped by category. Each card
 * opens the vault signup modal; the lead API emails the direct download link.
 */
export default function VaultLibrary() {
  const [activeDoc, setActiveDoc] = useState<VaultDoc | null>(null);

  return (
    <section className="bg-inset py-16 md:py-24">
      <div className="container-gg">
        <SectionHeader
          kicker="FREE DOWNLOADS"
          title={<>The <em>Document Library</em></>}
        />
        <p className="-mt-6 mb-12 max-w-[640px] text-[17px] leading-[1.7] text-slate-600 dark:text-slate-300 md:-mt-8 md:mb-16">
          59 templates, samples, scripts, and contact lists from real federal
          pursuits — pick one, drop your email, and it's yours.
        </p>
        {VAULT_CATEGORIES.map((category) => (
          <div key={category.name} className="mb-14 last:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mb-6"
            >
              <h3 className="font-display text-2xl font-bold tracking-normal text-slate-900 dark:text-white">
                {category.name}
              </h3>
              <p className="mt-1 text-[15px] text-slate-500 dark:text-slate-400">{category.blurb}</p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.docs.map((doc, i) => (
                <VaultCard key={doc.slug} doc={doc} index={i} onSelect={setActiveDoc} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <VaultSignupModal doc={activeDoc} onClose={() => setActiveDoc(null)} />
    </section>
  );
}
