import { Note } from "src/app/piano/note.enum";
import { PianoQuestBundleService, QuestCardType } from "src/app/piano/piano-quest/piano-quest-bundle.service";
import { Quest } from "src/app/piano/piano-quest/quest.model";

export class ChordTraining {
	public title: string;
	public difficulty: number;
	public quest: QuestCardType;
	public inversion: boolean;
	public selected: boolean = false;
	constructor(title: string, difficulty: number, quest: QuestCardType, inversion: boolean) {
		this.title = title;
		this.difficulty = difficulty;
		this.quest = quest;
		this.inversion = inversion;
	}
};


export const trainingOptions: Array<ChordTraining> = [
	new ChordTraining("Major Chord", 1, QuestCardType.majorChordQuest, false),
	new ChordTraining("Minor Chord", 1, QuestCardType.minorChordQuest, false),
	new ChordTraining("Dominant Chord", 1, QuestCardType.dominantChordQuest, false),
	new ChordTraining("Major Inversion Chord", 1, QuestCardType.majorChordQuest, true),
	new ChordTraining("Minor Inversion Chord", 1, QuestCardType.minorChordQuest, true),
	new ChordTraining("Dominant Inversion Chord", 1, QuestCardType.dominantChordQuest, true),
	new ChordTraining("Major 7th Chord", 1, QuestCardType.major7ChordQuest, false),
	new ChordTraining("Minor 7th Chord", 1, QuestCardType.minor7ChordQuest, false),
	new ChordTraining("Dominant 7th Chord", 1, QuestCardType.dominant7ChordQuest, false),
	new ChordTraining("Major Inversion 7th Chord", 1, QuestCardType.major7ChordQuest, true),
	new ChordTraining("Minor Inversion 7th Chord", 1, QuestCardType.minor7ChordQuest, true),
	new ChordTraining("Dominant Inversion 7th Chord", 1, QuestCardType.dominant7ChordQuest, true),
];