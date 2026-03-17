'use client';

import { useState, useCallback } from 'react';
import type { Job, JobCategory } from '@/types/job';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';

interface JobListClientProps {
  initialJobs: Job[];
  initialTotal: number;
}

export default function JobListClient({ initialJobs, initialTotal }: JobListClientProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialJobs.length < initialTotal);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const fetchJobs = useCallback(async (resetPage = true) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.set('keyword', keyword);
      if (location) params.set('location', location);
      if (selectedCategory) params.set('category', selectedCategory);

      const newPage = resetPage ? 1 : page + 1;
      params.set('page', newPage.toString());

      const response = await fetch(`/api/jobs?${params.toString()}`);
      const data = await response.json();

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
    } finally {
      setLoading(false);
    }
  }, [keyword, location, selectedCategory, page, jobs.length]);

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

  // Client-side filtering for category (since we have all jobs loaded)
  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.category === selectedCategory)
    : jobs;

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
          onSearch={handleSearch}
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-400">
          Showing <span className="text-white font-medium">{filteredJobs.length}</span> of{' '}
          <span className="text-white font-medium">{total}</span> jobs
        </p>
        <select
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          defaultValue="newest"
        >
          <option value="newest">Newest First</option>
          <option value="salary-high">Highest Salary</option>
          <option value="closing">Closing Soon</option>
        </select>
      </div>

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
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
            <p className="text-slate-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            {filteredJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                featured={index === 0 && page === 1}
              />
            ))}
          </>
        )}
      </div>

      {/* Load more */}
      {hasMore && (
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
