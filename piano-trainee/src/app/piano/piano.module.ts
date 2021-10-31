import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano.component';
import { TOKENS } from '../injections-tokens';
import { environment } from '../../environments/environment';
import { PianoQuestBundleMock } from './piano-quest/piano-quest-bundle.mock';
import { PianoQuestBundleService } from './piano-quest/piano-quest-bundle.service';
import { MidiService } from './midi/midi.service';
import { QuestsQuantityInputComponent } from '../user/trainings/quests-quantity-input/quests-quantity-input.component';


@NgModule({
  declarations: [
	PianoComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
	PianoComponent,
  ],
  providers: [
	  { provide: MidiService },
  ]
})
export class PianoModule { }
