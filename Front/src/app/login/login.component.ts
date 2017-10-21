import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
 
export class LoginComponent {
    
    model: any = {};
 
    constructor(private router: Router, private authenticationService: AuthService, public modal: Modal) { }
 
    login() {
        this.authenticationService
            .login(this.model.username, this.model.password)
            .then(data => {
                if (!data) {
                    return this.modal.alert()
                    .size('sm')
                    .showClose(true)
                    .title('Iniciar Sesión')
                    .body('<p>Datos incorrectos</p>')
                    .okBtn('Entendido')
                    .okBtnClass('btn btn-primary')
                    .open();
                }
                this.router.navigate(['/groups-list']) 
            });
    }
}