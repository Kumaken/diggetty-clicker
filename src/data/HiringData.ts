import { IHiringData } from '../phaser/interface/IHiringData';

// import icons: (PATH HAS TO BE STATIC LITERAL STRING)
import feistyHen from 'assets/icons/individuals/minecraft_transparent_399.png';
import drunkSquirrel from 'assets/icons/individuals/minecraft_transparent_344.png';
import drillMachine from 'assets/icons/individuals/minecraft_transparent_4.png';
import drillbird from 'assets/icons/individuals/minecraft_transparent_387.png';

export const HiringData: IHiringData = {
	DRILL_BIRD: {
		name: 'The Drill Bird',
		desc: 'she protecc, she also drills',
		effectDesc: 'Increase click damage by 1',
		baseCost: 2,
		costUpRatio: 1.5,
		baseDMG: 1,
		dmgGrowthType: 'linear',
		dmgUpRatio: 1,
		img: drillbird
	},
	White: {
		name: 'Feisty Hen',
		desc: 'She lays earthworm eggs',
		effectDesc: 'Increase click dmg greatly.',
		baseCost: 10,
		costUpRatio: 2,
		baseDMG: 2,
		dmgGrowthType: 'exponential',
		dmgUpRatio: 2,
		img: feistyHen
	},
	DrunkSquirrel: {
		name: 'Drunk Squirrel',
		desc: 'Give me all your money!',
		effectDesc: 'Increase click dmg massively',
		baseCost: 100,
		costUpRatio: 2.5,
		baseDMG: 1,
		dmgGrowthType: 'exponential',
		dmgUpRatio: 3,
		img: drunkSquirrel
	},
	DrillMachine: {
		name: 'Man-made Driller',
		desc: 'Behold the machinery era',
		effectDesc: 'Increase click dmg by 10',
		baseCost: 50,
		costUpRatio: 2,
		baseDMG: 10,
		dmgGrowthType: 'linear',
		dmgUpRatio: 10,
		img: drillMachine
	}
};
