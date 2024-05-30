import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitorlistComponent } from './recruitorlist.component';

describe('RecruitorlistComponent', () => {
  let component: RecruitorlistComponent;
  let fixture: ComponentFixture<RecruitorlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruitorlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
