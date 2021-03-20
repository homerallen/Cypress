describe('Traversing to Account Info from Landing Page', function() {
	it('Visits ElectricityRates Landing Page and Clicks Through to Account Info', function () {
		cy.visit('https://electricityrates.com/LP/Dynamic2/?zipCode=19085&sid=automatedtest')

		cy.get('h1')
		  .should('contain', 'Utah Electricity Rates')

		cy.get('#packages')
		  .find('button')
		  .first()
		  .click()

		cy.get('#formContainer')
		  .find('input')
		  .type('06024{enter}')

		cy.get('#packages')
		  .find('button')
		  .first()
		  .click()

		cy.get('h1')
	      .should('contain', 'Contact Information')

	})
})