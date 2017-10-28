import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/apiService';
import { Router, ActivatedRoute } from '@angular/router';
import { Group } from '../models/Group';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

  paramsSubscription: Subscription;
  idGrupo: number;
  group: Group;
  inscripcion: {documento: string, nombre: string, fnacimiento: string, contacto: string, edad: number, diahora: string, idAgenda: number};

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, public modal: Modal) {
    this.paramsSubscription = this.route.params.subscribe(params => {
        this.idGrupo = params['id'];
        this.inscripcion = {documento: null, nombre: null, fnacimiento: '', contacto: '', edad: 0, diahora: '', idAgenda: 0 };
    });
  }
  
  ngOnInit() {
    this.apiService.loadGroup(this.idGrupo).then(response => {
      this.group = response ? new Group(response) : this.router.navigate(['/groups-list']) && null;
    });
  }

  confirmarInscripcion() {
    if (!this.inscripcion.idAgenda) { 
      return this.modal.alert()
      .size('sm')
      .showClose(true)
      .title('Selección de hora')
      .body('<p>Debes seleccionar una hora</p>')
      .okBtn('Entendido')
      .okBtnClass('btn btn-primary')
      .open();
     };
    this.apiService.inscribirse(this.inscripcion).then(response => {
      this.router.navigate(['/confirmed', response.id]);
    });
  }

  updateEdad() {
    var ageDifMs = Date.now() - new Date(this.inscripcion.fnacimiento).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    this.inscripcion.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  ngOnDestroy() { this.paramsSubscription.unsubscribe() }

}
