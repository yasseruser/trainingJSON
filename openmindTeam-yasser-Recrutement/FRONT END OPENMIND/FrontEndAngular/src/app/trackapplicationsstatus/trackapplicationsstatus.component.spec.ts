import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackapplicationsstatusComponent } from './trackapplicationsstatus.component';

describe('TrackapplicationsstatusComponent', () => {
  let component: TrackapplicationsstatusComponent;
  let fixture: ComponentFixture<TrackapplicationsstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackapplicationsstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackapplicationsstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
