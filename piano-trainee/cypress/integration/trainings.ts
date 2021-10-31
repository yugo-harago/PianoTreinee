import { CommonTasks } from "./trainings/common-tasks";

describe('Trainings', () => {

	beforeEach(() => {
		cy.visit('/user/trainings');
	});

	it('should be in the chord training page', () => {
		cy.contains('Major Chord');
	});

	it('should keep number of quests when get back to the trainings select page', () => {
		const setOneTraining = CommonTasks.SetOneTraining();
		const majorquest = setOneTraining.then(()=>{
			cy
			.get('button[name="start-major-chord-btn"]')
			.click();
		});
		const answeredTrainingsPage = majorquest.then(() => {
			CommonTasks.CompleteOneQuestWithAnswer();
		});

		answeredTrainingsPage.then(() => {
			cy
			.get('input[name="quest-quantities"]')
			.invoke('val')
			.then(val => {
				if(!val) throw new Error("Quest quantity value is falsy");
				expect(parseInt(val as string)).to.equal(1);
			})
		});
	});

	it('should keep quests quantities when it\'s refreshed', () => {
		cy
		.get('input[name="quest-quantities"]')
		.clear({force: true})
		.type('1')
		.then(() => {
			cy.reload().then(() => {
				cy
				.get('input[name="quest-quantities"]')
				.invoke('val')
				.then(val => {
					expect(parseInt(val as string)).to.equal(1);
				})
			})
		})
	});
	
	it('should be able to get back after the quest is completed', () => {
		const setOneTraining = CommonTasks.SetOneTraining();
		const majorquest = setOneTraining.then(()=>{
			cy
			.get('button[name="start-major-chord-btn"]')
			.click();
		});
		const answeredTrainingsPage = majorquest.then(() => {
			CommonTasks.CompleteOneQuestWithAnswer();
		});
		answeredTrainingsPage.then(() => {
			cy.url().then(url => {
				expect(url).to.equal("http://localhost:4200/user/trainings")
			});
		});

	})

	it('should be able to do more than one quest', () => {
		const setOneTraining = CommonTasks.SetOneTraining();
		const majorquest = setOneTraining.then(()=>{
			cy
			.get('button[name="start-major-chord-btn"]')
			.click();
		});
		const answeredTrainingsPage = majorquest.then(() => {
			CommonTasks.CompleteOneQuestWithAnswer();
		});
		const majorQuest2 = answeredTrainingsPage.then(() => {
			cy
			.get('button[name="start-major-chord-btn"]')
			.click();
		});
		majorQuest2.then(() => {
			CommonTasks.CompleteOneQuestWithAnswer();
		});
	});
})