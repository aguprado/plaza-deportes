import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/apiService';
import { HttpModule } from '@angular/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        HttpModule],
      declarations: [
        AppComponent
      ],
      providers:[ApiService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
});
