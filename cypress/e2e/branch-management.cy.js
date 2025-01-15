describe('Branch Management', () => {
  beforeEach(() => {
    cy.fixture('test-data.json').as('testData')
  })

  before(() => {
    // Login once before all tests
    cy.fixture('test-data.json').then((testData) => {
      const { email, password } = testData.login
      cy.login(email, password)
      cy.visit('/branches/')
      cy.url().should('include', 'branches')
    })
  })

  it('should create active branch and inactive branch', function() {
    // Navigate to branch page and click create button
    cy.get('.page-header > :nth-child(1) > .btn-primary').click()

    // Fill in the form with active branch data
    cy.get('@testData').then((testData) => {
      const { name, email, phone, address, mapLocation, taxNumber, status } = testData.activeBranch
      
      cy.get('#create > .modal-dialog > .modal-content > .modal-body > .app-form > :nth-child(2) > .row > .col-md-12 > .form-control')
        .type(name)
      
      cy.get(':nth-child(3) > .row > .col-md-12 > .form-control')
        .type(email)
      
      cy.get(':nth-child(4) > .row > .col-md-12 > .form-control')
        .type(phone)
      
      cy.get(':nth-child(5) > .row > .col-md-12 > .form-control')
        .type(address)
      
      cy.get(':nth-child(6) > .row > .col-md-12 > .form-control')
        .type(mapLocation)
      
      cy.get(':nth-child(7) > .row > .col-md-12 > .form-control')
        .type(taxNumber)
      
      // Select status using select2
      cy.get('#create select[name="status"]')
        .select(status, { force: true })

      // Submit the form
      cy.get(':nth-child(9) > .row > .col-md-12 > .btn').click()
    })

    // Refresh the page after creating first branch
    cy.reload()
    // Wait for the page to be fully loaded
    cy.get('.page-header').should('be.visible')

    cy.get('.page-header > :nth-child(1) > .btn-primary').click()

    // Fill in the form with inactive branch data
    cy.get('@testData').then((testData) => {
      const { name, email, phone, address, mapLocation, taxNumber, status } = testData.inactiveBranch
      
      cy.get('#create > .modal-dialog > .modal-content > .modal-body > .app-form > :nth-child(2) > .row > .col-md-12 > .form-control')
        .type(name)
      
      cy.get(':nth-child(3) > .row > .col-md-12 > .form-control')
        .type(email)
      
      cy.get(':nth-child(4) > .row > .col-md-12 > .form-control')
        .type(phone)
      
      cy.get(':nth-child(5) > .row > .col-md-12 > .form-control')
        .type(address)
      
      cy.get(':nth-child(6) > .row > .col-md-12 > .form-control')
        .type(mapLocation)
      
      cy.get(':nth-child(7) > .row > .col-md-12 > .form-control')
        .type(taxNumber)
      
      // Select status using select2
      cy.get('#create select[name="status"]')
        .select(status, { force: true })

      // Submit the form
      cy.get(':nth-child(9) > .row > .col-md-12 > .btn').click()
    
  })
  cy.reload()
    // Wait for the page to be fully loaded
  cy.get('.page-header').should('be.visible')
  })
  it('should edit branch name from downtown to new town', function() {
    // Wait for table to be visible and loaded
    cy.get('table').should('be.visible')
    
    // Get the branch name from test data to ensure consistency
    cy.get('@testData').then((testData) => {
      const oldName = testData.activeBranch.name // assuming 'downtown' is in activeBranch
      const newName = 'new town'

      // Wait for rows to be present and find the one with our branch name
      cy.get('table tbody tr').should('have.length.at.least', 1)
      cy.contains('tr', oldName, { timeout: 10000 })
        .should('be.visible')
        .within(() => {
          cy.get('.btn-primary').first().click()
        })

      // Wait for modal to be visible before interacting
      cy.get('.modal-dialog').should('be.visible')

      // Use more specific selector based on your form structure
      cy.get('#create > .modal-dialog > .modal-content > .modal-body > .app-form > :nth-child(2) > .row > .col-md-12 > .form-control')
        .clear()
        .type(newName)

      // Submit the form
      cy.get(':nth-child(9) > .row > .col-md-12 > .btn').click()

      // Verify the change
      cy.get('table tbody').should('be.visible')
      cy.contains('tr', newName).should('exist')
      cy.contains('tr', oldName).should('not.exist')
    })
  })
})