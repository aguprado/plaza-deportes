import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Group } from '../models/Group';

@Injectable()
export class ApiService {

    //apiUrl = 'http://52.67.131.86:8080';
    apiUrl = 'http://localhost:8080';
    constructor(private http: Http) {}
    
    options = () => {
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }

    createGroup(group: Group): Promise<any> {
        let body = JSON.stringify(group);
        let url = this.apiUrl+'/game';
        return this.http.post(url, body, this.options()).toPromise()
            .then(response => {
                return response.json();
            }).catch(this.handleError);
    }

    deleteGroup(id): Promise<any> {
        let url = this.apiUrl+'/group?id='+id;
        return this.http.delete(url, this.options()).toPromise()
            .then(response => {
                return response.json();
            }).catch(this.handleError);
    }

    loadGroups(): Promise<any> {
        let url = this.apiUrl+'/groups';
        return this.http.get(url, this.options()).toPromise()
            .then(response => {
                return response.json();
            }).catch(this.handleError);
    }
    
    loadGroup(id: string): Promise<any> {
        let url = this.apiUrl+'/group?id='+id;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                return response.json();
            }).catch(this.handleError);
    }
    
    inscribirse(ci: string, id: string): Promise<any> {
        let body = JSON.stringify({ci: ci, id: id});
        let url = this.apiUrl+'/inscripcion';
        return this.http.post(url, body, this.options())
            .toPromise().then(response => {
                return response.json();
            }).catch(this.handleError);
    }
        
    desinscribirse(ci: string, id: string, codigo: string): Promise<any> {
        let body = JSON.stringify({ci: ci, id: id, codigo: codigo});
        let url = this.apiUrl+'/inscripcion?id='+id+'&ci='+ci+'&codigo='+codigo;
        return this.http.delete(url, this.options())
            .toPromise().then(response => {
                return response.json();
            }).catch(this.handleError);
    }

    //rejects the promise if error in the call
    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
