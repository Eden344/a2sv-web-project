import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobCard from '../components/JobCard'; // Adjust the import path as necessary
import jobApi from '../lib/api';
import { Job } from '../lib/types';
import { useRouter } from 'next/navigation';

jest.mock('@/lib/api'); // Mock the jobApi module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe('JobCard', () => {
  const mockJob: Job = {
    id: 1,
    title: 'Software Engineer',
    description: 'This is a job description for a Software Engineer position.',
    responsibilities: ['Develop software', 'Collaborate with team'],
    ideal_candidate: {
      age: '25-35',
      gender: 'Any',
      traits: ['Team player', 'Problem solver'],
    },
    when_where: 'Remote',
    about: {
      posted_on: '2023-01-01',
      deadline: '2023-02-01',
      location: 'Remote',
      start_date: '2023-03-01',
      end_date: '2023-06-01',
      categories: ['Engineering', 'Remote'],
      required_skills: ['JavaScript', 'React'],
    },
    company: 'Tech Co',
    image: 'https://via.placeholder.com/150',
    isBookmarked: false,
  };

  const onBookmarkToggle = jest.fn();
  const setUpComponent = (isAuthenticated: boolean) => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });

    render(
      <JobCard job={mockJob} onBookmarkToggle={onBookmarkToggle} isAuthenticated={isAuthenticated} />
    );
  };

  it('renders the job card with job details', () => {
    setUpComponent(true);

    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company)).toBeInTheDocument();
    expect(screen.getByText(mockJob.description.substring(0, 100))).toBeInTheDocument();
  });

  it('toggles bookmark state when button is clicked', async () => {
    (jobApi.toggleBookmarkMock as jest.Mock).mockResolvedValueOnce(true); // Mock successful bookmark toggle

    setUpComponent(true);

    const button = screen.getByRole('button', { name: /bookmark/i });
    fireEvent.click(button);

    expect(button).toHaveTextContent('Loading...');
    await waitFor(() => expect(onBookmarkToggle).toHaveBeenCalledWith(mockJob.id, true));
    expect(button).toHaveTextContent('Unbookmark');
  });

  it('shows an alert and navigates to login when not authenticated', () => {
    setUpComponent(false);

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const button = screen.getByRole('button', { name: /bookmark/i });
    fireEvent.click(button);

    expect(alertSpy).toHaveBeenCalledWith('You need to log in to bookmark!');
    expect(mockUseRouter().push).toHaveBeenCalledWith('/login');

    alertSpy.mockRestore();
  });

  it('displays an error message when bookmark toggle fails', async () => {
    (jobApi.toggleBookmarkMock as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    setUpComponent(true);

    const button = screen.getByRole('button', { name: /bookmark/i });
    fireEvent.click(button);

    expect(await screen.findByText(/failed to update bookmark/i)).toBeInTheDocument();
  });
});