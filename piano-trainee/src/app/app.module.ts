import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorComponent } from './visitor/visitor.component';
import { VisitorHeaderComponent } from './visitor/visitor-header/visitor-header.component';
import { VisitorHomeComponent } from './visitor/visitor-home/visitor-home.component';
import { UserModule } from './user/user.module';
import { environment } from 'src/environments/environment';
import { TOKENS } from './injections-tokens';
import { PianoQuestBundleMock } from './piano/piano-quest/piano-quest-bundle.mock';
import { PianoQuestBundleService } from './piano/piano-quest/piano-quest-bundle.service';

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
	],
	providers: [
		{ provide: TOKENS.PIANO_QUEST_BUNDLE, useClass: environment.mockQuestBundle ? PianoQuestBundleMock : PianoQuestBundleService }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
