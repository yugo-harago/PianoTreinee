import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

	constructor(
		private userService: UserService,
	) { 
		this.userService.logged = true;
	}

	ngOnInit(): void {
	}

}
