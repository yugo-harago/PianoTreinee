import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PianoQuestComponent } from './piano-quest.component';


describe('PianoQuestComponent', () => {
  let component: PianoQuestComponent;
  let fixture: ComponentFixture<PianoQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PianoQuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
