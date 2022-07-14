describe('Flow end to end edit answers', () => {
  const email = 'ionic-underwriter@yopmail.com';
  const password = 'passwordForAcelera';
  const frontendUrl = 'https://qa.confirmata.dev';
  const attached = 'cache/production/b11dedc1-8233-4b93-bd05-f731ec291d8f/adjunto.png';
  const iconEdit = '[data-testid="ModeEditOutlineIcon"]';
  const iconCheck = '[data-testid="CheckIcon"]';
  const iconClear = '[data-testid="ClearIcon"]';
  const select = 'data-questionconfigslug';

  function editAnswers(slug, value) {
    cy.get('[' + select + '="' + slug + '"]').find(iconEdit).click();
    cy.get('[' + select + '="' + slug + '"]').type('{selectall}{backspace}' + value + '');
    cy.get('[' + select + '="' + slug + '"]').find(iconCheck).click();
    cy.wait(2500);
    cy.get('[' + select + '="' + slug + '"]').find(iconClear).click();
  }

  before(() => {
    cy.viewport(1920, 1080);
    cy.visit(`${frontendUrl}/login`);
    cy.login_confirmata(email, password);
    cy.wait(3000);
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

        //Questions module
        cy.log('Questions module');
        cy.get(`[href="/loanApplications/${ID}/questions"]`).click();
        cy.get('h5').should('contain.text', 'Loan Applications Questions');
        cy.wait(3000);
        cy.get('.app_questionsHeader__9l_Y9').should('be.visible');
      }); //close $autoID
  });

  it('Loan Closing / File Uploads / File Uploads', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(3) > .MuiButtonBase-root').contains('Loan Closing / File Uploads / File Uploads');

    editAnswers('ach_auth_form', '');
    editAnswers('calcap_file', '');
    editAnswers('finance_agreement_file', '');
    editAnswers('state_guarantee_file', '');
    editAnswers('disbursement_file', '');
    editAnswers('commitment_file', '');
    editAnswers('ucc_file', '');
    editAnswers('certificate_of_insurance_file', '');
    editAnswers('vehicle_title_file', '');
    editAnswers('gps_tracker_file', '');
    editAnswers('personal_garantee_file', '');

    cy.get(':nth-child(3) > .MuiButtonBase-root').contains('Loan Closing / File Uploads / File Uploads');
    cy.wait(2500);
  });

  it('About the Owner / Initial Questions / Experience', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(4) > .MuiButtonBase-root').contains('About the Owner / Initial Questions / Experience').click();

    editAnswers('down_payment_percentage', '5');
    editAnswers('years_of_driving_experience', '5');

    cy.get(':nth-child(4) > .MuiButtonBase-root').contains('About the Owner / Initial Questions / Experience').click();
    cy.wait(2500);
  });

  it('About the Owner / Intro / Intro', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(5) > .MuiButtonBase-root').contains('About the Owner / Intro / Intro').click();

    editAnswers('need_help_registering_business	', 'true');
    editAnswers('total_number_of_owners', '2');
    editAnswers('leaving_current_job_to_become_owner_operator', 'true');
    editAnswers('are_you_structured_in_california', 'true');
    editAnswers('20percent_or_more_yes_or_no', 'true');

    cy.get(':nth-child(5) > .MuiButtonBase-root').contains('About the Owner / Intro / Intro').click();
    cy.wait(2500);
  });

  it('About the Entity / Files uploads / Files', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(6) > .MuiButtonBase-root').contains('About the Entity / Files uploads / Files').click();

    editAnswers('dot_and_mc_permits', attached);

    cy.get(':nth-child(6) > .MuiButtonBase-root').contains('About the Entity / Files uploads / Files').click();
    cy.wait(2500);
  });

  it('About the Entity / Entity Info / Entity Info', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(7) > .MuiButtonBase-root').contains('About the Entity / Entity Info / Entity Info').click();

    editAnswers('closing_costs_finance', 'true');

    cy.get(':nth-child(7) > .MuiButtonBase-root').contains('About the Entity / Entity Info / Entity Info').click();
    cy.wait(2500);
  });

  it('About the Entity / Loads Info / Loads Info', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(8) > .MuiButtonBase-root').contains('About the Entity / Loads Info / Loads Info').click();

    editAnswers('haul_type', 'Per Load');
    editAnswers('estimated_loads_per_month', '14');
    editAnswers('owner_operator2', 'Yes');
    editAnswers('estimated_rate_per_load', '14');

    cy.get(':nth-child(8) > .MuiButtonBase-root').contains('About the Entity / Loads Info / Loads Info').click();
    cy.wait(2500);
  });

  it('About the Truck / Truck Info / Truck Info', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(9) > .MuiButtonBase-root').contains('About the Truck / Truck Info / Truck Info').click();

    editAnswers('down_payment', '20000');
    editAnswers('dealer_invoice_amount', '110000');
    editAnswers('insurance_cost_per_month', '100');
    editAnswers('dealer_sales_person', 'Francisco');

    cy.get(':nth-child(9) > .MuiButtonBase-root').contains('About the Truck / Truck Info / Truck Info').click();
    cy.wait(2500);
  });

  it('About the Truck / CalCAP Info / Fill Collateral Info', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(10) > .MuiButtonBase-root')
      .contains('About the Truck / CalCAP Info / Fill Collateral Info')
      .click();

    editAnswers('borrower_fleet_size', '3');
    editAnswers('engine_manufacturer', 'volvo');
    editAnswers('financing_trailer', 'true');
    editAnswers('engine_year', '2016');

    cy.get(':nth-child(10) > .MuiButtonBase-root')
      .contains('About the Truck / CalCAP Info / Fill Collateral Info')
      .click();
    cy.wait(2500);
  });

  it('About the Truck / Truck Financials / Fill Operating Expenses', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(11) > .MuiButtonBase-root')
      .contains('About the Truck / Truck Financials / Fill Operating Expenses')
      .click();

    editAnswers('cost_of_fuel_percentage', '10');
    editAnswers('repairs_and_maintainance_percentage', '10');
    editAnswers('factoring_percentage', '8');
    editAnswers('cost_of_labor_percentage', '20');
    editAnswers('truck_parking_expense_per_month', '200');
    editAnswers('software_per_month', '120');
    editAnswers('other_operating_expenses_per_month', '75');
    editAnswers('cell_phone_and_internet_per_month', '85');
    editAnswers('additional_truck_expenses_per_year', '100');

    cy.get(':nth-child(11) > .MuiButtonBase-root')
      .contains('About the Truck / Truck Financials / Fill Operating Expenses')
      .click();
    cy.wait(2500);
  });

  it('About the Truck / Driver Info / Driver Info', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(12) > .MuiButtonBase-root').contains('About the Truck / Driver Info / Driver Info').click();

    editAnswers('commercial_dl_active', 'true');
    editAnswers('companies_worked_for_past', 'Servientrega');
    editAnswers('years_worked_there', '8');

    cy.get(':nth-child(12) > .MuiButtonBase-root').contains('About the Truck / Driver Info / Driver Info').click();
    cy.wait(2500);
  });

  it('Underwriter / Files Uploads / Files', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(13) > .MuiButtonBase-root').contains('Underwriter / Files Uploads / Files').click();

    editAnswers('tax_transcripts', attached);
    editAnswers('equipment_list', attached);
    editAnswers('existing_ucc_search_results', attached);
    editAnswers('repayment_ability_analysis', attached);
    editAnswers('personal_financial_statement', attached);
    editAnswers('interim_financial_statements', attached);
    editAnswers('business_tax_returns', attached);
    editAnswers('personal_tax_returns', attached);
    editAnswers('corporate_entity_documents', attached);
    editAnswers('last_3_months_bank_statements', attached);
    editAnswers('business_debt_schedule', attached);
    editAnswers('manual_credit_memo', attached);

    cy.get(':nth-child(13) > .MuiButtonBase-root').contains('Underwriter / Files Uploads / Files').click();
    cy.wait(2500);
  });

  it('Credit Memo / Credit Memo Info / Fill Finance', function () {
    cy.viewport(1920, 1080);
    cy.get(':nth-child(14) > .MuiButtonBase-root').contains('Credit Memo / Credit Memo Info / Fill Finance').click();

    editAnswers('credit_memo_notes', 'notes');
    editAnswers('projection_notes', '60');
    editAnswers('jobs_created', 'census trac');
    editAnswers('loan_term', '50');
    editAnswers('interest_rate', '14');
    editAnswers('collateral_summary', 'projection notes');
    editAnswers('public_benefits', 'summary notes');
    editAnswers('census_tract', 'latino');
    editAnswers('closing_cost_percentage', '10');
    editAnswers('gps_fee', '10');
    editAnswers('documentation_fee', '400');

    cy.get(':nth-child(14) > .MuiButtonBase-root').contains('Credit Memo / Credit Memo Info / Fill Finance').click();
    cy.wait(2500);
  });
});

