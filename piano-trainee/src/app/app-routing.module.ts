import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './user/user-guard';
import { UserRoutingModule } from './user/user-routing.module';
import { UserComponent } from './user/user.component';
import { VisitorComponent } from './visitor/visitor.component';

const routes: Routes = [
  { path: '', component: VisitorComponent },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
	canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [
	  RouterModule.forRoot(routes),
	],
  exports: [RouterModule],
  providers: [
	  { provide: UserGuard }
  ]
})
export class AppRoutingModule { }
