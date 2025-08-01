import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:3000', // Your development server URL
    // Use webpack preprocessor if needed
    setupNodeEvents(on, config) {
      const webpackPreprocessor = require('@cypress/webpack-preprocessor');
      on('file:preprocessor', webpackPreprocessor());
    },
  },
});