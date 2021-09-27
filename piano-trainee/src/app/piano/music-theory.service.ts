import { Injectable } from '@angular/core';
import { Note as NoteJs, ChordType} from '@tonaljs/tonal';
import { Note } from './note.enum';


export class Chord {
	public root: Note;
	public baseNote?: Note;
	public type?: string;
	public extension: number = 3;
	constructor(root: Note,baseNote?:Note, type?: string) {
		this.root = root;
		this.type = type;
		this.baseNote = baseNote;
	}

	toString(): string {
		let result = Note[this.root];
		if(this.baseNote)
			result = result + "/" + Note[this.baseNote];
		if(this.type) {
			if(this.baseNote || this.type.length > 2) result = result + " " + this.type;
			else result = result + this.type;
		}
		return result;
	}
}

@Injectable({
  providedIn: 'root'
})
export class MusicTheoryService {
	private NoteJs = NoteJs;

	public inverseChord(list: Note[]){
		list.splice(0, list.length-1).forEach(i => list.push(i))
	}
	
	public convertStringsToNoteEnums(notes: string[]): Note[]{
		let chroma: Note[] = [];
		notes.forEach(n => {
			const note = NoteJs.chroma(n);
			if(note === undefined) throw new Error("Chroma conversion not supported: " + n);
			chroma.push(note);
		});
		return chroma;
	}

	// Split chord into two based on quest inversion
	// Ex: C/E (II) => [E4, G4], [C5]
	// Returns {octaveUp: ["E","G"], octaveDown:["C"]}
	// Ex: G#/C (II) => C D# G#
	// Ex: C/E => [E G] [C]
	public splitChordInTwoOctaves(chord: Note[], inversion: number): {octaveUp: Note[], octaveDown: Note[]}{
		const octaveDown = chord.slice(0,inversion);
		const octaveUp = chord.slice(inversion, chord.length);
		return { octaveUp, octaveDown };
	}
}
