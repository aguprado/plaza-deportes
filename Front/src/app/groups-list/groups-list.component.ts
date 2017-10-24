import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/authService';
import { ApiService } from '../services/apiService';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

declare let $: any;

@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})

export class GroupsListComponent implements OnInit {

  //innerHeight: string;
  authSubscription: Subscription;
  logged: boolean = false;
  groups = [];

  constructor(private authService: AuthService, private apiService: ApiService, public modal: Modal) {
    this.authSubscription = authService.authAnnounced$.subscribe(action => {
      this.logged = action;
    });
    this.logged =  authService.getLoggedStatus();
  }
  
  ngOnInit() {
    this.apiService.loadGroups().then(response => {
      this.groups = response;
    });
    /*
    this.innerHeight = (window.innerHeight)+'px';
    $(window).resize(() => {this.innerHeight = (window.innerHeight-30)+'px';});*/
  }

  borrarGrupo(id) {    
    const dialog = this.modal.confirm()
    .size('sm')
    .showClose(true)
    .title('Borrar grupo')
    .body('<p>Estás seguro que quieres borrar el grupo?</p>')
    .okBtn('Confirmar')
    .okBtnClass('btn btn-danger')
    .cancelBtn('Cancelar')
    .open();

    dialog.then( dialog => {
      dialog.result.then( result => {
        this.apiService.deleteGroup(id).then(response => {
          this.apiService.loadGroups().then(response => {
            this.groups = response;
          });
        });
      }).catch(result => {});
    });
  }

  logout() { this.authService.logout() }

  print() { window.print() }
  
  ngOnDestroy() { this.authSubscription.unsubscribe() }

}