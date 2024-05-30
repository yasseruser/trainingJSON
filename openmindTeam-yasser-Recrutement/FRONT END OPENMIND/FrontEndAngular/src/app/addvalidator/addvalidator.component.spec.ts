import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvalidatorComponent } from './addvalidator.component';

describe('AddvalidatorComponent', () => {
  let component: AddvalidatorComponent;
  let fixture: ComponentFixture<AddvalidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddvalidatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddvalidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
