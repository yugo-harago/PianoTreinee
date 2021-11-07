import { Injectable } from '@angular/core';
import { Chord as ChordJs, ChordType, Note as NoteJs } from '@tonaljs/tonal';
import { ChordTraining } from 'src/app/user/trainings/select-training/training-options.data';
import { MusicTheoryService } from '../music-theory.service';
import { Note } from '../note.enum';
import { Key } from '../piano.service';
import { IPianoChordQuestBundleService } from './piano-chord-quest-bundle.interface';
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
export class PianoChordQuestBundleService implements IPianoChordQuestBundleService{

	public currentQuestInfo?: {
		questType: QuestCardType, 
		inversion: number,
		note: Note
	}

	public currentQuests: {
		quest: (note: Note, inversion?: number) => Quest,
		chordTraining: ChordTraining
	}[] = [];

	constructor(
		private theory: MusicTheoryService
	) { 
		ChordType.add(["1P", "3M", "5P", "7m"], ["dom7"]);
		ChordType.add(["1P", "3m", "5P", "7m"], ["minor7"]);
	}

	public resetQuest(){
		this.currentQuests.forEach(f => f.chordTraining.selected = false);
		this.currentQuests = [];
	}

	public removeQuest(chordTraining: ChordTraining){
		const i = this.currentQuests.findIndex(f => f.chordTraining.id === chordTraining.id);
		if (i > -1) {
			this.currentQuests.splice(i, 1);
		} else {
			throw new Error("Quest not found to remove");
		}
	}

	public addQuest(chordTraining: ChordTraining) {
		switch (chordTraining.quest) {
			case QuestCardType.majorChordQuest: this.currentQuests.push({quest: this.majorChordQuest, chordTraining}); break;
			case QuestCardType.minorChordQuest: this.currentQuests.push({quest: this.minorChordQuest, chordTraining}); break;
			case QuestCardType.major7ChordQuest: this.currentQuests.push({quest: this.major7ChordQuest, chordTraining}); break;
			case QuestCardType.minor7ChordQuest: this.currentQuests.push({quest: this.minor7ChordQuest, chordTraining}); break;
			case QuestCardType.dominantChordQuest: this.currentQuests.push({quest: this.dominantChordQuest, chordTraining}); break;
			case QuestCardType.dominant7ChordQuest: this.currentQuests.push({quest: this.dominant7ChordQuest, chordTraining}); break;
		}
	}

	public nextQuest(): Quest {
		if(!this.currentQuests.length) throw new Error("Quests not defined");
		const question = this.currentQuests[this.getRandomInt(this.currentQuests.length)];
		let note;
		if(question.chordTraining.accidental)
			note = this.getRandomBlackNote();
		else
			note = this.getRandomWhiteNote();
		const inversion = question.chordTraining.inversion? this.getRandomInt(2) + 1 : 0;
		this.currentQuestInfo = { questType: question.chordTraining.quest, inversion, note };
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
	private getRandomWhiteNote(): Note {
		const notes = [Note.C,Note.D,Note.E,Note.F,Note.G,Note.A,Note.B];
		const noteIndex = this.getRandomInt(notes.length);
		return notes[noteIndex];
	}
	private getRandomBlackNote(): Note {
		const notes = [Note["C#"],Note["D#"],Note["F#"],Note["G#"],Note["A#"]];
		const noteIndex = this.getRandomInt(notes.length);
		return notes[noteIndex];
	}
	private getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}
}
