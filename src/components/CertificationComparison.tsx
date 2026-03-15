export default function CertificationComparison() {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-4 text-white font-bold border border-slate-700">Certification</th>
            <th className="p-4 text-white font-bold border border-slate-700">Eligibility</th>
            <th className="p-4 text-white font-bold border border-slate-700">Set-Aside $</th>
            <th className="p-4 text-white font-bold border border-slate-700">Timeline</th>
            <th className="p-4 text-white font-bold border border-slate-700">Duration</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          <tr className="hover:bg-slate-800/50">
            <td className="p-4 border border-slate-700">
              <span className="font-bold text-green-500">8(a)</span>
            </td>
            <td className="p-4 border border-slate-700">
              Socially & economically disadvantaged owners (51%+)
            </td>
            <td className="p-4 border border-slate-700">$30B+/year</td>
            <td className="p-4 border border-slate-700">90-180 days</td>
            <td className="p-4 border border-slate-700">9 years (one-time)</td>
          </tr>
          <tr className="hover:bg-slate-800/50">
            <td className="p-4 border border-slate-700">
              <span className="font-bold text-blue-500">HUBZone</span>
            </td>
            <td className="p-4 border border-slate-700">
              35%+ employees live in HUBZone; principal office in HUBZone
            </td>
            <td className="p-4 border border-slate-700">$4B+/year</td>
            <td className="p-4 border border-slate-700">60-90 days</td>
            <td className="p-4 border border-slate-700">3 years (renewable)</td>
          </tr>
          <tr className="hover:bg-slate-800/50">
            <td className="p-4 border border-slate-700">
              <span className="font-bold text-purple-500">WOSB/EDWOSB</span>
            </td>
            <td className="p-4 border border-slate-700">
              51%+ owned by women; EDWOSB adds economic disadvantage
            </td>
            <td className="p-4 border border-slate-700">$5B+/year</td>
            <td className="p-4 border border-slate-700">30-90 days</td>
            <td className="p-4 border border-slate-700">3 years (renewable)</td>
          </tr>
          <tr className="hover:bg-slate-800/50">
            <td className="p-4 border border-slate-700">
              <span className="font-bold text-amber-500">SDVOSB</span>
            </td>
            <td className="p-4 border border-slate-700">
              51%+ owned by service-disabled veterans
            </td>
            <td className="p-4 border border-slate-700">$25B+/year</td>
            <td className="p-4 border border-slate-700">60-90 days</td>
            <td className="p-4 border border-slate-700">3 years (renewable)</td>
          </tr>
          <tr className="hover:bg-slate-800/50">
            <td className="p-4 border border-slate-700">
              <span className="font-bold text-teal-500">VOSB</span>
            </td>
            <td className="p-4 border border-slate-700">
              51%+ owned by veterans (no disability required)
            </td>
            <td className="p-4 border border-slate-700">Included in SDVOSB goals</td>
            <td className="p-4 border border-slate-700">30-60 days</td>
            <td className="p-4 border border-slate-700">3 years (renewable)</td>
          </tr>
        </tbody>
      </table>
      <p className="text-slate-500 text-sm mt-3">
        * Set-aside amounts are approximate annual federal spending. Actual amounts vary by fiscal year.
      </p>
    </div>
  );
}

export const certificationComparisonHtml = `
<div class="overflow-x-auto my-8">
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-slate-800">
        <th class="p-4 text-white font-bold border border-slate-700">Certification</th>
        <th class="p-4 text-white font-bold border border-slate-700">Eligibility</th>
        <th class="p-4 text-white font-bold border border-slate-700">Set-Aside $</th>
        <th class="p-4 text-white font-bold border border-slate-700">Timeline</th>
        <th class="p-4 text-white font-bold border border-slate-700">Duration</th>
      </tr>
    </thead>
    <tbody class="text-slate-300">
      <tr class="hover:bg-slate-800/50">
        <td class="p-4 border border-slate-700"><strong class="text-green-500">8(a)</strong></td>
        <td class="p-4 border border-slate-700">Socially & economically disadvantaged owners (51%+)</td>
        <td class="p-4 border border-slate-700">$30B+/year</td>
        <td class="p-4 border border-slate-700">90-180 days</td>
        <td class="p-4 border border-slate-700">9 years (one-time)</td>
      </tr>
      <tr class="hover:bg-slate-800/50">
        <td class="p-4 border border-slate-700"><strong class="text-blue-500">HUBZone</strong></td>
        <td class="p-4 border border-slate-700">35%+ employees in HUBZone; principal office in HUBZone</td>
        <td class="p-4 border border-slate-700">$4B+/year</td>
        <td class="p-4 border border-slate-700">60-90 days</td>
        <td class="p-4 border border-slate-700">3 years (renewable)</td>
      </tr>
      <tr class="hover:bg-slate-800/50">
        <td class="p-4 border border-slate-700"><strong class="text-purple-500">WOSB/EDWOSB</strong></td>
        <td class="p-4 border border-slate-700">51%+ owned by women; EDWOSB adds economic disadvantage</td>
        <td class="p-4 border border-slate-700">$5B+/year</td>
        <td class="p-4 border border-slate-700">30-90 days</td>
        <td class="p-4 border border-slate-700">3 years (renewable)</td>
      </tr>
      <tr class="hover:bg-slate-800/50">
        <td class="p-4 border border-slate-700"><strong class="text-amber-500">SDVOSB</strong></td>
        <td class="p-4 border border-slate-700">51%+ owned by service-disabled veterans</td>
        <td class="p-4 border border-slate-700">$25B+/year</td>
        <td class="p-4 border border-slate-700">60-90 days</td>
        <td class="p-4 border border-slate-700">3 years (renewable)</td>
      </tr>
      <tr class="hover:bg-slate-800/50">
        <td class="p-4 border border-slate-700"><strong class="text-teal-500">VOSB</strong></td>
        <td class="p-4 border border-slate-700">51%+ owned by veterans (no disability required)</td>
        <td class="p-4 border border-slate-700">Included in SDVOSB goals</td>
        <td class="p-4 border border-slate-700">30-60 days</td>
        <td class="p-4 border border-slate-700">3 years (renewable)</td>
      </tr>
    </tbody>
  </table>
  <p class="text-slate-500 text-sm mt-3">* Set-aside amounts are approximate annual federal spending. Actual amounts vary by fiscal year.</p>
</div>
`;
