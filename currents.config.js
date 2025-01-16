module.exports = {
    projectId: "Testing",
    recordKey: "01", 
    cloudServiceUrl: "http://localhost:1234",
    // Add these optional fields
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    reporterOptions: {
        reportDir: 'cypress/results'
    }
};