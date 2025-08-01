// __tests__/Bookmarks.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Bookmarks from '../app/bookmarks/page';
import { useAuth } from '../lib/auth';

// Mock the useAuth hook
jest.mock('@/lib/auth', () => ({
  useAuth: jest.fn(),
}));

describe('Bookmarks Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('displays a message when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(<Bookmarks />);

    expect(screen.getByText(/Please log in to view bookmarks/i)).toBeInTheDocument();
  });

  it('renders bookmarked jobs when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(<Bookmarks />);

    expect(screen.getByText(/Bookmarked Jobs/i)).toBeInTheDocument();
  });

  it('toggles bookmark correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(<Bookmarks />);
    
   
  });
});