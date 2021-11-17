import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccidentalType } from 'src/app/piano/chord.model';
import { PianoChordQuestBundleService } from 'src/app/quest/piano-quest/piano-chord-quest-bundle.service';
import { PianoQuestHandlerService } from 'src/app/quest/piano-quest/piano-quest-handler.service';
import { QuestCardType } from 'src/app/quest/piano-quest/quest-card-type.enum';
import { ChordTraining, TrainingInversionType, trainingOptions } from './training-options.data';


export class ChordQuest {
	constructor(
		public id: number,
		public quest: QuestCardType,
		public inversion: TrainingInversionType,
		public accidental: AccidentalType
		){}
}

@Component({
  selector: 'app-select-training',
  templateUrl: './select-training.component.html',
  styleUrls: ['./select-training.component.sass']
})
export class SelectTrainingComponent implements OnInit {

	public TrainingInversionType = TrainingInversionType;
	public batchTraining: ChordTraining[][] = [];
	private chordTrainings: Array<ChordTraining> = [];

	constructor(
		private router: Router,
		private route:ActivatedRoute,
		private questBundler: PianoChordQuestBundleService,
		public pianoQuest: PianoQuestHandlerService
	){
	}

	ngOnInit(): void {
		this.chordTrainings = trainingOptions;
		this.batchTraining = this.toMatrix(this.chordTrainings, 3);
	}
	public start() {
		this.router.navigate(['train'], { relativeTo: this.route });
	}

	public reset(){
		this.chordTrainings.forEach(f => f.selected = false);
		this.questBundler.resetQuest();
	}

	public toMatrix(arr: Array<any>, size: number) : Array<Array<any>> {
		var res = []; 
		for(var i=0;i < arr.length;i = i+size)
			res.push(arr.slice(i,i+size));
		return res;
    }

	public onCardClick(chordTraining: ChordTraining) {
		let quest = this.toQuest(chordTraining);
		this.questBundler.addQuest(quest);
		this.router.navigate(['train'], { relativeTo: this.route });
	}

	public onCardSelect(chordTraining: ChordTraining) {
		let quest = this.toQuest(chordTraining);
		this.questBundler.addQuest(quest);
		chordTraining.selected = true;
	}
	public onCardDeselect(chordTraining: ChordTraining) {
		this.questBundler.removeQuest(chordTraining);
		chordTraining.selected = false;
	}
	public inversionSelect(chordTraining: ChordTraining, $event: Event) {
		chordTraining.inversion = parseInt(($event.target as HTMLTextAreaElement).value);
	}

	private toQuest(chordTraining: ChordTraining): ChordQuest{
		let accidental: AccidentalType;
		if(chordTraining.flatAccidental && chordTraining.sharpAccidental){
			accidental = AccidentalType.both
		} else if(chordTraining.flatAccidental){
			accidental = AccidentalType.flat;
		}else if(chordTraining.sharpAccidental){
			accidental = AccidentalType.sharp;
		}else{
			accidental = AccidentalType.none;
		}
		return new ChordQuest(chordTraining.id, chordTraining.quest, chordTraining.inversion, accidental);
	}

}
