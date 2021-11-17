import { Injectable } from '@angular/core';
import { Note } from '../../piano/note.enum';
import { IPianoChordQuestBundleService } from './piano-chord-quest-bundle.interface';
import { Quest } from './quest.model';

@Injectable()
export class PianoChordQuestBundleMock implements IPianoChordQuestBundleService {

	private count: number = 0;

	public nextQuest(): Quest {
		this.count++;
		if(this.count%2 == 1)
			return new Quest([Note.G, Note.C, Note.E], 1);
		else
			return new Quest([Note.A,Note['C#'],Note['F#']], 2, "minor");
	}
}
