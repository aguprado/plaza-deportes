import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Headers, RequestOptions, Http } from '@angular/http';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    config = { endpoint: 'http://localhost:8080' };
    
    constructor(private router: Router, private http: Http) { }
 
    private options() {
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token') && localStorage.getItem('token').length) { return true };
        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/groups-list']);
        return false;
    }
}