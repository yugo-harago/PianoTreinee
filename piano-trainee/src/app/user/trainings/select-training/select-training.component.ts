import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TOKENS } from 'src/app/injections-tokens';
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
		private router: Router,
		private route:ActivatedRoute,
		@Inject(TOKENS.PIANO_QUEST_BUNDLE) private questBundler: PianoQuestBundleService
	){
		this.reset();
	}

	ngOnInit(): void {
		this.chordTrainings = trainingOptions;
		this.batchTraining = this.toMatrix(this.chordTrainings, 3);
	}

	public reset() {
		this.chordTrainings.forEach(f => f.selected = false);
		this.questBundler.resetQuest();
	}

	public onMultipleSelect(){
		this.multipleQuest = !this.multipleQuest
		if(!this.multipleQuest){
			this.reset();
		}
	}

	public toMatrix(arr: Array<any>, size: number) : Array<Array<any>> {
		var res = []; 
		for(var i=0;i < arr.length;i = i+size)
			res.push(arr.slice(i,i+size));
		return res;
    }

	public onCardClick(chordTraining: ChordTraining) {
		if(this.multipleQuest) throw new Error("Is in multiple select mode");
		this.questBundler.addQuest(chordTraining.quest,chordTraining.inversion);
		this.router.navigate(['train'], { relativeTo: this.route });
	}

	public onMultipleStart() {
		if(!this.multipleQuest) throw new Error("Is not in Multiple-Select mode");
		this.router.navigate(['train'], { relativeTo: this.route });
	}

	public onCardSelect(chordTraining: ChordTraining) {
		if(!this.multipleQuest) throw new Error("Is not in Multiple-Select mode");
		this.questBundler.addQuest(chordTraining.quest,chordTraining.inversion);
		chordTraining.selected = true;
	}

}
