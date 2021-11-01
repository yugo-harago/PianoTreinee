import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano.component';
import { MidiService } from './midi/midi.service';


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
