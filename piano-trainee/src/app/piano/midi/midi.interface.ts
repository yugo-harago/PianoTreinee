import { BehaviorSubject } from "rxjs";
import { Key } from "../piano.service";

// Not including WebMidi to avoid slow processing
export interface IWebMidiService{
	enabled: boolean;
	inputs: any[];
	outputs: any[];
	selectedOutput?: any;
	onMidiKeyPress: BehaviorSubject<{note: string, octave: number} | undefined>;
	onMidiKeyRelease: BehaviorSubject<{note: string, octave: number} | undefined>;
	onConnected: BehaviorSubject<any | undefined> ;

	startMidi: () => void;
	play:(key: Key) => void;
	startPlay:(key: Key) => void;
	stopPlay: (key: Key) => void;
	selectInput: (input: any) => void;
}