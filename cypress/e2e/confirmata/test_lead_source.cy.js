describe('Configutations leads sources', () => {
  const frontendUrl = 'https://qa.confirmata.dev';
  const email = 'ionic-underwriter@yopmail.com';
  const password = 'passwordForAcelera';
  const name = 'testing name';
  const slug = 'testing slug';
  const variant = 'testing variant';

  before(() => {
    cy.viewport(1920, 1080);
    cy.visit(`${frontendUrl}/login`);
    cy.login_confirmata(email, password);
  });

  it('Validation lead source', function () {
    cy.url().should('eq', `${frontendUrl}/dashboard`);
    cy.get('a[href="/management/configuration"]').click();
    cy.get('h5').should('contain.text', 'Configuration');
    cy.get('[href="/management/leadSources"]').click();
    cy.get('table > thead').should('contain.text', 'Name').and('contain.text', 'Slug').and('contain.text', 'Logo');

    //Create lead source
    cy.get('[data-testid="AddIcon"]').click();
    cy.get('[name="name"]').type(name);
    cy.get('[name="slug"]').type(slug);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('.css-u4p24i').should('not.exist');
    cy.url().should('eq', `${frontendUrl}/management/leadSources`);

    //Edit lead source
    cy.get('button[aria-label="Edit"]').last().click();
    cy.get('input[type="file"]').attachFile('test.png');
    cy.get('[type="button"]').contains('Upload').click();
    cy.get('[type="button"]').contains('Add Variant').click();
    cy.get('[name="variants[0]"]').type(variant);
    cy.get('button[type="submit"]').click();
    cy.get('.css-u4p24i').should('not.exist');

    //Detail lead source
    cy.get('[aria-label="Details"]').last().click();
    cy.get('span').should('contain.text', 'Details');
    cy.go(-1);

    //Delete lead source
    cy.viewport(1920, 1080);
    cy.get('[aria-label="Delete"]').last().click();
  });
});
