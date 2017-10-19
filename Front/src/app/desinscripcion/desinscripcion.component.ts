import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desinscripcion',
  templateUrl: './desinscripcion.component.html',
  styleUrls: ['./desinscripcion.component.css']
})
export class DesinscripcionComponent implements OnInit {
  
  codigo: number;
  
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  confirmarDesinscripcion() {
    this.apiService.desinscribirse(this.codigo).then(response => {
      if (response) { this.router.navigate(['/groups-list']) };
    });
  }

}
