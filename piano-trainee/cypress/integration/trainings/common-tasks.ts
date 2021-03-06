
export class CommonTasks{
	public static SetOneTraining() : Cypress.Chainable<string | number | string[] | undefined>{
		let quests = 0;
		return cy
			.get('input[name="quest-quantities"]')
			.clear()
			.type('1')
			.invoke('val')
			.then(val => {
				if(!val) throw new Error("Quest quantity value is falsy");
				quests = parseInt(val as string);
			}).then(() => {
				expect(quests).to.equal(1)
			});
	}

	public static CompleteOneQuestWithAnswer(){
		return cy.get('#start').click().then(() => {
			cy.get('#answer').click({ force: true }).then(() => {
				cy.get('.answer').click({ multiple: true, force: true }).then(() => {
					cy.get('#back').click();
				});
			});
		});
	}

	public static ClickDefaultQuestBtn() {
		return cy
		.get('button[name="start-major-chord-btn"]')
		.click();
	}

}