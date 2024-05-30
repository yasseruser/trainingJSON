import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcompanyComponent } from './newcompany.component';

describe('NewcompanyComponent', () => {
  let component: NewcompanyComponent;
  let fixture: ComponentFixture<NewcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewcompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
