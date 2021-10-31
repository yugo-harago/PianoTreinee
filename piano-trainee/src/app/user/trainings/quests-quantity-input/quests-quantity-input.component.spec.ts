import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestsQuantityInputComponent } from './quests-quantity-input.component';

describe('QuestsQuantityInputComponent', () => {
  let component: QuestsQuantityInputComponent;
  let fixture: ComponentFixture<QuestsQuantityInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestsQuantityInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestsQuantityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
