

let firstEnrollmentToken
let electricityRatesLandingPage = 'https://electricityrates.com/LP/Dynamic2/?zipCode=21108&sid=automatedtest'

describe('Traversing to Account Info from Landing Page', function () {
  it('Visits ElectricityRates Landing Page and Clicks Through to Contact Info', function () {
    cy.visit(electricityRatesLandingPage)
    clicksThroughToContactInfo()
  })

  it('Fills out Contact Info', function () {
    populateContactInfo()
  })

  it('Proceeds to Account Info', function () {
    cy.get('#next')
      .click()
  })

  it('Partially fills out Account Info', function () {
    cy.get('#address1')
      .type('123 test st.')
  })

  it('Tries to Continue', function () {
    cy.get('#termsAndConditions')
      .should('be.visible')
      .click()
    cy.get('#next')
      .should('be.visible')
      .click()
  })

  it("Captures the first enrollmentToken", function () {
    cy.window()
      .then((win) => {
        firstEnrollmentToken = JSON.parse(win.sessionStorage.getItem("enrollmentData")).enrollmentToken
      });
  })
})

describe('Visiting URL with Enrollment Token', function () {
  it('Visits URL with enrollment Token', function () {
    cy.visit(`https://electricityrates.com/compare/electricity/21108/?enrollmentToken=${firstEnrollmentToken}`)
  })

  it('Expects that Address1 is populated', function () {
    cy.get('input[id="address1"]').should('have.value', '123 test st.')
  })
})

describe('Traversing to Account Info Again from Landing Page After Clearing Session Storage', function () {
  it('Visits ElectricityRates Landing Page and Clicks Through to Contact Info', function () {
    clearSessionStorage()
    cy.visit(electricityRatesLandingPage)
    clicksThroughToContactInfo()
  })

  it('Fills out Contact Info', function () {
    populateContactInfo()
  })

  it('Proceeds to Account Info', function () {
    cy.get('#next')
      .click()
  })

  it("Expects the second enrollment token not to equal the first enrollment token", function () {
    cy.window()
      .then((win) => {
        assert.notEqual(JSON.parse(win.sessionStorage.getItem("enrollmentData")).enrollmentToken, firstEnrollmentToken)
      });
  })
})

function clearSessionStorage() {
  cy.window()
    .then((win) => {
      win.sessionStorage.clear()
    })
}

function clicksThroughToContactInfo() {
  cy.get('h1')
    .should('contain', 'Utah Electricity Rates')

  cy.get('#packages')
    .find('button')
    .first()
    .click()

  cy.get('#formContainer')
    .find('input')
    .type('21108{enter}')

  cy.get('h1')
    .should('contain', 'Contact Information')
}

function populateContactInfo() {
  cy.get('#firstName')
    .type('test')

  cy.get('#lastName')
    .type('test')

  cy.get('#emailAddress')
    .type('test@test.com')

  cy.get('#verifyEmailAddress')
    .type('test@test.com')
}