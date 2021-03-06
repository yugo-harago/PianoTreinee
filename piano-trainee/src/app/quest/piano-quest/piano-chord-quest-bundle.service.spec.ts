import { TestBed } from '@angular/core/testing';
import { ChordQuest } from '../../user/trainings/select-training/select-training.component';
import { ChordTraining, TrainingInversionType, trainingOptions } from '../../user/trainings/select-training/training-options.data';
import { AccidentalType } from '../../piano/chord.model';
import { Note } from '../../piano/note.enum';

import { PianoChordQuestBundleService } from './piano-chord-quest-bundle.service';
import { QuestCardType } from './quest-card-type.enum';
import { RandomService } from '../random.service';

describe('PianoQuestBundleService', () => {
	let service: PianoChordQuestBundleService;
	let randomService: RandomService;

	beforeEach(() => {
		randomService = new RandomService();
		TestBed.configureTestingModule({
			providers: [
				{ provide: PianoChordQuestBundleService },
				{ provide: RandomService, useValue: randomService}
			]
		});
		service = TestBed.inject(PianoChordQuestBundleService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should generate major third quest', () => {
		const note = Note.C;
		
		const quest = service.majorChordQuest(note);
		
		expect(quest.answerChord).toEqual([Note.C, Note.E, Note.G]);
		expect(quest.questChord.toString()).toBe("C");
	});

	it('should generate major third inversion quest',() => {
		const note = Note.C;
		
		const quest = service.majorChordQuest(note, 1);
		
		expect(quest.answerChord).toEqual([Note.G, Note.C, Note.E]);
		expect(quest.questChord.toString()).toBe("C/G");
	});

	it('should generate major third second inversion quest',() => {
		const note = Note.C;
		
		const quest = service.majorChordQuest(note, 2);
		
		expect(quest.answerChord).toEqual([Note.E, Note.G, Note.C]);
		expect(quest.questChord.toString()).toBe("C/E");
	});

	it('should only generate major inversion quest', () => {
		const chordQuest = new ChordQuest(1, QuestCardType.majorChordQuest, TrainingInversionType.first, AccidentalType.all)
		service.addQuest(chordQuest);
		for (let index = 0; index < 10; index++) {
			const quest = service.nextQuest();
			expect(quest.inversion).not.toEqual(0);
		}
	});

	it('should only generate major first inversion quest', () => {
		const chordQuest = new ChordQuest(1, QuestCardType.majorChordQuest, TrainingInversionType.first, AccidentalType.all);
		service.addQuest(chordQuest);
		for (let index = 0; index < 10; index++) {
			const quest = service.nextQuest();
			expect(quest.inversion).toEqual(1);
		}
	});

	it('should only generate major second inversion quest', () => {
		const chordQuest = new ChordQuest(1, QuestCardType.majorChordQuest, TrainingInversionType.second, AccidentalType.all)
		service.addQuest(chordQuest);
		for (let index = 0; index < 10; index++) {
			const quest = service.nextQuest();
			expect(quest.inversion).toEqual(2);
		}
	});

	it('should only generate major without inversion quest', () => {
		const chordQuest = new ChordQuest(1, QuestCardType.majorChordQuest, TrainingInversionType.none, AccidentalType.all)
		service.addQuest(chordQuest);
		for (let index = 0; index < 10; index++) {
			const quest = service.nextQuest();
			expect(quest.inversion).toEqual(0);
		}
	});

	it('should generate major sharp quest', () => {
		randomService.getRandomInversion = () => 0;
		randomService.getRandomNote = () => Note['C#'];
		const chordQuest = new ChordQuest(1, QuestCardType.majorChordQuest, TrainingInversionType.none, AccidentalType.sharp)
		service.addQuest(chordQuest);
		const quest = service.nextQuest();
		const stringQuest = quest.questChord.toString();
		expect(stringQuest).toEqual("C#");
	});

	it('should generate major flat quest', () => {
		randomService.getRandomInversion = () => 0;
		randomService.getRandomNote = () => Note['C#'];
		const chordQuest = new ChordQuest(1, QuestCardType.majorChordQuest, TrainingInversionType.none, AccidentalType.flat)
		service.addQuest(chordQuest);
		const quest = service.nextQuest();
		const stringQuest = quest.questChord.toString();
		expect(stringQuest).toEqual("Db");
	});

	it('should generate minor third quest', () => {
		const note = Note.C;
		
		const quest = service.minorChordQuest(note);
		
		expect(quest.inversion).toBeFalsy();
		expect(quest.answerChord).toEqual([Note.C, Note['D#'], Note.G]);
		expect(quest.questChord.toString()).toBe("C m");
	});

	it('should generate minor third, first inversion quest',() => {
		const note = Note.C;
		
		const quest = service.minorChordQuest(note, 1);
		
		expect(quest.inversion).toBe(1);
		expect(quest.answerChord).toEqual([Note.G, Note.C, Note['D#']]);
		expect(quest.questChord.toString()).toBe("C m/G");
	});

	it('should generate minor third, second inversion quest',() => {
		const note = Note.C;
		
		const quest = service.minorChordQuest(note, 2);
		
		expect(quest.inversion).toBe(2);
		expect(quest.answerChord).toEqual([Note['D#'], Note.G, Note.C]);
		expect(quest.questChord.toString()).toBe("C m/D#");
	});

	it('should generate major 7 chord quest',() => {
		const note = Note.C;
		
		const quest = service.major7ChordQuest(note);
		
		expect(quest.inversion).toBeFalsy();
		expect(quest.answerChord).toEqual([Note.C, Note.E, Note.G, Note.B]);
		expect(quest.questChord.toString()).toBe("C maj7");
	});

	it('should generate major 7 first inversion chord quest',() => {
		const note = Note.C;
		
		const quest = service.major7ChordQuest(note, 1);
		
		expect(quest.inversion).toBe(1);
		expect(quest.answerChord).toEqual([Note.B, Note.C, Note.E, Note.G]);
		expect(quest.questChord.toString()).toBe("C maj7/B");
	});

	it('should generate major 7 second inversion chord quest',() => {
		const note = Note.C;
		
		const quest = service.major7ChordQuest(note, 2);
		
		expect(quest.inversion).toBe(2);
		expect(quest.answerChord).toEqual([Note.G, Note.B, Note.C, Note.E]);
		expect(quest.questChord.toString()).toBe("C maj7/G");
	});

	it('should generate major 7 third, inversion chord quest',() => {
		const note = Note.C;
		
		const quest = service.major7ChordQuest(note, 3);
		
		expect(quest.inversion).toBe(3);
		expect(quest.answerChord).toEqual([Note.E, Note.G, Note.B, Note.C]);
		expect(quest.questChord.toString()).toBe("C maj7/E");
	});

	it('should generate minor 7 chord quest',() => {
		const note = Note.C;
		
		const quest = service.minor7ChordQuest(note);
		
		expect(quest.inversion).toBeFalsy();
		expect(quest.answerChord).toEqual([Note.C, Note['D#'], Note.G, Note['A#']]);
		expect(quest.questChord.toString()).toBe("C minor7");
	});

	it('should generate minor 7, first inversion chord quest',() => {
		const note = Note.C;
		
		const quest = service.minor7ChordQuest(note, 1);
		
		expect(quest.inversion).toBe(1);
		expect(quest.answerChord).toEqual([Note['A#'], Note.C, Note['D#'], Note.G]);
		expect(quest.questChord.toString()).toBe("C minor7/A#");
	});

	it('should generate minor 7, second inversion chord quest',() => {
		const note = Note.C;
		
		const quest = service.minor7ChordQuest(note, 2);
		
		expect(quest.inversion).toBe(2);
		expect(quest.answerChord).toEqual([Note.G, Note['A#'], Note.C, Note['D#']]);
		expect(quest.questChord.toString()).toBe("C minor7/G");
	});

	it('should generate minor 7, third inversion chord quest',() => {
		const note = Note.C;
		
		const quest = service.minor7ChordQuest(note, 3);
		
		expect(quest.inversion).toBe(3);
		expect(quest.answerChord).toEqual([Note['D#'], Note.G, Note['A#'], Note.C]);
		expect(quest.questChord.toString()).toBe("C minor7/D#");
	});

	it('should generate dominant 7 chord quest', () => {
		const note = Note.C;

		const quest = service.dominant7ChordQuest(note);
		
		expect(quest.inversion).toBeFalsy();
		expect(quest.answerChord).toEqual([Note.C, Note.E, Note.G, Note['A#']]);
		expect(quest.questChord.toString()).toBe("C dom7");
	});

	it('should generate dominant 7, first inversion chord quest', () => {
		const note = Note.C;

		const quest = service.dominant7ChordQuest(note, 1);
		
		expect(quest.inversion).toBe(1);
		expect(quest.answerChord).toEqual([Note['A#'], Note.C, Note.E, Note.G]);
		expect(quest.questChord.toString()).toBe("C dom7/A#");
	});

	it('should generate dominant 7, second inversion chord quest', () => {
		const note = Note.C;

		const quest = service.dominant7ChordQuest(note, 2);
		
		expect(quest.inversion).toBe(2);
		expect(quest.answerChord).toEqual([Note.G, Note['A#'], Note.C, Note.E]);
		expect(quest.questChord.toString()).toBe("C dom7/G");
	});

	it('should generate dominant 7, third inversion chord quest', () => {
		const note = Note.C;

		const quest = service.dominant7ChordQuest(note, 3);
		
		expect(quest.inversion).toBe(3);
		expect(quest.answerChord).toEqual([Note.E, Note.G, Note['A#'], Note.C]);
		expect(quest.questChord.toString()).toBe("C dom7/E");
	});

	it('should not have duplicate item in the quest list', () => {
		const chordQuest = new ChordQuest(1, QuestCardType.majorChordQuest, TrainingInversionType.none, AccidentalType.all);
		service.addQuest(chordQuest);
		service.addQuest(chordQuest);
		expect(service.currentQuests.length).toBe(1);
	});
});
