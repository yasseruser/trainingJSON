import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitorComponent } from './recruitor.component';

describe('RecruitorComponent', () => {
  let component: RecruitorComponent;
  let fixture: ComponentFixture<RecruitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruitorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
