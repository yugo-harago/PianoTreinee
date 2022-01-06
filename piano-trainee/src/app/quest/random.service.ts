import { Injectable } from '@angular/core';
import { AccidentalType } from '../piano/chord.model';
import { Note } from '../piano/note.enum';
import { TrainingInversionType } from '../user/trainings/select-training/training-options.data';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  public getRandomNote(accidental: AccidentalType): Note{
	  switch(accidental){
		  case AccidentalType.all: return this.getRandomInt(2) == 1? this.getRandomBlackNote() : this.getRandomWhiteNote();
		  case AccidentalType.flatAndSharp: 
		  case AccidentalType.sharp:
		  case AccidentalType.flat: return this.getRandomBlackNote();
		  case AccidentalType.none: return this.getRandomWhiteNote();
	  }
  }

  public getRandomInversion(inversion: TrainingInversionType): number{
	  switch(inversion){
		  case TrainingInversionType.both: return this.getRandomInt(2) + 1;
		  case TrainingInversionType.first: return 1;
		  case TrainingInversionType.second: return 2;
		  case TrainingInversionType.none: return 0;
	  }
  }
  public getRandomWhiteNote(): Note {
	  const notes = [Note.C,Note.D,Note.E,Note.F,Note.G,Note.A,Note.B];
	  const noteIndex = this.getRandomInt(notes.length);
	  return notes[noteIndex];
  }
  public getRandomBlackNote(): Note {
	  const notes = [Note["C#"],Note["D#"],Note["F#"],Note["G#"],Note["A#"]];
	  const noteIndex = this.getRandomInt(notes.length);
	  return notes[noteIndex];
  }
  public getRandomInt(max: number): number {
	  return Math.floor(Math.random() * max);
  }
}
