Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://demo.driveezpro.ca/')
    cy.get('.login > .auth-form > .app-form > :nth-child(1) > .row > .col-md-12 > .form-control').type(email)
    cy.get('.login > .auth-form > .app-form > :nth-child(2) > .row > .col-md-12').type(password)
    cy.get(':nth-child(3) > .row > .col-md-12 > .btn').click()
    cy.url().should('not.include', 'signin')
  })
  
  Cypress.Commands.add('createBranch', (branchDetails) => {
    cy.get('.page-header > :nth-child(1) > .btn-primary').click()
    cy.get('#create').should('be.visible')
    
    // Fill form fields
    cy.get('input[name="name"]').clear().type(branchDetails.name)
    cy.get('input[name="email"]').clear().type(branchDetails.email)
    cy.get('input[name="phone"]').clear().type(branchDetails.phone)
    cy.get('input[name="address"]').clear().type(branchDetails.address)
    cy.get('input[name="map_location"]').clear().type(branchDetails.mapLocation)
    cy.get('input[name="tax_number"]').clear().type(branchDetails.taxNumber)
    
    // Handle Select2 dropdown
    cy.window().then((win) => {
      win.$('select[name="status"]').select2().val(branchDetails.status).trigger('change')
    })
    
    cy.get('button[type="submit"]').click()
    cy.get('.sweet-alert.visible .confirm').click()
  })