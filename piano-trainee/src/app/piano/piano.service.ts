import { Injectable } from '@angular/core';
import { Interval, Note, Scale, Chord } from "@tonaljs/tonal";
import { BehaviorSubject } from 'rxjs';
import { MidiService } from './midi/midi.service';
import { IPianoService } from './PianoService.interface';

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

export class Octave {
	public length: number = 1;
	public middle: number = 4;
	public start = () => {
		return this.middle - Math.ceil((this.length-1)/2) -1;
	}
}

@Injectable({
  providedIn: 'root'
})
export class PianoService implements IPianoService{

	public notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

	public keys: Key[] = [];
	public octave: Octave = new Octave();

	public checkChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		public midi: MidiService
	) {
		this.loadOctaves();
		this.midi.onMidiKeyPress.subscribe(e => {
			if(!e) return;
			let key = this.keys.find(key => key.note == e.note && key.octave == e.octave);
			if(key) this.onKeyClick(key);
			else console.error("Key not found.")
		});
	}

	public loadOctaves(){
		this.keys = [];
		for (let octave = 1; octave <= this.octave.length; octave++) {
			this.notes.forEach(key => this.keys.push(new Key(key, octave + this.octave.start())));
		}
	}

	public getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}

	public onKeyClick(key: Key) {
		key.isActive = !key.isActive;
		this.midi.play(key);
		this.checkChange.next(true);
		setTimeout(() => {
			key.isActive = false;
			this.checkChange.next(true);
		}, 1000)
	}

}
