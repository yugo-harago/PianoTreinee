import { Injectable } from '@angular/core';
import { Chord, Note as NoteJs } from '@tonaljs/tonal';
import { MusicTheoryService } from '../music-theory.service';
import { Note } from '../note.enum';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';

export class Quest {
	public answerChord: Note[] = [];
	public questChord: string = "";
	public checkOrder?: boolean;
	public baseOctave?: number;
	public inversion: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class PianoQuestBundleService implements IPianoQuestBundleService{

	constructor(
		private theory: MusicTheoryService
	) { }

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
		const quest = question(note, inversion);
		if(inversion) quest.checkOrder = true;
		return quest;
	}

	private simplifyNotes(notes: string[]) {
		notes.forEach((n, i) => notes[i] = NoteJs.simplify(n));
	}

	// Major chord with white root key
	public getMajorChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		const chord = Chord.getChord("major", noteStr);
		if(noteStr.includes("#")) this.simplifyNotes(chord.notes);
		let answerChord = this.theory.convertStringsToNoteEnums(chord.notes);
		let questChord = noteStr;
		for(let i=0; i<inversion; i++) this.theory.inverseChord(answerChord);
		if(inversion) questChord = Note[note] + "/" + Note[answerChord[0]];
		return <Quest>{answerChord, questChord};
	}

	public getMinorChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		const chord = Chord.getChord("minor", noteStr);
		if(noteStr.includes("#")) this.simplifyNotes(chord.notes);
		let answerChord = this.theory.convertStringsToNoteEnums(chord.notes);
		let questChord = noteStr + "m";
		for(let i=0; i<inversion; i++) this.theory.inverseChord(answerChord);
		if(inversion) questChord = Note[note] + "/" + Note[answerChord[0]] + " m";
		return <Quest>{answerChord, questChord};
	}

	public major7ChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		let quest = new Quest();
		const strNotes = Chord.getChord("maj7", noteStr).notes;
		if(noteStr.includes("#")) this.simplifyNotes(strNotes);
		quest.answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(quest.answerChord);
		quest.questChord = noteStr + "maj7";
		return quest;
	}

	public minor7ChordQuest(note: Note, inversion: number = 0): Quest{
		const noteStr = Note[note];
		let quest = new Quest();
		const strNotes = Chord.getChord("minor7", noteStr).notes;
		if(noteStr.includes("#")) this.simplifyNotes(strNotes);
		quest.answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(quest.answerChord);
		quest.questChord = noteStr + "minor7";
		return quest;
	}

	public dominant7ChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		let quest = new Quest();
		const strNotes = Chord.getChord("dom7", noteStr).notes;
		if(noteStr.includes("#")) this.simplifyNotes(strNotes);
		quest.answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(quest.answerChord);
		quest.questChord = noteStr + " dom7";
		return quest;
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
