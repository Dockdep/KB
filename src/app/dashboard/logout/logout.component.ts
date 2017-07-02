import { Component, OnInit } from '@angular/core';
import { Cookie } from "ng2-cookies/ng2-cookies";
import { Router } from '@angular/router';
import { SubscribersService } from '../../services/subscribers.service';
@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    template: '',
    providers: [SubscribersService]

})
export class LogoutComponent implements OnInit {


    constructor(private service: SubscribersService, private _router: Router) { }

	ngOnInit() {
		this.service.logout().subscribe(() => this._router.navigate(['/login']));
    }
}