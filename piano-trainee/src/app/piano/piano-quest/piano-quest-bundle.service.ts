import { Injectable } from '@angular/core';
import { Chord, Note } from '@tonaljs/tonal';
import { PianoService } from '../piano.service';
import { PianoQuestHandlerService } from './piano-quest-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PianoQuestBundleService {

	constructor(
		private piano: PianoService,
		private questHandler: PianoQuestHandlerService
		) { }
  

	public nextQuest() {
		// this.majorChordQuest();
		// this.simpleMinorChordQuest();
		// this.blackKeyMajorChordQuest();
		this.blackKeyMinorChordQuest();
	}

	// Major chord with white root key
	public majorChordQuest(): void {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = this.piano.getRandomInt(notes.length);
		const quest = notes[noteIndex];
		const chord = Chord.getChord("major", quest);
		this.questHandler.setAnswer(chord.notes);
		this.questHandler.questChord = quest;
		this.questHandler.answerChords = chord.notes;
		this.questHandler.checkChange.next(true);
	}

	public blackKeyMajorChordQuest(): void {
		const notes = ["C#","D#","F#","G#","A#"];
		const noteIndex = this.piano.getRandomInt(notes.length);
		const quest = notes[noteIndex];
		const chord = Chord.getChord("major", quest);
		chord.notes.forEach((n, i) => chord.notes[i] = Note.simplify(n));
		this.questHandler.setAnswer(chord.notes);
		this.questHandler.questChord = quest;
		this.questHandler.answerChords = chord.notes;
		this.questHandler.checkChange.next(true);
	}

	public simpleMinorChordQuest(): void {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = this.piano.getRandomInt(notes.length);
		const noteQuest = notes[noteIndex];
		const chord = Chord.getChord("minor", noteQuest);
		this.questHandler.setAnswer(chord.notes);
		this.questHandler.questChord = noteQuest + "m";
		this.questHandler.answerChords = chord.notes;
		this.questHandler.checkChange.next(true);
	}

	public blackKeyMinorChordQuest(): void {
		const notes = ["C#","D#","F#","G#","A#"];
		const noteIndex = this.piano.getRandomInt(notes.length);
		const noteQuest = notes[noteIndex];
		const chord = Chord.getChord("minor", noteQuest);
		chord.notes.forEach((n, i) => chord.notes[i] = Note.simplify(n));
		this.questHandler.setAnswer(chord.notes);
		this.questHandler.questChord = noteQuest + "m";
		this.questHandler.answerChords = chord.notes;
		this.questHandler.checkChange.next(true);
	}
}
