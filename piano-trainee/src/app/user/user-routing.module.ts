import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectTrainingComponent } from './trainings/select-training/select-training.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { UserComponent } from './user.component';
import { PianoQuestGuard } from '../piano/piano-quest/piano-quest-guard'

const routes: Routes = [
	{ path: '', component: UserComponent },
	{ path: 'trainings', component: SelectTrainingComponent },
	{ path: 'trainings/train', component: TrainingsComponent, canActivate: [PianoQuestGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
