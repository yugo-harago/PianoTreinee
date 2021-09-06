import { Component, OnInit } from '@angular/core';
import { Key, PianoService } from './piano.service';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {

	public keyWidth = 77;
	public keyHeight = 380;
	public octaveWidth: number = 6.5*this.keyWidth;

	private zoom: number = 0;

	constructor(
		public pianoService: PianoService,
	) { }

	ngOnInit(): void {
	}

	public zoomIn(): void {
		this.zoom += 1;
		this.keyWidth *= (1.1);
		this.keyHeight *= (1.1);
	}

	public zoomOut(): void {
		this.zoom -= 1;
		this.keyWidth *= (0.9)
		this.keyHeight *= (0.9)
	}

	public octaveTest(){
		this.pianoService.octaves += 1;
		this.pianoService.loadOctaves();
	}

	public onKeyClick(key: Key) {
		key.isActive = !key.isActive;
		// setTimeout(() => {
		// 	key.isActive = false;
		// }, 1000)
	}
}
