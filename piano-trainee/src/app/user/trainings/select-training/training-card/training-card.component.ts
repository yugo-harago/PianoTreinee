import { AfterViewChecked, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccidentalType } from 'src/app/piano/chord.model';
import { PianoChordQuestBundleService } from 'src/app/quest/piano-quest/piano-chord-quest-bundle.service';
import { PianoQuestHandlerService } from 'src/app/quest/piano-quest/piano-quest-handler.service';
import { ChordQuest } from '../select-training.component';
import { ChordTraining, TrainingInversionType } from '../training-options.data';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.sass'],
  host: {'class': 'card'}
})
export class TrainingCardComponent implements OnInit, AfterViewChecked {

	@Input() chordTraining?: ChordTraining;
	@HostBinding('id') id: string = '';
	@HostBinding('class.selected') selected = false;

	public TrainingInversionType = TrainingInversionType;

	constructor(
		private router: Router,
		private route:ActivatedRoute,
		private questBundler: PianoChordQuestBundleService,
		public pianoQuest: PianoQuestHandlerService
		) { }

	ngOnInit(): void {
	}
	ngAfterViewChecked(): void {
		this.id = this.chordTraining!.name +'-card';
		this.selected = this.chordTraining!.selected;
	}


	public onCardClick() {
		let quest = this.toQuest();
		this.questBundler.addQuest(quest);
		this.router.navigate(['train'], { relativeTo: this.route });
	}

	public onCardSelect() {
		let quest = this.toQuest();
		this.questBundler.addQuest(quest);
		this.selected = true;
		this.chordTraining!.selected = true;
	}
	public onCardDeselect() {
		this.questBundler.removeQuest(this.chordTraining!);
		this.selected = false;
		this.chordTraining!.selected = false;
	}
	public inversionSelect($event: Event) {
		this.chordTraining!.inversion = parseInt(($event.target as HTMLTextAreaElement).value);
	}

	public toQuest(): ChordQuest{
		let accidental: AccidentalType;
		if(this.chordTraining!.flatAccidental && this.chordTraining!.sharpAccidental && this.chordTraining!.whiteKey){
			accidental = AccidentalType.all;
		} else if(this.chordTraining!.flatAccidental && this.chordTraining!.sharpAccidental && !this.chordTraining!.whiteKey){
			accidental = AccidentalType.flatAndSharp;
		} else if(this.chordTraining!.flatAccidental){
			accidental = AccidentalType.flat;
		}else if(this.chordTraining!.sharpAccidental){
			accidental = AccidentalType.sharp;
		}else{
			accidental = AccidentalType.none;
		}
		return new ChordQuest(this.chordTraining!.id, this.chordTraining!.quest, this.chordTraining!.inversion, accidental);
	}
}
