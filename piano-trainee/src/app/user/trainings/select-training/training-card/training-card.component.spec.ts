import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AccidentalType } from 'src/app/piano/chord.model';
import { MidiService } from 'src/app/piano/midi/midi.service';
import { Key } from 'src/app/piano/piano.service';
import { PianoChordQuestBundleService } from 'src/app/quest/piano-quest/piano-chord-quest-bundle.service';
import { QuestCardType } from 'src/app/quest/piano-quest/quest-card-type.enum';
import { Quest } from 'src/app/quest/piano-quest/quest.model';
import { ChordTraining } from '../training-options.data';

import { TrainingCardComponent } from './training-card.component';

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
describe('TrainingCardComponent', () => {
	let component: TrainingCardComponent;
	let fixture: ComponentFixture<TrainingCardComponent>;

	beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [ 
			TrainingCardComponent,
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
		fixture = TestBed.createComponent(TrainingCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.chordTraining = new ChordTraining(1,"title",1,QuestCardType.majorChordQuest);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should chenge sharp chord training to quest', () => {
		component.chordTraining = new ChordTraining(1,"title", 1, QuestCardType.majorChordQuest, undefined, false, true);
		const quest = component.toQuest();
		expect(quest.accidental).toBe(AccidentalType.sharp);
	});

	it('should chenge flat chord training to quest', () => {
		component.chordTraining = new ChordTraining(1,"title", 1, QuestCardType.majorChordQuest, undefined, true);
		const quest = component.toQuest();
		expect(quest.accidental).toBe(AccidentalType.flat);
	});

	it('should chenge flat and sharp chord training to quest', () => {
		component.chordTraining = new ChordTraining(1,"title", 1, QuestCardType.majorChordQuest, undefined, true, true);
		component.chordTraining.whiteKey = false;
		const quest = component.toQuest();
		expect(quest.accidental).toBe(AccidentalType.flatAndSharp);
	});

	it('should chenge black and white chord training to quest', () => {
		component.chordTraining = new ChordTraining(1,"title", 1, QuestCardType.majorChordQuest, undefined, true, true);
		const quest = component.toQuest();
		expect(quest.accidental).toBe(AccidentalType.all);
	});
});
