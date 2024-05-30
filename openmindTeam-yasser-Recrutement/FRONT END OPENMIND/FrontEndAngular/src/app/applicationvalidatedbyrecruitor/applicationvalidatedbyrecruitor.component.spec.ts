import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationvalidatedbyrecruitorComponent } from './applicationvalidatedbyrecruitor.component';

describe('ApplicationvalidatedbyrecruitorComponent', () => {
  let component: ApplicationvalidatedbyrecruitorComponent;
  let fixture: ComponentFixture<ApplicationvalidatedbyrecruitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationvalidatedbyrecruitorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationvalidatedbyrecruitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
