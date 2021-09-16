import { TestBed } from '@angular/core/testing';

import { MidiService } from './midi.service';

describe('MidiService', () => {
  let service: MidiService;

  beforeEach(() => {
	TestBed.configureTestingModule({
		providers: [
			{ provide: MidiService}
		]
	});
    service = TestBed.inject(MidiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
