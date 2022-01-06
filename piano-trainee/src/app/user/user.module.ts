import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TrainingsComponent } from './trainings/trainings.component';
import { PianoModule } from '../piano/piano.module';
import { LoggedHeaderComponent } from './logged-header/logged-header.component';
import { SelectTrainingComponent } from './trainings/select-training/select-training.component';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { QuestsQuantityInputComponent } from './trainings/quests-quantity-input/quests-quantity-input.component';
import { TrainingDisplayComponent } from './training-display/training-display.component';
import { TimerComponent } from './timer/timer.component';
import { InversionFocusTrainingComponent } from './trainings/inversion-focus-training/inversion-focus-training.component';
import { PianoQuestGuard } from '../quest/piano-quest/piano-quest-guard';
import { TrainingCardComponent } from './trainings/select-training/training-card/training-card.component';
import { CustomTrainingCardComponent } from './trainings/select-training/custom-training-card/custom-training-card.component';



@NgModule({
	declarations: [
		TrainingsComponent,
		LoggedHeaderComponent,
		UserComponent,
		SelectTrainingComponent,
		QuestsQuantityInputComponent,
		TrainingDisplayComponent,
		TimerComponent,
		InversionFocusTrainingComponent,
		TrainingCardComponent,
  CustomTrainingCardComponent
	],
	imports: [
		CommonModule,
		FormsModule,
	  	PianoModule,
	  	UserRoutingModule,
	],
	exports: [
		LoggedHeaderComponent,
		QuestsQuantityInputComponent,
		TrainingDisplayComponent
	],
	providers: [
		{ provide: PianoQuestGuard }
	]
})
export class UserModule { }
