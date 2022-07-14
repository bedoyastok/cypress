describe('Login underwriter', () => {
  const email = 'ionic-underwriter@yopmail.com';
  const password = 'passwordForAcelera';
  const emailInvalid = 'ionic@yopmail.com';
  const passwordInvalid = 'password';
  const frontendUrl = 'https://qa.confirmata.dev';

  beforeEach(function () {
    cy.visit(`${frontendUrl}/login`);
  });

  it('Login no data', function () {
    cy.contains('Login').click();
    cy.get('#mui-1-helper-text').should('contain.text', 'Email is required');
    cy.get('#mui-2-helper-text').should('contain.text', 'Password is required');
  });

  it('Login failed', function () {
    cy.login_confirmata(emailInvalid, passwordInvalid);
    cy.get('#notistack-snackbar').should('contain.text', 'Login Failed');
  });

  it('Login valid', function () {
    cy.login_confirmata(email, password);
    cy.url().should('eq', `${frontendUrl}/dashboard`);
  });
});
