import { Injectable } from '@angular/core';
import { Interval, Note, Scale, Chord } from "@tonaljs/tonal";
import { MidiService } from '../midi/midi.service';
import { Key, PianoService } from '../piano.service';

@Injectable({
  providedIn: 'root'
})
export class PianoQuestService extends PianoService {

	public questChord: string = '';
	public answerChords: string[] = [];
	
	constructor(
		midi: MidiService
	) {
		super(midi);
	}

	public loadOctaves(){
		super.loadOctaves();
		if(this.answerChords) this.setAnswer(this.answerChords);
	}

	public startBasicQuest(): void {
		const notes = ["C","D","E","F","G","A","B"];
		const noteIndex = super.getRandomInt(notes.length);
		const quest = notes[noteIndex]
		const chord = Chord.getChord("major", quest);
		this.setAnswer(chord.notes);
		this.questChord = quest;
		this.answerChords = chord.notes;
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
		// Check if any key is active and wrong
		correct = correct && !this.keys.filter(key => key.isActive && !key.isRight).length;
		if(correct) this.answeredRight();
	}

	public answeredRight(){
		this.keys.forEach(key => {
			key.isActive = false;
			key.isRight = false;
		})
		this.startBasicQuest();
	}
	public onKeyClick(key: Key) {
		key.isActive = !key.isActive;
		super.midi.play(key);
		this.checkAnswer();
	}
}
