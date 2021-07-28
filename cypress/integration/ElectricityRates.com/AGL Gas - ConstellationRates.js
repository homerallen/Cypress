
const electricityRatesLandingPage = 'https://constellationrates.com/LP/Steps3/?sid=automatedtest'
const firstSSN = '040-10-1234';
const secondSSN = '111-11-1111';

describe('Traversing to Deposit Required Confirmation Page from Landing Page', function () {
  it('Clears SessionStorage', function() {
      clearSessionStorage();
    })

  it('Visits ConstellationRates Landing Page and Clicks Through to Contact Info', function () {
    cy.visit(electricityRatesLandingPage)
  })

  it('Enters the Requested Zip and Clicks Compare Rates', function () {
    enterZipAndCompareRates();
  })

  it('Selects First Plan', function () {
    selectsFirstPlan();
  })
  
  it('Enters Contact Information and Continues', function () {
    enterContactInformationAndContinue();
  })

  it('Enters Service Information and Continues', function () {
    enterServiceInformationAndContinue();
  })

  it('Enters Account Information', function () {
    selectServiceSetupType();
  })

  it('Selects Existing Gas Meter Question', function () {
    selectsExistingGasMeter();
  })

  it('Clicks Continue', function () {
    clicksContinue();
  })

  it('Enter Credit Information and Continues', function () {
    enterCreditInformationAndContinue(secondSSN);
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

describe('Traversing to Deposit NOT Required Confirmation Page from Landing Page', function () {
  it('Clears SessionStorage', function() {
      clearSessionStorage();
    })

  it('Visits ConstellationRates Landing Page and Clicks Through to Contact Info', function () {
    cy.visit(electricityRatesLandingPage)
  })

  it('Enters the Requested Zip and Clicks Compare Rates', function () {
    enterZipAndCompareRates();
  })

  it('Selects First Plan', function () {
    selectsFirstPlan();
  })
  
  it('Enters Contact Information and Continues', function () {
    enterContactInformationAndContinue();
  })

  it('Enters Service Information and Continues', function () {
    enterServiceInformationAndContinue();
  })

  it('Enters Account Information', function () {
    selectServiceSetupType();
  })

  it('Selects Existing Gas Meter Question', function () {
    selectsExistingGasMeter();
  })

  it('Clicks Continue', function () {
    clicksContinue();
  })

  it('Enter Credit Information and Continues', function () {
    enterCreditInformationAndContinue(firstSSN);
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

function enterCreditInformationAndContinue(ssn) {
  cy.get("#ssn")
    .type(ssn);

  cy.get("#dob")
    .type("01/01/1970");

  cy.get("#termsAndConditions")
    .click();

  clicksContinue();
}

function clicksContinue() {
  cy.get("#continue")
    .click();
}

function selectsExistingGasMeter() {
  cy.contains("Yes").click();
}

function selectServiceSetupType() {
  cy.contains("Moving Homes").click();
}

function enterZipAndCompareRates() {
  cy.get("#zipCode").type("30002");
  cy.get("#singlebutton").click();
}

function enterServiceInformationAndContinue() {
  cy.get(".MuiFormControl-root")
    .find('input')
    .first()
    .type("1 Test Dr.");

  cy.get(":nth-child(3) > .MuiInputBase-root > .MuiInputBase-input")
    .type("Scottdale");

  cy.get("#phone")
    .type("5555555555");

  clicksContinue();
}

function enterContactInformationAndContinue() {
  cy.get("#first-name").type("test");
  cy.get("#last-name").type("test");
  cy.get("#email").type("test@test.com");
  cy.get("#continue").click();
}

function selectsFirstPlan() {
  cy.get("._1qaYB9fRLseS")
    .find('button')
    .first()
    .click();
}

function clearSessionStorage() {
  cy.window()
    .then((win) => {
      win.sessionStorage.clear()
    })
}