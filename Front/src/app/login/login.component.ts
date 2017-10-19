import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private authenticationService: AuthService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService
            .login(this.model.username, this.model.password)
            .then(data => {
                this.loading = false; 
                if (data) { this.router.navigate(['/groups-list']) };
            },error => { this.loading = false });
    }
}