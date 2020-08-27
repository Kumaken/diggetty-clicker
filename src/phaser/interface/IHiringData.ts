export interface IHiringData {
	[key: string]: IHiringDatum;
}

export interface IHiringDatum {
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
