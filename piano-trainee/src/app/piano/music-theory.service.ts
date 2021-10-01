import { Injectable } from '@angular/core';
import { Note as NoteJs } from '@tonaljs/tonal';
import { Note } from './note.enum';
import { Key } from './piano.service';


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
		if(this.baseNote || this.baseNote === 0)
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
	public splitChordInTwoOctaves(chord: Note[]): {octaveUp: Note[], octaveDown: Note[]}{
		let lastTone = chord[0];
		let splitIndex = 0;
		chord.forEach((note, i) => {
			if(note < lastTone) { // octave break
				splitIndex = i;
			}
			lastTone = note;
		});
		const octaveDown = chord.slice(0,splitIndex);
		const octaveUp = chord.slice(splitIndex, chord.length);
		return { octaveUp, octaveDown };
	}
	public mostKeysAreInDifferentOctave(activeKeys: Key[], baseNote: {note: Note, octave: number}, suggestedChord: Note[]): boolean {
		const anyWrongNote = !!activeKeys.find(key => !suggestedChord.includes(key.note));
		if(anyWrongNote) return false;
		const rearrangedKeys = this.rearrangeKeys(activeKeys, baseNote.note);
		const most = Math.floor(rearrangedKeys.length/2);
		let counter = this.counter(rearrangedKeys.map(k => k.octave));
		const octaves =  Object.keys(counter).map(m => Number(m)).sort((a, b) => counter[b] - counter[a]);
		const biggestOctave = octaves[0];
		const biggestOctaveCount = counter[biggestOctave];
		const isEven = octaves[0] == octaves[1];
		if(isEven) return false;
		if(biggestOctave == baseNote.octave) return false;
		if(biggestOctaveCount > most) return true;
		return false;
	}

	public rearrangeKeys(keys: Key[], baseNote: Note): Key[]{
		const baseKeys = keys.filter(f => f.note == baseNote);
		if(!baseKeys.length) throw new Error("Base Key not found!");
		if(baseKeys.length > 1) throw new Error("Base Key is more than one!");
		const baseKey = baseKeys[0];
		let { octaveUp, octaveDown } = this.splitChordInTwoOctaves(keys.map(k => k.note));
		const sameOctave = [...keys];
		sameOctave.forEach(key => {
			if(octaveUp.includes(key.note) && key.octave == baseKey.octave){
				return;
			}
			if(octaveDown.includes(key.note) && key.octave == baseKey.octave){
				return;
			}
			if(octaveUp.includes(key.note) && key.octave == baseKey.octave){
				return;
			}
			if(octaveUp.includes(key.note) && key.octave == baseKey.octave + 1 && key.note < baseKey.note){
				key.octave = baseKey.octave;
				return;
			}
			if(octaveDown.includes(key.note) && key.octave == baseKey.octave + 1){
				key.octave = baseKey.octave + 1;
				return;
			}
		});
		return sameOctave;
	}

	private counter(array: number[]) {
		let count: any = {};
		array.forEach(val => count[val] = (count[val] || 0) + 1);
		return count;
	}

	public getBaseKeyBasedOnChord(activeKeys: Key[], chord: Note[]): {note: Note, octave: number}{
		return {note: Note.C, octave: 0};
	}
}
