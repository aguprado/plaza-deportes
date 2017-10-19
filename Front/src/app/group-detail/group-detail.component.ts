import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { ApiService } from '../services/apiService';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  paramsSubscription: Subscription;
  inscriptos = [];
  idGrupo: number;

  constructor(private authService: AuthService, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.paramsSubscription = this.route.params.subscribe(params => {
        this.idGrupo = params['id'];
    });
  }
  
  ngOnInit() {
    this.apiService.loadInscriptosGrupo(this.idGrupo).then(response => {
      this.inscriptos = response;
    });
  }

  borrarInscripcion(id) {
    this.apiService.borrarInscripcionAdmin(id).then(response => {
      this.apiService.loadInscriptosGrupo(this.idGrupo).then(response => {
        this.inscriptos = response;
      });
    });
  }

  ngOnDestroy() { this.paramsSubscription.unsubscribe() }

}
