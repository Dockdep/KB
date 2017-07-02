import { Component, OnInit } from '@angular/core';
import { Cookie } from "ng2-cookies/ng2-cookies";
@Component({
    selector: 'navbar',
    styleUrls: ['../../assets/stylesheet/left-navbar.css'],
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    public user: string
    ngOnInit() {
        this.user = Cookie.get('userId');
    }
}