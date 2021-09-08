import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PianoQuestHandlerService } from '../piano-quest/piano-quest-handler.service';
import { PianoService } from '../piano.service';

@Component({
  selector: 'app-training-display',
  templateUrl: './training-display.component.html',
  styleUrls: ['./training-display.component.sass']
})
export class TrainingDisplayComponent implements OnInit, OnDestroy {

	constructor(
		public pianoQuestService: PianoQuestHandlerService,
		private change: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.nextQuest();
		this.pianoQuestService.checkChange.subscribe((e) => {
			if(e) this.change.detectChanges();
		})
	}

	ngOnDestroy(): void {
		this.pianoQuestService.checkChange.unsubscribe();
	}

	public nextQuest(): void {
		this.pianoQuestService.nextQuest();
	}

}
