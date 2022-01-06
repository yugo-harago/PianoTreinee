import { Note } from './note.enum';
export enum AccidentalType {
	sharp,
	flat,
	flatAndSharp,
	none,
	all
}

export class Chord {
	public root: Note;
	public baseNote?: Note;
	public type?: string; // major, minor, etc
	public extension: number = 3;
	public accidentalType: AccidentalType;
	public get isAccidental(): boolean {
		return [Note['C#'],Note['D#'], Note['F#'], Note['G#'], Note['A#']].includes(this.root);
	}
	constructor(root: Note,baseNote?:Note, type?: string, accidentalType?: AccidentalType) {
		this.root = root;
		this.type = type;
		this.baseNote = baseNote;
		this.accidentalType = accidentalType?? AccidentalType.sharp;
	}

	toString(): string {
		let result = Note[this.root];
		if(this.accidentalType == AccidentalType.flat && this.isAccidental) {
			result = Note[this.root + 1] + "b";
		}
		if(this.type) {
			result = result + " " + this.type;
		}
		if(this.baseNote || this.baseNote === 0)
			result = result + "/" + Note[this.baseNote];
		return result;
	}
}