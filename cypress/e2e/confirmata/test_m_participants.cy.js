describe('Participants module', () => {
  const frontendUrl = 'https://qa.confirmata.dev';
  const email = 'ionic-underwriter@yopmail.com';
  const password = 'passwordForAcelera';

  before(() => {
    cy.viewport(1920, 1080);
    cy.visit(`${frontendUrl}/login`);
    cy.login_confirmata(email, password);
  });

  it('Validation, creation, edition and delete o participants', function () {
    cy.url().should('eq', `${frontendUrl}/dashboard`);
    cy.wait(2000);

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

        //Participants
        cy.get(`[href="/loanApplications/${ID}/tasks/participants"] > .MuiListItemText-root`).click();
        cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/tasks/participants`);
        cy.get('.css-u4p24i').should('not.exist');
        cy.wait(3000);
        cy.get('h5').should('contain.text', 'About the Owner');
        cy.get(`[href="/loanApplications/${ID}/tasks/participants"]`).should('contain.text', 'Participants');
      }); //close $autoID

    //Edit participant and add 80%//
    cy.get('[data-testid="EditIcon"]').last().click();
    cy.get('.MuiCardHeader-root').should('contain.text', 'Personal Information');
    cy.get('[name="nameSuffix"]').clear().type('Edit');
    cy.get('form').submit();
    cy.get('.css-u4p24i').should('not.exist');
    cy.wait(1000);
    //cy.get('svg[data-testid="PersonAddIcon"]').first().click();
    cy.get('span').should('contain.text', 'Ownership');
    cy.get('[name="ownerPercentageOwnershipAmount"]').clear().type('80');
    cy.get('form').submit();
    cy.get('.css-u4p24i').should('not.exist');
    cy.wait(1000);
    cy.get('nav > ol > li').contains('Participants').click();
    cy.get('h5').should('contain.text', 'About the Owner');

    //Create participant driver//
    cy.viewport(1920, 1080);
    cy.get('[data-testid="AddIcon"]').click();
    cy.get('h5').should('contain.text', 'Create Participant');
    cy.get('.MuiCardHeader-root').should('contain.text', 'Personal Information');
    cy.get('[name="firstName"]').type('DriverDaniel');
    cy.get('[name="lastName"]').type('DriverBedoya');
    cy.get('[name="nameSuffix"]').type('Don');
    cy.get('[name="email"]').type('presttipruebas@gmail.com');
    cy.get('input[type="tel"]').type('12/10/1990');
    cy.get('[name="address"]').type('calle 50 #50-50');
    cy.get('[name="address2"]').type('calle 100 #100-100');
    cy.get('[name="city"]').type('los angeles');
    cy.get('[name="phoneNumber"]').type('3895627878');
    cy.get('[name="county"]').type('California');
    cy.get('[name="state"]').type('california');
    cy.get('[name="zipCode"]').type('78475');
    cy.get('[name="creditMemoNotes"]').type('testing credi memo notes');
    cy.get('[name="notes"]').type('testing notes');
    cy.get('form').submit();
    cy.get('.css-u4p24i').should('not.exist');
    cy.wait(1000);
    //FPS
    //cy.get('[data-testid="PeopleIcon"]').click();
    cy.get('.MuiCardHeader-root').should('contain.text', 'PFS');
    cy.get('[name="creditCardPaymentsPerYear"]').clear().type('20');
    cy.get('[name="utilitiesPerYear"]').type('120');
    cy.get('[name="vehicleCostsPerYear"]').type('120');
    cy.get('[name="vehicleInsurancePerYear"]').type('120');
    cy.get('[name="housingPerYear"]').type('150');
    cy.get('[name="personalIncomeTaxRate"]').type('2');
    cy.get('[name="numberOfChildDependents"]').type('1');
    cy.get('[name="childCostsPerYear"]').type('100');
    cy.get('[name="numberOfAdultDependents"]').type('1');
    cy.get('[name="adultCostsPerYear"]').type('200');
    cy.get('[name="yearsOfTruckingExperience"]').type('5');
    cy.get('[name="currentlyEmployedAsTruckDriver"]').type('5');
    cy.get('[name="otherExpensesPerYear"]').type('100');
    cy.get('form').submit();
    cy.get('.css-u4p24i').should('not.exist');
    cy.wait(1000);
    //Driver
    //cy.get('[data-testid="DirectionsCarIcon"]').click();
    cy.get('.MuiCardHeader-root').should('contain.text', 'Driver');
    cy.get('[name="driverLicenseNumber"]').type('ABC23456');
    cy.get('[name="yearsOfDrivingExperience"]').type('5');
    cy.get('input[type="file"]').attachFile('test.png');
    cy.get('[type="button"]').contains('Upload').click();
    cy.get('form').submit();
    cy.get('.css-u4p24i').should('not.exist');
    cy.wait(1000);
    //Experian credit report
    cy.get('[data-testid="EditIcon"]').click();
    cy.get('.MuiCardHeader-root').should('contain.text', 'Experian Credit Report');
    cy.get('[name="ssn"]').type('019905680');
    cy.get('[name="experianCreditScore"]').type('500');
    cy.get('[name="latePayments"]').type('100');
    cy.get('[name="bankruptciesCount"]').type('1');
    cy.get('[name="revolvingCreditAvailable"]').type('1');
    //cy.get('[type="submit"]').contains('Pull Credit Report').click();
    cy.get('[type="submit"]').contains('Save').click();
    cy.get('.css-u4p24i').should('not.exist');
    cy.wait(1000);
    //Income sources
    cy.get('[data-testid="PaidIcon"]').click();
    cy.get('.MuiCardContent-root').should('contain.text', 'Income Sources');
    cy.get('[data-testid="AddIcon"]').click();
    cy.get('label').contains('Label').type('Income');
    cy.get('label').contains('Amount').type('1000');
    cy.get('label').contains('Notes').type('Cypress');
    cy.get('[data-testid="SaveIcon"]').click().type('{esc}');
    //Employment history
    cy.get('[data-testid="PersonAddIcon"]').last().click();
    cy.get('.MuiCardContent-root').should('contain.text', 'Employment History');
    cy.get('[data-testid="AddIcon"]').click();
    cy.get('[name="employerName"]').type('Juan');
    cy.get('[name="employmentRole"]').type('Driver');
    cy.get('[type="tel"]').first().type('01/01/2000');
    cy.get('[type="tel"]').last().type('01/01/2020');
    cy.get('form').submit();
    cy.wait(2000);
    cy.get('[type="button"]').contains('Close').click();
    cy.get('nav > ol > li').contains('Participants').click();
    cy.get('h5').should('contain.text', 'About the Owner');
  });
});

/*
   

  cy.get('h5').should('contain.text', 'Create Participant');
  cy.get('.MuiCardHeader-root').should('contain.text', 'Personal Information');
  cy.get('[name="firstName"]').type('DriverDaniel');
  cy.get('[name="lastName"]').type('DriverBedoya');
  cy.get('[name="nameSuffix"]').type('Don');
  cy.get('[name="email"]').type('presttipruebas@gmail.com');
  cy.get('input[type="tel"]').type('12/10/1990');
  cy.get('[name="address"]').type('calle 50 #50-50');
  cy.get('[name="address2"]').type('calle 100 #100-100');
  cy.get('[name="city"]').type('los angeles');
  cy.get('[name="phoneNumber"]').type('3895627878');
  cy.get('[name="county"]').type('California');
  cy.get('[name="state"]').type('california');
  cy.get('[name="zipCode"]').type('78475');
  cy.get('[name="creditMemoNotes"]').type('testing credi memo notes');
  cy.get('[name="notes"]').type('testing notes');
  cy.get('form').submit()
  cy.wait(1000);



  //Add participant owner whit 20%
  cy.url().should('eq', `${frontendUrl}/loanApplications/${ID}/participants/create/personalInfo`);
  cy.get('h5').should('contain.text', 'Create Participant');
  cy.get('span').should('contain.text', 'Personal Information');
  cy.get('[name="firstName"]').type('daniel');
  cy.get('[name="lastName"]').type('bedoya');
  cy.get('[name="nameSuffix"]').type('Mr');
  cy.get('[name="email"]').type('presttipruebas@gmail.com');
  cy.get('input[type="tel"]').type('12/10/1990');
  cy.get('[name="address"]').type('calle 50 #50-50');
  cy.get('[name="address2"]').type('calle 100 #100-100');
  cy.get('[name="city"]').type('los angeles');
  cy.get('[name="phoneNumber"]').type('3895627878');
  cy.get('[name="county"]').type('California');
  cy.get('[name="state"]').type('california');
  cy.get('[name="zipCode"]').type('78475');
  cy.get('[name="creditMemoNotes"]').type('credit memo notes');
  cy.get('[name="notes"]').type('testing');
  cy.get('form').submit()
  cy.wait(1000);
  cy.get('svg[data-testid="PersonAddIcon"]').click();
  cy.get('span').should('contain.text', 'Ownership');
  cy.get('[name="ownerPercentageOwnershipAmount"]').clear().type('20');
  cy.get('form').submit()
  cy.get('.css-u4p24i').should('not.exist');
  cy.wait(1000);
  cy.get('svg[data-testid="PeopleIcon"]');
  cy.get('span').should('contain.text', 'PFS');
  cy.get('[name="creditCardPaymentsPerYear"]').clear().type('20');
  cy.get('[name="utilitiesPerYear"]').type('120');
  cy.get('[name="vehicleCostsPerYear"]').type('120');
  cy.get('[name="vehicleInsurancePerYear"]').type('120');
  cy.get('[name="housingPerYear"]').type('150');
  cy.get('[name="personalIncomeTaxRate"]').type('2');
  cy.get('[name="numberOfChildDependents"]').type('1');
  cy.get('[name="childCostsPerYear"]').type('100');
  cy.get('[name="numberOfAdultDependents"]').type('1');
  cy.get('[name="adultCostsPerYear"]').type('200');
  cy.get('form').submit()
  cy.get('.css-u4p24i').should('not.exist');
  cy.wait(1000);
  cy.get('svg[data-testid="EditIcon"]').click();
  cy.get('span').should('contain.text', 'Experian Credit Report');
  cy.get('[name="ssn"]').type('896565522');
  cy.get('[name="experianCreditScore"]').type('300');
  cy.get('[name="latePayments"]').type('100');

  cy.get('[name="averageMonthlyDeposits"]').type('1000');
  cy.get('[name="creditCardPaymentsPerMonth"]').type('100');

  cy.get('[name="vehicleCostsPerMonth"]').type('100');
  cy.get('[name="vehicleInsurancePerMonth"]').type('50');

  cy.get('form').submit()
  cy.get('.css-u4p24i').should('not.exist');
  cy.wait(1000);
  cy.get('nav > ol > li').contains('Participants').click();

  //Validate total
  cy.get('[colspan="6"]').should('contain.text', 'All Owners should add up to 100%.');
  cy.get(`[href="/loanApplications/${ID}/participants/${ID}/edit/personalInfo"]`).first().click();
  cy.get('span').should('contain.text', 'Personal Information');
  cy.get('form').submit()
  cy.get('.css-u4p24i').should('not.exist');
  cy.wait(1000);
  cy.get('span').should('contain.text', 'Owner');
  cy.get('[name="ownerPercentageOwnershipAmount"]').clear().type('80');
  cy.get('form').submit()
  cy.get('.css-u4p24i').should('not.exist');
  cy.wait(1000);
  cy.get('span').should('contain.text', 'Guarantor');
  cy.get('form').submit()
  cy.get('.css-u4p24i').should('not.exist');
  cy.wait(1000);
  cy.get('nav > ol > li').contains('Participants').click();
  cy.get('.MuiTableFooter-root > .MuiTableRow-root > :nth-child(1)').should('contain.text', '100% Total');


  //cy.get(':nth-child(3) > :nth-child(7) > button.MuiButtonBase-root').click()//delete
  //cy.get(':nth-child(2) > :nth-child(7) > button.MuiButtonBase-root').click()//delete
*/
