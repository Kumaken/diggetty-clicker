import { IUpgradeData } from '../Interfaces/IUpgradeData';

export const UpgradeData: IUpgradeData = {
	Pickaxe: {
		name: "Good ol' pickaxe",
		desc: "Your good ol' trusty pickaxe",
		effectDesc: 'Increases your click damage by 1',
		baseCost: 2,
		costUpRatio: 1.5,
		baseDMG: 0,
		dmgGrowthType: 'linear',
		dmgUpRatio: 1
	},
	Bicep: {
		name: 'Firm Biceps',
		desc: 'Work that guns!',
		effectDesc: 'Increases your click damage exponentially.',
		baseCost: 10,
		costUpRatio: 2,
		baseDMG: 1,
		dmgGrowthType: 'exponential',
		dmgUpRatio: 1
	},
	Calf: {
		name: 'Calf Muscles',
		desc: 'Never skip leg day!',
		effectDesc: 'Increases your click damage exponentially',
		baseCost: 100,
		costUpRatio: 2.5,
		baseDMG: 2,
		dmgGrowthType: 'exponential',
		dmgUpRatio: 3
	},
	Tenacity: {
		name: 'Tenacity',
		desc: 'Much ambis... wow...',
		effectDesc: 'Increases your click damage by 10',
		baseCost: 50,
		costUpRatio: 2,
		baseDMG: 1,
		dmgGrowthType: 'linear',
		dmgUpRatio: 10
	}
};
