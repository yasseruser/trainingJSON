import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateprofilesComponent } from './candidateprofiles.component';

describe('CandidateprofilesComponent', () => {
  let component: CandidateprofilesComponent;
  let fixture: ComponentFixture<CandidateprofilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateprofilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
