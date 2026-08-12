'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Job, JobCategory } from '@/types/job';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';

interface JobListClientProps {
  initialJobs: Job[];
  initialTotal: number;
  fixedCategory?: JobCategory; // For category landing pages
}

// Saved jobs helper functions
function getSavedJobs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveJob(jobId: string) {
  const saved = getSavedJobs();
  if (!saved.includes(jobId)) {
    saved.push(jobId);
    localStorage.setItem('savedJobs', JSON.stringify(saved));
  }
}

function unsaveJob(jobId: string) {
  const saved = getSavedJobs().filter(id => id !== jobId);
  localStorage.setItem('savedJobs', JSON.stringify(saved));
}

function isJobSaved(jobId: string): boolean {
  return getSavedJobs().includes(jobId);
}

export default function JobListClient({ initialJobs, initialTotal, fixedCategory }: JobListClientProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialJobs.length < initialTotal);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(fixedCategory || null);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState<number | null>(null);
  const [salaryMax, setSalaryMax] = useState<number | null>(null);
  const [clearance, setClearance] = useState('');
  const [remote, setRemote] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState<'newest' | 'salary-high' | 'closing'>('newest');

  // Saved jobs state
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Load saved jobs on mount
  useEffect(() => {
    setSavedJobIds(getSavedJobs());
  }, []);

  const fetchJobs = useCallback(async (resetPage = true) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const params = new URLSearchParams();
      if (keyword) params.set('keyword', keyword);
      if (location) params.set('location', location);

      // Use fixedCategory if set, otherwise use selectedCategory
      const categoryToUse = fixedCategory || selectedCategory;
      if (categoryToUse) params.set('category', categoryToUse);

      // Advanced filters
      if (salaryMin) params.set('salaryMin', salaryMin.toString());
      if (salaryMax) params.set('salaryMax', salaryMax.toString());
      if (clearance) params.set('clearance', clearance);
      if (remote) params.set('remote', 'true');

      const newPage = resetPage ? 1 : page + 1;
      params.set('page', newPage.toString());

      const response = await fetch(`/api/jobs?${params.toString()}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch jobs');
      }

      if (resetPage) {
        setJobs(data.jobs);
        setPage(1);
      } else {
        setJobs((prev) => [...prev, ...data.jobs]);
        setPage(newPage);
      }

      setTotal(data.total);
      setHasMore(data.jobs.length > 0 && (resetPage ? data.jobs.length < data.total : jobs.length + data.jobs.length < data.total));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [keyword, location, selectedCategory, fixedCategory, salaryMin, salaryMax, clearance, remote, page, jobs.length]);

  const handleSearch = () => {
    fetchJobs(true);
  };

  const handleCategoryChange = (category: JobCategory | null) => {
    setSelectedCategory(category);
    // Auto-search when category changes
    setTimeout(() => fetchJobs(true), 0);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchJobs(false);
    }
  };

  const toggleSaveJob = (jobId: string) => {
    if (isJobSaved(jobId)) {
      unsaveJob(jobId);
      setSavedJobIds(prev => prev.filter(id => id !== jobId));
    } else {
      saveJob(jobId);
      setSavedJobIds(prev => [...prev, jobId]);
    }
  };

  // Sort jobs
  const sortedJobs = [...jobs].sort((a, b) => {
    switch (sortBy) {
      case 'salary-high':
        return (b.salary_max || 0) - (a.salary_max || 0);
      case 'closing':
        return new Date(a.close_date).getTime() - new Date(b.close_date).getTime();
      case 'newest':
      default:
        return new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime();
    }
  });

  // Filter by saved if enabled
  const displayedJobs = showSavedOnly
    ? sortedJobs.filter(job => savedJobIds.includes(job.id))
    : sortedJobs;

  return (
    <div>
      {/* Filters */}
      <div className="mb-8">
        <JobFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          keyword={keyword}
          onKeywordChange={setKeyword}
          location={location}
          onLocationChange={setLocation}
          salaryMin={salaryMin}
          onSalaryMinChange={setSalaryMin}
          salaryMax={salaryMax}
          onSalaryMaxChange={setSalaryMax}
          clearance={clearance}
          onClearanceChange={setClearance}
          remote={remote}
          onRemoteChange={setRemote}
          onSearch={handleSearch}
          hideCategories={!!fixedCategory}
        />
      </div>

      {/* Results header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <p className="text-slate-400">
            Showing <span className="text-white font-medium">{displayedJobs.length}</span> of{' '}
            <span className="text-white font-medium">{total}</span> jobs
          </p>

          {/* Saved jobs toggle */}
          {savedJobIds.length > 0 && (
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                showSavedOnly
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill={showSavedOnly ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved ({savedJobIds.length})
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newest' | 'salary-high' | 'closing')}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="newest">Newest First</option>
          <option value="salary-high">Highest Salary</option>
          <option value="closing">Closing Soon</option>
        </select>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-amber-200">
          {errorMessage}
        </div>
      )}

      {/* Job listings */}
      <div className="space-y-4">
        {loading && jobs.length === 0 ? (
          // Loading skeleton
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="h-6 bg-slate-800 rounded w-1/3 mb-4" />
              <div className="h-4 bg-slate-800 rounded w-1/4 mb-4" />
              <div className="flex gap-4">
                <div className="h-4 bg-slate-800 rounded w-24" />
                <div className="h-4 bg-slate-800 rounded w-32" />
                <div className="h-4 bg-slate-800 rounded w-20" />
              </div>
            </div>
          ))
        ) : displayedJobs.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">
              {showSavedOnly ? 'No saved jobs' : 'No jobs found'}
            </h3>
            <p className="text-slate-400">
              {showSavedOnly
                ? 'Save jobs by clicking the bookmark icon on any listing'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <>
            {displayedJobs.map((job, index) => (
              <div key={job.id} className="relative">
                <JobCard
                  job={job}
                  featured={index === 0 && page === 1 && !showSavedOnly}
                />
                {/* Save button overlay */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSaveJob(job.id);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                    savedJobIds.includes(job.id)
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                  title={savedJobIds.includes(job.id) ? 'Remove from saved' : 'Save job'}
                >
                  <svg
                    className="w-5 h-5"
                    fill={savedJobIds.includes(job.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Load more */}
      {hasMore && !showSavedOnly && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More Jobs'}
          </button>
        </div>
      )}
    </div>
  );
}
