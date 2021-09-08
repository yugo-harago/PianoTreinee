import { Injectable } from '@angular/core';
import { Interval, Note, Scale, Chord } from "@tonaljs/tonal";
import { BehaviorSubject } from 'rxjs';
import { MidiService } from '../midi/midi.service';
import { Key, Octave, PianoService } from '../piano.service';
import { IPianoService } from '../PianoService.interface';
import { PianoQuestBundleService } from './piano-quest-bundle.service';

@Injectable({
  providedIn: 'root'
})
export class PianoQuestHandlerService implements IPianoService{

	public questChord: string = '';
	public answerChords: string[] = [];
	
	public get checkChange(): BehaviorSubject<boolean> {
		return this.piano.checkChange;
	}
	public set checkChange(value: BehaviorSubject<boolean>) {
		this.piano.checkChange = value;
	}
	public get octave(): Octave {
		return this.piano.octave;
	}
	public set octave(value: Octave) {
		this.piano.octave = value;
	}
	public get keys(): Key[] {
		return this.piano.keys;
	}
	public set keys(value: Key[]) {
		this.piano.keys = value;
	}

	constructor(
		private midi: MidiService,
		private piano: PianoService,
		private questBundle: PianoQuestBundleService
	) {
	}

	public nextQuest() {
		this.questBundle.nextQuest();
	}

	public loadOctaves(){
		this.piano.loadOctaves();
		if(this.answerChords.length) this.setAnswer(this.answerChords);
	}

	public setAnswer(notes: string[]): void {
		this.keys.forEach(key => {
			key.isRight = notes.includes(key.note);
		})
	}

	public checkAnswer(){
		let correct = true;
		// Check if right keys are active
		this.answerChords.forEach(answer => {
			correct = correct && !!this.keys.filter(key => key.note == answer && key.isRight && key.isActive).length;
		});
		// Check if any key is not active and wrong
		correct = correct && !this.keys.filter(key => key.isActive && !key.isRight).length;
		if(correct) this.answeredRight();
	}

	public answeredRight(){
		this.keys.forEach(key => {
			key.isActive = false;
			key.isRight = false;
		})
		this.nextQuest();
	}
	public onKeyClick(key: Key) {
		if(!key.isActive) this.midi.play(key);
		key.isActive = !key.isActive;
		this.checkAnswer();
	}

	// Midi Key Input
	public onKeyDown(key: Key){
		this.piano.onKeyDown(key);
		this.checkAnswer();
	}
	public onKeyUp(key: Key){
		this.piano.onKeyUp(key);
		this.checkAnswer();
	}
}
