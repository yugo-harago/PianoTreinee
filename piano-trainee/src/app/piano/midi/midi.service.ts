import { Injectable } from '@angular/core';
import WebMidi, { Input, Output, WebMidiEventConnected } from "webmidi";
import { Key } from '../piano.service';
import * as Tone from 'tone';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../note.enum';

// Nota: https://developer.chrome.com/blog/autoplay/#webaudio
@Injectable()
export class MidiService {

	public enabled: boolean = false;
	public inputs: Input[] = [];
	public outputs: Output[] = [];
	private selectedInput?: Input;
	public selectedOutput?: Output;
	public onMidiKeyPress: BehaviorSubject<{note: Note, octave: number} | undefined> = 
		new BehaviorSubject<{note: Note, octave: number} | undefined>(undefined);
	public onMidiKeyRelease: BehaviorSubject<{note: Note, octave: number} | undefined> = 
		new BehaviorSubject<{note: Note, octave: number} | undefined>(undefined);
	public onConnected: BehaviorSubject<WebMidiEventConnected | undefined> = new BehaviorSubject<WebMidiEventConnected | undefined>(undefined);

	public startMidi() {
		Tone.start();
		WebMidi.enable((err) => {
			if (err) {
				console.log("WebMidi could not be enabled.", err);
				return;
			}
			this.enabled = true;
			console.log(WebMidi.inputs);
			console.log(WebMidi.outputs);
			this.inputs = WebMidi.inputs;
			this.outputs = WebMidi.outputs;

			WebMidi.addListener("connected", (e) => {
				this.onConnected.next(e);
				if(!this.selectedInput) this.selectInput(WebMidi.inputs[0]);
			});
		});
	}

	public play(key: Key){
		const note = key.note + key.octave;
		if(this.selectedOutput) {
			this.selectedOutput.playNote(note);
			return;
		}
		//create a synth and connect it to the main output (your speakers)
		const synth = new Tone.Synth().toDestination();
		//play a note for the duration of an 8th note
		synth.triggerAttackRelease(note, "8n");
	}

	// Most browsers will not allow to play any audio until user clicks something
	public startPlay(key: Key){
		key.synth.triggerAttack(key.note + key.octave);
	}
	public stopPlay(key: Key){
		key.synth.triggerRelease();
	}

	public selectInput(input: Input): void {
		this.selectedInput = input;
		// Listen for a 'note on' message on all channels
		input.addListener('noteon', "all",
			(e) => {
				const note = e.note.name;
				const octave = e.note.octave;
				this.onMidiKeyPress.next({note:(<any>Note)[note],octave});
			}
	  	);
		input.addListener('noteoff', "all",
			(e) => {
				const note = e.note.name;
				const octave = e.note.octave;
				this.onMidiKeyRelease.next({note:(<any>Note)[note],octave});
			}
		);
	}
}
