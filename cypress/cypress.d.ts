// cypress/cypress.d.ts

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<Element>; // Extend the Chainable interface to include your custom command
  }
}