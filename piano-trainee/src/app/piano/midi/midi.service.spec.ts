import { TestBed } from '@angular/core/testing';
import { Key } from '../piano.service';

import { MidiService } from './midi.service';
import { Note } from '../note.enum';

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

	it('should start and stop playing', async () => {
		const key = new Key(Note.C, 4);
		service.startPlay(key);
		await sleep(500);
		service.stopPlay(key);
	});

	it('should play serval times', async () => {
		const key = new Key(Note.C, 4);
		service.startPlay(key);
		await sleep(50);
		service.stopPlay(key);
		service.startPlay(key);
		await sleep(60);
		service.stopPlay(key);
	});

	function sleep(ms:number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
});
