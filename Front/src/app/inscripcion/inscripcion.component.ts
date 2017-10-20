import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/apiService';
import { Router, ActivatedRoute } from '@angular/router';
import { Group } from '../models/Group';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

  paramsSubscription: Subscription;
  idGrupo: number;
  group: Group;
  inscripcion: {documento: string, nombre: string, fnacimiento: Date, edad: number, diahora: string, idAgenda: number};

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.paramsSubscription = this.route.params.subscribe(params => {
        this.idGrupo = params['id'];
        this.inscripcion = {documento: null, nombre: null, fnacimiento: new Date(), edad: 0, diahora: '', idAgenda: 0 };
    });
  }
  
  ngOnInit() {
    this.apiService.loadGroup(this.idGrupo).then(response => {
      this.group = response ? new Group(response) : this.router.navigate(['/groups-list']) && null;
    });
  }

  confirmarInscripcion() {
    if (!this.inscripcion.idAgenda) { return };
    this.apiService.inscribirse(this.inscripcion).then(response => {
      this.router.navigate(['/confirmed', this.inscripcion.documento, this.inscripcion.idAgenda]);
    });
  }

  updateEdad() {
    var ageDifMs = Date.now() - new Date(this.inscripcion.fnacimiento).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    this.inscripcion.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  ngOnDestroy() { this.paramsSubscription.unsubscribe() }

}

/*
      <div class="col-xs-12 form-group">
          <ul class="col-xs-12 no-padding">
            <li class="col-xs-5 no-padding"><input type="submit" value="Confirmar" class="form-control btn btn-success"/></li>
            <li class="col-xs-5 col-xs-offset-1 no-padding"><input value="Cancelar" routerLink="/groups-list" class="form-control btn btn-danger"/></li>
          </ul>
      </div>
*/