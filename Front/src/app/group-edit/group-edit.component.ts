import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/authService';
import { ApiService } from '../services/apiService';
import { Router, ActivatedRoute } from '@angular/router';
import { Group } from '../models/Group';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

  paramsSubscription: Subscription;
  inscriptos = [];
  idGrupo: number;
  group : Group;

  constructor(private authService: AuthService, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.paramsSubscription = this.route.params.subscribe(params => {
        this.idGrupo = params['id'];
    });
  }
  
  ngOnInit() {
    this.apiService.loadGroupAdmin(this.idGrupo).then(response => {
      this.group = response ? new Group(response) : this.router.navigate(['/groups-list']) && null;
    });
  }

  actualizarGrupo(id) {
    this.apiService.updateGroup(this.group).then(response => {
      if (response) { this.router.navigate(['/groups-list']) };
    });
  }

  changeCupo() {
    if (this.group.cupo < this.group.agendaGrupo.length) { return this.group.cupo = this.group.agendaGrupo.length }
    while (this.group.cupo > this.group.agendaGrupo.length) { 
      this.group.agendaGrupo.push( { diahora: '' } );
    }
  }

  ngOnDestroy() { this.paramsSubscription.unsubscribe() }

}
