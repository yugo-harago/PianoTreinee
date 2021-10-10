import { Injectable } from '@angular/core';
import { Chord as ChordJs, ChordType, Note as NoteJs } from '@tonaljs/tonal';
import { MusicTheoryService } from '../music-theory.service';
import { Note } from '../note.enum';
import { Key } from '../piano.service';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';
import { Quest } from './quest.model';

export enum QuestCardType {
	majorChordQuest = "majorChordQuest",
	minorChordQuest = "minorChordQuest",
	major7ChordQuest = "major7ChordQuest",
	minor7ChordQuest = "minor7ChordQuest",
	dominantChordQuest = "dominantChordQuest",
	dominant7ChordQuest = "dominant7ChordQuest",
}

@Injectable()
export class PianoQuestBundleService implements IPianoQuestBundleService{

	public currentQuestInfo?: {
		questType: QuestCardType, 
		inversion: number,
		note: Note
	}

	private currentQuests: {
		quest: (note: Note, inversion?: number) => Quest,
		inversion: boolean,
		questType: QuestCardType
	}[] = [];

	private storageKey = 'Quests';

	constructor(
		private theory: MusicTheoryService
	) { 
		ChordType.add(["1P", "3M", "5P", "7m"], ["dom7"]);
		ChordType.add(["1P", "3m", "5P", "7m"], ["minor7"]);

		var storedQuest = localStorage.getItem(this.storageKey);
		if(storedQuest) {
			let selecteds = JSON.parse(storedQuest) as {inversion: boolean, questType: QuestCardType}[];
        	localStorage.removeItem(this.storageKey);
			selecteds.forEach(f => this.addQuest(f.questType, f.inversion));
		}
	}

	public resetQuest(){
		this.currentQuests = [];
	}

	public addQuest(questType: QuestCardType, inversion: boolean) {
		switch (questType) {
			case QuestCardType.majorChordQuest: this.currentQuests.push({quest: this.majorChordQuest, inversion, questType}); break;
			case QuestCardType.minorChordQuest: this.currentQuests.push({quest: this.minorChordQuest, inversion, questType}); break;
			case QuestCardType.major7ChordQuest: this.currentQuests.push({quest: this.major7ChordQuest, inversion, questType}); break;
			case QuestCardType.minor7ChordQuest: this.currentQuests.push({quest: this.minor7ChordQuest, inversion, questType}); break;
			case QuestCardType.dominantChordQuest: this.currentQuests.push({quest: this.dominantChordQuest, inversion, questType}); break;
			case QuestCardType.dominant7ChordQuest: this.currentQuests.push({quest: this.dominant7ChordQuest, inversion, questType}); break;
		}
        localStorage.setItem(this.storageKey, JSON.stringify(this.currentQuests));
	}

	public nextQuest(): Quest {
		if(!this.currentQuests.length) throw new Error("Quests not defined");
		const note = this.getRandomInt(2) == 1 ? this.getRandomWhiteNote() : this.getRandomBlackNote();
		const question = this.currentQuests[this.getRandomInt(this.currentQuests.length)];
		const inversion = question.inversion? this.getRandomInt(3) : 0;
		this.currentQuestInfo = { questType: question.questType, inversion, note };
		return question.quest.bind(this)(note, inversion);
	}

	private simplifyNotes(notes: string[]) {
		notes.forEach((n, i) => notes[i] = NoteJs.simplify(n));
	}

	public majorChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		const chord = ChordJs.getChord("major", noteStr);
		if(noteStr.includes("#")) this.simplifyNotes(chord.notes);
		let answerChord = this.theory.convertStringsToNoteEnums(chord.notes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(answerChord);
		return new Quest(answerChord, inversion);
	}

	public minorChordQuest(note: Note, inversion: number = 0): Quest {
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

	public dominantChordQuest(note: Note, inversion: number = 0): Quest {
		const noteStr = Note[note];
		const strNotes = ChordJs.getChord("dom", noteStr).notes;
		if(noteStr.includes("#")) this.simplifyNotes(strNotes);
		let answerChord = this.theory.convertStringsToNoteEnums(strNotes);
		for(let i=0; i<inversion; i++) this.theory.inverseChord(answerChord);
		return new Quest(answerChord, inversion, "dom");
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
