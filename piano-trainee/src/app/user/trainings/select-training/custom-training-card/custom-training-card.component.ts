import { Component, OnInit } from '@angular/core';
import { QuestCardType } from 'src/app/quest/piano-quest/quest-card-type.enum';
import { ChordQuest } from '../select-training.component';
import { ChordTraining } from '../training-options.data';

@Component({
  selector: 'app-custom-training-card',
  templateUrl: './custom-training-card.component.html',
  styleUrls: ['./custom-training-card.component.sass'],
  host: {'class': 'card'}
})
export class CustomTrainingCardComponent implements OnInit {

    public chordTraining: ChordTraining = new ChordTraining(1, "Custom Training", 0, QuestCardType.custom);
    public ordinalKeys = [
        [1,false],
        [2,false],
        [3,false],
        [4,false],
        [5,false],
        [6,false],
        [7,false],
        [8,false]
    ]
    public ordinalKeyInput: number = 0;

    constructor() { }

    ngOnInit(): void {
        this.chordTraining.ordinalTrainings = [];
    }

    public onOrdinalKey(n: (number | boolean)[]){
        debugger
        if(typeof n[1] != 'boolean')
            throw new Error("Content is not a boolean.");
        n[1] = !n[1];
        if(typeof n[0] != 'number')
            throw new Error("Content is not a number.");
        if(this.chordTraining.ordinalTrainings!.includes(<number>n[0])){
            const index = this.chordTraining.ordinalTrainings!.indexOf(5);
            this.chordTraining.ordinalTrainings!.splice(index, 1);
        }
        else{
            this.chordTraining.ordinalTrainings!.push(<number>n[0]);
        }
    }
	public onCardClick() {
		// let quest = this.toQuest();
		// this.questBundler.addQuest(quest);
		// this.router.navigate(['train'], { relativeTo: this.route });
	}
	public onCardSelect() {
		// let quest = this.toQuest();
		// this.questBundler.addQuest(quest);
		// this.selected = true;
		// this.chordTraining!.selected = true;
	}
	public onCardDeselect() {
		// this.questBundler.removeQuest(this.chordTraining!);
		// this.selected = false;
		// this.chordTraining!.selected = false;
	}
	public inversionSelect($event: Event) {
		// this.chordTraining!.inversion = parseInt(($event.target as HTMLTextAreaElement).value);
	}

	public toQuest(): ChordQuest{
		// let accidental: AccidentalType;
		// if(this.chordTraining!.flatAccidental && this.chordTraining!.sharpAccidental && this.chordTraining!.whiteKey){
		// 	accidental = AccidentalType.all;
		// } else if(this.chordTraining!.flatAccidental && this.chordTraining!.sharpAccidental && !this.chordTraining!.whiteKey){
		// 	accidental = AccidentalType.flatAndSharp;
		// } else if(this.chordTraining!.flatAccidental){
		// 	accidental = AccidentalType.flat;
		// }else if(this.chordTraining!.sharpAccidental){
		// 	accidental = AccidentalType.sharp;
		// }else{
		// 	accidental = AccidentalType.none;
		// }
		// return new ChordQuest(this.chordTraining!.id, this.chordTraining!.quest, this.chordTraining!.inversion, accidental);
        throw new Error("Not implemented")
	}
}
