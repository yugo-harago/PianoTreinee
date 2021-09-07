import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDisplayComponent } from './training-display/training-display.component';
import { PianoComponent } from './piano.component';



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
  ]
})
export class PianoModule { }
