import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano.component';
import { TrainingDisplayComponent } from './training-display/training-display.component';
import { PianoService } from './piano.service';



@NgModule({
  declarations: [
    PianoComponent,
    TrainingDisplayComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PianoComponent,
	TrainingDisplayComponent,
  ]
})
export class PianoModule { }
