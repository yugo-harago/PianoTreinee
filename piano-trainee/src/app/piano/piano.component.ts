import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {

	public keyWidth = 77;
	public keyHeight = 380;
	public octaveWidth: number = 6.5*this.keyWidth;

	public startOctave: number = 4;
	public octaves: number = 1;
	private zoom: number = 0;

	public notes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b']

	constructor() { }

	ngOnInit(): void {
	}

	public zoomIn(): void {
		this.zoom += 1;
		if(this.zoom){
			this.keyWidth = 77*(this.zoom + 0.1);
		}
	}

	public zoomOut(): void {
		this.zoom -= 1;
		if(this.zoom){
			this.keyWidth = 77*(this.zoom + 0.1);
		}
	}
}
