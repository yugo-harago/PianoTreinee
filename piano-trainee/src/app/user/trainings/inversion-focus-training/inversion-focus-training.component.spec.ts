import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversionFocusTrainingComponent } from './inversion-focus-training.component';

describe('InversionFocusTrainingComponent', () => {
  let component: InversionFocusTrainingComponent;
  let fixture: ComponentFixture<InversionFocusTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InversionFocusTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InversionFocusTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
