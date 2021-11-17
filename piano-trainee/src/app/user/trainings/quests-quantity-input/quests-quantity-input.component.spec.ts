import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TOKENS } from 'src/app/injections-tokens';
import { MidiService } from 'src/app/piano/midi/midi.service';
import { PianoChordQuestBundleService } from 'src/app/quest/piano-quest/piano-chord-quest-bundle.service';
import { PianoQuestHandlerService } from 'src/app/quest/piano-quest/piano-quest-handler.service';
import { Quest } from 'src/app/quest/piano-quest/quest.model';

import { QuestsQuantityInputComponent } from './quests-quantity-input.component';

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

describe('QuestsQuantityInputComponent', () => {
  let component: QuestsQuantityInputComponent;
  let fixture: ComponentFixture<QuestsQuantityInputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ QuestsQuantityInputComponent ],
			providers: [
				{ provide: MidiService },
				{ provide: PianoQuestHandlerService },
				{ provide: PianoChordQuestBundleService, useValue: pianoQuestStub }
			],
		})
		.compileComponents();

		spyOn(localStorage, 'setItem').and.callFake((key:string, value: string) => undefined);
		spyOn(localStorage, 'getItem').and.callFake((key:string) => null);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(QuestsQuantityInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should increment by 10', () => {
		const questQuantity = parseInt(fixture.debugElement.query(By.css('input[name="quest-quantities"]')).nativeElement.value);
		fixture.debugElement.query(By.css('#add-quests-button')).nativeElement.click();
		fixture.detectChanges();
		const questQuantityIncreased = parseInt(fixture.debugElement.query(By.css('input[name="quest-quantities"]')).nativeElement.value);
		expect(questQuantityIncreased).toBe(questQuantity + 10);
	});
});
