describe('Overview module', () => {
  const frontendUrl = 'https://qa.confirmata.dev';
  const email = 'ionic-underwriter@yopmail.com';
  const password = 'passwordForAcelera';
  const existingCode = 'LA76';
  const newCode = 'AFEQ22001';

  before(function () {
    cy.viewport(1920, 1080);
    cy.visit(`${frontendUrl}/login`);
    cy.login_confirmata(email, password);
  });

  it('Validations', function () {
    cy.url().should('eq', `${frontendUrl}/dashboard`);

    //Select loan applications id
    cy.log('Select loan Applications');
    cy.get('header').contains('Loan Applications').click();
    cy.url().should('eq', `${frontendUrl}/loanApplications`);
    cy.get('.css-ekan51 > p').should('not.exist');
    cy.get('table', { timeout: 8000 }).should('be.visible');
    cy.get('td')
      .first()
      .then(($autoID) => {
        const ID = $autoID.text();
        cy.get('table > tbody > tr > td > div > span').first().click();

        //Validation overview
        cy.log('Validation overview');
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/overview`);
        cy.get(`[href="/loanApplications/${ID}/overview"]`).should('contain.text', 'Overview');

        //Tasks
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks`);
        cy.get('strong').should('contain.text', 'Tasks');
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).should('contain.text', 'Tasks');

        //Validation titles
        cy.get('h2').should('contain.text', 'Pre-Approval Stage');
        cy.get('h2').should('contain.text', 'Intake Stage');
        cy.get('h2').should('contain.text', 'Underwriting Stage');
        cy.get('h2').should('contain.text', 'Approval Stage');
        cy.get('h2').should('contain.text', 'Closing Stage');
        cy.get('h2').should('contain.text', 'Disbursement Stage');
        cy.get('h2').should('contain.text', 'Funded Stage');
      }); //close $autoID
  });
});
