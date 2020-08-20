export interface IUpgradeData {
	[key: string]: IUpgradeDatum;
}

export interface IUpgradeDatum {
	name: string;
	desc: string;
	effectDesc: string;
	baseCost: number;
	costUpRatio: number;
	baseDMG: number;
	dmgGrowthType: string;
	dmgUpRatio: number;
	img: string;
}
