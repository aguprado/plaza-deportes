import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesGridComponent } from './mines-grid.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../reducers';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from '../effects';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/apiService';

describe('MinesGridComponent', () => {
  let component: MinesGridComponent;
  let fixture: ComponentFixture<MinesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        HttpModule,
        StoreModule.provideStore(reducer),
        EffectsModule.run(Effects), ],
      declarations: [
        AppComponent,
        MinesGridComponent
      ],
      providers:[ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
