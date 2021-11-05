import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { PianoChordQuestBundleService } from "./piano-chord-quest-bundle.service";

@Injectable()
export class PianoQuestGuard implements CanActivate {
  	constructor(
		private chordQuest: PianoChordQuestBundleService,
		private router: Router
	) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
		if(this.chordQuest.currentQuests.length) return true;
		this.router.navigate(['/user/trainings']);
    	return false;
  }
}