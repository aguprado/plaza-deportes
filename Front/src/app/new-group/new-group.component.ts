import { Component } from '@angular/core';
import { ApiService } from '../services/apiService';
import { Group } from '../models/Group';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'angular4-datepicker/src/my-date-picker';

@Component({
  selector: 'new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent {

  newGroup: { nombre: string, descripcion: string, dias: string, horarios: string, cupo: number, agendaGrupo: any[], fechaPublicacion: object };
  
  myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Hoy',
    dateFormat: 'dd-mm-yyyy',
  };

  constructor(private apiService: ApiService, private router: Router) { 
    this.newGroup = { nombre: null, descripcion: null, dias: null, horarios: null, cupo: 1, agendaGrupo: [{ diahora: '' }], fechaPublicacion: { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } } };
  }

  crearGrupo() {
    let group: Group = new Group(this.newGroup);
    debugger
    this.apiService.createGroup(group).then(() => {
      this.router.navigate(['/groups-list']);
    });
  }

  changeCupo() {
    while (this.newGroup.cupo != this.newGroup.agendaGrupo.length) { 
      this.newGroup.cupo > this.newGroup.agendaGrupo.length ? this.newGroup.agendaGrupo.push( { diahora: '' } ) : this.newGroup.agendaGrupo.pop();
    }
  }
  
}