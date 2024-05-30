import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewofferComponent } from './newoffer.component';

describe('NewofferComponent', () => {
  let component: NewofferComponent;
  let fixture: ComponentFixture<NewofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewofferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
