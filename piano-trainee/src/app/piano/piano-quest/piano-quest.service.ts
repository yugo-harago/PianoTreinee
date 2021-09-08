import { Injectable } from '@angular/core';
import { Interval, Note, Scale, Chord } from "@tonaljs/tonal";
import { BehaviorSubject } from 'rxjs';
import { MidiService } from '../midi/midi.service';
import { Key, Octave, PianoService } from '../piano.service';
import { IPianoService } from '../PianoService.interface';

@Injectable({
  providedIn: 'root'
})
export class PianoQuestService implements IPianoService{

	public questChord: string = '';
	public answerChords: string[] = [];
	
	public checkChange: BehaviorSubject<boolean>;
	public octave: Octave;
	public get keys(): Key[] {
		return this.piano.keys;
	}
	public set keys(value: Key[]) {
		this.piano.keys = value;
	}

	constructor(
		private midi: MidiService,
		private piano: PianoService
	) {
		this.octave = piano.octave;
		this.checkChange = piano.checkChange;
	}

	public nextQuest() {
		// this.majorChordQuest();
		// this.simpleMinorChordQuest();
		// this.blackKeyMajorChordQuest();
		this.blackKeyMinorChordQuest();
	}

	public loadOctaves(){
		this.piano.loadOctaves();
		if(this.answerChords.length) this.setAnswer(this.answerChords);
	}

	public setAnswer(notes: string[]): void {
		this.keys.forEach(key => {
			key.isRight = notes.includes(key.note);
		})
	}

	public checkAnswer(){
		let correct = true;
		// Check if right keys are active
		this.answerChords.forEach(answer => {
			correct = correct && !!this.keys.filter(key => key.note == answer && key.isRight && key.isActive).length;
		});
		// Check if any key is not active and wrong
		correct = correct && !this.keys.filter(key => key.isActive && !key.isRight).length;
		if(correct) this.answeredRight();
	}

	public answeredRight(){
		this.keys.forEach(key => {
			key.isActive = false;
			key.isRight = false;
		})
		this.nextQuest();
	}
	public onKeyClick(key: Key) {
		if(!key.isActive) this.midi.play(key);
		key.isActive = !key.isActive;
		this.checkAnswer();
	}

	// Midi Key Input
	public onKeyDown(key: Key){
		this.piano.onKeyDown(key);
		this.checkAnswer();
	}
	public onKeyUp(key: Key){
		this.piano.onKeyUp(key);
		this.checkAnswer();
	}

	// Major chord with white root key
	public majorChordQuest(): void {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = this.piano.getRandomInt(notes.length);
		const quest = notes[noteIndex];
		const chord = Chord.getChord("major", quest);
		this.setAnswer(chord.notes);
		this.questChord = quest;
		this.answerChords = chord.notes;
		this.checkChange.next(true);
	}

	public blackKeyMajorChordQuest(): void {
		const notes = ["C#","D#","F#","G#","A#"];
		const noteIndex = this.piano.getRandomInt(notes.length);
		const quest = notes[noteIndex];
		const chord = Chord.getChord("major", quest);
		chord.notes.forEach((n, i) => chord.notes[i] = Note.simplify(n));
		this.setAnswer(chord.notes);
		this.questChord = quest;
		this.answerChords = chord.notes;
		this.checkChange.next(true);
	}

	public simpleMinorChordQuest(): void {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = this.piano.getRandomInt(notes.length);
		const noteQuest = notes[noteIndex];
		const chord = Chord.getChord("minor", noteQuest);
		this.setAnswer(chord.notes);
		this.questChord = noteQuest + "m";
		this.answerChords = chord.notes;
		this.checkChange.next(true);
	}

	public blackKeyMinorChordQuest(): void {
		const notes = ["C#","D#","F#","G#","A#"];
		const noteIndex = this.piano.getRandomInt(notes.length);
		const noteQuest = notes[noteIndex];
		const chord = Chord.getChord("minor", noteQuest);
		chord.notes.forEach((n, i) => chord.notes[i] = Note.simplify(n));
		this.setAnswer(chord.notes);
		this.questChord = noteQuest + "m";
		this.answerChords = chord.notes;
		this.checkChange.next(true);
	}
}
