import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { Key, PianoService } from '../piano.service';
import { PianoQuestBundleService, Quest } from './piano-quest-bundle.service';
import {AppModule} from '../../app.module';
import { PianoQuestHandlerService } from './piano-quest-handler.service';
import { UserModule } from 'src/app/user/user.module';
import { TOKENS } from 'src/app/injections-tokens';
import { configureTestSuite } from 'ng-bullet';
import { MidiService } from '../midi/midi.service';

describe('PianoQuestHandlerService', () => {
	let service: PianoQuestHandlerService;
	let piano: PianoService;

	let pianoQuestStub = { 
		nextQuest: () => {
			pianoQuestStub.calledTimes += 1;
			return pianoQuestStub.quest;
		}, 
		calledTimes: 0,
		quest: new Quest()
	}

	let midiStub = { 
		play: (key: Key) => {
			console.log(key.note + key.octave + " Played.")
		},
		startPlay: (key: Key) => {},
		stopPlay: (key: Key) => {}
	}

	const userPressKey = (pressKeys: string[], octave: number) => {
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
		pianoQuestStub.quest = new Quest();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should call next quest when the answer about triad major chord is right', () => {
		// Arrange
		const quest = <Quest>{
			answerChord: ["C", "E", "G"],
			checkOrder: false,
			questChord: "C"
		}
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
		const quest = <Quest>{
			answerChord: ["C", "E", "G"],
			checkOrder: false,
			questChord: "C"
		}
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		let key = piano.keys.find(f => f.note == "D" && f.octave == 4);
		if(!key) throw new Error("Key not found");
		service.onKeyDown(key);
		service.onKeyUp(key);

		// Arrange
		expect(pianoQuestStub.calledTimes).toEqual(1);
	})

	it('should check one inverse key to be right', () => {
		// Arrange
		const quest = <Quest>{
			answerChord: ["E", "G", "C"],
			checkOrder: true,
			questChord: "C/E"
		}
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey(["C"], 4);
		service.checkAnswer();

		// Arrange
		let key = service.keys.find(f => f.note == "C" && f.octave == 4);
		expect(key?.isActive).toBeTruthy();
		expect(key?.isRight).toBeTruthy();
	});

	it('should be wrong if is not root in the inverse chord', () => {
		// Arrange
		const quest = <Quest>{
			answerChord: ["E", "G", "C"],
			checkOrder: true,
			questChord: "C/E",
			inversion: 1
		}
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey(["C", "E"], 4);
		service.checkAnswer();

		// Arrange
		let key = service.keys.find(f => f.note == "E" && f.octave == 4);
		expect(key?.isActive).toBeTruthy();
		expect(key?.isRight).toBeFalsy();
	});

	it('should be right if is root in the inverse chord', () => {
		// Arrange
		const quest = <Quest>{
			answerChord: ["E", "G", "C"],
			checkOrder: true,
			questChord: "C/E",
			inversion: 1
		}
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey(["E"], 4);
		userPressKey(["C"], 3);
		service.checkAnswer();

		// Arrange
		let key = service.keys.find(f => f.note == "C" && f.octave == 3);
		expect(key?.isActive).toBeTruthy();
		expect(key?.isRight).toBeFalsy();
	});

	it('should be right if 5th and root is pressed in first inverse chord', () => {
		// Arrange
		const quest = <Quest>{
			answerChord: ["E", "G", "C"],
			checkOrder: true,
			questChord: "C/E",
			inversion: 1
		}
		pianoQuestStub.quest = quest;
		// Act
		service.nextQuest();
		userPressKey(["G"], 4);
		userPressKey(["C"], 5);
		service.checkAnswer();

		// Arrange
		let key1 = service.keys.find(f => f.note == "C" && f.octave == 5);
		expect(key1?.isActive).toBeTruthy();
		expect(key1?.isRight).toBeTruthy();
		let key2 = service.keys.find(f => f.note == "G" && f.octave == 4);
		expect(key2?.isActive).toBeTruthy();
		expect(key2?.isRight).toBeTruthy();
	});

});
