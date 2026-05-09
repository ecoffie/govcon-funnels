'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { FundingHistoryResponse, formatDollars, formatPercent } from '@/lib/usaspending';

interface ContractorFundingChartProps {
  uei: string;
  companyName: string; // Required for USASpending lookup
  isGated?: boolean; // If true, show blurred preview
}

interface ChartData {
  year: string;
  value: number;
  growth: number | null;
}

export function ContractorFundingChart({ uei, companyName, isGated = true }: ContractorFundingChartProps) {
  const [data, setData] = useState<FundingHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/contractor-funding?uei=${uei}&name=${encodeURIComponent(companyName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch funding data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [uei, companyName]);

  if (loading) {
    return (
      <div className="h-64 bg-slate-800/50 rounded-xl animate-pulse flex items-center justify-center">
        <div className="text-slate-500">Loading funding history...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-64 bg-slate-800/50 rounded-xl flex items-center justify-center">
        <div className="text-slate-500">No funding data available</div>
      </div>
    );
  }

  // Transform data for Recharts
  const chartData: ChartData[] = data.fundingHistory.map((year, index) => {
    const prevYear = data.fundingHistory[index - 1];
    let growth: number | null = null;
    if (prevYear && prevYear.totalObligated > 0) {
      growth = ((year.totalObligated - prevYear.totalObligated) / prevYear.totalObligated) * 100;
    }
    return {
      year: `FY${year.fiscalYear}`,
      value: year.totalObligated,
      growth,
    };
  });

  // Determine bar colors based on growth
  const getBarColor = (index: number) => {
    const item = chartData[index];
    if (item.growth === null) return '#10b981'; // Green for first year
    if (item.growth > 5) return '#10b981'; // Green for growth > 5%
    if (item.growth < -5) return '#ef4444'; // Red for decline > 5%
    return '#f59e0b'; // Amber for flat (-5% to +5%)
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: ChartData }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{item.year}</p>
          <p className="text-green-400 text-lg font-bold">{formatDollars(item.value)}</p>
          {item.growth !== null && (
            <p className={`text-sm ${item.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercent(item.growth)} YoY
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const chartContent = (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="text-xs text-slate-500 mb-1">5-Year Total</div>
          <div className="text-xl font-bold text-white">{formatDollars(data.summary.total5Year)}</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="text-xs text-slate-500 mb-1">Annual Avg</div>
          <div className="text-xl font-bold text-white">{formatDollars(data.summary.annualAverage)}</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="text-xs text-slate-500 mb-1">Peak Year</div>
          <div className="text-xl font-bold text-green-400">
            FY{data.summary.peakYear.year}
          </div>
          <div className="text-xs text-slate-400">{formatDollars(data.summary.peakYear.value)}</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="text-xs text-slate-500 mb-1">YoY Growth</div>
          <div className={`text-xl font-bold ${
            data.summary.yoyGrowth === null ? 'text-slate-500' :
            data.summary.yoyGrowth >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {formatPercent(data.summary.yoyGrowth)}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => formatDollars(value)}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Growth (&gt;5%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500" />
          <span>Flat (±5%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>Decline (&lt;-5%)</span>
        </div>
      </div>

      {/* Data Source */}
      <div className="text-center text-xs text-slate-500">
        Source: USASpending.gov | Updated quarterly
      </div>
    </div>
  );

  if (isGated) {
    return (
      <div className="relative">
        {/* Blurred preview */}
        <div className="blur-[6px] pointer-events-none select-none">
          {chartContent}
        </div>

        {/* Gate overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Unlock Funding History
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              See 5-year contract trends, agency breakdown, and growth metrics
            </p>
            <a
              href="https://mi.govcongiants.com/market-intelligence"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
            >
              Get MI Core — $149/mo
            </a>
          </div>
        </div>
      </div>
    );
  }

  return chartContent;
}
