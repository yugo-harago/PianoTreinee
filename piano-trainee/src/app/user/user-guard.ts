import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class UserGuard implements CanActivate {
  	constructor(
		private router: Router,
		private userService: UserService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		this.userService.logged = true;
		return true;
	}
}