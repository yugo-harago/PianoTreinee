import { Injectable } from '@angular/core';
import { Chord as ChordJs, ChordType, Note as NoteJs } from '@tonaljs/tonal';
import { ChordQuest } from 'src/app/user/trainings/select-training/select-training.component';
import { ChordTraining, TrainingInversionType } from '../../user/trainings/select-training/training-options.data';
import { AccidentalType } from '../../piano/chord.model';
import { MusicTheoryService } from '../../piano/music-theory.service';
import { Note } from '../../piano/note.enum';
import { Key } from '../../piano/piano.service';
import { IPianoChordQuestBundleService } from './piano-chord-quest-bundle.interface';
import { QuestCardType } from './quest-card-type.enum';
import { Quest } from './quest.model';
import { RandomService } from '../random.service';

@Injectable()
export class PianoChordQuestBundleService implements IPianoChordQuestBundleService{

	public currentQuestInfo?: {
		questType: QuestCardType, 
		inversion: number,
		note: Note
	}

	public currentQuests: {
		quest: (note: Note, inversion?: number) => Quest,
		chordQuest: ChordQuest
	}[] = [];

	constructor(
		private theory: MusicTheoryService,
		private random: RandomService
	) { 
		ChordType.add(["1P", "3M", "5P", "7m"], ["dom7"]);
		ChordType.add(["1P", "3m", "5P", "7m"], ["minor7"]);
	}

	public resetQuest(){
		this.currentQuests = [];
	}

	public removeQuest(chordTraining: ChordTraining){
		const i = this.currentQuests.findIndex(f => f.chordQuest.id === chordTraining.id);
		if (i > -1) {
			this.currentQuests.splice(i, 1);
		} else {
			throw new Error("Quest not found to remove");
		}
	}

	public addQuest(chordQuest: ChordQuest) {
		if(this.currentQuests.map(x => x.chordQuest.id).includes(chordQuest.id)) return;
		switch (chordQuest.quest) {
			case QuestCardType.majorChordQuest: this.currentQuests.push({quest: this.majorChordQuest, chordQuest}); break;
			case QuestCardType.minorChordQuest: this.currentQuests.push({quest: this.minorChordQuest, chordQuest}); break;
			case QuestCardType.major7ChordQuest: this.currentQuests.push({quest: this.major7ChordQuest, chordQuest}); break;
			case QuestCardType.minor7ChordQuest: this.currentQuests.push({quest: this.minor7ChordQuest, chordQuest}); break;
			case QuestCardType.dominantChordQuest: this.currentQuests.push({quest: this.dominantChordQuest, chordQuest}); break;
			case QuestCardType.dominant7ChordQuest: this.currentQuests.push({quest: this.dominant7ChordQuest, chordQuest}); break;
		}
	}

	public nextQuest(): Quest {
		if(!this.currentQuests.length) throw new Error("Quests not defined");
		const question = this.currentQuests[this.random.getRandomInt(this.currentQuests.length)];
		const note = this.random.getRandomNote(question.chordQuest.accidental);
		const inversion = this.random.getRandomInversion(question.chordQuest.inversion);
		this.currentQuestInfo = { questType: question.chordQuest.quest, inversion, note };
		let quest = question.quest.bind(this)(note, inversion);
		quest.accidentalShowType = question.chordQuest.accidental;
		return quest;
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
}
