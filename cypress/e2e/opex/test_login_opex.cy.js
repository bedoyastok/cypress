describe('Login opex', () => {

  const frontendUrl = "https://opex-test.bancavalor.com"
  const email = "jairp8@gmail.com"
  const password = "Jair123"
  const emailInvalid = "ionic@yopmail.com"
  const passwordInvalid = "password"

  beforeEach(() => {
    cy.visit(`${frontendUrl}/Account/Login`)
  })

  it('Login no data', function() {
    cy.get('[value="Acceder"]').click()
    cy.get('.text-danger > ul > li').should('contain.text', 'El campo Correo electrónico es obligatorio.')
    cy.get('input[name="Email"]').type(email)
    cy.get('[value="Acceder"]').click()    
    cy.get('.text-danger > ul > li').should('contain.text', 'The Password field is required.')
  })

  it('Login failed', function() {
    cy.get('input[name="Email"]').type(emailInvalid)
    cy.get('input[name="password"]').type(passwordInvalid)
    cy.get('[value="Acceder"]').click()
    cy.get('.text-danger > ul > li').should('contain.text', 'Invalid login attempt')
  })

  it('Login valid', function() {
    cy.get('input[name="Email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('[value="Acceder"]').click()
    cy.url().should('eq', `${frontendUrl}/Home/Index`)    
  })

})