import { Quest } from "./piano-quest-bundle.service";

export interface IPianoQuestBundleService{
	nextQuest: () => Quest;
}