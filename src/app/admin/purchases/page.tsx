import { buildPurchaseReport, attributionSummary, type PurchaseRecord } from "@/lib/purchase-attribution";
import { ADMIN_COOKIE, isAuthorized } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ error?: string; limit?: string }>;

async function loginAction(formData: FormData) {
  "use server";

  const password = String(formData.get("password") || "");
  if (!isAuthorized(password)) {
    redirect("/admin/purchases?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, password, {
    httpOnly: true,
    maxAge: 8 * 60 * 60,
    path: "/admin/purchases",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/admin/purchases");
}

function money(cents?: number): string {
  if (cents == null) return "—";
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("en-US", { timeZone: "America/New_York" });
}

function statusBadge(status: PurchaseRecord["status"]) {
  const map: Record<PurchaseRecord["status"], string> = {
    paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    failed: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    open: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    unknown: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  };
  return (
    <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${map[status]}`}>
      {status}
    </span>
  );
}

export default async function PurchasesDashboard({ searchParams }: { searchParams: SearchParams }) {
  const { error: authError } = await searchParams;
  const cookieStore = await cookies();
  const password = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!isAuthorized(password)) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <form action={loginAction} className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h1 className="text-xl font-bold">Purchases Dashboard</h1>
          <p className="text-sm text-slate-400">Enter the admin password to continue.</p>
          {authError ? <p className="text-sm text-rose-400">Incorrect password.</p> : null}
          <input
            type="password"
            name="password"
            placeholder="Admin password"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            autoFocus
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold hover:bg-indigo-500"
          >
            View Dashboard
          </button>
        </form>
      </main>
    );
  }

  let report;
  let error: string | null = null;
  try {
    report = await buildPurchaseReport(500);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load purchases";
  }

  if (error || !report) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
        <h1 className="text-2xl font-bold mb-2">Purchases Dashboard</h1>
        <p className="text-rose-400">Error: {error}</p>
        <p className="mt-2 text-sm text-slate-400">
          Check that <code>KV_REST_API_URL</code>/<code>KV_REST_API_TOKEN</code> (or the
          <code>STORAGE_</code>-prefixed names) are set.
        </p>
      </main>
    );
  }

  const { totals, by_site, by_source, by_product, purchases } = report;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl font-bold">Purchases &amp; Attribution</h1>
          <p className="text-sm text-slate-500">Generated {fmtDate(report.generated_at)} • last {purchases.length} records</p>
        </header>

        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat label="Paid revenue" value={money(totals.paid_revenue_cents)} accent="text-emerald-400" />
          <Stat label="Paid orders" value={String(totals.paid_count)} accent="text-emerald-400" />
          <Stat label="Failed" value={String(totals.failed_count)} accent="text-rose-400" />
          <Stat label="Total events" value={String(totals.count)} accent="text-slate-200" />
        </section>

        <Panel title="By site">
          <Table head={["Site", "Events", "Paid", "Revenue"]}>
            {by_site.map((s) => (
              <tr key={s.site} className="border-t border-slate-800">
                <Td>{s.site === "gcg" ? "govcongiants.com" : s.site === "mindy" ? "getmindy.ai" : s.site}</Td>
                <Td>{s.count}</Td>
                <Td>{s.paid_count}</Td>
                <Td>{money(s.paid_revenue_cents)}</Td>
              </tr>
            ))}
            {!by_site.length && <EmptyRow cols={4} />}
          </Table>
        </Panel>

        <section className="grid gap-6 lg:grid-cols-2">
          <Panel title="By source (last touch)">
            <Table head={["Source", "Events", "Paid", "Revenue"]}>
              {by_source.map((s) => (
                <tr key={s.source} className="border-t border-slate-800">
                  <Td>{s.source}</Td>
                  <Td>{s.count}</Td>
                  <Td>{s.paid_count}</Td>
                  <Td>{money(s.paid_revenue_cents)}</Td>
                </tr>
              ))}
              {!by_source.length && <EmptyRow cols={4} />}
            </Table>
          </Panel>

          <Panel title="By product">
            <Table head={["Product", "Events", "Paid", "Revenue"]}>
              {by_product.map((p) => (
                <tr key={p.product_id} className="border-t border-slate-800">
                  <Td>{p.product_name}</Td>
                  <Td>{p.count}</Td>
                  <Td>{p.paid_count}</Td>
                  <Td>{money(p.paid_revenue_cents)}</Td>
                </tr>
              ))}
              {!by_product.length && <EmptyRow cols={4} />}
            </Table>
          </Panel>
        </section>

        <Panel title="Recent purchases">
          <Table head={["When (ET)", "Site", "Status", "Product", "Amount", "Customer", "Source / Medium", "Campaign", "Landing"]}>
            {purchases.map((p) => {
              const a = attributionSummary(p.attribution);
              return (
                <tr key={`${p.site || "?"}:${p.id}`} className="border-t border-slate-800 align-top">
                  <Td>{fmtDate(p.created_at)}</Td>
                  <Td>{p.site || "—"}</Td>
                  <Td>{statusBadge(p.status)}</Td>
                  <Td>{p.product_name}</Td>
                  <Td>{money(p.amount_cents)}</Td>
                  <Td>{p.customer_email || "—"}</Td>
                  <Td>
                    {(a.last_source || a.first_source || "—")}
                    {" / "}
                    {(a.last_medium || a.first_medium || "—")}
                  </Td>
                  <Td>{a.last_campaign || a.first_campaign || "—"}</Td>
                  <Td className="max-w-[220px] truncate" title={a.landing_page}>{a.landing_page || "—"}</Td>
                </tr>
              );
            })}
            {!purchases.length && <EmptyRow cols={9} />}
          </Table>
        </Panel>
      </div>
    </main>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${accent}`}>{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{title}</h2>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="text-xs uppercase tracking-wide text-slate-500">
          {head.map((h) => (
            <th key={h} className="pb-2 pr-4 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function Td({ children, className = "", title }: { children: React.ReactNode; className?: string; title?: string }) {
  return <td className={`py-2 pr-4 ${className}`} title={title}>{children}</td>;
}

function EmptyRow({ cols }: { cols: number }) {
  return (
    <tr>
      <td colSpan={cols} className="py-6 text-center text-slate-500">
        No records yet.
      </td>
    </tr>
  );
}
