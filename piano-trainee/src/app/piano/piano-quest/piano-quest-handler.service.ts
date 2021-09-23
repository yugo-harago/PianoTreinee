import { Inject, Injectable } from '@angular/core';
import { ChordType } from '@tonaljs/tonal';
import { BehaviorSubject } from 'rxjs';
import { TOKENS } from 'src/app/injections-tokens';
import { MidiService } from '../midi/midi.service';
import { Note } from '../note.enum';
import { Key, Octave, PianoService } from '../piano.service';
import { IPianoService } from '../PianoService.interface';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';
import { Quest } from './piano-quest-bundle.service';

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
		private midi: MidiService,
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

	public setAnswer(notes: Note[]): void {
		this.keys.forEach(key => {
			key.isRight = notes.includes(key.note);
		})
	}

	// Only used when the order is checked
	// After the first note is played, it will determine which will be the base octave
	private setBaseChord(activeKeys: Key[]){
		if(!this.quest?.answerChord) throw new Error("the answer does not exist!");
		// Check if is first user key hit
		this.setAnswer(this.quest.answerChord);
		const isRight = !!this.quest.answerChord.filter(k => k == activeKeys[0].note).length;
		if(isRight) {
			const chordNote = this.quest.answerChord[this.quest.answerChord.length-this.quest.inversion];
			const isChordNote = chordNote == activeKeys[0].note;
			this.quest.baseOctave = isChordNote? activeKeys[0].octave-1: activeKeys[0].octave;
		}
	}

	// Split chord into two based on quest inversion
	// Ex: C/E (II) => [E4, G4], [C5]
	// Returns {octaveUp: ["E","G"], octaveDown:["C"]}
	// Ex: G#/C (II) => C D# G#
	private splitChordInTwoOctaves(chords: Note[]): {octaveUp: Note[], octaveDown: Note[]}{
		if(!this.quest) throw new Error("the quest does not exist!");
		const octaveUp = chords.slice(
			this.quest.answerChord.length-this.quest.inversion, 
			this.quest.answerChord.length);
		const octaveDown = chords.slice(0,
			this.quest.answerChord.length-this.quest.inversion);
		return { octaveUp, octaveDown };
	}

	public checkSameOctave(notes: Note[]): boolean {
		let previous = notes[0];
		let isSame = true;
		notes.slice(1, notes.length).forEach(note => {
			if(previous > note) // If is bigger than previous
				isSame = false;
			previous = note;
		})
		return isSame;
	}

	// Check answer key in order
	private setAnswersInOrder(activeKeys: Key[], baseOctave: number): void {
		if(!this.quest) throw new Error("the quest does not exist!");
		if(!this.quest.checkOrder) return;
		if(this.checkSameOctave(this.quest.answerChord)) return;
		const octaveUp = this.splitChordInTwoOctaves(this.quest.answerChord).octaveUp;
		let currentOctave = baseOctave;
		for(let activeKey of activeKeys){
			let checkOctave;
			if(octaveUp.includes(activeKey.note)) {
				checkOctave = activeKey.octave == currentOctave+1;
			} else {
				checkOctave = activeKey.octave == currentOctave;
			}
			activeKey.isRight = checkOctave;
		}
	}

	private anyKeyIsActiveAndWrong(activeKeys: Key[]): boolean {
		return !!activeKeys.find(key => !key.isRight);
	}

	private rightKeysAreAllActive(activeKeys: Key[]): boolean {
		if(!this.quest?.answerChord) throw new Error("the answer does not exist!");
		let correct = true;
		this.quest.answerChord.forEach(answer => {
			correct = correct && !!activeKeys.filter(key => key.note == answer && key.isRight).length;
		});
		return correct;
	}

	public checkAnswer(){
		if(!this.quest?.answerChord) throw new Error("the answer does not exist!");
		const activeKeys = this.keys.filter(key => key.isActive);
		if(this.quest.inversion && activeKeys.length == 1) this.setBaseChord(activeKeys);
		if(activeKeys.length < 2) return;
		if(this.quest.inversion){
			if(!this.quest.baseOctave) throw new Error("the baseOctave is not defined!");
			this.setAnswersInOrder(activeKeys, this.quest.baseOctave)
		}
		if(this.anyKeyIsActiveAndWrong(activeKeys)) return;
		if(this.rightKeysAreAllActive(activeKeys))
			this.answeredRight();
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
	public onKeyDown(key: Key | undefined) {
		this.piano.onKeyDown(key);
		this.checkAnswer();
	}
	public onKeyUp(key: Key | undefined){
		this.piano.onKeyUp(key);
		this.checkAnswer();
	}
}
