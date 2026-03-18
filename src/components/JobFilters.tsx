'use client';

import { useState } from 'react';
import type { JobCategory } from '@/types/job';
import { getDisplayCategories } from '@/lib/job-categories';

interface JobFiltersProps {
  selectedCategory: JobCategory | null;
  onCategoryChange: (category: JobCategory | null) => void;
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  salaryMin: number | null;
  onSalaryMinChange: (salary: number | null) => void;
  salaryMax: number | null;
  onSalaryMaxChange: (salary: number | null) => void;
  clearance: string;
  onClearanceChange: (clearance: string) => void;
  remote: boolean;
  onRemoteChange: (remote: boolean) => void;
  onSearch: () => void;
  hideCategories?: boolean;
}

const SALARY_OPTIONS = [
  { label: 'Any', value: null },
  { label: '$80K+', value: 80000 },
  { label: '$100K+', value: 100000 },
  { label: '$120K+', value: 120000 },
  { label: '$150K+', value: 150000 },
  { label: '$200K+', value: 200000 },
];

const CLEARANCE_OPTIONS = [
  { label: 'Any Clearance', value: '' },
  { label: 'No Clearance Required', value: 'none' },
  { label: 'Secret', value: 'secret' },
  { label: 'Top Secret', value: 'top secret' },
  { label: 'TS/SCI', value: 'ts/sci' },
];

export default function JobFilters({
  selectedCategory,
  onCategoryChange,
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  salaryMin,
  onSalaryMinChange,
  salaryMax,
  onSalaryMaxChange,
  clearance,
  onClearanceChange,
  remote,
  onRemoteChange,
  onSearch,
  hideCategories = false,
}: JobFiltersProps) {
  const categories = getDisplayCategories();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 5);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  // Count active filters (excluding keyword/location which are primary)
  const activeFilterCount = [
    salaryMin !== null,
    salaryMax !== null,
    clearance !== '',
    remote,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search inputs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="keyword" className="sr-only">Keyword</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              id="keyword"
              placeholder="Job title, keywords..."
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 sm:max-w-xs">
          <label htmlFor="location" className="sr-only">Location</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              id="location"
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={onSearch}
          className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
        >
          Search
        </button>
      </div>

      {/* Advanced filters toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Advanced Filters
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Remote toggle - always visible */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={remote}
            onChange={(e) => onRemoteChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600 relative" />
          <span className="text-sm text-slate-300">Remote Only</span>
        </label>
      </div>

      {/* Advanced filters panel */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          {/* Salary minimum */}
          <div>
            <label htmlFor="salaryMin" className="block text-sm font-medium text-slate-400 mb-1">
              Minimum Salary
            </label>
            <select
              id="salaryMin"
              value={salaryMin ?? ''}
              onChange={(e) => onSalaryMinChange(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {SALARY_OPTIONS.map((opt) => (
                <option key={opt.label} value={opt.value ?? ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Security Clearance */}
          <div>
            <label htmlFor="clearance" className="block text-sm font-medium text-slate-400 mb-1">
              Security Clearance
            </label>
            <select
              id="clearance"
              value={clearance}
              onChange={(e) => onClearanceChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {CLEARANCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                onSalaryMinChange(null);
                onSalaryMaxChange(null);
                onClearanceChange('');
                onRemoteChange(false);
              }}
              className="w-full px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Category filters - hidden on category landing pages */}
      {!hideCategories && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-green-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Roles
          </button>

          {displayedCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.shortName}
            </button>
          ))}

          {!showAllCategories && categories.length > 5 && (
            <button
              onClick={() => setShowAllCategories(true)}
              className="px-4 py-2 text-green-400 text-sm font-medium hover:text-green-300 transition-colors"
            >
              +{categories.length - 5} more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
