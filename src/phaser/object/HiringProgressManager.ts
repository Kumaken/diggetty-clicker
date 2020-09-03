import 'phaser';
import { HiringData } from '../../data/HiringData';
import { getGame } from 'phaser/Game';
import { IGameStore } from 'phaser/store/GameStore';
import { IHiringSprites } from 'phaser/interface/IHiringSprite';
import Algorithm from 'phaser/util/Algorithm';
import { PhysicsConfig } from 'phaser/config/PhysicsConfig';
import { ICharacterPool } from 'phaser/interface/ICharacterPool';
import AlignTool from 'phaser/util/AlignTool';

export default class HiringProgressManager {
	private scene: Phaser.Scene;
	private game: Phaser.Game;
	private gameStore: IGameStore;
	private hiringSprites: IHiringSprites = {};
	private characterPool: ICharacterPool;

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

	setupPhysics(sprite: Phaser.Physics.Arcade.Sprite) {
		this.scene.add.existing(sprite); // add to screen
		this.scene.physics.add.existing(sprite); // enable physics
		sprite.setGravityY(PhysicsConfig.WorldGravity);
		sprite.setBounce(0.2, 0.2);
		sprite.setCollideWorldBounds(true);
		sprite.body.setSize(); // readjust physics body to texture size
	}

	spawnSprite(key: string) {
		const sprite = this.characterPool.spawn(
			Algorithm.randomIntFromInterval(
				AlignTool.getXfromScreenWidth(this.scene, 0.1),
				AlignTool.getXfromScreenWidth(this.scene, 0.9)
			),
			AlignTool.getYfromScreenHeight(this.scene, 0.2),
			key,
			0
		);
		this.setupPhysics(sprite);
		this.hiringSprites[key] = sprite;
	}

	playUpgradeEffect(key: string) {
		this.hiringSprites[key].playUpgradeEffect();
	}

	constructor(scene: Phaser.Scene, characterPool: ICharacterPool) {
		this.scene = scene;
		this.characterPool = characterPool;
		this.game = getGame();
		this.gameStore = this.game.registry.get('gameStore');
	}
}
