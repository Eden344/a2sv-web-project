describe('Login Page', () => {
  beforeEach(() => {
    
    cy.visit('/login'); 
  });

  it('should allow a user to log in', () => {
    // Enter username and password
    cy.get('input[type="text"]').type('testuser');
    cy.get('input[type="password"]').type('password123');

    // Submit the form
    cy.get('form').submit();

    // Check if redirected to the home page
    cy.url().should('include', '/'); // Adjust the URL as needed
  });

  it('should display validation messages for empty fields', () => {
    // Submit the form without filling it
    cy.get('form').submit();

    // Check if validation messages are shown (if you have any)
    cy.get('input[type="text"]').should('have.class', 'is-invalid'); // Adjust based on your validation logic
    cy.get('input[type="password"]').should('have.class', 'is-invalid'); // Adjust based on your validation logic
  });
});