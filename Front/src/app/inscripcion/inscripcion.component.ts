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
  inscripcion: {documento: string, nombre: string, fnacimiento: Date, edad: number, idGrupo: number};

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.paramsSubscription = this.route.params.subscribe(params => {
        this.idGrupo = params['id'];
        this.inscripcion = {documento: null, nombre: null, fnacimiento: new Date(), edad: 0, idGrupo: this.idGrupo };
    });
  }
  
  ngOnInit() {
    this.apiService.loadGroup(this.idGrupo).then(response => {
      this.group = response && response.length ? new Group(response.pop()) : this.router.navigate(['/groups-list']) && null;
      this.group ? this.inscripcion.idGrupo = parseInt(this.group.id) : null;
    });
  }

  confirmarInscripcion() {
    this.apiService.inscribirse(this.inscripcion).then(response => {
      this.router.navigate(['/confirmed', this.inscripcion.documento, this.inscripcion.idGrupo]);
    });
  }

  updateEdad() {
    var ageDifMs = Date.now() - new Date(this.inscripcion.fnacimiento).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    this.inscripcion.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  ngOnDestroy() { this.paramsSubscription.unsubscribe() }

}
