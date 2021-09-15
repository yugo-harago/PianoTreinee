import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Key } from "../piano.service";
import { IWebMidiService } from "./midi.interface";

@Injectable()
export class WebMidiMock implements IWebMidiService{
	enabled: boolean = true;
	inputs: any[] = [];
	outputs: any[] = [];
	selectedOutput?: any;
	public onMidiKeyPress: BehaviorSubject<{note: string, octave: number} | undefined> = 
		new BehaviorSubject<{note: string, octave: number} | undefined>(undefined);
	public onMidiKeyRelease: BehaviorSubject<{note: string, octave: number} | undefined> = 
		new BehaviorSubject<{note: string, octave: number} | undefined>(undefined);
	public onConnected: BehaviorSubject<any | undefined> = new BehaviorSubject<any | undefined>(undefined);
	startMidi: () => void = ()=>{};
	play: (key: Key) => void = ()=>{};
	startPlay: (key: Key) => void = ()=>{};
	stopPlay: (key: Key) => void = ()=>{};
	selectInput: (input: any) => void = ()=>{};

}