const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "Testing",
  video: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Override recording service
      config.client = {
        ...config.client,
        api_url: 'http://localhost:1234'
      }
      
      // Redirect all cypress.io requests to local Sorry Cypress
      config.hosts = {
        '*.cypress.io': 'localhost',
        '*.cypress.com': 'localhost'
      }
      return config
    }
  },
  // Set environment variables
  env: {
    CYPRESS_API_URL: 'http://localhost:4000',
    CYPRESS_DIRECTOR_URL: 'http://localhost:1234',
    CYPRESS_RECORD_KEY: 'test1'
  }
})