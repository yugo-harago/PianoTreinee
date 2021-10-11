import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';


export interface TimeSpan {
	hours: number;
	minutes: number;
	seconds: number;
  }
  export interface Entry {
	created: Date;
	id: string;
  }

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

	private destroyed$ = new Subject();

	public entry: Entry = { created: new Date, id: '1'};
	constructor(
		private changeDetector: ChangeDetectorRef) { }

	ngOnInit(): void {
		interval(1000).subscribe(() => {
		  this.changeDetector.detectChanges();
		});
	}	
	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
	getElapsedTime(entry: Entry): TimeSpan {        
		let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);
	  
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
