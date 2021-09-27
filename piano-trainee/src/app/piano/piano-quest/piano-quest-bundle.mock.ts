import { Injectable } from '@angular/core';
import { Note } from '../note.enum';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';
import { Quest } from './quest.model';

@Injectable()
export class PianoQuestBundleMock implements IPianoQuestBundleService {

	private count: number = 0;

	public nextQuest(): Quest {
		this.count++;
		if(this.count%2 == 1)
			return new Quest([Note.C, Note['D#'], Note['G#']],2);
		else
			return new Quest([Note.A,Note['C#'],Note['F#']], 2, "minor");
	}
}
