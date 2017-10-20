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

  newGroup: {nombre: string, descripcion: string, dias: string, horarios: string, cupo: number, agendaGrupo: any[]};
  
  constructor(private apiService: ApiService, private router: Router) { 
    this.newGroup = {nombre: null, descripcion: null, dias: null, horarios: null, cupo: 1, agendaGrupo: [{ diahora: '' }]};
  }

  crearGrupo() {
    debugger;
    let group: Group = new Group(this.newGroup);
    this.apiService.createGroup(group).then(response => {
      this.router.navigate(['/groups-list']);
    });
  }

  changeCupo() {
    while (this.newGroup.cupo != this.newGroup.agendaGrupo.length) { 
      this.newGroup.cupo > this.newGroup.agendaGrupo.length ? this.newGroup.agendaGrupo.push( { diahora: '' } ) : this.newGroup.agendaGrupo.pop();
    }
  }
  
}