import { TestBed } from '@angular/core/testing';
import { Note } from '../note.enum';

import { PianoQuestBundleService } from './piano-quest-bundle.service';

describe('PianoQuestBundleService', () => {
	let service: PianoQuestBundleService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PianoQuestBundleService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should generate major third quest', () => {
		const note = Note.C;
		
		const quest = service.getMajorChordQuest(note);
		
		expect(quest.answerChord).toEqual([Note.C, Note.E, Note.G]);
		expect(quest.questChord).toBe("C");
	});

	it('should generate major third inversion quest',() => {
		const note = Note.C;
		
		const quest = service.getMajorChordQuest(note, 1);
		
		expect(quest.answerChord).toEqual([Note.G, Note.C, Note.E]);
		expect(quest.questChord).toBe("C/G");
	});

	it('should generate major third second inversion quest',() => {
		const note = Note.C;
		
		const quest = service.getMajorChordQuest(note, 2);
		
		expect(quest.answerChord).toEqual([Note.E, Note.G, Note.C]);
		expect(quest.questChord).toBe("C/E");
	});

	it('should generate minor third quest', () => {
		const note = Note.C;
		
		const quest = service.getMinorChordQuest(note);
		
		expect(quest.answerChord).toEqual([Note.C, Note['D#'], Note.G]);
		expect(quest.questChord).toBe("Cm");
	});

	it('should generate minor third inversion quest',() => {
		const note = Note.C;
		
		const quest = service.getMinorChordQuest(note, 1);
		
		expect(quest.answerChord).toEqual([Note.G, Note.C, Note['D#']]);
		expect(quest.questChord).toBe("C/G m");
	});

	it('should generate minor third second inversion quest',() => {
		const note = Note.C;
		
		const quest = service.getMinorChordQuest(note, 2);
		
		expect(quest.answerChord).toEqual([Note['D#'], Note.G, Note.C]);
		expect(quest.questChord).toBe("C/D# m");
	});

	// it('should show quest chord text with dominant quest', () => {
	// 	const note = Note.C;

	// 	const quest = service.dominant7ChordQuest(note);
		
	// 	expect(quest.questChord).toBe("C dom7");
	// });

	// it('should show quest chord text with first inversion dominant quest', () => {
	// 	const note = Note.C;
		
	// 	const quest = service.dominant7ChordQuest(note, 1);
		
	// 	expect(quest.questChord).toBe("C/G dom7");
	// });
});
