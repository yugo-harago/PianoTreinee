import { TestBed } from '@angular/core/testing';

import { MusicTheoryService } from './music-theory.service';
import { Note } from './note.enum';

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
});
