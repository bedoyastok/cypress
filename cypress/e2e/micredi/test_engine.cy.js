describe('Test motor de desicion', ()=> {

  const frontendUrl = "https://micredi2-dev-dob.prestti.com/CreditoPersona"
  const name = "Daniel"
  const lastName = "Bedoya"
  const email = "micredi2@gmail.com"
  const number = "3945645252"

  function formApplicationDecision(ID, email, number) {
    cy.get('[id="FirstName"]').type(name)
    cy.get('[id="FirstSurname"]').type(lastName)
    cy.get('[id="Dob"]').type('22/06/1990')
    cy.get('[id="IdentificationType"]').select('CC')
    cy.get('[id="IdentificationNumber"]').type(ID)
    cy.get('[id="IssueDate"]').type('22/06/2008')
    cy.get('[id="Email"]').type(email)
    cy.get('[id="PhoneNumber"]').type(number)
    cy.get('[id="DataPolicy"]').click()
    cy.get('[class="contentTemplate"]').scrollTo('bottom')
    cy.get('[type="button"]').contains('Autorizar').click()
  }

  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(frontendUrl)
  })

  it('Al Dia', function() {
    formApplicationDecision('6321445', 'danieltest1@yopmail.com', '3987985656' )
  })

  it('T.NO Entregada', function() {
    formApplicationDecision('8288581', 'danieltest2@yopmail.com', '3987985656' )
  })

  it('T. ROBADA', function() {
    formApplicationDecision('6361377', 'danieltest3@yopmail.com', '3987985656' )
  })

  it('Cancel. VOL.', function() {
    formApplicationDecision('6322696', 'danieltest4@yopmail.com', '3987985656' )
  })

  it('Cancel. MX', function() {
    formApplicationDecision('6382607', 'danieltest5@yopmail.com', '3987985656' )
  })

  it('T. Extraviada', function() {
    formApplicationDecision('6482145', 'danieltest6@yopmail.com', '3987985656' )
  })

  it('Pago VOL.', function() {
    formApplicationDecision('6321505', 'danieltest7@yopmail.com', '3987985656' )
  })

  it('Pago VOLMX.30', function() {
    formApplicationDecision('13536294', 'danieltest8@yopmail.com', '3987985656' )
  })

  it('Pago VOLMX.60', function() {
    formApplicationDecision('17173218', 'danieltest9@yopmail.com', '3987985656' )
  })

  it('Pago VOLMX.90', function() {
    formApplicationDecision('17643419', 'danieltest10@yopmail.com', '3987985656' )
  })

  it('Pago VOLMX.1.20', function() {
    formApplicationDecision('6386431', 'danieltest11@yopmail.com', '3987985656' )
  })

  it('Mora 30 AL DIA', function() {
    formApplicationDecision('6549458', 'danieltest12@yopmail.com', '3987985656' )
  })

  it('Mora 60 AL DIA', function() {
    formApplicationDecision('7141290', 'danieltest13@yopmail.com', '3987985656' )
  })

  it('Mora 90 AL DIA', function() {
    formApplicationDecision('8321567', 'danieltest14@yopmail.com', '3987985656' )
  })

  it('Mora 120 AL DIA', function() {
    formApplicationDecision('6333140', 'danieltest15@yopmail.com', '3987985656' )
  })

  it('ESTA Mora 30', function() {
    formApplicationDecision('6528689', 'danieltest16@yopmail.com', '3987985656' )
  })

  it('ESTA Mora 60', function() {
    formApplicationDecision('6911333', 'danieltest17@yopmail.com', '3987985656' )
  })

  it('ESTA Mora 90', function() {
    formApplicationDecision('6497850', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('ESTA Mora 120', function() {
    formApplicationDecision('6323018', 'danieltest19@yopmail.com', '3987985656' )
  })

  it('FM60 ESTA M30', function() {
    formApplicationDecision('10239107', 'danieltest20@yopmail.com', '3987985656' )
  })

  it('FM90 ESTA M30', function() {
    formApplicationDecision('16794706', 'danieltest21@yopmail.com', '3987985656' )
  })

  it('FM90 ESTA M60', function() {
    formApplicationDecision('9690897', 'danieltest22@yopmail.com', '3987985656' )
  })

  it('FM 120 ESTA M30', function() {
    formApplicationDecision('16938565', 'danieltest23@yopmail.com', '3987985656' )
  })

  it('FM120 ESTA M60', function() {
    formApplicationDecision('7378211', 'danieltest24@yopmail.com', '3987985656' )
  })

  it('FM 120 ESTA M90', function() {
    formApplicationDecision('9865790', 'danieltest25@yopmail.com', '3987985656' )
  })

  it('FM30 ESTA M60', function() {
    formApplicationDecision('14515089', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('RM30 ESTA M90', function() {
    formApplicationDecision('12752301', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('RM30 ESTA M120', function() {
    formApplicationDecision('8506765', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('RM60 ESTA M30', function() {
    formApplicationDecision('6862072', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('RM60 ESTA M60', function() {
    formApplicationDecision('8344114', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('RM60 ESTA M90', function() {
    formApplicationDecision('9102074', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('RM60 ESTA M120', function() {
    formApplicationDecision('7422301', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('RM90 ESTA M30', function() {
    formApplicationDecision('7601533', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('', function() {
    formApplicationDecision('', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('', function() {
    formApplicationDecision('', 'danieltest18@yopmail.com', '3987985656' )
  })

  it('', function() {
    formApplicationDecision('', 'danieltest18@yopmail.com', '3987985656' )
  })

})