import { Component, Input, OnInit } from '@angular/core';
import { PianoQuestService } from './piano-quest/piano-quest.service';
import { Key, PianoService } from './piano.service';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {

	@Input() isQuest: boolean = false;
	public keyWidth = 77;
	public keyHeight = 380;
	public octaveWidth: number = 6.5*this.keyWidth;

	public pianoService: PianoService;

	constructor(
		piano: PianoService,
		pianoQuestService: PianoQuestService
	) { 
		if(this.isQuest) {
			this.pianoService = pianoQuestService;
		} else {
			this.pianoService = piano;
		}
	}

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
