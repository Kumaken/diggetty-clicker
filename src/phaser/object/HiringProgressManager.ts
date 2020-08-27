import 'phaser';
import { IHiringProgresses, IHiringProgress } from '../interface/IHiringProgress';
import { HiringData } from '../../data/HiringData';
import { getGame } from 'phaser/Game';

export default class HiringProgressManager {
	private scene: Phaser.Scene;
	private hiringProgresses: IHiringProgresses;
	private game: Phaser.Game;

	calculateDamageIncrease(key: string): number {
		const hiringType = HiringData[key].dmgGrowthType;
		if (hiringType === 'linear') {
			return HiringData[key].dmgUpRatio;
		} else {
			// exponential
			const gameStore = this.game.registry.get('gameStore');
			console.log(gameStore.hiringProgresses[key].currdps);
			return gameStore.hiringProgresses[key].currdps * HiringData[key].dmgUpRatio;
		}
	}
	levelUpProgress(key: string): void {
		console.log('level up hiring');
		this.hiringProgresses[key].level += 1;
	}

	getCurrentHiringPrice(key: string) {
		return HiringData[key].baseCost * this.hiringProgresses[key].level * HiringData[key].costUpRatio;
	}
	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.game = getGame();
		this.hiringProgresses = {};

		for (let key in HiringData) {
			const newProgress: IHiringProgress = {
				level: 1,
				currdps: HiringData[key].baseDMG
			};
			this.hiringProgresses[key] = newProgress;
		}
	}
}
