import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { first, take } from 'rxjs/operators';
import { MidiService } from './midi/midi.service';
import { PianoQuestHandlerService } from './piano-quest/piano-quest-handler.service';
import { Key, PianoService } from './piano.service';
import { IPianoService } from './PianoService.interface';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit, OnDestroy {

	@Input() isQuest: boolean = false;
	public keySize = { width:77, height: 380 };
	public octaveWidth: number = 6.5*this.keySize.width;
	public pianoService?: IPianoService;
	public started = false;
	public answerDisplayed = false;

	constructor(
		public piano: PianoService,
		public  pianoQuest: PianoQuestHandlerService,
		public midi: MidiService,
		private change: ChangeDetectorRef
	) {
	}

	ngOnInit(): void {
		// temporarily
		this.zoomOut();this.zoomOut();this.zoomOut();
		// temporarily
		if(this.isQuest) { this.pianoService = this.pianoQuest; }
		else { this.pianoService = this.piano; }
		this.pianoService.checkChange.subscribe((e) => {
			if(e) this.change.detectChanges();
		});
		this.setMidiKeyDown();
		this.setMidiKeyUp();
		this.piano.onStart.pipe(first()).subscribe(start => {
			if(!start) return;
			this.start();
		});
	}

	start(): void {
		this.midi.startMidi();
		this.started = true;
	}

	ngOnDestroy(): void {
		if(this.pianoService) this.pianoService.checkChange.unsubscribe();
		this.midi.onMidiKeyPress.unsubscribe();
		this.midi.onMidiKeyRelease.unsubscribe();
	}

	public zoomIn(): void {
		this.keySize.width *= (1.1);
		this.keySize.height *= (1.1);
	}

	public zoomOut(): void {
		this.keySize.width *= (0.9)
		this.keySize.height *= (0.9)
	}

	public octavePlus(){
		if(!this.pianoService) throw new Error("PianoService is not initialized");
		if(this.pianoService.octave.length >= 8) return;
		this.pianoService.octave.length += 1;
		this.pianoService.loadOctaves();
	}
	public octaveMinus(){
		if(!this.pianoService) throw new Error("PianoService is not initialized");
		if(this.pianoService.octave.length <= 1) return;
		this.pianoService.octave.length -= 1;
		this.pianoService.loadOctaves();
	}


	public showAnswer(){
		this.answerDisplayed = true;
		this.pianoQuest.onRightAnswer.pipe(take(1)).subscribe(a => {
			if(!a) return;
			this.answerDisplayed = false;
			this.change.detectChanges();
		});
	}
	public onKeyClick(key: Key) {
		if(!this.pianoService) throw new Error("PianoService is not initialized");
		this.pianoService.onKeyClick(key);
	}

	public onMidiChange(e: Event): void {
		if(!e?.target) return;
		const i = parseInt((e.target as HTMLTextAreaElement).value);
		this.midi.selectInput(this.midi.inputs[i]);
	}

	private setMidiKeyDown(){
		this.midi.onMidiKeyPress.subscribe(e => {
			if(!e) return;
			if(!this.pianoService) throw new Error("PianoService is not initialized");
			let key = this.pianoService.keys.find(k => k.note == e.note && k.octave == e.octave);
			if(key) this.pianoService.onKeyDown(key); else console.error("Key not found.");
		});
	}
	private setMidiKeyUp(){
		this.midi.onMidiKeyRelease.subscribe(e => {
			if(!e) return;
			if(!this.pianoService) throw new Error("PianoService is not initialized");
			let key = this.pianoService.keys.find(k => k.note == e.note && k.octave == e.octave);
			if(key) this.pianoService.onKeyUp(key); else console.error("Key not found.")
		});
	}
}

