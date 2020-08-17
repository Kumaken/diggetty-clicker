export interface IUpgradeProgresses {
	[key: string]: IUpgradeProgress;
}

export interface IUpgradeProgress {
	level: number;
	currdmg: number;
}
