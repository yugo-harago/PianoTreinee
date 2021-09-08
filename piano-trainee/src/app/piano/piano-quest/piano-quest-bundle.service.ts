import { Injectable } from '@angular/core';
import { Chord, Note } from '@tonaljs/tonal';
import { PianoService } from '../piano.service';
import { PianoQuestHandlerService } from './piano-quest-handler.service';

export class Quest {
	public answerChords: string[] = [];
	public questChord: string = "";
}

@Injectable({
  providedIn: 'root'
})
export class PianoQuestBundleService {

	constructor() { }

	public nextQuest(): Quest {
		// this.majorChordQuest();
		// this.simpleMinorChordQuest();
		// this.blackKeyMajorChordQuest();
		return this.blackKeyMinorChordQuest();
	}

	// Major chord with white root key
	public majorChordQuest(): Quest {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = this.getRandomInt(notes.length);
		const quest = notes[noteIndex];
		const chord = Chord.getChord("major", quest);
		return <Quest>{answerChords: chord.notes, questChord: quest};
	}

	public blackKeyMajorChordQuest(): Quest {
		const notes = ["C#","D#","F#","G#","A#"];
		const noteIndex = this.getRandomInt(notes.length);
		const quest = notes[noteIndex];
		const chord = Chord.getChord("major", quest);
		chord.notes.forEach((n, i) => chord.notes[i] = Note.simplify(n));
		return <Quest>{answerChords: chord.notes, questChord: quest};
	}

	public simpleMinorChordQuest(): Quest {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = this.getRandomInt(notes.length);
		const noteQuest = notes[noteIndex];
		const chord = Chord.getChord("minor", noteQuest);
		return <Quest>{answerChords: chord.notes, questChord: noteQuest + "m"};
	}

	public blackKeyMinorChordQuest(): Quest {
		const notes = ["C#","D#","F#","G#","A#"];
		const noteIndex = this.getRandomInt(notes.length);
		const noteQuest = notes[noteIndex];
		const chord = Chord.getChord("minor", noteQuest);
		chord.notes.forEach((n, i) => chord.notes[i] = Note.simplify(n));
		return <Quest>{answerChords: chord.notes, questChord: noteQuest + "m"};
	}

	public getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}
}
