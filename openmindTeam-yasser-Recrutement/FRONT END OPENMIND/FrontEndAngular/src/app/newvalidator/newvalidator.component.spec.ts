import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvalidatorComponent } from './newvalidator.component';

describe('NewvalidatorComponent', () => {
  let component: NewvalidatorComponent;
  let fixture: ComponentFixture<NewvalidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewvalidatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewvalidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
