const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: "Testing",
    video: true,
    // Sorry Cypress specific configuration
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json'
    },
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
  },
  // Move these configurations outside of e2e
  api: {
    // Director service URL
    url: 'http://localhost:1234'  // This should match your Sorry Cypress director service port
  },
  client: {
    cloudUrl: 'http://localhost:8080'  // This should be your Sorry Cypress dashboard URL
  }
})