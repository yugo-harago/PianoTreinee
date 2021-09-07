import { BehaviorSubject } from "rxjs";
import { Key, Octave } from "./piano.service";

export interface IPianoService {
	loadOctaves: () => void;
	onKeyClick: (key: Key) => void;
	checkChange: BehaviorSubject<boolean>;
	octave: Octave;
	keys: Key[];
	onKeyDown: (key: Key) => void;
	onKeyUp: (key: Key) => void;
}