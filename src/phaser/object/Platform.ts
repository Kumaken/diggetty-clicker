import 'phaser';
import AlignTool from '../util/AlignTool';
import { ITile } from '../interface/ITile';
import { ITilePool } from '../interface/ITilePool';
import Player from './Player';
import GameEvents from '../config/GameEvents';
import { IPlatformData } from '../interface/IPlatformData';
import Algorithm from '../util/Algorithm';
import TilePool from './TilePool';
import { getGame } from 'phaser/Game';

export default class Platform {
	public row: ITile[] = [];
	private rowSize: number = 9;

	private scene: Phaser.Scene;
	private game: Phaser.Game;
	private pool: ITilePool;
	public platformData: IPlatformData;
	public y: number;
	private effRightX: number;
	private effLeftX: number;
	private tileSize: Phaser.Structs.Size;

	// Platform Stats:
	public toughness: number;
	private breakStep: number;
	private phase: number;

	constructor(
		scene: Phaser.Scene,
		pool: TilePool,
		y: number,
		tileSize: Phaser.Structs.Size,
		platformData: IPlatformData
	) {
		this.scene = scene;
		this.game = getGame();
		this.pool = pool;
		this.platformData = platformData;
		this.effLeftX = AlignTool.getXfromScreenWidth(scene, 0.115);
		this.effRightX = AlignTool.getXfromScreenWidth(scene, 0.8);
		this.y = y;
		this.tileSize = tileSize;
		// Stats initialization:
		this.toughness = platformData.toughness;
		this.breakStep = Math.floor(this.toughness / 5);
		this.phase = 0;
		this.generateRow(platformData.textureKey.frame);
	}

	generateRow(frameArr: number[]) {
		let curX = this.effLeftX;

		for (let i = 0; i < this.rowSize; i += 1) {
			const randIdx = Algorithm.randomIntFromInterval(0, frameArr.length - 1);
			const frame = frameArr[randIdx];
			const newTile: ITile = this.pool.spawn(curX, this.y, this.platformData.textureKey.key, frame);
			this.row.push(newTile);
			curX += this.tileSize.width;
		}
		curX = this.effLeftX;
	}

	shiftAllTilesUpward() {
		this.y -= this.tileSize.height;
		this.row.forEach((tile) => {
			tile.y -= this.tileSize.height;
		});
	}

	// Events:
	onDestruction() {
		this.game.events.emit(GameEvents.TopmostPlatformDestroyed);
	}

	onClickPlatform() {
		this.damage(Player.clickDamage);
	}

	// Platform stats methods:
	damage(amount: number) {
		this.game.events.emit(GameEvents.OnDamage, amount);
		if (amount >= this.toughness) this.onDestruction();
		else {
			this.toughness -= amount;
			this.animatePlatformBreak();
		}
	}

	// Platform animation methods:
	animatePlatformBreak(): void {
		const currentPhase = -1 * Math.ceil(this.toughness / this.breakStep) + 5;
		if (currentPhase !== this.phase) {
			this.row.forEach((tile) => {
				tile.animateBreak();
			});
			this.phase = currentPhase;
		}
	}
}
