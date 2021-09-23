import { Injectable } from '@angular/core';
import { Note } from '../note.enum';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';
import { Quest } from './piano-quest-bundle.service';

@Injectable()
export class PianoQuestBundleMock implements IPianoQuestBundleService {

	private count: number = 0;

	public nextQuest(): Quest {
		this.count++;
		if(this.count%2 == 1)
			return <Quest>{
					answerChord: [Note.C, Note['D#'], Note['G#']],
					checkOrder: true,
					questChord: "G#/C",
					inversion: 2
				}
		else
			return <Quest>{
				answerChord: [Note.A,Note.D,Note['F#']],
				checkOrder: true,
				questChord: "D/A",
				inversion: 2
			}
	}
}
