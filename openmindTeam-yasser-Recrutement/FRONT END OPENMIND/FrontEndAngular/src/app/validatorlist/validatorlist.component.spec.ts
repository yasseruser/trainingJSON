import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorlistComponent } from './validatorlist.component';

describe('ValidatorlistComponent', () => {
  let component: ValidatorlistComponent;
  let fixture: ComponentFixture<ValidatorlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidatorlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidatorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
