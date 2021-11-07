import { TestBed } from "@angular/core/testing";
import { AccidentalType, Chord } from "./chord.model";
import { Note } from "./note.enum";

describe('Chord model', () => {
  
	beforeEach(() => undefined);

	it('should show sharp Chord when instantiate with default', () => {
		const chord = new Chord(Note["C#"], undefined, 'm');
		expect(chord.toString()).toBe("C# m");
	});

	it('should show sharp Chord', () => {
		const chord = new Chord(Note["C#"], undefined, 'm', AccidentalType.Sharp);
		expect(chord.toString()).toBe("C# m");
	});

	it('should show flat Chord', () => {
		const chord = new Chord(Note["C#"], undefined, 'm', AccidentalType.Flat);
		expect(chord.toString()).toBe("Db m");
	});
});