'use client';

import React, { useState, useEffect } from 'react';
import JobList from '../../components/JobList';
import { Job } from '../../lib/types';
import jobs from '../../data/jobs';
import { useAuth } from '../../lib/auth';

export default function Bookmarks() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const initializedJobs = jobs.map(job => ({ ...job, isBookmarked: false }));
      const bookmarks = initializedJobs.filter(job => job.isBookmarked === true);
      setBookmarkedJobs(bookmarks);
    }
  }, [isAuthenticated]);

  const handleBookmarkToggle = (jobId: number, isBookmarked: boolean) => {
    if (!isBookmarked) {
      setBookmarkedJobs(bookmarkedJobs.filter(job => job.id !== jobId));
    }
  };

  if (!isAuthenticated) {
    return <p className="text-center text-red-500 pt-16">Please log in to view bookmarks.</p>;
  }

  return (
    <div className="container mx-auto pt-16">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Jobs</h1>
      <JobList
        jobs={bookmarkedJobs}
        onBookmarkToggle={handleBookmarkToggle}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}