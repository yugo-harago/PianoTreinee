import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {

	public startOctave: number = 4;
	public octaves: number = 1;

	public notes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b']

	constructor() { }

	ngOnInit(): void {
	}
}
