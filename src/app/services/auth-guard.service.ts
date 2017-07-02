import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Cookie } from "ng2-cookies/ng2-cookies";
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        var user = Cookie.get('userId');
        if (user && user.length) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}