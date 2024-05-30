import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrecruitorComponent } from './newrecruitor.component';

describe('NewrecruitorComponent', () => {
  let component: NewrecruitorComponent;
  let fixture: ComponentFixture<NewrecruitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewrecruitorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewrecruitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
