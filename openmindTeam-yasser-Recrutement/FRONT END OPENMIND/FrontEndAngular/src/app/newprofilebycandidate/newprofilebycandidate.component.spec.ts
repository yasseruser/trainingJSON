import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprofilebycandidateComponent } from './newprofilebycandidate.component';

describe('NewprofilebycandidateComponent', () => {
  let component: NewprofilebycandidateComponent;
  let fixture: ComponentFixture<NewprofilebycandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewprofilebycandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewprofilebycandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
