import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './services/apiService';
import { AuthService } from './services/authService';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loadingService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  loading: boolean = false;
  loadingSubscription: Subscription;
  
  constructor(private authenticationService: AuthService, private loadingService: LoadingService) { 
    this.loadingSubscription = loadingService.loadingAnnounced$.subscribe(status => { this.loading = status });
  }

  ngOnInit() { 
    let token = localStorage.getItem('token');
    if (token) { this.authenticationService.validateToken(token) };
  }

  ngOnDestroy() { this.loadingSubscription.unsubscribe() }

}
