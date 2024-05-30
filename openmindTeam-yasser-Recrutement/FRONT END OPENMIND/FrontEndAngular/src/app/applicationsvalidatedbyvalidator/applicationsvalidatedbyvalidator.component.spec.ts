import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsvalidatedbyvalidatorComponent } from './applicationsvalidatedbyvalidator.component';

describe('ApplicationsvalidatedbyvalidatorComponent', () => {
  let component: ApplicationsvalidatedbyvalidatorComponent;
  let fixture: ComponentFixture<ApplicationsvalidatedbyvalidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationsvalidatedbyvalidatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationsvalidatedbyvalidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
