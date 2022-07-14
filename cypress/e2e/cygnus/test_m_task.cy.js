describe('Task module', ()=> {

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

  it('Validation task module', function () {
    cy.url().should('eq', `${frontendUrl}/app/management/customers`)
    cy.get('h3').should('contain.text', 'Listado de clientes')
    cy.get('[href="/app/management/tasks"]').click()
    cy.get('h3').should('contain.text', 'Lista de tareas')
    cy.get('button[title="Buscar"]').click()
    cy.wait(2000)
    cy.get('table > thead > tr > th').first().should('contain.text', 'Id de prestamo')
  })

  it('Creation task', function () {
    cy.viewport(1920, 1080)
    cy.get('a[href="/app/management/tasks/create"]').contains('Crear').click()
    cy.get('h3').should('contain.text', 'Crear Tarea')
    cy.get('input[name="name"]').type('tarea prueba')
    cy.get('textarea[name="description"]').type('prueba creacion tarea desde cypress')
    cy.get('select[name="asignee"]').select('admin@micredi.com.co')
    cy.get('input[name="loanId"]').type('27')
    cy.get('input[name="checkedB"]').click()
    cy.get('select[name="frequency"]').select('Diario')
    cy.get('input[name="repeats"]').type('10')
    cy.get('button[type="submit"]').click()
  })

  it('Edit task', function () {
    cy.viewport(1920, 1080)
    cy.get('button[title="Buscar"]').click()
    cy.get('a[title="Editar"]').first().click()
    cy.get('h3').should('contain.text', 'Editar Tarea')
    cy.get('input[name="name"]').clear().type('tarea prueba editada')
    cy.get('textarea[name="description"]').clear().type('prueba creacion tarea desde cypress editada')
    cy.get('select[name="asignee"]').select('admin@micredi.com.co')
    cy.get('input[name="loanId"]').clear().type('27')
    cy.get('select[name="frequency"]').select('Mensual')
    cy.get('input[name="repeats"]').clear().type('5')
    cy.get('button[type="submit"]').click()
  })

})
