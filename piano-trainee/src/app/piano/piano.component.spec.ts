import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TOKENS } from '../injections-tokens';
import { MidiService } from './midi/midi.service';
import { PianoQuestBundleService } from './piano-quest/piano-quest-bundle.service';
import { PianoQuestHandlerService } from './piano-quest/piano-quest-handler.service';
import { Quest } from './piano-quest/quest.model';

import { PianoComponent } from './piano.component';


let pianoQuestStub:{ 
	nextQuest: () => Quest, 
	calledTimes: number,
	quest: Quest | undefined
} = { 
	nextQuest: () => {
		pianoQuestStub.calledTimes += 1;
		return pianoQuestStub.quest!;
	}, 
	calledTimes: 0,
	quest: undefined
}

describe('PianoComponent', () => {
	let component: PianoComponent;
	let fixture: ComponentFixture<PianoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ PianoComponent ],
			providers: [
				{ provide: MidiService },
				{ provide: PianoQuestBundleService },
				{ provide: PianoQuestHandlerService },
				{ provide: TOKENS.PIANO_QUEST_BUNDLE, useValue: pianoQuestStub },
			]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PianoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
