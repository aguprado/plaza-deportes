import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { ApiService } from '../services/apiService';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

declare let moment: any;

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  paramsSubscription: Subscription;
  inscriptos = [];
  idGrupo: number;
  nombreGrupo: string; 

  constructor(private authService: AuthService, private apiService: ApiService, private router: Router, private route: ActivatedRoute, public modal: Modal) {
    this.paramsSubscription = this.route.params.subscribe(params => {
        this.idGrupo = params['id'];
    });
  }
  
  ngOnInit() {
    this.apiService.loadInscriptosGrupo(this.idGrupo).then(response => {
      this.inscriptos = response.inscriptos;
      response.nombre ? this.nombreGrupo = response.nombre.nombre : '';
    });
  }

  borrarInscripcion(id) {
    const dialog = this.modal.confirm()
    .size('sm')
    .showClose(true)
    .title('Borrar agenda')
    .body('<p>Estás seguro que quieres borrar el horario agendado?</p>')
    .okBtn('Confirmar')
    .okBtnClass('btn btn-danger')
    .cancelBtn('Cancelar')
    .open();

    dialog.then( dialog => {
      dialog.result.then( result => {
        this.apiService.borrarInscripcionAdmin(id).then(response => {
          this.apiService.loadInscriptosGrupo(this.idGrupo).then(response => {
            this.inscriptos = response.inscriptos;
            response.nombre ? this.nombreGrupo = response.nombre.nombre : '';
          });
        });
      }).catch(result => {});
    });
  }

  formatDate(date) { return moment(date).format("DD-MM-YYYY") }

  print() { window.print() }
  
  ngOnDestroy() { this.paramsSubscription.unsubscribe() }

}
