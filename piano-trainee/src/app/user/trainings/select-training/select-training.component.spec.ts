import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MidiService } from 'src/app/piano/midi/midi.service';
import { PianoChordQuestBundleService } from 'src/app/quest/piano-quest/piano-chord-quest-bundle.service';
import { Quest } from 'src/app/quest/piano-quest/quest.model';
import { Key } from 'src/app/piano/piano.service';
import { QuestsQuantityInputComponent } from '../quests-quantity-input/quests-quantity-input.component';
import { SelectTrainingComponent } from './select-training.component';
import { ChordTraining, trainingOptions } from './training-options.data';
import { QuestCardType } from 'src/app/quest/piano-quest/quest-card-type.enum';
import { AccidentalType } from 'src/app/piano/chord.model';

let pianoQuestStub:{ 
	nextQuest: () => Quest,
	resetQuest: () => void,
	calledTimes: number,
	quest: Quest | undefined
} = { 
	nextQuest: () => {
		pianoQuestStub.calledTimes += 1;
		return pianoQuestStub.quest!;
	}, 
	resetQuest: () => undefined,
	calledTimes: 0,
	quest: undefined
}

let midiStub = { 
	play: (key: Key) => {
		console.log(key.note + key.octave + " Played.")
	},
	startPlay: (key: Key) => undefined,
	stopPlay: (key: Key) => undefined,
}

describe('SelectTrainingComponent', () => {
	let component: SelectTrainingComponent;
	let fixture: ComponentFixture<SelectTrainingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ 
				SelectTrainingComponent,
				QuestsQuantityInputComponent
			],
			imports: [ 
				RouterTestingModule,
				FormsModule,
			],
			providers: [
				{ provide: PianoChordQuestBundleService, useValue: pianoQuestStub },
				{ provide: MidiService, useValue: midiStub },
			]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectTrainingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should generate training batch', () => {
		expect(component.batchTraining.length).toBe(3);
		expect(component.batchTraining[0].length).toBe(3);
	});
});
