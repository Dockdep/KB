import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Cookie } from "ng2-cookies/ng2-cookies";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Subscriber } from '../models/subscriber';
@Injectable()
export class SubscribersService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'api/Subscriber'; 

    constructor(private http: Http) { }

    getAll(): Observable<Subscriber[]> {
        return this.http.get(this.url, { headers: this.headers })
            .map(response => response.json() as Subscriber[])
            .catch(this.handleError);
    }


    getOne(id: string): Observable<Subscriber> {
        let url = `${this.url}/details/${id}`;
        
        return this.http.get(url)
            .map(response => response.json() as Subscriber)
            .catch(this.handleError);
    }

    delete(id: string): Observable<void> {

        let url = `${this.url}/delete/${id}`;
        return this.http.post(url, { headers: this.headers })
            .catch(this.handleError);
    }

    create(data: Subscriber): Observable<Subscriber> {
        let url = `${this.url}/create`;
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })  
            .catch(this.handleError);
    }

    edit(data: Subscriber): Observable<Subscriber> {
        let url = `${this.url}/edit/${data.id}`;
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers }) 
            .catch(this.handleError);
    }

    login(user) {
        Cookie.set('userId', user);

		let url = `${this.url}/login/${user}`;
        var data = {};
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .catch(this.handleError);
    }

    logout() {
        Cookie.set('userId', '');

        let url = `${this.url}/logout`;
        var data = {};
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err =  JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }




}