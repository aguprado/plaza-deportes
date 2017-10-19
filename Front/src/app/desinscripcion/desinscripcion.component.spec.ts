import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesinscripcionComponent } from './desinscripcion.component';

describe('DesinscripcionComponent', () => {
  let component: DesinscripcionComponent;
  let fixture: ComponentFixture<DesinscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesinscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesinscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
