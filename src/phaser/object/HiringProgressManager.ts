import 'phaser';
import { HiringData } from '../../data/HiringData';
import { getGame } from 'phaser/Game';
import { IGameStore } from 'phaser/store/GameStore';

export default class HiringProgressManager {
	private scene: Phaser.Scene;
	private game: Phaser.Game;
	private gameStore: IGameStore;

	calculateDamageIncrease(key: string): number {
		const hiringType = HiringData[key].dmgGrowthType;
		if (hiringType === 'linear') {
			return HiringData[key].dmgUpRatio;
		} else {
			// exponential
			return this.gameStore.hiringProgresses[key].currdps * HiringData[key].dmgUpRatio;
		}
	}

	getCurrentHiringPrice(key: string) {
		return this.gameStore.hiringProgresses[key].currprice;
	}

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.game = getGame();
		this.gameStore = this.game.registry.get('gameStore');
	}
}
