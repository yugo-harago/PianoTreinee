import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PianoQuestHandlerService } from '../../quest/piano-quest/piano-quest-handler.service';
import { PianoService } from '../../piano/piano.service';
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
	
	private subscriptions: {
		checkChange?: Subscription,
		questCount?: Subscription
	} = {}

	constructor(
		public pianoQuestService: PianoQuestHandlerService,
		private piano: PianoService,
		private change: ChangeDetectorRef,
		private route: ActivatedRoute,
		private router: Router,
		private ngZone: NgZone) {}

	ngOnInit(): void {
		this.subscriptions.checkChange = this.pianoQuestService.checkChange.subscribe((e) => {
			if(e) this.change.detectChanges();
		});
		this.subscriptions.questCount = this.pianoQuestService.questCount.onMaxReach.subscribe((e) => {
			if(!e) return;
			this.ended = true;
			this.timer!.stop();
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.checkChange!.unsubscribe();
		this.subscriptions.questCount!.unsubscribe();
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

	public back() {
		// Workaround when is connected to midi and want to go back
		this.ngZone.run(() => this.router.navigate(['../'], { relativeTo: this.route })).then();
	}


}
