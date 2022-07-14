describe('Login cygnus', () => {

  const frontendUrl = "https://acelera-test-adm.prestti.com"
  const email = "admin@micredi.com.co"
  const password = "*EstaContraseñaDe54321ElementosEsMuyLarga!"
  const emailInvalid = "ionic@yopmail.com"
  const passwordInvalid = "Password123"

  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(`${frontendUrl}/Login`)
    cy.get('button[type="button"]').contains('De acuerdo').click()
    cy.get('button[type="button"]').contains('Cerrar').click()
  })

  it('Login no data', function() {
    cy.get('button[type="submit"]').click()
    cy.get('.Mui-error').should('contain.text', 'El correo electrónico es requerido')
    cy.get('input[name="email"]').type(email)
    cy.get('button[type="submit"]').click()   
    cy.get('.Mui-error').should('contain.text', 'La contraseña es requerida')
  })

  it('Login failed', function() {
    cy.login_cygnus(emailInvalid, passwordInvalid)
    cy.get('.Mui-error').should('contain.text', '[object Object]')
  })

  it('Login valid', function() {
    cy.login_cygnus(email, password)
    cy.url().should('eq', `${frontendUrl}/app/management/customers`)    
  })

})