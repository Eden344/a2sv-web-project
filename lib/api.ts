import axios from 'axios';

// Base URL for the API
const BASE_URL = 'https://akil-backend.onrender.com';

// Interface for API response (can be adjusted based on actual response)
interface ApiResponse {
  success: boolean;
  message?: string;
}

// API service class
class JobApiService {
  private token: string | null = null; // Initialize as null on server

  // Method to initialize or update token (client-side)
  public initializeToken() {
    if (typeof window !== 'undefined') { // Check if running on client
      this.token = localStorage.getItem('token');
    }
  }

  public setToken(token: string) {
    if (typeof window !== 'undefined') {
      this.token = token;
      localStorage.setItem('token', token);
    }
  }

  // Toggle bookmark (bookmark or unbookmark)
  public async toggleBookmark(jobId: number, isBookmarked: boolean): Promise<boolean> {
    if (!this.token) {
      throw new Error('No authentication token available.');
    }
    const url = `${BASE_URL}/bookmarks/${jobId}`;
    const config = {
      headers: { Authorization: `Bearer ${this.token}` },
    };

    try {
      if (isBookmarked) {
        await axios.delete(url, config);
        console.log('Unbookmarked job:', jobId);
      } else {
        await axios.post(url, {}, config);
        console.log('Bookmarked job:', jobId);
      }
      return !isBookmarked;
    } catch (err) {
      console.error('API Error:', err);
      throw new Error('Failed to update bookmark. Check your internet connection.');
    }
  }

  // Mock mode for offline testing
  public async toggleBookmarkMock(jobId: number, isBookmarked: boolean): Promise<boolean> {
    console.log('Mocking bookmark toggle for job:', jobId);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return !isBookmarked;
  }
}

// Export a singleton instance
const jobApi = new JobApiService();
export default jobApi;