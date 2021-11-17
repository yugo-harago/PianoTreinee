import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoChordQuestBundleService } from './piano-quest/piano-chord-quest-bundle.service';
import { environment } from 'src/environments/environment';
import { PianoChordQuestBundleMock } from './piano-quest/piano-chord-quest-bundle.mock';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
	  { provide: PianoChordQuestBundleService, useClass: environment.mockQuestBundle ? PianoChordQuestBundleMock : PianoChordQuestBundleService }
  ],
})
export class QuestModule { }
