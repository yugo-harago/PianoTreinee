import { TestBed } from '@angular/core/testing';

import { PianoQuestHandlerService } from './piano-quest-handler.service';

describe('PianoQuestHandlerService', () => {
  let service: PianoQuestHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PianoQuestHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
