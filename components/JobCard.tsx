import React, { useState, useEffect } from 'react';
import jobApi from '../lib/api';
import { Job } from '../lib/types';
import { useRouter } from 'next/navigation';

interface JobCardProps {
  job: Job;
  onBookmarkToggle: (jobId: number, isBookmarked: boolean) => void;
  isAuthenticated: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onBookmarkToggle, isAuthenticated }) => {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    jobApi.initializeToken();
  }, []);

  const handleBookmarkToggle = async () => {
    console.log('Bookmark clicked for job:', job.id, 'Authenticated:', isAuthenticated);
    if (!isAuthenticated) {
      alert('You need to log in to bookmark!');
      router.push('/login');
      return;
    }

    setError(null);
    setIsLoading(true);
    console.log('Attempting to toggle bookmark for job:', job.id);

    try {
      const newBookmarkState = await jobApi.toggleBookmarkMock(job.id, isBookmarked);
      setIsBookmarked(newBookmarkState);
      onBookmarkToggle(job.id, newBookmarkState);
      console.log('State updated successfully, new bookmark state:', newBookmarkState);
    } catch (err: unknown) {
      console.log('Caught error in handleBookmarkToggle:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Processed error message:', errorMessage);
      setError(`Failed to update bookmark: ${errorMessage}. Check your internet connection.`);
    } finally {
      setIsLoading(false);
      console.log('Loading state reset');
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <img src={job.image} alt={`${job.company} avatar`} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company} - {job.about.location}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{job.description.substring(0, 100)}...</p>
      <div className="mt-4 flex justify-between items-center">
        <button
          className={`btn ${isBookmarked ? 'btn-secondary' : 'btn-primary'} ${isLoading ? 'opacity-50' : ''}`}
          onClick={handleBookmarkToggle}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : isBookmarked ? 'Unbookmark' : 'Bookmark'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default JobCard;