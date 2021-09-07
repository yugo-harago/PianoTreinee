import { Injectable } from '@angular/core';
import WebMidi, { InputEventNoteon, InputEventNoteoff, Input, Output } from "webmidi";
import { Key } from '../piano.service';
import * as Tone from 'tone'

@Injectable({
  providedIn: 'root'
})
export class MidiService {

	public enabled: boolean = false;
	public inputs: Input[] = [];
	public outputs: Output[] = [];
	public selectedInput?: Input;
	public selectedOutput?: Output;

	constructor() {
	}

	public startMidi() {
		WebMidi.enable((err) => {
			if (err) {
				console.log("WebMidi could not be enabled.", err);
				return;
			}
			this.enabled = true;
			console.log("WebMidi enabled!");
			console.log(WebMidi.inputs);
			console.log(WebMidi.outputs);
			this.inputs = WebMidi.inputs;
			this.outputs = WebMidi.outputs;
			// this.inputs[0].name
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
		//play a middle 'C' for the duration of an 8th note
		synth.triggerAttackRelease(note, "8n");
	}
}
