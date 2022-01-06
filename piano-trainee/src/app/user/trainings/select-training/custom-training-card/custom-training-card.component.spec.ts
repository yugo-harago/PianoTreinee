import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTrainingCardComponent } from './custom-training-card.component';

describe('CustomTrainingCardComponent', () => {
  let component: CustomTrainingCardComponent;
  let fixture: ComponentFixture<CustomTrainingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTrainingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTrainingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
