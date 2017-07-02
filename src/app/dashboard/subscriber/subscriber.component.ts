import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscriber } from '../../models/subscriber';
import { SubscribersService } from '../../services/subscribers.service';
import {Router, Resolve, RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { Cookie } from "ng2-cookies/ng2-cookies";
import { Select2OptionData } from 'ng2-select2/ng2-select2';

declare var $: any;
@Component({
    selector: 'subscriber-cmp',
    moduleId: module.id,
    templateUrl: 'subscriber.component.html',
    providers: [SubscribersService]
})

export class SubscriberComponent implements OnInit{
    model: Subscriber;
    user:string;
    constructor(
        private dataService: SubscribersService,
        private router: Router,
        private location: Location
    ) { }



    ngOnInit(): void {
        this.user = Cookie.get('userId');
        this.dataService.getOne(this.user)
            .subscribe(data =>
            {
                this.model = data;     
            });
     
    }

	logout() {
		this.dataService.logout().subscribe(() => this.router.navigate(['/login']));
       
    }



}
