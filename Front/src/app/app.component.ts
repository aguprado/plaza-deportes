import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './services/apiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private apiService: ApiService) {
  };

}
