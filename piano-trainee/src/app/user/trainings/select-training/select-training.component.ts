import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TOKENS } from 'src/app/injections-tokens';
import { PianoChordQuestBundleService } from 'src/app/piano/piano-quest/piano-chord-quest-bundle.service';
import { PianoQuestHandlerService } from 'src/app/piano/piano-quest/piano-quest-handler.service';
import { ChordTraining, trainingOptions } from './training-options.data';

@Component({
  selector: 'app-select-training',
  templateUrl: './select-training.component.html',
  styleUrls: ['./select-training.component.sass']
})
export class SelectTrainingComponent implements OnInit {

	public batchTraining: ChordTraining[][] = [];
	private chordTrainings: Array<ChordTraining> = [];

	constructor(
		private router: Router,
		private route:ActivatedRoute,
		private questBundler: PianoChordQuestBundleService,
		public pianoQuest: PianoQuestHandlerService
	){
		this.reset();
	}

	ngOnInit(): void {
		this.chordTrainings = trainingOptions;
		this.batchTraining = this.toMatrix(this.chordTrainings, 3);
	}
	public Start() {
		this.router.navigate(['train'], { relativeTo: this.route });
	}

	public reset() {
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
		this.questBundler.addQuest(chordTraining.quest,chordTraining.inversion, chordTraining.accidental);
		this.router.navigate(['train'], { relativeTo: this.route });
	}

	public onCardSelect(chordTraining: ChordTraining) {
		this.questBundler.addQuest(chordTraining.quest,chordTraining.inversion, chordTraining.accidental);
		chordTraining.selected = true;
	}
	public onCardDeselect(chordTraining: ChordTraining) {
		this.questBundler.removeQuest(chordTraining.quest,chordTraining.inversion);
		chordTraining.selected = false;
	}

}
