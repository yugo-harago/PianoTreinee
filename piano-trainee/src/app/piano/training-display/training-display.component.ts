import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
	public ended: boolean = false;
	public questCount: number = 0;
	@ViewChild(TimerComponent) timer?:TimerComponent = undefined;
	
	constructor(
		public pianoQuestService: PianoQuestHandlerService,
		private piano: PianoService,
		private change: ChangeDetectorRef,
		private route: ActivatedRoute,
		private router: Router) {}

	ngOnInit(): void {
		this.pianoQuestService.checkChange.subscribe((e) => {
			if(e) this.change.detectChanges();
		});
		this.pianoQuestService.questCount.onMaxReach.subscribe((e) => {
			if(!e) return;
			this.ended = true;
			this.timer!.stop();
		});
	}

	ngOnDestroy(): void {
		this.pianoQuestService.checkChange.unsubscribe();
		this.pianoQuestService.questCount.onMaxReach.unsubscribe();
	}

	public nextQuest(): void {
		this.pianoQuestService.nextQuest();
	}

	public start() {
		this.piano.onStart.next(true);
		this.nextQuest();
		this.started = true;
		this.ended = false;
	}

	public again() {
		this.ended = false;
		this.timer!.start();
		this.pianoQuestService.questCount.reset();
		this.nextQuest();
	}

	public back(){
		this.router.navigate(['../'], { relativeTo: this.route })
	}


}
