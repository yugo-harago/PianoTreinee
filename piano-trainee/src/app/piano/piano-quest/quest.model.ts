import { AccidentalType, Chord } from "../music-theory.service";
import { Note } from "../note.enum";

export class Quest {
	public answerChord: Note[] = [];
	public questChord: Chord;
	public inversion: number = 0;
	public checkOrder: boolean = false;
	public get accidentalShowType(): AccidentalType {
		return this.questChord.accidentalType;
	}
	public set accidentalShowType(value: AccidentalType) {
		this.questChord.accidentalType = value;
	}

	constructor(answerChord: Note[], inversion: number = 0, chordType?: string, checkOrder?: boolean, accidentalShowType?: AccidentalType) {
		if(inversion) this.questChord = new Chord([...answerChord].splice(inversion,1)[0], [...answerChord].splice(0,1)[0], chordType, accidentalShowType);
		else this.questChord = new Chord(answerChord[0], undefined, chordType, accidentalShowType);
		this.answerChord = answerChord;
		this.inversion = inversion;
		this.checkOrder = checkOrder?? !!inversion;
	}
}
