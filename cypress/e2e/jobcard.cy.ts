describe('JobCard Component', () => {
  const job = {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Corp',
    about: { location: 'Remote' },
    description: 'A great opportunity to work on exciting projects.',
    image: 'https://via.placeholder.com/150',
    isBookmarked: false,
  };

  beforeEach(() => {
    // Visit the page that contains the JobCard component
    cy.visit('/'); // Adjust the path if necessary
  });

  it('should display job details', () => {
    // Render the JobCard component with the job data
    cy.intercept('GET', '/api/jobs', [job]).as('getJobs'); // Adapt based on your API setup
    cy.wait('@getJobs');

    // Check if job details are displayed
    cy.contains(job.title).should('be.visible');
    cy.contains(job.company).should('be.visible');
    cy.contains(job.description.substring(0, 100)).should('be.visible');
  });

  it('should bookmark a job when authenticated', () => {
    // Simulate authentication
    cy.login(); 

    // Render the JobCard
    cy.intercept('GET', '/api/jobs', [job]).as('getJobs');
    cy.wait('@getJobs');

    // Click the bookmark button
    cy.get('button').contains('Bookmark').click();

    // Verify the button text changes to 'Unbookmark'
    cy.get('button').contains('Unbookmark').should('be.visible');
  });

  it('should show alert and redirect when not authenticated', () => {
    // Render the JobCard
    cy.intercept('GET', '/api/jobs', [job]).as('getJobs');
    cy.wait('@getJobs');

    // Mock the alert
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });

    // Click the bookmark button
    cy.get('button').contains('Bookmark').click();

    // Check that the alert is displayed
    cy.get('@alert').should('have.been.calledWith', 'You need to log in to bookmark!');

    // Verify redirection to the login page
    cy.url().should('include', '/login');
  });

  it('should show error message on bookmark failure', () => {
    // Simulate authentication
    cy.login(); // Use your custom login command

    // Render the JobCard
    cy.intercept('GET', '/api/jobs', [job]).as('getJobs');
    cy.wait('@getJobs');

    // Mock the API call to throw an error
    cy.intercept('POST', '/api/bookmark', { statusCode: 500, body: { error: 'Server error' } }).as('toggleBookmark');

    // Click the bookmark button
    cy.get('button').contains('Bookmark').click();

    // Wait for the error response
    cy.wait('@toggleBookmark');

    // Check that the error message is displayed
    cy.contains('Failed to update bookmark: Server error. Check your internet connection.').should('be.visible');
  });
});