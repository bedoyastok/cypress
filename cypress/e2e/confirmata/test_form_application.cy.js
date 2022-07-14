describe('Form application', () => {
  const name = 'Daniel';
  const ssnFail = '019905599';
  const ssnPending = '019905619';
  const ssnApproved = '019905680';
  const ssnRandom = '326545451';
  const frontendUrl = 'https://qa.confirmata.dev';

  function formApplication(ssn, nameCLient) {
    cy.get('#firstName').type(name);
    cy.get('#lastName').type('Bedoya');
    cy.get('#companyName').type('Cypress');
    cy.get('#address').type('Calle 125 #25-60');
    cy.get('#city').type('Florida');

    //State
    cy.get('#mui-component-select-state').click();
    cy.get('[data-value="CA"]').click();

    cy.get('#zipCode').type('14154');
    cy.get('#phoneNumber').type('3147063256');
    cy.get('#email').type('presttipruebas@gmail.com');
    cy.get('#ssn').type(ssn);
    cy.get('#loanAmount').type('63500');

    cy.get('#mui-component-select-doYouHaveDotNumber').click();
    cy.get('[data-value="false"]').click(); //not
    cy.get('[role="dialog"]').should('contain', 'US DOT permits are required to obtain this loan'); //validation modal
    cy.get('[type="button"]').click(); //accept
    cy.get('#mui-component-select-doYouHaveDotNumber').click();
    cy.get('[data-value="true"]').click(); //yes

    cy.get('#mui-component-select-doYouHaveMotorCarrierNumber').click();
    cy.get('[data-value="false"]').click(); //not
    cy.get('[role="dialog"]').should('contain', 'You need a Motor Carrier Permit to obtain this loan'); //validation modal
    cy.get('[type="button"]').click(); //accept
    cy.get('#mui-component-select-doYouHaveMotorCarrierNumber').click();
    cy.get('[data-value="true"]').click(); //yes

    cy.get('#mui-component-select-min2YearsOfExperience').click();
    cy.get('[data-value="false"]').click(); //not
    cy.get('[role="dialog"]').should('contain', 'You need at least 2 years of commercial driving experience'); //validation modal
    cy.get('[type="button"]').click(); //accept
    cy.get('#mui-component-select-min2YearsOfExperience').click();
    cy.get('[data-value="true"]').click(); //yes

    //Referral
    cy.get('#mui-component-select-referralSource').click();
    cy.get('[data-value="Truck Club Magazine"]').click();

    //Textarea
    cy.get('[name="notes"]').type('Prueba en cypress');

    //ACELERA FINANCIAL CORP PRIVACY POLICY
    cy.get('input[name="agree"]').click();
    cy.get('[type="button"]').contains('Accept').click();

    //Button submit
    cy.get('[type="submit"]').click();

    //Modal successful
    cy.get('[role="dialog"]').should(
      'contain.text',
      `  Dear ${name},\n   \n  Thank you for completing our form. Your request for an equipment finance loan with Acelera Financial Corp. is pending review and a staff member will contact you soon.\n   \n  Sincerely,\n`
    );
    cy.get('[type="button"]').click();
  }

  beforeEach(function () {
    cy.visit(`${frontendUrl}/portside`);
  });

  it('SSN Fail', () => {
    formApplication(ssnFail);
  });

  it('SSN Pending', () => {
    formApplication(ssnPending);
  });

  it('SSN Approved', () => {
    formApplication(ssnApproved);
  });

  it('SSN Random', () => {
    formApplication(ssnRandom);
  });
});
