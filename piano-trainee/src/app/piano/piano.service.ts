import { Injectable } from '@angular/core';
import { Interval, Note, Scale, Chord } from "@tonaljs/tonal";

export class Key {
	note: string = "";
	isActive: boolean = false;
	octave: number = 0;
	isRight: boolean = false;
	constructor(note: string, octave: number){
		this.note = note;
		this.octave = octave;
	}
}

@Injectable({
  providedIn: 'root'
})
export class PianoService {

	public notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

	public keys: Key[] = [];
	public startOctave: number = 4;
	public octaves: number = 1;
	public questChord: string = '';
	public answerChords: string[] = [];

	constructor() {
		this.loadOctaves();
	}

	public loadOctaves(){
		this.keys = [];
		for (let octave = 0; octave <= this.octaves; octave++) {
			this.notes.forEach(key => this.keys.push(new Key(key, octave + this.startOctave)));
		}
		if(this.answerChords) this.setAnswer(this.answerChords);
	}

	public startBasicQuest(): void {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = this.getRandomInt(notes.length);
		const quest = notes[noteIndex]
		const chord = Chord.getChord("major", quest);
		this.setAnswer(chord.notes);
		this.questChord = quest;
		this.answerChords = chord.notes;
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
		// Check if any key is active and wrong
		correct = correct && !this.keys.filter(key => key.isActive && !key.isRight).length;
		if(correct) this.answeredRight();
	}

	public answeredRight(){
		this.keys.forEach(key => {
			key.isActive = false;
			key.isRight = false;
		})
		this.startBasicQuest();
	}

	private getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}

}
