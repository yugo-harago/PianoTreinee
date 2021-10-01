import { TestBed } from '@angular/core/testing';

import { MusicTheoryService } from './music-theory.service';
import { Note } from './note.enum';
import { Key } from './piano.service';

describe('MusicTheoryService', () => {
  let service: MusicTheoryService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MusicTheoryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should inverse chord', () => {
		let chord = [Note.C, Note.E, Note.G];

		service.inverseChord(chord);

		expect(chord).toEqual([Note.G, Note.C, Note.E]);
	});

	it('should inverse two times the chord', () => {
		let chord = [Note.C, Note.E, Note.G];

		service.inverseChord(chord);
		service.inverseChord(chord);

		expect(chord).toEqual([Note.E, Note.G, Note.C]);
	});

	it('should convert C string chords to enums', () => {
		let chordStr = ["C", "E", "G"];

		let chord = service.convertStringsToNoteEnums(chordStr);

		expect(chord).toEqual([Note.C, Note.E, Note.G]);
	});

	it('should convert C string chords to enums', () => {
		let chordStr = ["C", "Eb", "G"];

		let chord = service.convertStringsToNoteEnums(chordStr);

		expect(chord).toEqual([Note.C, Note['D#'], Note.G]);
	});

	it('should split in two octave if is first inversion quest', () => {
		const chord = [Note.G, Note.C, Note.E];

		let chords = service.splitChordInTwoOctaves(chord);

		expect(chords.octaveUp).toEqual([Note.C, Note.E]);
		expect(chords.octaveDown).toEqual([Note.G]);
	});

	it('should split in two octave if is first inversion quest', () => {
		const chord = [Note.E, Note.G, Note.C];

		let chords = service.splitChordInTwoOctaves(chord);

		expect(chords.octaveUp).toEqual([Note.C]);
		expect(chords.octaveDown).toEqual([Note.E, Note.G]);
	});

	it('should split in two octave if is 7th chord quest', () => {
		const inversion = 0;
		const chord = [Note['F#'], Note.A, Note['C#'], Note.E];

		let chords = service.splitChordInTwoOctaves(chord);

		expect(chords.octaveUp).toEqual([Note['C#'], Note.E]);
		expect(chords.octaveDown).toEqual([Note['F#'], Note.A]);
	});

	it('should split in two octave if is first inversion 7th chord quest', () => {
		const inversion = 1;
		const chord = [Note.E, Note['F#'], Note.A, Note['C#']];

		let chords = service.splitChordInTwoOctaves(chord);

		expect(chords.octaveUp).toEqual([Note['C#']]);
		expect(chords.octaveDown).toEqual([Note.E, Note['F#'], Note.A]);
	});

	it('shold know whether most of the keys are in different octave based on chord', () => {
		
		const chord = [Note.C, Note.E, Note.G, Note['A#']];
		var keys = [new Key(Note.C, 3), new Key(Note.E, 4), new Key(Note.G, 4), new Key(Note['A#'], 4)];
		const baseNote = {note: Note.C, octave: 3};

		const result = service.mostKeysAreInDifferentOctave(keys, baseNote, chord);

		expect(result).toBeTruthy();
	});

	it('shold return false if most of the keys are in current octave when the notes surpass one octave', () => {
		
		const chord = [Note.G, Note.B, Note.D, Note['F#']];
		var keys = [new Key(Note.G, 3), new Key(Note.B, 3), new Key(Note.D, 4), new Key(Note['F#'], 4)];
		const baseNote = {note: Note.G, octave: 3};

		const result = service.mostKeysAreInDifferentOctave(keys, baseNote, chord);

		expect(result).toBeFalsy();
	});
	// it('shold return true if most of the keys are in different octave when the notes surpass one octave', () => {
		
	// 	const chord = [Note.G, Note.B, Note.D, Note['F#']];
	// 	var keys = [new Key(Note.G, 3), new Key(Note.B, 3), new Key(Note.D, 4), new Key(Note['F#'], 4)];
	// 	const baseNote = {note: Note.G, octave: 3};

	// 	const result = service.mostKeysAreInDifferentOctave(keys, baseNote, chord);

	// 	expect(result).toBeTruthy();
	// });
	it('shold return false if is same number of octaves', () => {
		
		const chord = [Note.C, Note.E, Note.G, Note['A#']];
		var keys = [new Key(Note.C, 3), new Key(Note.E, 3), new Key(Note.G, 4), new Key(Note['A#'], 4)];
		const baseNote = {note: Note.C, octave: 3};

		const result = service.mostKeysAreInDifferentOctave(keys, baseNote, chord);

		expect(result).toBeFalsy();
	});
	it('shold return false if most of the octaves are is in current octave', () => {
		
		const chord = [Note.C, Note.E, Note.G, Note['A#']];
		var keys = [new Key(Note.C, 3), new Key(Note.E, 3), new Key(Note.G, 3), new Key(Note['A#'], 4)];
		const baseNote = {note: Note.C, octave: 3};

		const result = service.mostKeysAreInDifferentOctave(keys, baseNote, chord);

		expect(result).toBeFalsy();
	});
	it('shold return false if neither octaves are the most repeated', () => {
		
		const chord = [Note.C, Note.E, Note.G, Note['A#']];
		var keys = [new Key(Note.C, 3), new Key(Note.E, 4), new Key(Note.G, 5), new Key(Note['A#'], 6)];
		const baseNote = {note: Note.C, octave: 3};

		const result = service.mostKeysAreInDifferentOctave(keys, baseNote, chord);

		expect(result).toBeFalsy();
	});
	it('shold return false if neither octaves are the most repeated 2', () => {
		
		const chord = [Note.C, Note.E, Note.G, Note['A#']];
		var keys = [new Key(Note.C, 3), new Key(Note.E, 4), new Key(Note.G, 4), new Key(Note['A#'], 5)];
		const baseNote = {note: Note.C, octave: 3};

		const result = service.mostKeysAreInDifferentOctave(keys, baseNote, chord);

		expect(result).toBeFalsy();
	});

	it('should return false if are most of the octave keys active but are not in suggested chord', () => {
		
		const chord = [Note.C, Note.E, Note.G, Note['A#']];
		var keys = [new Key(Note.C, 3), new Key(Note.D, 4), new Key(Note.G, 4), new Key(Note['A#'], 4)];
		const baseNote = {note: Note.C, octave: 3};

		const result = service.mostKeysAreInDifferentOctave(keys, baseNote, chord);

		expect(result).toBeFalsy();
	});

	// it('should get Base Key Based On Chord', () => {
	// 	const chord = [Note.C, Note.E, Note.G, Note['A#']];
	// 	var keys = [new Key(Note.C, 3), new Key(Note.E, 4), new Key(Note.G, 4), new Key(Note['A#'], 5)];
	// 	const currentOctave = 3;

	// 	const result = service.mostKeysAreInDifferentOctave(keys, currentOctave, chord);

	// 	expect(result).toBeFalsy();
	// })

	it('should rearranged as same octave', () => {
		var keys = [new Key(Note.B, 3), new Key(Note.C, 4)];
		const result = service.rearrangeKeys(keys, Note.B);
		expect(result[0].note).toBe(Note.B);
		expect(result[0].octave).toBe(3);
		expect(result[1].note).toBe(Note.C);
		expect(result[1].octave).toBe(3);
	});

	it('should not rearranged as same octave if is more than a octave', () => {
		var keys = [new Key(Note.A, 3), new Key(Note.B, 4)];
		const result = service.rearrangeKeys(keys, Note.A);
		expect(result[0].note).toBe(Note.A);
		expect(result[0].octave).toBe(3);
		expect(result[1].note).toBe(Note.B);
		expect(result[1].octave).toBe(4);
	});
});
