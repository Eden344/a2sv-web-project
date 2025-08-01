import React from 'react';
import JobCard from './JobCard';
import { Job } from '@/lib/types';

interface JobListProps {
  jobs: Job[];
  onBookmarkToggle: (jobId: number, isBookmarked: boolean) => void;
  isAuthenticated: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, onBookmarkToggle, isAuthenticated }) => {
  return (
    <div className="grid gap-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onBookmarkToggle={onBookmarkToggle}
            isAuthenticated={isAuthenticated}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;