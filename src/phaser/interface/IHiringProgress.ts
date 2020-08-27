export interface IHiringProgresses {
	[key: string]: IHiringProgress;
}

export interface IHiringProgress {
	level: number;
	currdps: number;
}
