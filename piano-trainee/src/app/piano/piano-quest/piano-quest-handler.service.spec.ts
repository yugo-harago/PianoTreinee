import { TestBed } from '@angular/core/testing';
import { Key, PianoService } from '../piano.service';
import { PianoQuestBundleService, Quest } from './piano-quest-bundle.service';
import { PianoQuestHandlerService } from './piano-quest-handler.service';
import { TOKENS } from 'src/app/injections-tokens';
import { MidiService } from '../midi/midi.service';
import { Note } from '../note.enum';
import { Chord } from '../music-theory.service';

describe('PianoQuestHandlerService', () => {
	let service: PianoQuestHandlerService;
	let piano: PianoService;

	let pianoQuestStub:{ 
		nextQuest: () => Quest, 
		calledTimes: number,
		quest: Quest | undefined
	} = { 
		nextQuest: () => {
			pianoQuestStub.calledTimes += 1;
			return pianoQuestStub.quest!;
		}, 
		calledTimes: 0,
		quest: undefined
	}

	let midiStub = { 
		play: (key: Key) => {
			console.log(key.note + key.octave + " Played.")
		},
		startPlay: (key: Key) => undefined,
		stopPlay: (key: Key) => undefined,
	}

	const userPressKey = (pressKeys: Note[], octave: number) => {
		pressKeys.forEach(p => {
			const key = piano.keys.find(pk => pk.note == p && pk.octave == octave);
			if(!key) throw new Error("Key not found");
			service.onKeyDown(key)
		});
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: TOKENS.PIANO_QUEST_BUNDLE, useValue: pianoQuestStub },
				{ provide: PianoQuestBundleService, useValue: pianoQuestStub },
				{ provide: MidiService, useValue: midiStub}
			]
		});
		service = TestBed.inject(PianoQuestHandlerService);
		service.canRepeat = true;
		piano = TestBed.inject(PianoService);
		piano.loadOctaves();
		pianoQuestStub.calledTimes = 0;
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should activete the key when pressed', () => {
		// Arrange
		service.quest = new Quest([Note.C, Note.E, Note.G], 0);
		service.setAnswer();
		let key = service.keys.find(k => k.note == Note.C && k.octave == 4);
		// Act
		service.onKeyDown(key);
		// Assert
		const result = service.keys.find(k => k.note == Note.C && k.octave == 4);
		expect(result?.isActive).toBeTruthy();
	});

	it('should keep active the key when other keys are pressed', () => {
		// Arrange
		service.quest = new Quest([Note.C, Note.E, Note.G], 2);
		// Act
		service.setAnswer();
		userPressKey([Note.C, Note.D], 4);
		// Assert
		const result1 = piano.keys.find(k => k.note == Note.C && k.octave == 4);
		const result2 = service.keys.find(k => k.note == Note.D && k.octave == 4);
		expect(result1?.isActive).toBeTruthy();
		expect(result2?.isActive).toBeTruthy();
	});

	it('should call next quest when the answer about triad major chord is right', () => {
		// Arrange
		const quest = new Quest([Note.C, Note.E, Note.G], 0);
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey(quest.answerChord, 4);
		service.checkAnswer();

		// Arrange
		expect(pianoQuestStub.calledTimes).toEqual(2);
	});
	

	it('should not call nextQuest if the last key is released', () => {
		// Arrange
		const quest = new Quest([Note.C, Note.E, Note.G], 0);
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		let key = piano.keys.find(f => f.note == Note.D && f.octave == 4);
		if(!key) throw new Error("Key not found");
		service.onKeyDown(key);
		service.onKeyUp(key);

		// Arrange
		expect(pianoQuestStub.calledTimes).toEqual(1);
	});

	it('should check one inverse key to be right', () => {
		// Arrange
		const quest = new Quest([Note.E, Note.G, Note.C], 2);
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey([Note.C], 4);
		service.checkAnswer();

		// Arrange
		let key = service.keys.find(f => f.note == Note.C && f.octave == 4);
		expect(key?.isActive).toBeTruthy();
		expect(key?.isRight).toBeTruthy();
	});

	it('should be wrong if is not root in the inverse chord', () => {
		// Arrange
		const quest = new Quest([Note.E, Note.G, Note.C], 2);
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey([Note.C, Note.E], 4);
		service.checkAnswer();

		// Arrange
		let cKey = service.keys.find(f => f.note == Note.C && f.octave == 4);
		expect(cKey?.isActive).toBeTruthy();
		expect(cKey?.isRight).toBeFalsy();
		let eKey = service.keys.find(f => f.note == Note.E && f.octave == 4);
		expect(eKey?.isActive).toBeTruthy();
		expect(eKey?.isRight).toBeFalsy();
	});

	it('should be right if is root in the inverse chord', () => {
		// Arrange
		const quest = new Quest([Note.E, Note.G, Note.C], 2);
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey([Note.E], 4);
		userPressKey([Note.C], 3);
		service.checkAnswer();

		// Arrange
		let key = service.keys.find(f => f.note == Note.C && f.octave == 3);
		expect(key?.isActive).toBeTruthy();
		expect(key?.isRight).toBeFalsy();
	});

	it('should be true if is in same octave', () => {
		const quest = new Quest([Note.C, Note.E, Note.G], 0);
		pianoQuestStub.quest = quest;
		const result = service.checkSameOctave([Note.C, Note.E, Note.G]);
		expect(result).toBeTruthy();
	});

	it('should be false when check same octave with one note octave down', () => {
		// G3 C4 E4
		const quest = new Quest([Note.G, Note.C, Note.E], 1);
		pianoQuestStub.quest = quest;
		const result = service.checkSameOctave([Note.G, Note.C, Note.E]);
		expect(result).toBeFalsy();
	});

	it('should be false when check same octave with one note octave up', () => {
		// G3 C4 E4
		const quest = new Quest([Note.E, Note.G, Note.C], 2);
		pianoQuestStub.quest = quest;
		const result = service.checkSameOctave(quest.answerChord);
		expect(result).toBeFalsy();
	});

	it('should be true when check same octave with second inversion quest', () => {
		// G3 C4 E4
		const quest = <Quest>{
			answerChord: [Note.C, Note['D#'], Note['G#']],
			questChord: new Chord(Note['G#'], Note.C),
			inversion: 2
		}
		pianoQuestStub.quest = quest;
		const result = service.checkSameOctave(quest.answerChord);
		expect(result).toBeTruthy();
	});

	it('should be right about G#/C', () => {
		// Arrange
		const quest = new Quest([Note.C, Note['D#'], Note['G#']], 2);
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey(quest.answerChord, 4);
		service.checkAnswer();
		// Assert
		expect(pianoQuestStub.calledTimes).toEqual(2);
	});

	it('should be right if 5th and root is pressed in first inverse chord', () => {
		// Arrange
		const quest = new Quest([Note.E, Note.G, Note.C], 1);
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey([Note.G], 4);
		userPressKey([Note.C], 5);
		service.checkAnswer();

		// Arrange
		let key1 = service.keys.find(f => f.note == Note.C && f.octave == 5);
		expect(key1?.isActive).toBeTruthy();
		expect(key1?.isRight).toBeTruthy();
		let key2 = service.keys.find(f => f.note == Note.G && f.octave == 4);
		expect(key2?.isActive).toBeTruthy();
		expect(key2?.isRight).toBeTruthy();
	});

	it('should not be right in the third note of second major inversion being the sequence, 4,6,9,8', () => {
		// Arrange
		const quest = new Quest([Note.A,Note.D,Note['F#'] ], 2);
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey([Note.D,Note['F#'],Note.B,Note.A], 4);
		service.checkAnswer();

		// Arrange
		let thirdKey = service.keys.find(f => f.note == Note.A && f.octave == 4);
		expect(thirdKey?.isActive).toBeTruthy();
		expect(thirdKey?.isRight).toBeFalsy();
	});

});
