import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './services/apiService';
import { AuthService } from './services/authService';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loadingService';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  loading: boolean = false;
  loadingSubscription: Subscription;
  innerHeight: string;

  constructor(private authenticationService: AuthService, private loadingService: LoadingService) { 
    this.loadingSubscription = loadingService.loadingAnnounced$.subscribe(status => { this.loading = status });
  }

  ngOnInit() { 
    let token = localStorage.getItem('token');
    if (token) { this.authenticationService.validateToken(token) };    
    this.innerHeight = (window.innerHeight-140)+'px';
    $(window).resize(() => {this.innerHeight = (window.innerHeight-140)+'px';});
  }

  ngOnDestroy() { this.loadingSubscription.unsubscribe() }

}
