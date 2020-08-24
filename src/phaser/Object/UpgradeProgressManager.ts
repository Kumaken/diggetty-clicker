import 'phaser';
import { IUpgradeProgresses, IUpgradeProgress } from '../Interfaces/IUpgradeProgress';
import { UpgradeData } from '../../data/UpgradeData';

export default class UpgradeProgressManager {
	private scene: Phaser.Scene;
	private upgradeProgresses: IUpgradeProgresses;

	calculateDamageIncrease(key: string): number {
		const upgradeType = UpgradeData[key].dmgGrowthType;
		if (upgradeType === 'linear') {
			return UpgradeData[key].dmgUpRatio;
		} else {
			// exponential
			return this.upgradeProgresses[key].currdmg * UpgradeData[key].dmgUpRatio;
		}
	}
	levelUpProgress(key: string): void {
		this.upgradeProgresses[key].level += 1;
	}

	getCurrentUpgradePrice(key: string) {
		return UpgradeData[key].baseCost * this.upgradeProgresses[key].level * UpgradeData[key].costUpRatio;
	}
	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.upgradeProgresses = {};

		for (let key in UpgradeData) {
			const newProgress: IUpgradeProgress = {
				level: 1,
				currdmg: UpgradeData[key].baseDMG
			};
			this.upgradeProgresses[key] = newProgress;
		}
	}
}
