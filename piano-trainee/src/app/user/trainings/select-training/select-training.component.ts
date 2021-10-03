import { Component, OnInit } from '@angular/core';
import { PianoQuestBundleService } from 'src/app/piano/piano-quest/piano-quest-bundle.service';
import { ChordTraining, trainingOptions } from './training-options.data';

@Component({
  selector: 'app-select-training',
  templateUrl: './select-training.component.html',
  styleUrls: ['./select-training.component.sass']
})
export class SelectTrainingComponent implements OnInit {

	public batchTraining: ChordTraining[][] = [];
	private chordTrainings: Array<ChordTraining> = [];
	public multipleQuest: boolean = false;

	constructor(
		private questBundler: PianoQuestBundleService
	){}

	ngOnInit(): void {
		this.chordTrainings = trainingOptions;
		this.batchTraining = [[]];
		this.batchTraining = this.toMatrix(this.chordTrainings, 3);
	}

	public toMatrix(arr: Array<any>, size: number) : Array<Array<any>> {
		var res = []; 
		for(var i=0;i < arr.length;i = i+size)
			res.push(arr.slice(i,i+size));
		return res;
    }

	public onCardClick(chordTraining: ChordTraining) {
		this.questBundler.addQuest(chordTraining.quest,chordTraining.inversion);
		if(this.multipleQuest){
			// go to ./training
		}
	}

	public onMultipleStart() {
		//go to ./training
	}

}
