import { Chord } from "../music-theory.service";
import { Note } from "../note.enum";

export class Quest {
	public answerChord: Note[] = [];
	public questChord: Chord;
	public inversion: number = 0;

	constructor(answerChord: Note[], inversion: number = 0, chordType?: string){
		if(inversion) this.questChord = new Chord([...answerChord].splice(inversion,1)[0], [...answerChord].splice(0,1)[0], chordType);
		else this.questChord = new Chord(answerChord[0], undefined, chordType)
		this.answerChord = answerChord;
		this.inversion = inversion;
	}
}
