import { Injectable } from '@angular/core';
import WebMidi, { InputEventNoteon, InputEventNoteoff } from "webmidi";


@Injectable({
  providedIn: 'root'
})
export class MidiService {

  constructor() {
   }

  public startMidi() {
	  WebMidi.enable(function (err) {
		  if (err) {
			console.log("WebMidi could not be enabled.", err);
		  } else {
			console.log("WebMidi enabled!");
			console.log(WebMidi.inputs);
			console.log(WebMidi.outputs);
		  }
		});
  }
}
