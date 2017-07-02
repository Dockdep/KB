import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Article } from '../models/article';
@Injectable()
export class ArticlesService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'api/Article'; 

    constructor(private http: Http) { }

    getAll(): Observable<Article[]> {
        return this.http.get(this.url, { headers: this.headers })
            .map(response => response.json() as Article[])
            .catch(this.handleError);
    }


    getOne(id: string): Observable<Article> {
        let url = `${this.url}/details/${id}`;
        
        return this.http.get(url)
            .map(response => response.json() as Article)
            .catch(this.handleError);
    }

    delete(id: string): Observable<void> {

        let url = `${this.url}/delete/${id}`;
        return this.http.post(url, { headers: this.headers })
            .catch(this.handleError);
    }

    create(data: Article): Observable<Article> {
        let url = `${this.url}/create`;
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })  
            .catch(this.handleError);
    }

    edit(data: Article): Observable<Article> {
        let url = `${this.url}/edit/${data.id}`;
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