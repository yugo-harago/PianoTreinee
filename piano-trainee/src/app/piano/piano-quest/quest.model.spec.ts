import { Note } from "../note.enum";
import { Quest } from "./quest.model";

describe('Quest model', () => {

	beforeEach(() => undefined);

	it('should be created', () => {
		expect(new Quest([Note.C])).toBeTruthy();
	});
});
