import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Group } from '../models/Group';
import { LoadingService } from './loadingService';

@Injectable()
export class ApiService {

    apiUrl = 'http://52.67.131.86:8081';
    //apiUrl = 'http://localhost:8081';
    token:string = '';

    constructor(private http: Http, private loadingService: LoadingService) {}
    
    options = () => {
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }
    
    createGroup(group: Group): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let body = JSON.stringify(group);
        let url = this.apiUrl+'/group?token='+this.token;
        return this.http.post(url, body, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }

    updateGroup(group: Group): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let body = JSON.stringify(group);
        let url = this.apiUrl+'/group?token='+this.token;
        return this.http.put(url, body, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }

    deleteGroup(id: number): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let url = this.apiUrl+'/group?id='+id+'&token='+this.token;
        return this.http.delete(url, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }

    loadGroups(): Promise<any> {
        this.loadingService.loaderStart();
        let url = this.apiUrl+'/groups';
        return this.http.get(url, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }
    
    loadInscriptosGrupo(id: number): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let url = this.apiUrl+'/inscriptos-grupo?id='+id+'&token='+this.token;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }
    
    loadGroupAdmin(id: number): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let url = this.apiUrl+'/group?id='+id+'&token='+this.token;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }
    
    loadGroup(id: number): Promise<any> {
        this.loadingService.loaderStart();
        let url = this.apiUrl+'/group/'+id;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }
    
    desinscribirse(codigo: number): Promise<any> {
        this.loadingService.loaderStart();
        let url = this.apiUrl+'/inscripcion/'+codigo;
        return this.http.delete(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }
    
    inscribirse(inscripcion: any): Promise<any> {
        this.loadingService.loaderStart();
        let body = JSON.stringify(inscripcion);
        let url = this.apiUrl+'/inscripcion';
        return this.http.post(url, body, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }
        
    borrarInscripcionAdmin(id: number): Promise<any> {
        this.loadingService.loaderStart();
        let url = this.apiUrl+'/inscripcion?id='+id+'&token='+this.token;
        return this.http.delete(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }

    getInscripcion(id: number): Promise<any> {
        this.loadingService.loaderStart();
        let url = this.apiUrl+'/inscripcion/'+id;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(this.handleError);
    }

    handleError(error: any) {
        this.loadingService.loaderStop();
        return console.log(error);
    }
}
