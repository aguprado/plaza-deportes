import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/apiService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'inscription-report',
  templateUrl: './inscription-report.component.html',
  styleUrls: ['./inscription-report.component.css']
})
export class InscriptionReportComponent {

  paramsSubscription: Subscription;
  inscripcion: any;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { 
    this.paramsSubscription = this.route.params.subscribe(params => {
        let idInscripcion = params['id'];    
        this.apiService.getInscripcion(idInscripcion).then(response => {
          this.inscripcion = response.pop();
        });
    });
  }

  formatDate(date) {
    let newDate = new Date(date);
    return newDate.getDate()+'-'+(newDate.getMonth()+1)+'-'+newDate.getFullYear();
  }

  print() { window.print() }

}
