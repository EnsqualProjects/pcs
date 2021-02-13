import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CableDashbComponent } from './cable-dashb.component';

describe('CableDashbComponent', () => {
  let component: CableDashbComponent;
  let fixture: ComponentFixture<CableDashbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CableDashbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CableDashbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
