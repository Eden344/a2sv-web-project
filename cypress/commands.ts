// cypress/commands.ts

Cypress.Commands.add('login', () => {
  // Visit your login page
  cy.visit('/login');

  // Simulate filling in the login form
  cy.get('input[type="text"]').type('testuser'); // Replace with your test username
  cy.get('input[type="password"]').type('password123'); // Replace with your test password

  // Submit the form
  cy.get('form').submit();

  // Optionally, check if the login was successful
  cy.url().should('include', '/'); // Adjust based on your app's behavior
});