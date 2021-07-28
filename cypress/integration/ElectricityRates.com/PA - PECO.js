
const electricityRatesLandingPage = 'https://electricityrates.com/LP/Dynamic1/?zipCode=17005'
const firstSSN = '040-10-1234';
const secondSSN = '111-11-1111';

describe('Traversing to Deposit Required Confirmation Page from Landing Page', function () {
  it('Clears SessionStorage', function() {
      clearSessionStorage();
    })

  it('Visits ConstellationRates Landing Page', function () {
    cy.visit(electricityRatesLandingPage)
  })

  it('Selects First Plan', function () {
    selectsFirstPlan();
  })

  it('Enters Zip and Continues', function () {
    enterZipAndContinue();
  })
  
  it('Enters Contact Information and Continues', function () {
    enterContactInformationAndContinue();
  })

  it('Enters Service Information and Continues', function () {
    enterServiceInformationAndContinue();
  })

  it('Enters Utility Information and Continues', function () {
    enterAccountNumberAndContinue();
  })

  it('Checks Confirmation Page For Order Confirmed', function () {
    cy.wait(10000);
    cy.get('h1')
      .should("contain", "Order Confirmed");
  })
})

function clicksContinue() {
  cy.get("#continue")
    .click();
}

function enterZipAndContinue() {
  cy.get(".zip")
    .type("17005");

  cy.get('dialog button').click();
}

function enterServiceInformationAndContinue() {
  cy.get(".MuiFormControl-root")
    .find('input')
    .first()
    .type("1 Test Dr.");

  cy.get(":nth-child(3) > .MuiInputBase-root > .MuiInputBase-input")
    .type("Berrysburg");

  cy.get("#phone")
    .type("5555555555");

  clicksContinue();
}

function enterAccountNumberAndContinue() {
    cy.get(".MuiInputBase-input")
      .type("0123456789");

    cy.get("#termsAndConditions")
      .click();

    clicksContinue();
}

function enterContactInformationAndContinue() {
  cy.get("#first-name").type("test");
  cy.get("#last-name").type("test");
  cy.get("#email").type("test@test.com");
  cy.get("#continue").click();
}

function selectsFirstPlan() {
  cy.get('button')
    .first()
    .click()
}

function clearSessionStorage() {
  cy.window()
    .then((win) => {
      win.sessionStorage.clear()
    })
}