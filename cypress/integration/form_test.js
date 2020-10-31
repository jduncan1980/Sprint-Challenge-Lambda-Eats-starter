describe('Form - testing form inputs', function () {
	beforeEach(() => {
		cy.visit('http://localhost:3000/order');
	});

	it('fills out the form inputs and submits', () => {
		cy.get('[data-cy=name]').type('Name').should('have.value', 'Name');

		cy.get('[data-cy=size').select('Medium').should('have.value', 'Medium');

		cy.get(
			'[data-cy=sauce] > :nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-15'
		)
			.check()
			.should('have.value', 'Garlic Ranch');

		cy.get('[data-cy=comments]')
			.type('No napkins')
			.should('have.value', 'No napkins');

		cy.get('#pepperoni').check().should('be.checked');
		cy.get('#mushroom').check().should('be.checked');

		cy.get('[data-cy=submit]').click();
		// cy.get(
		// 	':nth-child(2) > .MuiFormControl-root > .MuiFormHelperText-root'
		// ).select('Medium');
		// cy.get('#size').select('Small').should('have.value', 'Small');

		// cy.get('[data-cy=terms').check().should('be.checked');

		// cy.get('[data-cy=submit').click();

		// cy.get;
	});

	// it('checks for form validation errors', () => {
	// 	cy.get('[data-cy=name]').type('Name').clear();
	// 	cy.get('[data-cy=name-error] > .MuiPaper-root > .MuiAlert-message').should(
	// 		'contain',
	// 		'Name is a required field'
	// 	);

	// 	cy.get('[data-cy=email]').type('name@example.com').clear();
	// 	cy.get('[data-cy=email-error] > .MuiPaper-root > .MuiAlert-message').should(
	// 		'contain',
	// 		'email'
	// 	);

	// 	cy.get('[data-cy=password]').type('password').clear();
	// 	cy.get(
	// 		'[data-cy=password-error] > .MuiPaper-root > .MuiAlert-message'
	// 	).should('contain', 'Password is required');
	// });
});
