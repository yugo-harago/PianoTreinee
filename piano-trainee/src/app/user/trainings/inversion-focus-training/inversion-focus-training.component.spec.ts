import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { MidiService } from 'src/app/piano/midi/midi.service';
import { PianoChordQuestBundleService } from 'src/app/quest/piano-quest/piano-chord-quest-bundle.service';
import { Quest } from 'src/app/quest/piano-quest/quest.model';
import { PianoModule } from 'src/app/piano/piano.module';
import { TrainingDisplayComponent } from '../../training-display/training-display.component';

import { InversionFocusTrainingComponent } from './inversion-focus-training.component';

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

describe('InversionFocusTrainingComponent', () => {
  let component: InversionFocusTrainingComponent;
  let fixture: ComponentFixture<InversionFocusTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
		  InversionFocusTrainingComponent,
		  TrainingDisplayComponent
		 ],
		 providers: [
			 { provide: PianoChordQuestBundleService, useValue: pianoQuestStub },
		 ],
		 imports: [
			 PianoModule,
			 RouterTestingModule
		 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InversionFocusTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
