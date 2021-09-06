import { Component, OnInit } from '@angular/core';
import { PianoService } from '../piano.service';

@Component({
  selector: 'app-training-display',
  templateUrl: './training-display.component.html',
  styleUrls: ['./training-display.component.sass']
})
export class TrainingDisplayComponent implements OnInit {

	constructor(
		public pianoService: PianoService,
	) { }

	ngOnInit(): void {
		this.nextQuest();
	}

	public nextQuest(): void {
		this.pianoService.startBasicQuest();
	}

}
