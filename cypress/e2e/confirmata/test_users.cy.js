describe('Manage Users', () => {
  const email = 'ionic-underwriter@yopmail.com';
  const password = 'passwordForAcelera';
  const frontendUrl = 'https://qa.confirmata.dev';

  function creationUser(userType, mail) {
    cy.get('[data-testid="AddIcon"]').click();
    cy.get('[name="firstName"]').type('Aaniel');
    cy.get('[name="lastName"]').type('Cypress');
    cy.get('[name="email"]').clear().type(mail);
    cy.get('[name="phoneNumber"]').type('3204562525');
    cy.get('[name="password"]').clear().type('Prueba123');
    cy.get('[name="repeatPassword"]').type('Prueba123');
    cy.get('[id="mui-component-select-type"]').click();
    cy.get('[data-value="' + userType + '"]').click();
    cy.get('[type="submit"]').click();
    cy.get('table', { timeout: 8000 }).should('be.visible');
  }

  before(() => {
    cy.viewport(1920, 1080);
    cy.visit(`${frontendUrl}/login`);
    cy.login_confirmata(email, password);
  });

  it('Add and edit users', () => {
    cy.url().should('eq', `${frontendUrl}/dashboard`);
    cy.get('a[href="/management/configuration"]').click();
    cy.url().should('eq', `${frontendUrl}/management/configuration`);
    cy.get('h5').should('contain.text', 'Configuration');
    cy.get('a[href="/management/users"]').click();
    cy.get('h5').should('contain.text', 'Users');
    cy.get('.css-ekan51 > p').should('not.exist');
    cy.get('table', { timeout: 8000 }).should('be.visible');

    cy.get('h5').should('contain.text', 'Users');
    creationUser('ApprovalCommitteeUser', 'approvalcommitte@yopmail.com');

    cy.get('h5').should('contain.text', 'Users');
    creationUser('Borrower', 'borrower@yopmail.com');

    cy.get('h5').should('contain.text', 'Users');
    cy.get('[data-testid="AddIcon"]').click();
    cy.get('[name="firstName"]').type('Aaniel');
    cy.get('[name="lastName"]').type('Cypress');
    cy.get('[name="email"]').clear().type('lead@yopmail.com');
    cy.get('[name="phoneNumber"]').type('3204562525');
    cy.get('[name="password"]').clear().type('Prueba123');
    cy.get('[name="repeatPassword"]').type('Prueba123');
    cy.get('[id="mui-component-select-type"]').click();
    cy.get('[data-value="LeadSourceUser"]').click();
    cy.get('[id="mui-component-select-leadSourceId"]').click();
    cy.get('[data-value="2"]').click();
    cy.get('[type="submit"]').click();
    cy.get('table', { timeout: 8000 }).should('be.visible');

    cy.get('h5').should('contain.text', 'Users');
    creationUser('Underwriter', 'underwriter@yopmail.com');

    cy.get('h5').should('contain.text', 'Users');
    cy.get('[data-testid="EditIcon"]').first().click();
    cy.get('[name="firstName"]').type(' edit');
    cy.get('[name="lastName"]').type(' edit');
    cy.get('[type="submit"]').click();
  });
});
