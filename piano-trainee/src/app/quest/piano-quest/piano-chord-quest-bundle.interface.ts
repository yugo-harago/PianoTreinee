import { Quest } from "./quest.model";

export interface IPianoChordQuestBundleService{
	nextQuest: () => Quest;
}