import { TestBed } from '@angular/core/testing';

import { MusicTheoryService } from './music-theory.service';

describe('MusicTheoryService', () => {
  let service: MusicTheoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicTheoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
