import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {

    private authAnnouncedSource = new Subject<boolean>();
    constructor(private http: Http) { }

    config = { endpoint: '' };

    // Observable string streams
    authAnnounced$ = this.authAnnouncedSource.asObservable();

    options = () => {
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }

    login = (email: string, password: string): Promise<any> => {
        let url = `${this.config.endpoint}/auth/login`;
        let hash = CryptoJS.SHA1(password);
        let pass = hash.toString(CryptoJS.enc.Hex);
        let body = JSON.stringify({ email: email, password: password });
        return this.http.post(url, body, this.options()).toPromise()
            .then(response => {
                localStorage.setItem('token', response.json());
                this.authAnnouncedSource.next(true);
                return response.json();
            }).catch(this.handleError);
    }

    logout = (): Promise<any> => {
        let token = localStorage.getItem('token');
        if (!token) { return };
        let body = JSON.stringify({ token: token });
        let url = `${this.config.endpoint}/auth/logout`;
        return this.http.post(url, token, this.options()).toPromise()
            .then(response => {
                this.authAnnouncedSource.next(false);
                return response.json();
            }).catch(this.handleError);
    }

    private handleError(error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}
