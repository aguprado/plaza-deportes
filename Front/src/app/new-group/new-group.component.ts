import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../services/apiService';
import { Group } from '../models/Group';
import { Router } from '@angular/router';

@Component({
  selector: 'new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent {

  newGroup = {nombre: null, descripcion: null, dias: null, horarios: null, cupos: null};
  constructor(private apiService: ApiService, private router: Router) { }

  crearGrupo() {
    let group: Group = new Group(this.newGroup);
    this.apiService.createGroup(group).then(response => {
      if (response.insertId) { this.router.navigate(['/groups-list']) }
    });
  }
  
}