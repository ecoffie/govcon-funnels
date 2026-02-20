'use client';

const BOX_W = 100;
const BOX_H = 40;
const GAP = 28;

/**
 * Two flows; all boxes same size. Online: Product/Download → Confirmation email → Follow-up sequence.
 * Manual: First meeting → [Sale | Schedule second meeting] on same line; then Schedule → Second meeting → Contract / Invoice.
 */
export default function Flowchart() {
  return (
    <div className="space-y-10">
      {/* Diagram 1 – Online Funnels Flow: same-size boxes; vertical chain after Product/Download */}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/50 p-6">
        <h3 className="text-sm font-semibold text-green-500 mb-4">Online Funnels Flow</h3>
        <svg
          viewBox="0 0 580 320"
          className="min-w-full max-w-4xl mx-auto"
          aria-label="Online funnels flow"
        >
          <defs>
            <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="rgb(34 197 94)" />
            </marker>
          </defs>
          {/* Row 1: Traffic → Funnels → Upsell/Downsell → Product/Download */}
          {[
            { x: 10, t: 'Traffic' },
            { x: 10 + BOX_W + GAP, t: 'Funnels' },
            { x: 10 + (BOX_W + GAP) * 2, t: 'Upsell / Downsell' },
            { x: 10 + (BOX_W + GAP) * 3, t: 'Product / Download' },
          ].map(({ x, t }, i) => (
            <g key={t}>
              {i > 0 && (
                <line x1={x - GAP} y1={50 + BOX_H / 2} x2={x} y2={50 + BOX_H / 2} stroke="rgb(34 197 94)" strokeWidth="2" markerEnd="url(#flowArrow)" />
              )}
              <rect x={x} y={50} width={BOX_W} height={BOX_H} rx="6" fill="rgb(30 41 59)" stroke="rgb(71 85 105)" />
              <text x={x + BOX_W / 2} y={50 + BOX_H / 2 + 5} textAnchor="middle" fill="#e2e8f0" fontSize="10">{t}</text>
            </g>
          ))}
          {/* Vertical: Product/Download → Confirmation email → Follow-up sequence */}
          <line x1={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y1={50 + BOX_H} x2={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y2={50 + BOX_H + GAP} stroke="rgb(148 163 184)" strokeWidth="1.5" markerEnd="url(#flowArrow)" />
          <rect x={10 + (BOX_W + GAP) * 3} y={50 + BOX_H + GAP} width={BOX_W} height={BOX_H} rx="6" fill="rgb(30 41 59)" stroke="rgb(71 85 105)" />
          <text x={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y={50 + BOX_H + GAP + BOX_H / 2 + 5} textAnchor="middle" fill="#e2e8f0" fontSize="10">Confirmation email</text>
          <line x1={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y1={50 + BOX_H + GAP + BOX_H} x2={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y2={50 + BOX_H + GAP * 2 + BOX_H} stroke="rgb(148 163 184)" strokeWidth="1.5" markerEnd="url(#flowArrow)" />
          <rect x={10 + (BOX_W + GAP) * 3} y={50 + BOX_H + GAP * 2 + BOX_H} width={BOX_W} height={BOX_H} rx="6" fill="rgb(30 41 59)" stroke="rgb(71 85 105)" />
          <text x={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y={50 + BOX_H + GAP * 2 + BOX_H + BOX_H / 2 + 5} textAnchor="middle" fill="#e2e8f0" fontSize="10">Follow-up sequence</text>
        </svg>
      </div>

      {/* Diagram 2 – Manual call flow: First meeting → Sale | Schedule second meeting (same row); Schedule → Second meeting → Contract / Invoice */}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/50 p-6">
        <h3 className="text-sm font-semibold text-green-500 mb-4">Manual call flow</h3>
        <svg
          viewBox="0 0 540 300"
          className="min-w-full max-w-4xl mx-auto"
          aria-label="Manual call flow"
        >
          <defs>
            <marker id="flowArrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="rgb(34 197 94)" />
            </marker>
          </defs>
          {/* Row 1: Traffic → Email or phone reach out → First meeting */}
          {[
            { x: 10, t: 'Traffic' },
            { x: 10 + BOX_W + GAP, t: 'Email or phone reach out' },
            { x: 10 + (BOX_W + GAP) * 2, t: 'First meeting' },
          ].map(({ x, t }, i) => (
            <g key={t}>
              {i > 0 && (
                <line x1={x - GAP} y1={50 + BOX_H / 2} x2={x} y2={50 + BOX_H / 2} stroke="rgb(34 197 94)" strokeWidth="2" markerEnd="url(#flowArrow2)" />
              )}
              <rect x={x} y={50} width={BOX_W} height={BOX_H} rx="6" fill="rgb(30 41 59)" stroke="rgb(71 85 105)" />
              <text x={x + BOX_W / 2} y={50 + BOX_H / 2 + 5} textAnchor="middle" fill="#e2e8f0" fontSize="9">{t}</text>
            </g>
          ))}
          {/* First meeting splits: vertical down to horizontal, then Sale (left) and Schedule second meeting (right) */}
          {(() => {
            const fmCx = 10 + (BOX_W + GAP) * 2 + BOX_W / 2;  // 316
            const row2Y = 50 + BOX_H + GAP;                   // 118
            const branchY = 50 + BOX_H + GAP / 2;              // 104
            const saleCx = 10 + BOX_W / 2;                    // 60
            const schedCx = 10 + (BOX_W + GAP) * 3 + BOX_W / 2; // 444
            return (
              <>
                <line x1={fmCx} y1={50 + BOX_H} x2={fmCx} y2={branchY} stroke="rgb(148 163 184)" strokeWidth="1.5" />
                <line x1={fmCx} y1={branchY} x2={saleCx} y2={branchY} stroke="rgb(148 163 184)" strokeWidth="1.5" />
                <line x1={saleCx} y1={branchY} x2={saleCx} y2={row2Y} stroke="rgb(148 163 184)" strokeWidth="1.5" markerEnd="url(#flowArrow2)" />
                <rect x={10} y={row2Y} width={BOX_W} height={BOX_H} rx="6" fill="rgb(15 23 42)" stroke="rgb(34 197 94)" />
                <text x={saleCx} y={row2Y + BOX_H / 2 + 5} textAnchor="middle" fill="#22c55e" fontSize="10">Sale</text>
                <line x1={fmCx} y1={branchY} x2={schedCx} y2={branchY} stroke="rgb(148 163 184)" strokeWidth="1.5" />
                <line x1={schedCx} y1={branchY} x2={schedCx} y2={row2Y} stroke="rgb(148 163 184)" strokeWidth="1.5" markerEnd="url(#flowArrow2)" />
              </>
            );
          })()}
          <rect x={10 + (BOX_W + GAP) * 3} y={50 + BOX_H + GAP} width={BOX_W} height={BOX_H} rx="6" fill="rgb(30 41 59)" stroke="rgb(71 85 105)" />
          <text x={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y={50 + BOX_H + GAP + BOX_H / 2 + 5} textAnchor="middle" fill="#e2e8f0" fontSize="8">Schedule second meeting</text>
          {/* Schedule second meeting → Second meeting → Contract / Invoice */}
          <line x1={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y1={50 + BOX_H + GAP + BOX_H} x2={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y2={50 + BOX_H + GAP * 2 + BOX_H} stroke="rgb(148 163 184)" strokeWidth="1.5" markerEnd="url(#flowArrow2)" />
          <rect x={10 + (BOX_W + GAP) * 3} y={50 + BOX_H + GAP * 2 + BOX_H} width={BOX_W} height={BOX_H} rx="6" fill="rgb(30 41 59)" stroke="rgb(71 85 105)" />
          <text x={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y={50 + BOX_H + GAP * 2 + BOX_H + BOX_H / 2 + 5} textAnchor="middle" fill="#e2e8f0" fontSize="9">Second meeting</text>
          <line x1={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y1={50 + BOX_H + GAP * 2 + BOX_H * 2} x2={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y2={50 + BOX_H + GAP * 3 + BOX_H * 2} stroke="rgb(148 163 184)" strokeWidth="1.5" markerEnd="url(#flowArrow2)" />
          <rect x={10 + (BOX_W + GAP) * 3} y={50 + BOX_H + GAP * 3 + BOX_H * 2} width={BOX_W} height={BOX_H} rx="6" fill="rgb(30 41 59)" stroke="rgb(71 85 105)" />
          <text x={10 + (BOX_W + GAP) * 3 + BOX_W / 2} y={50 + BOX_H + GAP * 3 + BOX_H * 2 + BOX_H / 2 + 5} textAnchor="middle" fill="#e2e8f0" fontSize="9">Contract / Invoice</text>
        </svg>
      </div>
    </div>
  );
}
