import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';


export interface TimeSpan {
	hours: number;
	minutes: number;
	seconds: number;
  }

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {

	private destroyed$ = new Subject();

	public startTime?: Date;

	private interval?: Subscription;
	constructor(
		private changeDetector: ChangeDetectorRef) { }

	ngOnInit(): void {
		this.start();
	}

	public start(){
		this.startTime = new Date();
		this.interval = interval(1000)
			.subscribe(() => {
				this.changeDetector.detectChanges();
			});
	}

	public stop(){
		if(!this.interval) throw new Error("Not subscribed");
		this.interval.unsubscribe();
	}
	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
	getElapsedTime(entry?: Date): TimeSpan {        
		let totalSeconds = Math.floor((new Date().getTime() - entry!.getTime()) / 1000);
	  
		let hours = 0;
		let minutes = 0;
		let seconds = 0;
	  
		if (totalSeconds >= 3600) {
		  hours = Math.floor(totalSeconds / 3600);      
		  totalSeconds -= 3600 * hours;      
		}
	  
		if (totalSeconds >= 60) {
		  minutes = Math.floor(totalSeconds / 60);
		  totalSeconds -= 60 * minutes;
		}
	  
		seconds = totalSeconds;
	  
		return {
		  hours: hours,
		  minutes: minutes,
		  seconds: seconds
		};
	}

}
