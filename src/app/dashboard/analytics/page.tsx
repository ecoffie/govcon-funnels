import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Site Analytics',
};

// Paste the Looker Studio "Embed report" URL here (or set NEXT_PUBLIC_LOOKER_EMBED_URL).
// How to get it: build a report on the "GovCon Giants - Web" GA4 property at
// https://lookerstudio.google.com → Share → Embed report → copy the iframe src URL.
const LOOKER_EMBED_URL =
  process.env.NEXT_PUBLIC_LOOKER_EMBED_URL ?? '';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Site Analytics</h2>
        <p className="mt-1 text-sm text-slate-400">
          Live from GA4 (GovCon Giants - Web) via Looker Studio.
        </p>
      </div>

      {LOOKER_EMBED_URL ? (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/70">
          <iframe
            title="GA4 Analytics Report"
            src={LOOKER_EMBED_URL}
            className="h-[1400px] w-full"
            style={{ border: 0 }}
            allowFullScreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      ) : (
        <div className="rounded-xl border border-amber-700/50 bg-amber-950/30 p-6 text-amber-200">
          <p className="font-semibold">Looker Studio report not configured yet</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-amber-300/90">
            <li>
              Go to{' '}
              <a
                href="https://lookerstudio.google.com"
                target="_blank"
                rel="noopener"
                className="underline"
              >
                lookerstudio.google.com
              </a>{' '}
              and create a report on the <strong>GovCon Giants - Web</strong> GA4
              property.
            </li>
            <li>Click <strong>Share → Embed report</strong> → enable embedding.</li>
            <li>Copy the iframe <strong>src</strong> URL.</li>
            <li>
              Set <code>NEXT_PUBLIC_LOOKER_EMBED_URL</code> in Vercel (or paste it
              into <code>src/app/dashboard/analytics/page.tsx</code>) and redeploy.
            </li>
          </ol>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Tip: in Looker Studio you can add an A/B-test scorecard filtered to{' '}
        <code>ab_test_assignment</code> / <code>ab_test_conversion</code> events
        (register <code>variant_id</code> / <code>variant_name</code> as custom
        dimensions first).
      </p>
    </div>
  );
}
