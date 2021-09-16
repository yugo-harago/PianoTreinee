import { Inject, Injectable } from '@angular/core';
import { Interval, Note, Scale, Chord } from "@tonaljs/tonal";
import { BehaviorSubject } from 'rxjs';
import { IPianoService } from './PianoService.interface';
import * as Tone from 'tone';
import { TOKENS } from '../injections-tokens';
import { MidiService } from './midi/midi.service';

export class Key {
	note: string = "";
	isActive: boolean = false;
	octave: number = 0;
	isRight: boolean = false;
	synth: Tone.Synth<Tone.SynthOptions> = new Tone.Synth().toDestination();
	constructor(note: string, octave: number){
		this.note = note;
		this.octave = octave;
	}
}

export class Octave {
	public length: number = 3;
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
	public detectedChord?: string;

	public checkChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public onKeyChenge: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private midi: MidiService,
	) {
		this.loadOctaves();
		this.onKeyChenge.subscribe(bool => {
			const keys = this.keys.map(k => k.note);
			if(bool) this.detectedChord = Chord.detect(keys)[0];
		})
	}

	public loadOctaves(){
		this.keys = [];
		for (let octave = 1; octave <= this.octave.length; octave++) {
			this.notes.forEach(key => this.keys.push(new Key(key, octave + this.octave.start())));
		}
	}

	// Mouse/Screen Input
	public onKeyClick(key: Key) {
		key.isActive = !key.isActive;
		this.midi.play(key);
		this.checkChange.next(true);
		setTimeout(() => {
			key.isActive = false;
			this.checkChange.next(true);
		}, 1000)
	}

	// Midi Key Input
	public onKeyDown(key: Key){
		key.isActive = true;
		this.checkChange.next(true);
		this.midi.startPlay(key);
	}
	public onKeyUp(key: Key){
		key.isActive = false;
		this.checkChange.next(true);
		this.midi.stopPlay(key);
	}

}
