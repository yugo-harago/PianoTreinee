import { Injectable } from '@angular/core';
import { Interval, Note, Scale, Chord } from "@tonaljs/tonal";
import { MidiService } from './midi/midi.service';

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
	public octave = {
		lenght: 1,
		middle: 4,
		start: () => {
			return this.octave.middle - Math.ceil((this.octave.lenght-1)/2) -1;
		}
	}

	constructor(
		public midi: MidiService
	) {
		this.loadOctaves();
	}

	public loadOctaves(){
		this.keys = [];
		for (let octave = 1; octave <= this.octave.lenght; octave++) {
			this.notes.forEach(key => this.keys.push(new Key(key, octave + this.octave.start())));
		}
	}

	public getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}

	public onKeyClick(key: Key) {
		key.isActive = !key.isActive;
		this.midi.play(key);
		setTimeout(() => {
			key.isActive = false;
		}, 1000)
	}

}
