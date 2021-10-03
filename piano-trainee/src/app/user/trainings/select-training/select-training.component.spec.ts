import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTrainingComponent } from './select-training.component';
import { trainingOptions } from './training-options.data';

fdescribe('SelectTrainingComponent', () => {
	let component: SelectTrainingComponent;
	let fixture: ComponentFixture<SelectTrainingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ SelectTrainingComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectTrainingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should generate training batch', () => {
		expect(component.batchTraining.length).toBe(Math.floor(trainingOptions.length/3));
		expect(component.batchTraining[0].length).toBe(3);
	});
});
