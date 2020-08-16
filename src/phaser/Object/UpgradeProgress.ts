import 'phaser';
import { IUpgradeProgress } from '../Interfaces/IUpgradeProgress';
import { UpgradeData } from '../Data/UpgradeData';

export default class UpgradeProgressManager {
	private scene: Phaser.Scene;
	private upgradeProgress: { [key: string]: IUpgradeProgress };

	calculateDamageIncrease(key: string): number {
		const upgradeType = UpgradeData[key].dmgGrowthType;
		if (upgradeType === 'linear') {
			return UpgradeData[key].dmgUpRatio;
		} else {
			// exponential
			return this.upgradeProgress[key].currdmg * UpgradeData[key].dmgUpRatio;
		}
	}
	levelUpProgress(key: string): void {
		this.upgradeProgress[key].level += 1;
		console.log(this.upgradeProgress);
	}

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.upgradeProgress = {};

		for (let key in UpgradeData) {
			const newProgress: IUpgradeProgress = {
				key: key,
				level: 1,
				currdmg: UpgradeData[key].baseDMG
			};
			this.upgradeProgress[key] = newProgress;
		}
	}
}
