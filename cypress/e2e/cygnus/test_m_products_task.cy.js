describe('Products module - task', ()=> {

  const frontendUrl = "https://acelera-test-adm.prestti.com"
  const email = "admin@micredi.com.co"
  const password = "*EstaContraseñaDe54321ElementosEsMuyLarga!"
  
  before(() => {
    cy.viewport(1920, 1080)
    cy.visit(`${frontendUrl}/Login`)
    cy.get('button[type="button"]').contains('De acuerdo').click()
    cy.get('button[type="button"]').contains('Cerrar').click()
    cy.login_cygnus(email, password)
  })

  it('Validation module', function() {
    cy.url().should('eq', `${frontendUrl}/app/management/customers`)    
    cy.get('h3').should('contain.text','Listado de clientes')
    cy.get('[href="/app/configuration/loan-products"]').click()
    cy.get('h3').should('contain.text','Productos de préstamo')
    cy.wait(1000)
    cy.get('table > thead > tr > th').first().should('contain.text','Código de producto')
    cy.get('a[title="Detalles"]').first().click()
    cy.get('h3').should('contain.text','Detalles productos de préstamo')
  })

  it('Creation task', function() {
    cy.viewport(1920, 1080)
    cy.get('[role="button"]').contains('Editar').click()
    cy.get('.MuiStep-vertical').contains('Tareas').click()
    cy.get('[id="mui-component-select-roles"]').click()
    cy.get('li[role="option"]').contains('Admin').click()
    cy.get('input[name="quantityLoans"]').clear().type(10)
    cy.get('button[type="submit"]').click()
  })

  it('Add task', function() {
    cy.viewport(1920, 1080)
    cy.get('button[title="Añadir"]').click()
    cy.get('span').should('contain.text','Crear Tarea')
    cy.get('[name="name"]').type('tarea prueba')
    cy.get('textarea[name="description"]').type('prueba creacion tarea desde cypress')
    cy.get('[id="mui-component-select-evidence"]').click()
    cy.get('li[data-value="true"]').click()
    cy.get('input[name="daysAfterDisbursement"]').type('1')
  })

  it('Frecuency', function() {
    cy.viewport(1920, 1080)
    cy.get('input[type="checkbox"]').click()
    cy.get('[id="mui-component-select-frequency"]').click()
    cy.get('li[data-value="D"]').click()
    cy.get('input[name="repeats"]').clear().type('10')
    cy.get('button[type="submit"]').last().click()
  })

})