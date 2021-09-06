import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano.component';



@NgModule({
  declarations: [
    PianoComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PianoComponent
  ]
})
export class PianoModule { }
