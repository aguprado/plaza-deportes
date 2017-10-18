import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/authService';
import { ApiService } from '../services/apiService';

@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  authSubscription: Subscription;
  logged: boolean = false;
  groups = [];

  constructor(private authService: AuthService, private apiService: ApiService) {
    this.authSubscription = authService.authAnnounced$.subscribe(action => {
      this.logged = action;
    });
  }

  ngOnInit() {
    this.apiService.loadGroups().then(response => {
      this.groups = response;
    });
  }

}