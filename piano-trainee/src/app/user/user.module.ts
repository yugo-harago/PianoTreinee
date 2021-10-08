import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TrainingsComponent } from './trainings/trainings.component';
import { PianoModule } from '../piano/piano.module';
import { LoggedHeaderComponent } from './logged-header/logged-header.component';
import { SelectTrainingComponent } from './trainings/select-training/select-training.component';
import { UserComponent } from './user.component';



@NgModule({
	declarations: [
		TrainingsComponent,
		LoggedHeaderComponent,
		UserComponent,
		SelectTrainingComponent
	],
	imports: [
		CommonModule,
	  	PianoModule,
	  	UserRoutingModule
	],
	exports: [
		LoggedHeaderComponent
	]
})
export class UserModule { }
