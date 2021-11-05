import { AccidentalType } from "src/app/piano/music-theory.service";
import { Note } from "src/app/piano/note.enum";
import { PianoChordQuestBundleService, QuestCardType } from "src/app/piano/piano-quest/piano-chord-quest-bundle.service";
import { Quest } from "src/app/piano/piano-quest/quest.model";

export class ChordTraining {
	public title: string;
	public difficulty: number;
	public quest: QuestCardType;
	public inversion: boolean;
	public selected: boolean = false;
	public accidental: boolean = false;
	public name: string;
	public accidentalShowType: AccidentalType;
	constructor(title: string, difficulty: number, quest: QuestCardType, inversion?: boolean, accidental?: boolean, accidentalShowType?: AccidentalType) {
		this.title = title;
		this.difficulty = difficulty;
		this.quest = quest;
		this.inversion = !!inversion;
		this.name = title.replace(' ', '-').toLowerCase();
		this.accidental = !!accidental;
		this.accidentalShowType = accidentalShowType?? AccidentalType.Shap;
	}
}

export const trainingOptions: Array<ChordTraining> = [
	new ChordTraining("Major Chord", 1, QuestCardType.majorChordQuest),
	new ChordTraining("Major Chord with Sharp Note", 2, QuestCardType.majorChordQuest, false, true),
	new ChordTraining("Major Chord with Flat Note", 2, QuestCardType.majorChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining("Minor Chord", 1, QuestCardType.minorChordQuest),
	new ChordTraining("Minor Chord with Sharp Note", 2, QuestCardType.minorChordQuest, false, true),
	new ChordTraining("Minor Chord with Flat Note", 2, QuestCardType.minorChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining("Dominant Chord", 4, QuestCardType.dominantChordQuest),
	new ChordTraining("Dominant Chord with Sharp Note", 5, QuestCardType.dominantChordQuest, false, true),
	new ChordTraining("Dominant Chord with Flat Note", 5, QuestCardType.dominantChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining("Major Inversion Chord", 3, QuestCardType.majorChordQuest, true, false),
	new ChordTraining("Major Inversion Chord with Sharp Note", 4, QuestCardType.majorChordQuest, true, true),
	new ChordTraining("Major Inversion Chord with Flat Note", 4, QuestCardType.majorChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining("Minor Inversion Chord", 3, QuestCardType.minorChordQuest, true, false),
	new ChordTraining("Minor Inversion Chord with Sharp Note", 4, QuestCardType.minorChordQuest, true, true),
	new ChordTraining("Minor Inversion Chord with Flat Note", 4, QuestCardType.minorChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining("Dominant Inversion Chord", 6, QuestCardType.dominantChordQuest, true, false),
	new ChordTraining("Dominant Inversion Chord with Sharp Note", 7, QuestCardType.dominantChordQuest, true, true),
	new ChordTraining("Dominant Inversion Chord with Flat Note", 7, QuestCardType.dominantChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining("Major 7th Chord", 6, QuestCardType.major7ChordQuest),
	new ChordTraining("Major 7th Chord with Sharp Note", 7, QuestCardType.major7ChordQuest, false, true),
	new ChordTraining("Major 7th Chord with Flat Note", 7, QuestCardType.major7ChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining("Minor 7th Chord", 6, QuestCardType.minor7ChordQuest),
	new ChordTraining("Minor 7th Chord with Sharp Note", 7, QuestCardType.minor7ChordQuest, false, true),
	new ChordTraining("Minor 7th Chord with Flat Note", 7, QuestCardType.minor7ChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining("Dominant 7th Chord", 5, QuestCardType.dominant7ChordQuest),
	new ChordTraining("Dominant 7th Chord with Sharp Note", 6, QuestCardType.dominant7ChordQuest, false, true),
	new ChordTraining("Dominant 7th Chord with Flat Note", 6, QuestCardType.dominant7ChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining("Major Inversion 7th Chord", 4, QuestCardType.major7ChordQuest, true, false),
	new ChordTraining("Major Inversion 7th Chord with Sharp Note", 5, QuestCardType.major7ChordQuest, true, true),
	new ChordTraining("Major Inversion 7th Chord with Flat Note", 5, QuestCardType.major7ChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining("Minor Inversion 7th Chord", 4, QuestCardType.minor7ChordQuest, true, false),
	new ChordTraining("Minor Inversion 7th Chord with Sharp Note", 5, QuestCardType.minor7ChordQuest, true, true),
	new ChordTraining("Minor Inversion 7th Chord with Flat Note", 5, QuestCardType.minor7ChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining("Dominant Inversion 7th Chord", 5, QuestCardType.dominant7ChordQuest, true, false),
	new ChordTraining("Dominant Inversion 7th Chord with Sharp Note", 6, QuestCardType.dominant7ChordQuest, true, true),
	new ChordTraining("Dominant Inversion 7th Chord with Flat Note", 6, QuestCardType.dominant7ChordQuest, true, true, AccidentalType.Flat),
];