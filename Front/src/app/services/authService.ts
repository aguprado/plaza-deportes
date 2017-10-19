import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {

    private authAnnouncedSource = new Subject<boolean>();

    constructor(private http: Http) { }

    private logged: boolean = false;
    config = { endpoint: 'http://localhost:8080' };

    // Observable string streams
    authAnnounced$ = this.authAnnouncedSource.asObservable();

    private options() {
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }

    getLoggedStatus() { return this.logged };

    validateToken(token:string): Promise<any> {
        let url = `${this.config.endpoint}/validate?token=${token}`;
        return this.http.get(url, this.options()).toPromise()
            .then(response => {
                this.logged = response.json();
                this.authAnnouncedSource.next(this.logged);
            }).catch(this.handleError);
    }

    login(usuario: string, password: string): Promise<any> {
        let url = `${this.config.endpoint}/login`;
        let hash = CryptoJS.SHA1(password);
        let pass = hash.toString(CryptoJS.enc.Hex);
        let body = JSON.stringify({ usuario: usuario, password: password });
        return this.http.post(url, body, this.options()).toPromise()
            .then(response => {
                localStorage.setItem('token', response.json().token);
                this.logged = true;
                this.authAnnouncedSource.next(true);
                return response.json();
            }).catch(this.handleError);
    }

    logout(): Promise<any> {
        let token = localStorage.getItem('token');
        if (!token) { return };
        let body = JSON.stringify({ token: token });
        let url = `${this.config.endpoint}/logout`;
        return this.http.post(url, body, this.options()).toPromise()
            .then(response => {
                localStorage.setItem('token', null);
                this.logged = false;
                this.authAnnouncedSource.next(false);
                return response.json();
            }).catch(this.handleError);
    }

    private handleError(error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.statusText || 'Server error';
        return console.error(errMsg); // log to console instead
    }
}
