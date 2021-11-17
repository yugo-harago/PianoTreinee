import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorComponent } from './visitor/visitor.component';
import { VisitorHeaderComponent } from './visitor/visitor-header/visitor-header.component';
import { VisitorHomeComponent } from './visitor/visitor-home/visitor-home.component';
import { UserModule } from './user/user.module';
import { QuestModule } from './quest/quest.module';

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
		UserModule, 
		QuestModule,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
