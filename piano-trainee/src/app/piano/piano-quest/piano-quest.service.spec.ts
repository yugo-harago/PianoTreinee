import { TestBed } from '@angular/core/testing';

import { PianoQuestService } from './piano-quest.service';

describe('PianoQuestService', () => {
  let service: PianoQuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PianoQuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
