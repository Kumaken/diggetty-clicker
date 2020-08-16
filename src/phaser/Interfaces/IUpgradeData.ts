export interface IUpgradeData {
	[key: string]: {
		key: string;
		name: string;
		desc: string;
		baseCost: number;
		costUpRatio: number;
		baseDMG: number;
		dmgGrowthType: string;
		dmgUpRatio: number;
	};
}
