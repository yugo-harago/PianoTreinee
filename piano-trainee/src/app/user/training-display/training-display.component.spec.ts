import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { TOKENS } from 'src/app/injections-tokens';
import { MidiService } from 'src/app/piano/midi/midi.service';
import { PianoChordQuestBundleService } from 'src/app/piano/piano-quest/piano-chord-quest-bundle.service';
import { PianoQuestHandlerService } from 'src/app/piano/piano-quest/piano-quest-handler.service';
import { Quest } from 'src/app/piano/piano-quest/quest.model';
import { PianoModule } from 'src/app/piano/piano.module';
import { TimerComponent } from '../timer/timer.component';

import { TrainingDisplayComponent } from './training-display.component';

describe('TrainingDisplayComponent', () => {
	let component: TrainingDisplayComponent;
	let fixture: ComponentFixture<TrainingDisplayComponent>;
	
	let pianoQuestStub:{ 
		nextQuest: () => Quest, 
		calledTimes: number,
		quest: Quest | undefined,
		questCount: {
			onMaxReach: Subject<boolean>
		},
		checkChange: Subject<boolean>
	} = { 
		nextQuest: () => {
			pianoQuestStub.calledTimes += 1;
			return pianoQuestStub.quest!;
		}, 
		calledTimes: 0,
		quest: undefined,
		questCount: {
			onMaxReach: new Subject<boolean>()
		},
		checkChange: new Subject<boolean>()
	}

	let timerComponent = {
		stop: () => undefined
	}

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ TrainingDisplayComponent ],
			providers: [
				{ provide: PianoChordQuestBundleService, useValue: pianoQuestStub },
				{ provide: PianoQuestHandlerService, useValue: pianoQuestStub},
				{ provide: TimerComponent, useValue: timerComponent}
			],
			imports:[
				RouterTestingModule,
				PianoModule
			]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TrainingDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display quest numbers input', () => {
		component.start();
		fixture.detectChanges(); // for timer component
		pianoQuestStub.questCount.onMaxReach.next(true);
		fixture.detectChanges();
		const input = fixture.debugElement.query(By.css('app-quests-quantity-input'));
		expect(input).toBeTruthy();
	});
});
