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

	constructor() {
		this.loadOctaves();
	}

	public loadOctaves(){
		this.keys = [];
		for (let octave = 0; octave <= this.octaves; octave++) {
			this.notes.forEach(key => this.keys.push(new Key(key, octave + this.startOctave)));
		}
	}

	public getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}
	public onKeyClick(key: Key) {
		key.isActive = !key.isActive;
		setTimeout(() => {
			key.isActive = false;
		}, 1000)
	}

}
