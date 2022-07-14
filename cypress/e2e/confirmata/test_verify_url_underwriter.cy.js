describe('Verification urls confirmata underwriter', () => {
  const frontendUrl = 'https://qa.confirmata.dev';
  const email = 'ionic-underwriter@yopmail.com';
  const password = 'passwordForAcelera';

  before(() => {
    cy.viewport(1920, 1080);
    cy.visit(`${frontendUrl}/login`);
    cy.login_confirmata(email, password);
  });

  it('Validation url dashboard', () => {
    cy.url().should('eq', `${frontendUrl}/dashboard`);
    cy.get('header').contains('Leads').click();

    //Leads
    cy.url().should('eq', `${frontendUrl}/management/lead`);
    cy.get('svg[data-testid="SettingsIcon"]').click();
    cy.url().should('eq', `${frontendUrl}/management/configuration`);

    //Configuration questions
    cy.get('a[href="/configuration/questions"]').click();
    cy.url().should('eq', `${frontendUrl}/configuration/questions`);
    cy.get('h2').contains('Questions');
    cy.get('svg[data-testid="SettingsIcon"]').click();

    //Configuration lead source
    cy.url().should('eq', `${frontendUrl}/management/configuration`);
    cy.get('a[href="/management/leadSources"]').click();
    cy.url().should('eq', `${frontendUrl}/management/leadSources`);
    cy.get('h5').contains('Lead Source');
    cy.get('svg[data-testid="SettingsIcon"]').click();

    //Configuration Users
    cy.get('a[href="/management/users"]').click();
    cy.get('h5').should('contain.text', 'Users');
    cy.get('.css-ekan51 > p').should('not.exist');
    cy.get('table', { timeout: 8000 }).should('be.visible');
    cy.get('header').contains('Dashboard').click();
    cy.url().should('eq', `${frontendUrl}/dashboard`);
  });

  it('Validation urls sidebar', () => {
    cy.viewport(1920, 1080);
    cy.url().should('eq', `${frontendUrl}/dashboard`);
    cy.wait(2000);

    //Select loan applications id
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
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/overview`);
        cy.get(`[href="/loanApplications/${ID}/overview"]`).should('contain.text', 'Overview');
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks`);
        cy.get('h2').should('contain.text', 'Tasks');

        //Pre-approval stage//
        cy.get('button').contains('Lead Signup').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/pre_approval`);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();

        //Intake stage//
        //About the Owner
        cy.get('button').contains('Initial Questions').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/owner_experience`);
        cy.wait(1000);
        cy.get('button').contains('Intro').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/owner_intro`);
        cy.wait(1000);
        cy.get('button').contains('Participants').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/participants`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();
        //About the Entity
        cy.get('button').contains('Plaid Connect').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/plaid_connect`);
        cy.wait(1000);
        cy.get('button').contains('File Uploads').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/intake_files`);
        cy.wait(1000);
        cy.get('button').contains('Entity Info').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/entity_info`);
        cy.wait(1000);
        cy.get('button').contains('Business Info').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/business`);
        cy.wait(1000);
        cy.get('button').contains('Loads Info').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/loads_info`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();
        //About the Truck
        cy.get('button').contains('Truck Info').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/truck_info`);
        cy.wait(1000);
        cy.get('button').contains('Truck Collateral').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/truck_collateral`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();

        //Underwriting Stage//
        //About the Truck
        cy.get('button').contains('CalCAP Info').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/fill_collateral_info`);
        cy.wait(1000);
        cy.get('button').contains('Truck Financials').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/fill_operating_expenses`);
        cy.wait(1000);
        cy.get('button').contains('Driver Info').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/driver_info`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();
        //Underwriter
        cy.get('button').contains('Acelera Score').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/risk_rating_model_instances`);
        cy.wait(1000);
        cy.get('button').contains('Plaid Data Review').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/plaid_connect_review`);
        cy.wait(1000);
        cy.get('button').contains('File Uploads').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/underwriting_files`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();
        //Credit Memo
        cy.get('button').contains('Verifications').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/review_business_entity_information`);
        cy.wait(1000);
        cy.get('button').contains('VerificationZZZ').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/underwriting_verifications`);
        cy.wait(1000);
        cy.get('button').contains('Credit Memo Info').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/fill_finance`);
        cy.wait(1000);
        cy.get('[role="tablist"] > button').last().contains('Credit Memo').click();
        //cy.get('button').contains('Credit Memo').last().click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/credit_memo`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();

        //Approval Stage//
        cy.get('button').contains('Internal Review Committee').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/internal_approval`);
        cy.wait(1000);
        cy.get('button').contains('External Review Committee').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/sbdc_approval`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();

        //Closing Stage//
        //Loan closing
        cy.get('button').contains('Requests').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/requests`);
        cy.wait(1000);
        cy.get('button').contains('Closing Checklist').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/closing_checklist`);
        cy.wait(1000);
        cy.get('button').contains('Verificationzzz').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/closing_verifications`);
        cy.wait(1000);
        cy.get('button').contains('File Uploads').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/closing_file_uploads`);
        cy.wait(1000);
        cy.get('button').contains('Loan Docs').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/loan_docs`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();

        //Disbursement Stage//
        cy.get('button').contains('Request Disbursement').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/disbursement`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();

        //Funded Stage//
        cy.get('button').contains('Funded').click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/funded`);
        cy.wait(1000);
        cy.get(`[href="/loanApplications/${ID}/tasks"]`).click();
        //Closed validation task//

        //Participants
        cy.get(`[href="/loanApplications/${ID}/tasks/participants"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/participants`);
        cy.get('h5').should('contain.text', 'About the Owner');

        //Questions
        cy.get(`[href="/loanApplications/${ID}/questions"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/questions`);

        //Acelera Score
        cy.get(`[href="/loanApplications/${ID}/tasks/risk_rating_model_instances"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/risk_rating_model_instances`);
        cy.get('h5').should('contain.text', 'Underwriter');

        //Credit Memo
        cy.get(`[href="/loanApplications/${ID}/tasks/credit_memo"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/credit_memo`);
        cy.get('h5').should('contain.text', 'Credit Memo');

        //Plaid
        cy.get(`[href="/loanApplications/${ID}/tasks/plaid_connect"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/plaid_connect`);
        cy.get('h5').should('contain.text', 'About the Entity');

        //Plaid review
        cy.get(`[href="/loanApplications/${ID}/tasks/plaid_connect_review"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/plaid_connect_review`);
        cy.get('h5').should('contain.text', 'Underwriter');

        //Loan Docs
        cy.get(`[href="/loanApplications/${ID}/tasks/loan_docs"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/loan_docs`);
        cy.get('h5').should('contain.text', 'Loan Closing');

        //Activity Logs
        cy.get(`[href="/loanApplications/${ID}/activityLogs"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/activityLogs`);

        //Decline loan application
        cy.get(`[href="/loanApplications/${ID}/declineLoanApplication"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/declineLoanApplication`);
        cy.get('h5').should('contain.text', 'Decline Loan Application');

        //Support Chat
        cy.get(`[href="/loanApplications/${ID}/chat"]`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/chat`);
        cy.get('h5').should('contain.text', 'Chat');
      }); //close $autoID
  });
});
