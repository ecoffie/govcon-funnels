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
  onSearch: () => void;
}

export default function JobFilters({
  selectedCategory,
  onCategoryChange,
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  onSearch,
}: JobFiltersProps) {
  const categories = getDisplayCategories();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 5);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Search inputs */}
      <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Category filters */}
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
    </div>
  );
}
