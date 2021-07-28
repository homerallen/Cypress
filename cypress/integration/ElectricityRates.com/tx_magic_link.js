

const electricityRatesLandingPage = 'https://electricityrates.com/LP/Dynamic2/?zipCode=77004&sid=tpaautomatedtest'
const firstSSN = '123-45-6789';
const secondSSN = '111-11-1111';

describe('Traversing to Credit Info from Landing Page', function () {
  it('Clears SessionStorage', function() {
    clearSessionStorage();
  })

  it('Visits ElectricityRates Landing Page and Clicks Through to Contact Info', function () {
    cy.visit(electricityRatesLandingPage)
    clicksThroughToContactInfo()
  })

  it('Fills out Contact Info', function () {
    populateContactInfo()
  })

  it('Proceeds to Account Info', function () {
    proceedsToAccountInfo()
  })

  it('Fills out Account Info', function () {
    fillsOutAccountInfo()
  })

  it('Expects that Standard Switch is Showing', function () {
    expectsStandardSwitchShows()
  })

  it('Clicks continue', function() {
    clicksContinue()
  })

  it('Populates Credit Information, Terms and Conditions, and Continues', function() {
    populatesCreditInformationAndTermsAndContinues(firstSSN)
  })

  it('Checks Confirmation Page For Order Confirmed', function () {
    cy.get('h1')
      .should("contain", "Order Confirmed")
  })

  it('Checks Confirmation Page to Ensure DOES NOT CONTAIN $199.95 Deposit', function () {
    cy.get('h1')
      .parent()
      .should("not.contain", "$199.95 is required");
  })
})

describe('Traversing to Account Info from Landing Page', function () {
  it('Clears SessionStorage', function() {
    clearSessionStorage();
  })

  it('Visits ElectricityRates Landing Page and Clicks Through to Contact Info', function () {
      cy.visit(electricityRatesLandingPage)
      clicksThroughToContactInfo()
    })
  
    it('Fills out Contact Info', function () {
      populateContactInfo()
    })
  
    it('Proceeds to Account Info', function () {
      proceedsToAccountInfo()
    })
  
    it('Fills out Account Info', function () {
      fillsOutAccountInfo()
    })
  
    it('Expects that Standard Switch is Showing', function () {
      expectsStandardSwitchShows()
    })
  
    it('Clicks continue', function() {
      clicksContinue()
    })
  
    it('Populates Credit Information, Terms and Conditions, and Continues', function() {
      populatesCreditInformationAndTermsAndContinues(secondSSN)
    })

    it('Checks Confirmation Page For Deposit Required', function () {
      cy.get('h1')
        .should("contain", "Deposit Required")
    })
  
    it('Checks Confirmation Page For $199.95 Deposit', function () {
      cy.get('h1')
        .parent()
        .should("contain", "$199.95 is required");
    })
  })

function clearSessionStorage() {
  cy.window()
    .then((win) => {
      win.sessionStorage.clear()
    })
}

function populatesCreditInformationAndTermsAndContinues(ssn){
    populate_ssn(ssn)

    cy.get('#dob').click()
    .type("01011984")

    cy.get('#disc_auth').click()
    cy.get('#disc_terms').click()
    cy.get('#disc_credit_reporting').click()

    cy.get("#continue").click();
}

function clicksContinue(){
    cy.get('#continue').click()
}


function expectsStandardSwitchShows(){
    cy.get('._2SoLXcUEW_ex').should('be.visible')
}

function populate_ssn(ssn) {
    cy.get('#ssn').click()
    .type(ssn)
}

function fillsOutAccountInfo(){
    cy.get('.MuiInputBase-input').first()
    .type("2511 ")

    cy.get('._244jv4LuLCIR')
    .contains("EAGLE")
    .click()

    cy.get('#phone')
    .type("5555555555")

    cy.get('._2xeLW673jnlc input')
      .click()
}

function proceedsToAccountInfo() {
    cy.get('#continue')
      .click()
}

function clicksThroughToContactInfo() {
    cy.get('h1')
        .should('contain', 'Pennsylvania Electricity Rates')

    cy.get('#packages')
        .find('button')
        .first()
        .click()

    cy.get('#formContainer')
        .find('input')
        .type('77004{enter}')
}

function populateContactInfo() {
  cy.get('#first-name')
    .type('test')

  cy.get('#last-name')
    .type('test')

  cy.get('#email')
    .type('test@test.com')
}



