import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { PianoQuestHandlerService } from '../piano-quest/piano-quest-handler.service';
import { PianoService } from '../piano.service';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-training-display',
  templateUrl: './training-display.component.html',
  styleUrls: ['./training-display.component.sass']
})
export class TrainingDisplayComponent implements OnInit, OnDestroy {

	public started: boolean = false;
	@ViewChild(TimerComponent) timer?:TimerComponent = undefined;
	
	constructor(
		public pianoQuestService: PianoQuestHandlerService,
		private piano: PianoService,
		private change: ChangeDetectorRef) {}

	ngOnInit(): void {
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

	public start() {
		this.piano.onStart.next(true);
		this.nextQuest();
		this.started = true;
	}


}
