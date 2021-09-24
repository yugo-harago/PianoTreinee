import { Injectable } from '@angular/core';
import { Note as NoteJs} from '@tonaljs/tonal';
import { Note } from './note.enum';

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
}
