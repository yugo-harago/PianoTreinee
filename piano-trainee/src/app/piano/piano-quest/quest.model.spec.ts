import { Note } from "../note.enum";
import { Quest } from "./quest.model";

describe('Quest model', () => {

	beforeEach(() => undefined);

	it('should be created', () => {
		expect(new Quest([Note.C])).toBeTruthy();
	});

	it('should display C quest', () => {
		const quest = new Quest([Note.C, Note.E, Note.G]);
		expect(quest.questChord.toString()).toBe("C");
	});

	it('should display G#/C quest', () => {
		const quest = new Quest([Note.C, Note['D#'], Note['G#']],2);
		expect(quest.questChord.toString()).toBe("G#/C");
	});
});
