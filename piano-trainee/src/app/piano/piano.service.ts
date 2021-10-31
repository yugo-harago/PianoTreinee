import { Injectable } from '@angular/core';
import { Chord } from "@tonaljs/tonal";
import { BehaviorSubject, Subject } from 'rxjs';
import { IPianoService } from './PianoService.interface';
import * as Tone from 'tone';
import { MidiService } from './midi/midi.service';
import { Note } from './note.enum';

export class Key {
	note: Note;
	isActive: boolean = false;
	octave: number = 0;
	isRight: boolean = false;
	answer: boolean = false;
	//create a synth and connect it to the main output (your speakers)
	synth: Tone.Synth<Tone.SynthOptions> = new Tone.Synth().toDestination();
	accidental: boolean = false;
	constructor(note: Note, octave: number){
		this.note = note;
		this.octave = octave;
		if(Note[note].includes("#")){
			this.accidental = true;
		}
	}
}

export class Keys extends Array<Key> {
	public get actives(): Key[] {
		return this.filter(f => f.isActive);
	}
	public get rights(): Key[] {
		return this.filter(f => f.isRight);
	}

	public reset(): void {
		this.forEach(key => {
			key.isActive = false;
			key.isRight = false;
		});
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
	public keys: Keys = new Keys();
	public octave: Octave = new Octave();
	public detectedChord?: string;
	public onStart: Subject<boolean> = new Subject<boolean>();
	public checkChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public onKeyChenge: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private midi: MidiService,
	) {
		this.loadOctaves();
		this.onKeyChenge.subscribe(bool => {
			const keys = this.keys.map(k => Note[k.note]);
			if(bool) this.detectedChord = Chord.detect(keys)[0];
		})
	}

	public loadOctaves(){
		this.keys = new Keys();
		for (let octave = 1; octave <= this.octave.length; octave++) {
			Object.values(Note).forEach(strNote => {
				if (!isNaN(Number(strNote))) return;
				this.keys.push(new Key((<any>Note)[strNote], octave + this.octave.start()))
			});
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
	public onKeyDown(key: Key | undefined) {
		if(!key) throw new Error("Key is undefined");
		key.isActive = true;
		this.checkChange.next(true);
		this.midi.startPlay(key);
	}
	public onKeyUp(key: Key | undefined) {
		if(!key) throw new Error("Key is undefined");
		key.isActive = false;
		this.checkChange.next(true);
		this.midi.stopPlay(key);
	}

}
