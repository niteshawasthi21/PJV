import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PjvDashboardComponent } from './pjv-dashboard.component';

describe('PjvDashboardComponent', () => {
  let component: PjvDashboardComponent;
  let fixture: ComponentFixture<PjvDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PjvDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PjvDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
