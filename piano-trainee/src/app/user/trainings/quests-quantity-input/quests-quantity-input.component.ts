import { Component, OnInit } from '@angular/core';
import { PianoQuestHandlerService } from 'src/app/piano/piano-quest/piano-quest-handler.service';

@Component({
  selector: 'app-quests-quantity-input',
  templateUrl: './quests-quantity-input.component.html',
  styleUrls: ['./quests-quantity-input.component.sass']
})
export class QuestsQuantityInputComponent implements OnInit {

  constructor(
	public pianoQuest: PianoQuestHandlerService
	) { }

  ngOnInit(): void {
  }


	public setMaxQuest(event: Event){
		const max = parseInt((event.target as HTMLTextAreaElement).value);
		if(max <= 0) return;
		if(max > 100) return;
		this.pianoQuest.questCount.setMax(max)
	}

	public addMaxQuest(n: number) {
		const max = this.pianoQuest.questCount.max + n;
		if(max <= 0) return;
		if(max > 100) return;
		this.pianoQuest.questCount.setMax(max);
	}
}
