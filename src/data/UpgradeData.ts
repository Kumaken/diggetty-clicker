import { IUpgradeData } from '../phaser/interface/IUpgradeData';

// import icons: (PATH HAS TO BE STATIC LITERAL STRING)
import pickaxe from 'assets/Icons/individuals/minecraft_transparent_181.png';
import body from 'assets/Icons/individuals/minecraft_transparent_42.png';
import legs from 'assets/Icons/individuals/minecraft_transparent_44.png';
import tenacity from 'assets/Icons/individuals/minecraft_transparent_195.png';

export const UpgradeData: IUpgradeData = {
	Pickaxe: {
		name: "Good ol' pickaxe",
		desc: "Your good ol' trusty pickaxe",
		effectDesc: 'Increase click damage by 1',
		baseCost: 2,
		costUpRatio: 1.5,
		baseDMG: 0,
		dmgGrowthType: 'linear',
		dmgUpRatio: 1,
		img: pickaxe
	},
	Bicep: {
		name: 'Firm Biceps',
		desc: 'Work that guns!',
		effectDesc: 'Increase click dmg greatly.',
		baseCost: 10,
		costUpRatio: 2,
		baseDMG: 1,
		dmgGrowthType: 'exponential',
		dmgUpRatio: 1,
		img: body
	},
	Calf: {
		name: 'Calf Muscles',
		desc: 'Never skip a leg day!',
		effectDesc: 'Increase click dmg massively',
		baseCost: 100,
		costUpRatio: 2.5,
		baseDMG: 2,
		dmgGrowthType: 'exponential',
		dmgUpRatio: 3,
		img: legs
	},
	Tenacity: {
		name: 'Tenacity',
		desc: 'Much ambis... wow...',
		effectDesc: 'Increase click dmg by 10',
		baseCost: 50,
		costUpRatio: 2,
		baseDMG: 1,
		dmgGrowthType: 'linear',
		dmgUpRatio: 10,
		img: tenacity
	}
};
