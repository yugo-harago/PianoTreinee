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
import { PianoChordQuestBundleMock } from './piano/piano-quest/piano-chord-quest-bundle.mock';
import { PianoChordQuestBundleService } from './piano/piano-quest/piano-chord-quest-bundle.service';

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
		{ provide: PianoChordQuestBundleService, useClass: environment.mockQuestBundle ? PianoChordQuestBundleMock : PianoChordQuestBundleService }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
