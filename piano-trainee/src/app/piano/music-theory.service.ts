import { Injectable } from '@angular/core';
import { Note } from './note.enum';

@Injectable({
  providedIn: 'root'
})
export class MusicTheoryService {

	public convertStringsToNoteEnums(notes: string[]): Note[]{
		let result: Note[] = [];
		notes.forEach(note => {
			let resultNote: Note = (<any>Note)[note]
			result.push(resultNote)
		});
		return result;
	}
}
