import { Injectable } from '@angular/core';
import { Chord as ChordJs, ChordType, Note as NoteJs } from '@tonaljs/tonal';
import { Chord, MusicTheoryService } from '../music-theory.service';
import { Note } from '../note.enum';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';

export class Quest {
	public answerChord: Note[] = [];
	public questChord: Chord;
	public base?: {octave: number, note: Note};
	public inversion: number = 0;

	constructor(answerChord: Note[], inversion: number = 0, chordType?: string){
		if(inversion) this.questChord = new Chord([...answerChord].splice(inversion,1)[0], [...answerChord].splice(0,1)[0], chordType);
		else this.questChord = new Chord(answerChord[0], undefined, chordType)
		this.answerChord = answerChord;
		this.inversion = inversion;
	}
}

@Injectable({
  providedIn: 'root'
})
export class PianoQuestBundleService implements IPianoQuestBundleService{

	constructor(
		private theory: MusicTheoryService
	) { 
		ChordType.add(["1P", "3M", "5P", "7m"], ["dom7"]);
		ChordType.add(["1P", "3m", "5P", "7m"], ["minor7"]);
	}

	public nextQuest(): Quest {
		
		const note = this.getRandomInt(2) == 1 ? this.getRandomWhiteNote() : this.getRandomBlackNote();
		const quests = [
			this.getMajorChordQuest,
			this.getMinorChordQuest,
			this.major7ChordQuest,
			this.minor7ChordQuest,
			this.dominant7ChordQuest
		];
		const question = quests[this.getRandomInt(quests.length)].bind(this);
		const inversion = this.getRandomInt(3) - 1;
		return question(note, inversion);
	}

	private simplifyNotes(notes: string[]) {
		notes.forEach((n, i) => notes[i] = NoteJs.simplify(n));
	}

	// Major chord with white root key
	public getMajorChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		const chord = ChordJs.getChord("major", noteStr);
		if(noteStr.includes("#")) this.simplifyNotes(chord.notes);
		let answerChord = this.theory.convertStringsToNoteEnums(chord.notes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(answerChord);
		return new Quest(answerChord, inversion);
	}

	public getMinorChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		const chord = ChordJs.getChord("minor", noteStr);
		if(noteStr.includes("#")) this.simplifyNotes(chord.notes);
		let answerChord = this.theory.convertStringsToNoteEnums(chord.notes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(answerChord);
		return new Quest(answerChord, inversion, "m");
	}

	public major7ChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		const strNotes = ChordJs.getChord("maj7", noteStr).notes;
		if(noteStr.includes("#")) this.simplifyNotes(strNotes);
		let answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(answerChord);
		return new Quest(answerChord, inversion, "maj7");
	}

	public minor7ChordQuest(note: Note, inversion: number = 0): Quest{
		const noteStr = Note[note];
		const strNotes = ChordJs.getChord("minor7", noteStr).notes;
		if(noteStr.includes("#")) this.simplifyNotes(strNotes);
		let answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(answerChord);
		return new Quest(answerChord, inversion, "minor7");
	}

	public dominant7ChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		const strNotes = ChordJs.getChord("dom7", noteStr).notes;
		if(noteStr.includes("#")) this.simplifyNotes(strNotes);
		let answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(answerChord);
		return new Quest(answerChord, inversion, "dom7");
	}
	private getRandomBlackNote(): Note {
		const notes = [Note.C,Note.D,Note.E,Note.F,Note.G,Note.A,Note.B];
		const noteIndex = this.getRandomInt(notes.length);
		return notes[noteIndex];
	}
	private getRandomWhiteNote(): Note {
		const notes = [Note["C#"],Note["D#"],Note["F#"],Note["G#"],Note["A#"]];
		const noteIndex = this.getRandomInt(notes.length);
		return notes[noteIndex];
	}
	private getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}
}
