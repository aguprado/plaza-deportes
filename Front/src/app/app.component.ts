import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './services/apiService';
import { AuthService } from './services/authService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(private authenticationService: AuthService) { }

  ngOnInit() { 
    let token = localStorage.getItem('token');
    if (token) { this.authenticationService.validateToken(token) };
  }

}
