import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDisplayComponent } from './training-display/training-display.component';
import { PianoComponent } from './piano.component';
import { TOKENS } from '../injections-tokens';
import { environment } from '../../environments/environment';
import { PianoQuestBundleMock } from './piano-quest/piano-quest-bundle.mock';
import { PianoQuestBundleService } from './piano-quest/piano-quest-bundle.service';
import { MidiService } from './midi/midi.service';


@NgModule({
  declarations: [
    TrainingDisplayComponent,
	PianoComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
	TrainingDisplayComponent,
	PianoComponent
  ],
  providers: [
	  { provide: MidiService },
  ]
})
export class PianoModule { }
