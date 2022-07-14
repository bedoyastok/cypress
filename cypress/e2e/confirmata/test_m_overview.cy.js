describe('Overview module', () => {
  const frontendUrl = 'https://qa.confirmata.dev';
  const email = 'ionic-underwriter@yopmail.com';
  const password = 'passwordForAcelera';
  const existingCode = 'LA76';
  const newCode = 'AFEQ22001';

  before(() => {
    cy.viewport(1920, 1080);
    cy.visit(`${frontendUrl}/login`);
    cy.login_confirmata(email, password);
  });

  it('Validations', function () {
    cy.url().should('eq', `${frontendUrl}/dashboard`);

    //Loan Applications
    cy.get('header').contains('Loan Applications').click();
    cy.url().should('eq', `${frontendUrl}/loanApplications`);
    cy.get('.css-ekan51 > p').should('not.exist');
    cy.get('table', { timeout: 8000 }).should('be.visible');
    cy.get('td')
      .first()
      .then(($autoID) => {
        const ID = $autoID.text();
        cy.get('table > tbody > tr > td > div > span').first().click();

        //Overview
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/overview`);
        cy.get(`[href="/loanApplications/${ID}/overview"]`).should('contain.text', 'Overview');
      }); //close $autoID

    //Re-assign existing code
    cy.get('button[type="button"]').contains('Options').click();
    cy.get('input[name="code"]').clear().type(existingCode);
    cy.get('button[type="submit"]').click();
    cy.get('.app_error__FOoqu').should('contain.text', 'code has already been taken');
    cy.get('.SnackbarContent-root').should('contain.text', 'Error updating data!');

    //Re-assign new code
    cy.get('input[name="code"]').clear().type(newCode);
    cy.get('button[type="submit"]').click();
    cy.get('h2').should('contain.text', 'Data update sucessfully!');
    cy.get('button[type="button"]').contains('Close').click();
  });
});
