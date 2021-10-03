import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoutingModule } from './user/user-routing.module';
import { UserComponent } from './user/user.component';
import { VisitorComponent } from './visitor/visitor.component';

const routes: Routes = [
  { path: '', component: VisitorComponent },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [
	  RouterModule.forRoot(routes),
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
