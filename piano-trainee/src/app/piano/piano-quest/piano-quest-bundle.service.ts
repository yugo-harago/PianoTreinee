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
		const quest = question(note);
		switch(this.getRandomInt(3)){
			case 1: quest.checkOrder = true; this.firstInversionQuest(quest); break;
			case 2: quest.checkOrder = true; this.secondInversionQuest(quest); break;
			case 3: quest.checkOrder = false; break;
		}
		return quest;
	}

	private simplifyNotes(notes: string[]) {
		notes.forEach((n, i) => notes[i] = NoteJs.simplify(n));
	}

	// Major chord with white root key
	public getMajorChordQuest(note: string): Quest {
		const chord = Chord.getChord("major", note);
		if(note.includes("#")) this.simplifyNotes(chord.notes);
		const answerChord = this.theory.convertStringsToNoteEnums(chord.notes);
		return <Quest>{answerChord, questChord: note};
	}

	public getMinorChordQuest(note: string): Quest {
		const chord = Chord.getChord("minor", note);
		if(note.includes("#")) this.simplifyNotes(chord.notes);
		const answerChord = this.theory.convertStringsToNoteEnums(chord.notes);
		return <Quest>{answerChord, questChord: note + "m"};
	}

	public major7ChordQuest(note: string): Quest {
		let quest = new Quest();
		const strNotes = Chord.getChord("maj7", note).notes;
		if(note.includes("#")) this.simplifyNotes(strNotes);
		quest.answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		quest.questChord = note + "maj7";
		return quest;
	}

	public minor7ChordQuest(note: string): Quest{
		let quest = new Quest();
		const strNotes = Chord.getChord("minor7", note).notes;
		if(note.includes("#")) this.simplifyNotes(strNotes);
		quest.answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		quest.questChord = note + "minor7";
		return quest;
	}

	public dominant7ChordQuest(note: string): Quest {
		let quest = new Quest();
		const strNotes = Chord.getChord("dom7", note).notes;
		if(note.includes("#")) this.simplifyNotes(strNotes);
		quest.answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		quest.questChord = note + "dom7";
		return quest;
	}

	public firstInversionQuest(quest: Quest): Quest {
		this.inverseChord(quest.answerChord);
		quest.questChord += "/" + quest.answerChord[0];
		quest.inversion = 1;
		return quest;
	}

	public secondInversionQuest(quest: Quest): Quest {
		this.inverseChord(quest.answerChord);
		this.inverseChord(quest.answerChord);
		quest.questChord += "/" + quest.answerChord[0];
		quest.inversion = 2;
		return quest;
	}

	private inverseChord(list: any[]){
		list.push(list.splice(0, 1)[0]);
	}
	private getRandomBlackNote(): string {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = this.getRandomInt(notes.length);
		return notes[noteIndex];
	}
	private getRandomWhiteNote(): string {
		const notes = ["C#","D#","F#","G#","A#"];
		const noteIndex = this.getRandomInt(notes.length);
		return notes[noteIndex];
	}
	private getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}
}
