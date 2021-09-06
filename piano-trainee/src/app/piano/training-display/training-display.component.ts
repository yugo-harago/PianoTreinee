import { Component, OnInit } from '@angular/core';
import { PianoQuestService } from '../piano-quest/piano-quest.service';
import { PianoService } from '../piano.service';

@Component({
  selector: 'app-training-display',
  templateUrl: './training-display.component.html',
  styleUrls: ['./training-display.component.sass']
})
export class TrainingDisplayComponent implements OnInit {

	constructor(
		public pianoQuestService: PianoQuestService,
	) { }

	ngOnInit(): void {
		this.nextQuest();
	}

	public nextQuest(): void {
		this.pianoQuestService.startBasicQuest();
	}

}
