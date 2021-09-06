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

	public questChord: string = '';
	public notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

	public keys: Key[] = [];
	public startOctave: number = 4;
	public octaves: number = 1;

	constructor() {
		this.loadOctaves();
	}

	public loadOctaves(){
		for (let octave = 0; octave <= this.octaves; octave++) {
			this.notes.forEach(key => this.keys.push(new Key(key, octave + this.startOctave)));
		}
	}

	public startBasicQuest(): { quest: string, answer: string[] } {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = this.getRandomInt(notes.length);
		const quest = notes[noteIndex]
		const chord = Chord.getChord("major", quest);
		this.setAnswer(chord.notes);
		return { quest, answer: chord.notes};
	}

	public setAnswer(notes: string[]): void {
		this.keys.forEach(key => {
			key.isRight = notes.includes(key.note);
		})
	}

	private getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}

}
