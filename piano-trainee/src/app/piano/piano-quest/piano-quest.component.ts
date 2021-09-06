import { Component, OnInit } from '@angular/core';
import { Key } from '../piano.service';
import { PianoQuestService } from './piano-quest.service';

@Component({
  selector: 'app-piano-quest',
  templateUrl: './piano-quest.component.html',
  styleUrls: ['./piano-quest.component.sass']
})
export class PianoQuestComponent implements OnInit {

	public keyWidth = 77;
	public keyHeight = 380;
	public octaveWidth: number = 6.5*this.keyWidth;


	constructor(
		public pianoService: PianoQuestService,
	) { }

	ngOnInit(): void {
	}

	public zoomIn(): void {
		this.keyWidth *= (1.1);
		this.keyHeight *= (1.1);
	}

	public zoomOut(): void {
		this.keyWidth *= (0.9)
		this.keyHeight *= (0.9)
	}

	public octaveTest(){
		this.pianoService.octaves += 1;
		this.pianoService.loadOctaves();
	}

	public onKeyClick(key: Key) {
		this.pianoService.onKeyClick(key);
	}
}
