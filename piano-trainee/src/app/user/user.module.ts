import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsComponent } from './trainings/trainings.component';
import { LoggedHeaderComponent } from './logged-header/logged-header.component';
import { UserComponent } from './user.component';
import { PianoComponent } from '../piano/piano.component';
import { AppModule } from '../app.module';
import { PianoModule } from '../piano/piano.module';



@NgModule({
  declarations: [
    TrainingsComponent,
    LoggedHeaderComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    PianoModule,
  ],
})
export class UserModule { }
