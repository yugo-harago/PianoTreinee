import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorComponent } from './visitor/visitor.component';
import { VisitorHeaderComponent } from './visitor/visitor-header/visitor-header.component';
import { VisitorHomeComponent } from './visitor/visitor-home/visitor-home.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    VisitorHeaderComponent,
    VisitorHomeComponent,
    VisitorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
