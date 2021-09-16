import { Inject, Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Interval, Note, Scale, Chord, ChordType } from "@tonaljs/tonal";
import { BehaviorSubject } from 'rxjs';
import { TOKENS } from 'src/app/injections-tokens';
import { IWebMidiService } from '../midi/midi.interface';
import { Key, Octave, PianoService } from '../piano.service';
import { IPianoService } from '../PianoService.interface';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';
import { PianoQuestBundleService, Quest } from './piano-quest-bundle.service';

@Injectable({
	providedIn: 'root'
})
export class PianoQuestHandlerService implements IPianoService{

	public quest: Quest | undefined;

	public canRepeat: boolean = false;
	
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
		@Inject(TOKENS.WEB_MIDI) private midi: IWebMidiService,
		private piano: PianoService,
		@Inject(TOKENS.PIANO_QUEST_BUNDLE) private questBundle: IPianoQuestBundleService
	) {
		ChordType.add(["1P", "3M", "5P", "7m"], ["dom7"]);
	}

	public nextQuest() {
		let quest = null;
		let repeat = 0;
		let forceExit = false;
		do{
			quest = this.questBundle.nextQuest();
			repeat++;
			if(repeat > 20){
				console.warn("\n %c Quest repeated more than expected, check if is in the infinite loop", 'color: #dc2b4f');
				forceExit = true;
			}
		} while (this.quest?.questChord == quest.questChord && !this.canRepeat && !forceExit);
		this.quest = quest;
		this.setAnswer(quest.answerChord);
		this.checkChange.next(true);
	}

	public loadOctaves(){
		this.piano.loadOctaves();
		if(this.quest?.answerChord?.length) this.setAnswer(this.quest.answerChord);
	}

	public setAnswer(notes: string[]): void {
		this.keys.forEach(key => {
			key.isRight = notes.includes(key.note);
		})
	}

	// Only used when the order is checked
	// After the first note is played, it will determine which will be the base octave
	private checkBaseChord(activeKeys: Key[]){
		if(!this.quest?.answerChord) throw new Error("the answer does not exist!");
		// Check if is first user key hit
		if(this.quest.inversion && activeKeys.length == 1) {
			this.setAnswer(this.quest.answerChord);
			const isRight = !!this.quest.answerChord.filter(k => k == activeKeys[0].note).length;
			if(isRight) {
				const chordNote = this.quest.answerChord[this.quest.answerChord.length-this.quest.inversion];
				const isChordNote = chordNote == activeKeys[0].note;
				this.quest.baseOctave = isChordNote? activeKeys[0].octave-1: activeKeys[0].octave;
			}
		}
	}

	public checkAnswer(){
		if(!this.quest?.answerChord) throw new Error("the answer does not exist!");
		const activeKeys = this.keys.filter(key => key.isActive);
		this.checkBaseChord(activeKeys);
		if(activeKeys.length < 2) return;
		let correct = true;
		// Check if any key is not active and wrong
		correct = correct && !this.keys.filter(key => key.isActive && !key.isRight).length;
		// Check order
		if(this.quest.checkOrder && correct) {
			if(!this.quest.baseOctave) throw new Error("the baseOctave is not defined!");
			const oneOctaveAboveNotes = this.quest.answerChord.slice(this.quest.answerChord.length-this.quest.inversion, this.quest.answerChord.length);
			// Check answer key in order
			let currentOctave = this.quest.baseOctave;
			for(let activeKey of activeKeys){
				let checkOctave;
				if(oneOctaveAboveNotes.includes(activeKey.note)) {
					checkOctave = activeKey.octave == currentOctave+1;
				} else {
					checkOctave = activeKey.octave == currentOctave;
				}
				activeKey.isRight = checkOctave;
				correct = correct && checkOctave;
			}
		}
		if(!correct) return;
		// Check if right keys are all active
		this.quest.answerChord.forEach(answer => {
			correct = correct && !!this.keys.filter(key => key.note == answer && key.isRight && key.isActive).length;
		});
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
