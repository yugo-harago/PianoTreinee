import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TOKENS } from '../injections-tokens';
import { UserModule } from '../user/user.module';
import { Note } from './note.enum';
import { PianoChordQuestBundleService } from './piano-quest/piano-chord-quest-bundle.service';
import { Quest } from './piano-quest/quest.model';

import { PianoComponent } from './piano.component';


let pianoQuestStub:{ 
	nextQuest: () => Quest, 
	calledTimes: number,
	quest: Quest | undefined,
} = { 
	nextQuest: () => {
		pianoQuestStub.calledTimes += 1;
		return pianoQuestStub.quest!;
	}, 
	calledTimes: 0,
	quest: undefined, 
}

describe('PianoComponent', () => {
	let component: PianoComponent;
	let fixture: ComponentFixture<PianoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ PianoComponent ],
			providers: [
				{ provide: PianoChordQuestBundleService, useValue: pianoQuestStub },
			],
			imports: [
				UserModule
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

	it('should restart', () => {
		pianoQuestStub.quest = new Quest([Note.C]);
		component.start();
		component.restart();
		expect(component.pianoQuest.questCount.current).toBe(0);
	});
});
