import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Group } from '../models/Group';

@Injectable()
export class ApiService {

    apiUrl = 'http://52.67.131.86:8081';
    //apiUrl = 'http://localhost:8081';
    token:string = '';
    ultimaInscripcion: any;

    constructor(private http: Http) {}
    
    options = () => {
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }
/*
    borrarInscripcion(id).then(response => {
        this.apiService.loadInscriptosGrupo(this.idGrupo)
*/

    createGroup(group: Group): Promise<any> {
        this.token = localStorage.getItem('token');
        let body = JSON.stringify(group);
        let url = this.apiUrl+'/group?token='+this.token;
        return this.http.post(url, body, this.options()).toPromise()
            .then(response => {
                return response.json();
            }).catch(this.handleError);
    }

    updateGroup(group: Group): Promise<any> {
        this.token = localStorage.getItem('token');
        let body = JSON.stringify(group);
        let url = this.apiUrl+'/group?token='+this.token;
        return this.http.put(url, body, this.options()).toPromise()
            .then(response => {
                return response.json();
            }).catch(this.handleError);
    }

    deleteGroup(id: number): Promise<any> {
        this.token = localStorage.getItem('token');
        let url = this.apiUrl+'/group?id='+id+'&token='+this.token;
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
    
    loadInscriptosGrupo(id: number): Promise<any> {
        this.token = localStorage.getItem('token');
        let url = this.apiUrl+'/inscriptos-grupo?id='+id+'&token='+this.token;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                return response.json();
            }).catch(this.handleError);
    }
    
    loadGroupAdmin(id: number): Promise<any> {
        this.token = localStorage.getItem('token');
        let url = this.apiUrl+'/group?id='+id+'&token='+this.token;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                return response.json();
            }).catch(this.handleError);
    }
    
    loadGroup(id: number): Promise<any> {
        let url = this.apiUrl+'/group/'+id;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                return response.json();
            }).catch(this.handleError);
    }
    
    desinscribirse(codigo: number): Promise<any> {
        let url = this.apiUrl+'/inscripcion?codigo='+codigo;
        return this.http.delete(url, this.options())
            .toPromise().then(response => {
                return response.json();
            }).catch(this.handleError);
    }
    
    inscribirse(inscripcion: any): Promise<any> {
        let body = JSON.stringify(inscripcion);
        let url = this.apiUrl+'/inscripcion';
        return this.http.post(url, body, this.options())
            .toPromise().then(response => {
                let inscripcion = response.json();
                if (inscripcion) { this.ultimaInscripcion = inscripcion };
                return inscripcion;
            }).catch(this.handleError);
    }
        
    borrarInscripcionAdmin(id: number): Promise<any> {
        let url = this.apiUrl+'/inscripcion/'+id+'?token='+this.token;
        return this.http.delete(url, this.options())
            .toPromise().then(response => {
                return response.json();
            }).catch(this.handleError);
    }

    getUltimaInscripcion() {
        return this.ultimaInscripcion;
    }

    //rejects the promise if error in the call
    private handleError(error: any) {
        let errMsg = error.statusText || 'Server error';
        return console.error(errMsg);
    }
}
