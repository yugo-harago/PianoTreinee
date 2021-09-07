import { Component, Input, OnInit } from '@angular/core';
import { MidiService } from './midi/midi.service';
import { PianoQuestService } from './piano-quest/piano-quest.service';
import { Key, PianoService } from './piano.service';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {

	@Input() isQuest: boolean = false;
	public keySize = { width:77, height: 380 };
	public octaveWidth: number = 6.5*this.keySize.width;
	public pianoService: PianoService;

	constructor(
		piano: PianoService,
		pianoQuestService: PianoQuestService,
		public midi: MidiService
	) { 
		if(this.isQuest) { this.pianoService = pianoQuestService; }
		else { this.pianoService = piano; }
		this.midi.startMidi();
	}

	ngOnInit(): void {
		if(this.midi.enabled) this.midi.selectedInput = this.midi.inputs[0];
	}

	public zoomIn(): void {
		this.keySize.width *= (1.1);
		this.keySize.height *= (1.1);
	}

	public zoomOut(): void {
		this.keySize.width *= (0.9)
		this.keySize.height *= (0.9)
	}

	public octaveTest(){
		this.pianoService.octave.lenght += 1;
		this.pianoService.loadOctaves();
	}

	public onKeyClick(key: Key) {
		this.pianoService.onKeyClick(key);
	}

	public onMidiChange(e: Event): void {
		if(!e?.target) return;
		const i = parseInt((e.target as HTMLTextAreaElement).value);
		this.midi.selectedInput = this.midi.inputs[i];
	}
	
}
