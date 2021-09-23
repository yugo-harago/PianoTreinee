import { Injectable } from '@angular/core';
import { Chord, Note } from '@tonaljs/tonal';
import { PianoService } from '../piano.service';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';
import { Quest } from './piano-quest-bundle.service';
import { PianoQuestHandlerService } from './piano-quest-handler.service';

@Injectable()
export class PianoQuestBundleMock implements IPianoQuestBundleService {

	constructor() { }

	private count: number = 0;

	public nextQuest(): Quest {
		this.count++;
		if(this.count%2 == 1)
			return <Quest>{
					answerChord: ["C", "D#", "G#"],
					checkOrder: true,
					questChord: "G#/C",
					inversion: 2
				}
		else
			return <Quest>{
				answerChord: ["A","D","F#" ],
				checkOrder: true,
				questChord: "D/A",
				inversion: 2
			}
	}
}
