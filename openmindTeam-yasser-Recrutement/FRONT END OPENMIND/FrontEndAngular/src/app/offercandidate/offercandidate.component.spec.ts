import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffercandidateComponent } from './offercandidate.component';

describe('OffercandidateComponent', () => {
  let component: OffercandidateComponent;
  let fixture: ComponentFixture<OffercandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffercandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffercandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
