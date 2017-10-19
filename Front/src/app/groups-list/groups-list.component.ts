import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/authService';
import { ApiService } from '../services/apiService';

declare let $: any;

@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})

export class GroupsListComponent implements OnInit {

  innerHeight: string;
  authSubscription: Subscription;
  logged: boolean = false;
  groups = [];

  constructor(private authService: AuthService, private apiService: ApiService) {
    this.authSubscription = authService.authAnnounced$.subscribe(action => {
      this.logged = action;
    });
    this.logged =  authService.getLoggedStatus();
  }
  
  ngOnInit() {
    this.apiService.loadGroups().then(response => {
      this.groups = response;
    });
    this.innerHeight = (window.innerHeight)+'px';
    //$(window).resize(() => {this.innerHeight = (window.innerHeight-30)+'px';});
  }

  logout = () => { this.authService.logout() }

}