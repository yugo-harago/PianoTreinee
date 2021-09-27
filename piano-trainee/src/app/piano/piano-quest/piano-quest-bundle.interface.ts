import { Quest } from "./quest.model";

export interface IPianoQuestBundleService{
	nextQuest: () => Quest;
}