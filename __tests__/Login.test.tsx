import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../app/login/page'; // Adjust the import path as necessary
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/navigation';

jest.mock('@/lib/auth'); // Mock the useAuth hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe('Login', () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
    });
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    render(<Login />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('calls login and redirects on form submission', () => {
    const { push } = mockUseRouter.mock.results[0].value;

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(loginMock).toHaveBeenCalledWith('dummy-token'); // Check if login was called
    expect(push).toHaveBeenCalledWith('/'); // Check if redirect occurred
  });
});