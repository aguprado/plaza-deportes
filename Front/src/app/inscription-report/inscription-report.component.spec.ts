import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionReportComponent } from './inscription-report.component';

describe('InscriptionReportComponent', () => {
  let component: InscriptionReportComponent;
  let fixture: ComponentFixture<InscriptionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
