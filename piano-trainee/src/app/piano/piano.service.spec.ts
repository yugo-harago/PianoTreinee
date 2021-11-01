import { TestBed } from '@angular/core/testing';
import { TOKENS } from '../injections-tokens';
import { MidiService } from './midi/midi.service';
import { Note } from './note.enum';
import { PianoChordQuestBundleService } from './piano-quest/piano-chord-quest-bundle.service';

import { Keys, Octave, PianoService } from './piano.service';

describe('PianoService', () => {
	let service: PianoService;

	const midiMock = {
		startPlay: () => undefined,
		stopPlay: () => undefined
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: TOKENS.PIANO_QUEST_BUNDLE, useClass: PianoChordQuestBundleService },
				// { provide: PianoQuestBundleService, useValue: pianoQuestStub },
				{ provide: MidiService, useValue: midiMock}
			]
		});
		service = TestBed.inject(PianoService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should load one octave', () => {
		// Arrange
		let octaves = new Octave();
		octaves.length = 1;
		service.octave = octaves;
		service.keys = new Keys();
		// Act
		service.loadOctaves();
		// Assert
		expect(service.keys.length).toEqual(12);
	});

	it('should load two octave', () => {
		// Arrange
		let octaves = new Octave();
		octaves.length = 2;
		service.octave = octaves;
		service.keys = new Keys();
		// Act
		service.loadOctaves();
		// Assert
		expect(service.keys.length).toEqual(12*2);
	});

	it('should activete the key when pressed', () => {
		// Arrange
		let key = service.keys.find(k => k.note == Note.C && k.octave == 4);
		// Act
		service.onKeyDown(key);
		// Assert
		const result = service.keys.find(k => k.note == Note.C && k.octave == 4);
		expect(result?.isActive).toBeTruthy();
	});

	it('should keep active the key when other keys are pressed', () => {
		// Arrange
		let key1 = service.keys.find(k => k.note == Note.C && k.octave == 4);
		let key2 = service.keys.find(k => k.note == Note.D && k.octave == 4);
		// Act
		service.onKeyDown(key1);
		service.onKeyDown(key2);
		// Assert
		const result1 = service.keys.find(k => k.note == Note.C && k.octave == 4);
		const result2 = service.keys.find(k => k.note == Note.D && k.octave == 4);
		expect(result1?.isActive).toBeTruthy();
		expect(result2?.isActive).toBeTruthy();
	});
});
