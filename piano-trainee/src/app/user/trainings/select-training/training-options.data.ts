import { AccidentalType } from "src/app/piano/chord.model";
import { Note } from "src/app/piano/note.enum";
import { Keys } from "src/app/piano/piano.service";
import { QuestCardType } from "src/app/quest/piano-quest/quest-card-type.enum";
import { Quest } from "src/app/quest/piano-quest/quest.model";

export enum TrainingInversionType {
	none,
	first,
	second,
	both,
}

export class ChordTraining {
	public selected: boolean = false;
	public name: string;
	public whiteKey: boolean = true;
	public ordinalTrainings?: number[];
	constructor(
		public id: number,
		public title: string,
		public difficulty: number,
		public quest: QuestCardType,
		public inversion: TrainingInversionType = TrainingInversionType.none,
		public flatAccidental?: boolean, 
		public sharpAccidental?: boolean
		) {
		this.name = title.replace(' ', '-').toLowerCase();
	}
}

export const trainingOptions: Array<ChordTraining> = [
	new ChordTraining(1,"Major Chord", 1, QuestCardType.majorChordQuest),
	new ChordTraining(4,"Minor Chord", 1, QuestCardType.minorChordQuest),
	new ChordTraining(7,"Dominant Chord", 4, QuestCardType.dominantChordQuest),
	new ChordTraining(19,"Major 7th Chord", 6, QuestCardType.major7ChordQuest),
	new ChordTraining(25,"Dominant 7th Chord", 5, QuestCardType.dominant7ChordQuest),
	new ChordTraining(28,"Major 7th Chord", 4, QuestCardType.major7ChordQuest),
	new ChordTraining(31,"Minor 7th Chord", 4, QuestCardType.minor7ChordQuest),
	new ChordTraining(34,"Dominant Inversion 7th Chord", 5, QuestCardType.dominant7ChordQuest),
];