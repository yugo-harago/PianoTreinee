import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDisplayComponent } from './training-display/training-display.component';
import { PianoQuestComponent } from './piano-quest/piano-quest.component';



@NgModule({
  declarations: [
    PianoQuestComponent,
    TrainingDisplayComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PianoQuestComponent,
	TrainingDisplayComponent,
  ]
})
export class PianoModule { }
