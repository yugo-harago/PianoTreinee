import { Component, OnInit } from '@angular/core';
import { PianoService } from '../piano.service';

@Component({
  selector: 'app-training-display',
  templateUrl: './training-display.component.html',
  styleUrls: ['./training-display.component.sass']
})
export class TrainingDisplayComponent implements OnInit {

	public quest: string = "";
	public questAnswer: string[] = [];

	constructor(
		private pianoService: PianoService,
	) { }

	ngOnInit(): void {
		this.nextQuest();
	}

	public nextQuest(): void {
		const quest = this.pianoService.startBasicQuest();
		this.quest = quest.quest;
		this.questAnswer = quest.answer;
	}

	public answer(a: string[]): void {

	}

}
