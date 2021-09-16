import { TestBed } from '@angular/core/testing';

import { PianoQuestBundleService } from './piano-quest-bundle.service';

describe('PianoQuestBundleService', () => {
  let service: PianoQuestBundleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PianoQuestBundleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
