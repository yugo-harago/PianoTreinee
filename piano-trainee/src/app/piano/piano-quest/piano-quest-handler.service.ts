import { Inject, Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Interval, Note, Scale, Chord, ChordType } from "@tonaljs/tonal";
import { BehaviorSubject } from 'rxjs';
import { TOKENS } from 'src/app/injections-tokens';
import { MidiService } from '../midi/midi.service';
import { Key, Octave, PianoService } from '../piano.service';
import { IPianoService } from '../PianoService.interface';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';
import { PianoQuestBundleService, Quest } from './piano-quest-bundle.service';

@Injectable({
	providedIn: 'root'
})
export class PianoQuestHandlerService implements IPianoService{

	public quest: Quest | undefined;
	
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
		@Inject(TOKENS.PIANO_QUEST_BUNDLE) private questBundle: IPianoQuestBundleService
	) {
		ChordType.add(["1P", "3M", "5P", "7m"], ["dom7"]);
	}

	public nextQuest() {
		let quest = null;
		do{
			quest = this.questBundle.nextQuest();
		} while (this.quest?.questChord == quest.questChord);
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
	private checkBaseChord(activeKeys: Key[]){
		if(!this.quest?.answerChord) throw new Error("the answer does not exist!");
		// Check if is first user key hit
		if(this.quest.checkOrder && (activeKeys.length == 1 || (activeKeys.length > 0 &&!this.quest.baseOctave))) {
			this.setAnswer(this.quest.answerChord);
			const isRight = !!this.quest.answerChord.filter(k => k == activeKeys[0].note).length;
			if(isRight) {
				// First Inversion
				const ChordNote = this.quest.answerChord[this.quest.answerChord.length-1];
				const isChordNote = ChordNote == activeKeys[0].note;
				this.quest.baseOctave = isChordNote? activeKeys[0].octave: activeKeys[0].octave-1;
			}
		}
	}

	public checkAnswer(){
		if(!this.quest?.answerChord) throw new Error("the answer does not exist!");
		const activeKeys = this.keys.filter(key => key.isActive);
		this.checkBaseChord(activeKeys);
		if(activeKeys.length < 2) return;
		let correct = true;
		if(this.quest.checkOrder) {
			const root = this.quest.answerChord[0];
			// Check answer key in order
			for(let i=1; i < activeKeys.length; i++){
				activeKeys[i].isRight = activeKeys[i].note == this.quest.answerChord[i];
			}
		}
		// Check if any key is not active and wrong
		correct = correct && !this.keys.filter(key => key.isActive && !key.isRight).length;
		if(!correct) return;
		if(!this.quest.checkOrder){
			// Check if right keys are active
			this.quest.answerChord.forEach(answer => {
				correct = correct && !!this.keys.filter(key => key.note == answer && key.isRight && key.isActive).length;
			});
		} 
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
