import { Subject } from "rxjs";

export class QuestCounter {
	public get current(): number {
		return this._current;
	}
	private _current = 0;
	private _max: number = 10;
	public get max(): number {
		return this._max;
	}
	private _requestedAnswers: number = 0;
	public get requestedAnswers(): number {
		return this._requestedAnswers;
	}
	private _maxReached: boolean = false;
	public get maxReached(): boolean {
		return this._maxReached;
	}
	private _onMaxReach: Subject<boolean> = new Subject<boolean>();
	public get onMaxReach(): Subject<boolean>{
		return this._onMaxReach;
	}
	constructor() {
		const storedMax = localStorage.getItem("questMaxCount"); 
		if(storedMax) try{ this._max = parseInt(storedMax); }catch{}
	}
	public next(){
		this._current += 1;
		if(this._current == this._max){
			this._maxReached = true;
			this._current = 0;
			this._requestedAnswers = 0;
			this._onMaxReach.next(true);
		}
	}
	public reset(){
		this._requestedAnswers = 0;
		this._maxReached = false;
	}
	public nextAnswer() {
		this._requestedAnswers += 1;
	}
	public setMax(max: number){
		localStorage.setItem("questMaxCount", max.toString());
		this._max = max;
	}
}