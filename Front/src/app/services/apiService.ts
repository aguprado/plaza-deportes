import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Group } from '../models/Group';
import { LoadingService } from './loadingService';
import { Router } from '@angular/router';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Injectable()
export class ApiService {

    config = { endpoint: 'http://52.67.131.86:8081' };
    //config = { endpoint: 'http://localhost:8081' };
    token:string = '';

    constructor(private http: Http, private router: Router, private loadingService: LoadingService, public modal: Modal) {}
    
    private options = () => {
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }
    
    public createGroup(group: Group): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let body = JSON.stringify(group);
        let url = `${this.config.endpoint}/group?token=${this.token}`;
        return this.http.post(url, body, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }

    public updateGroup(group: Group): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let body = JSON.stringify(group);
        let url = `${this.config.endpoint}/group?token=${this.token}`;
        return this.http.put(url, body, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }

    public deleteGroup(id: number): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let url = `${this.config.endpoint}/group?id=${id}&token=${this.token}`;
        return this.http.delete(url, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }
    
    public getInscripciones(): Promise<any> {
        this.loadingService.loaderStart();
        let url = `${this.config.endpoint}/get-inscripciones`;
        return this.http.get(url, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }
        
    public setInscripciones(value): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let body = JSON.stringify({value: value});
        let url = `${this.config.endpoint}/set-inscripciones?token=${this.token}`;
        return this.http.post(url, body, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }

    public loadGroups(): Promise<any> {
        this.loadingService.loaderStart();
        let url = `${this.config.endpoint}/groups`;
        return this.http.get(url, this.options()).toPromise()
            .then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }
    
    public loadInscriptosGrupo(id: number): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let url = `${this.config.endpoint}/inscriptos-grupo?id=${id}&token=${this.token}`;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }
    
    public loadGroupAdmin(id: number): Promise<any> {
        this.loadingService.loaderStart();
        this.token = localStorage.getItem('token');
        let url = `${this.config.endpoint}/group?id=${id}&token=${this.token}`;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }
    
    public loadGroup(id: number): Promise<any> {
        this.loadingService.loaderStart();
        let url = `${this.config.endpoint}/group/${id}`;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }
    
    public desinscribirse(codigo: number): Promise<any> {
        this.loadingService.loaderStart();
        let url = `${this.config.endpoint}/inscripcion/${codigo}`;
        return this.http.delete(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }
    
    public inscribirse(inscripcion: any): Promise<any> {
        this.loadingService.loaderStart();
        let body = JSON.stringify(inscripcion);
        let url = `${this.config.endpoint}/inscripcion`;
        return this.http.post(url, body, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }
        
    public borrarInscripcionAdmin(id: number): Promise<any> {
        this.loadingService.loaderStart();
        let url = `${this.config.endpoint}/inscripcion?id=${id}&token=${this.token}`;
        return this.http.delete(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }

    public getInscripcion(id: number): Promise<any> {
        this.loadingService.loaderStart();
        let url = `${this.config.endpoint}/inscripcion/${id}`;
        return this.http.get(url, this.options())
            .toPromise().then(response => {
                this.loadingService.loaderStop();
                return response.json();
            }).catch(error => this.handleError(error, this.router, this.loadingService));
    }

    private handleError(error: any, router: Router, loadingService: any) {
        loadingService.loaderStop();
        if (error.status && error.status == 401) {
            return router.navigate(['admin']);
        }
        if (error._body) {
            this.modal.alert()
                .size('sm')
                .showClose(true)
                .title('Error')
                .body('<p>'+error._body+'</p>')
                .okBtn('Entendido')
                .okBtnClass('btn btn-primary')
                .open()
                .then( (dialog) => { dialog.result.then( () => { location.reload() } ); } );
        }
        return Promise.reject(error);
    }
}
