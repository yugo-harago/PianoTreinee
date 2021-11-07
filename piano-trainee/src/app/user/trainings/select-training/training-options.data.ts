import { AccidentalType } from "src/app/piano/chord.model";
import { Note } from "src/app/piano/note.enum";
import { PianoChordQuestBundleService, QuestCardType } from "src/app/piano/piano-quest/piano-chord-quest-bundle.service";
import { Quest } from "src/app/piano/piano-quest/quest.model";

export class ChordTraining {
	public id: number;
	public title: string;
	public difficulty: number;
	public quest: QuestCardType;
	public inversion: boolean;
	public selected: boolean = false;
	public accidental: boolean = false;
	public name: string;
	public accidentalShowType: AccidentalType;
	constructor(id: number, title: string, difficulty: number, quest: QuestCardType, inversion?: boolean, accidental?: boolean, accidentalShowType?: AccidentalType) {
		this.title = title;
		this.difficulty = difficulty;
		this.quest = quest;
		this.inversion = !!inversion;
		this.name = title.replace(' ', '-').toLowerCase();
		this.accidental = !!accidental;
		this.accidentalShowType = accidentalShowType?? AccidentalType.Sharp;
		this.id = id;
	}
}

export const trainingOptions: Array<ChordTraining> = [
	new ChordTraining(1,"Major Chord", 1, QuestCardType.majorChordQuest),
	new ChordTraining(2,"Major Chord with Sharp Note", 2, QuestCardType.majorChordQuest, false, true),
	new ChordTraining(3,"Major Chord with Flat Note", 2, QuestCardType.majorChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining(4,"Minor Chord", 1, QuestCardType.minorChordQuest),
	new ChordTraining(5,"Minor Chord with Sharp Note", 2, QuestCardType.minorChordQuest, false, true),
	new ChordTraining(6,"Minor Chord with Flat Note", 2, QuestCardType.minorChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining(7,"Dominant Chord", 4, QuestCardType.dominantChordQuest),
	new ChordTraining(8,"Dominant Chord with Sharp Note", 5, QuestCardType.dominantChordQuest, false, true),
	new ChordTraining(9,"Dominant Chord with Flat Note", 5, QuestCardType.dominantChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining(10,"Major Inversion Chord", 3, QuestCardType.majorChordQuest, true, false),
	new ChordTraining(11,"Major Inversion Chord with Sharp Note", 4, QuestCardType.majorChordQuest, true, true),
	new ChordTraining(12,"Major Inversion Chord with Flat Note", 4, QuestCardType.majorChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining(13,"Minor Inversion Chord", 3, QuestCardType.minorChordQuest, true, false),
	new ChordTraining(14,"Minor Inversion Chord with Sharp Note", 4, QuestCardType.minorChordQuest, true, true),
	new ChordTraining(15,"Minor Inversion Chord with Flat Note", 4, QuestCardType.minorChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining(16,"Dominant Inversion Chord", 6, QuestCardType.dominantChordQuest, true, false),
	new ChordTraining(17,"Dominant Inversion Chord with Sharp Note", 7, QuestCardType.dominantChordQuest, true, true),
	new ChordTraining(18,"Dominant Inversion Chord with Flat Note", 7, QuestCardType.dominantChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining(19,"Major 7th Chord", 6, QuestCardType.major7ChordQuest),
	new ChordTraining(20,"Major 7th Chord with Sharp Note", 7, QuestCardType.major7ChordQuest, false, true),
	new ChordTraining(21,"Major 7th Chord with Flat Note", 7, QuestCardType.major7ChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining(22,"Minor 7th Chord", 6, QuestCardType.minor7ChordQuest),
	new ChordTraining(23,"Minor 7th Chord with Sharp Note", 7, QuestCardType.minor7ChordQuest, false, true),
	new ChordTraining(24,"Minor 7th Chord with Flat Note", 7, QuestCardType.minor7ChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining(25,"Dominant 7th Chord", 5, QuestCardType.dominant7ChordQuest),
	new ChordTraining(26,"Dominant 7th Chord with Sharp Note", 6, QuestCardType.dominant7ChordQuest, false, true),
	new ChordTraining(27,"Dominant 7th Chord with Flat Note", 6, QuestCardType.dominant7ChordQuest, false, true, AccidentalType.Flat),
	new ChordTraining(28,"Major Inversion 7th Chord", 4, QuestCardType.major7ChordQuest, true, false),
	new ChordTraining(29,"Major Inversion 7th Chord with Sharp Note", 5, QuestCardType.major7ChordQuest, true, true),
	new ChordTraining(30,"Major Inversion 7th Chord with Flat Note", 5, QuestCardType.major7ChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining(31,"Minor Inversion 7th Chord", 4, QuestCardType.minor7ChordQuest, true, false),
	new ChordTraining(32,"Minor Inversion 7th Chord with Sharp Note", 5, QuestCardType.minor7ChordQuest, true, true),
	new ChordTraining(33,"Minor Inversion 7th Chord with Flat Note", 5, QuestCardType.minor7ChordQuest, true, true, AccidentalType.Flat),
	new ChordTraining(34,"Dominant Inversion 7th Chord", 5, QuestCardType.dominant7ChordQuest, true, false),
	new ChordTraining(35, "Dominant Inversion 7th Chord with Sharp Note", 6, QuestCardType.dominant7ChordQuest, true, true),
	new ChordTraining(36,"Dominant Inversion 7th Chord with Flat Note", 6, QuestCardType.dominant7ChordQuest, true, true, AccidentalType.Flat),
];