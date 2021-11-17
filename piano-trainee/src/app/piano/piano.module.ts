import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano.component';
import { MidiService } from './midi/midi.service';
import { PianoQuestGuard } from '../quest/piano-quest/piano-quest-guard';


@NgModule({
  declarations: [
	PianoComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
	PianoComponent,
  ],
  providers: [
		{ provide: MidiService }
  ]
})
export class PianoModule { }
