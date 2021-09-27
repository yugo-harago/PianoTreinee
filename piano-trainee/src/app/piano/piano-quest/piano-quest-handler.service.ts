import { Inject, Injectable } from '@angular/core';
import { ChordType } from '@tonaljs/tonal';
import { BehaviorSubject } from 'rxjs';
import { TOKENS } from 'src/app/injections-tokens';
import { MidiService } from '../midi/midi.service';
import { MusicTheoryService } from '../music-theory.service';
import { Note } from '../note.enum';
import { Key, Keys, Octave, PianoService } from '../piano.service';
import { IPianoService } from '../PianoService.interface';
import { IPianoQuestBundleService } from './piano-quest-bundle.interface';
import { Quest } from './quest.model';

@Injectable({
	providedIn: 'root'
})
export class PianoQuestHandlerService implements IPianoService{

	public quest: Quest | undefined;
	private firstKey?: {note: Note, octave: number};

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
	public get keys(): Keys {
		return this.piano.keys;
	}
	public set keys(value: Keys) {
		this.piano.keys = value;
	}

	constructor(
		private midi: MidiService,
		private piano: PianoService,
		@Inject(TOKENS.PIANO_QUEST_BUNDLE) private questBundle: IPianoQuestBundleService,
		private theory: MusicTheoryService
	) {
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

	public setAnswer(notes: Note[] | undefined = undefined): void {
		if(!notes && !this.quest?.answerChord) throw new Error("The answer or note is not settled!");
		if(!notes) notes = this.quest?.answerChord;
		this.keys.forEach(key => {
			key.isRight = notes!.includes(key.note);
		})
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
	private setAnswersInOrder(activeKeys: Key[], firstKey: {note:Note, octave: number}): void {
		if(!this.quest) throw new Error("the quest does not exist!");
		if(!this.quest.inversion) return;
		if(this.checkSameOctave(this.quest.answerChord)) return;
		const octaves = this.theory.splitChordInTwoOctaves(this.quest.answerChord, this.quest.inversion);
		let rightChord;
		if(octaves.octaveUp.includes(firstKey.note)){
			// keys in ocatveUp should be the same ocatve and what's in octaveDown should subtract one octave of the first key.
			rightChord = [{keys: octaves.octaveUp, octave: firstKey.octave},
				{keys: octaves.octaveDown, octave: firstKey.octave - 1}];
		} else {
			// keys in ocatveUp should add one octave and what's in octave down should be the same.
			rightChord = [{keys: octaves.octaveUp, octave: firstKey.octave + 1},
				{keys: octaves.octaveDown, octave: firstKey.octave}];
		}
		for(let rChord of rightChord) {
			for(let activeKey of activeKeys){
				if(rChord.keys.includes(activeKey.note))
					activeKey.isRight = activeKey.octave == rChord.octave;
			}
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
		const activeKeys = this.keys.actives;
		// Check if is first user key hit
		if(this.quest.inversion && activeKeys.length == 1) this.firstKey = {note: activeKeys[0].note, octave: activeKeys[0].octave}
		if(activeKeys.length < 2) return;
		if(this.quest.inversion){
			if(!this.firstKey) throw new Error("First key is not defined!");
			this.setAnswersInOrder(activeKeys, this.firstKey)
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
		if(!this.keys.rights.length) throw new Error("Quest answer is not settled!");
		this.piano.onKeyDown(key);
		this.checkAnswer();
	}
	public onKeyUp(key: Key | undefined){
		this.piano.onKeyUp(key);
		this.checkAnswer();
	}
}
