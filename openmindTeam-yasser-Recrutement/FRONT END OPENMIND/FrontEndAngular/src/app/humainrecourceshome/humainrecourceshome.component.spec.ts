import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumainrecourceshomeComponent } from './humainrecourceshome.component';

describe('HumainrecourceshomeComponent', () => {
  let component: HumainrecourceshomeComponent;
  let fixture: ComponentFixture<HumainrecourceshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HumainrecourceshomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HumainrecourceshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
