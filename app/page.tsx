'use client';

import React, { useState, useEffect } from 'react';
import JobList from '../components/JobList';
import { Job } from '../lib/types';
import jobs from '../data/jobs';
import { useAuth } from '../lib/auth';

export default function Home() {
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setDisplayedJobs(jobs.map(job => ({ ...job, isBookmarked: false })));
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      // Sync initial auth state
    }
  }, []);

  const handleBookmarkToggle = (jobId: number, isBookmarked: boolean) => {
    console.log('Toggling bookmark for job:', jobId, 'to:', isBookmarked);
    setDisplayedJobs(displayedJobs.map(job =>
      job.id === jobId ? { ...job, isBookmarked } : job
    ));
  };

  return (
    <div className="container mx-auto pt-16"> {/* Adjust for navbar height */}
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <JobList
        jobs={displayedJobs}
        onBookmarkToggle={handleBookmarkToggle}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}