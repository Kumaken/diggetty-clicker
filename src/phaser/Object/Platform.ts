import 'phaser';
import AlignTool from '../Util/AlignTool';
import { ITile } from '../Interfaces/ITile';
import { ITilePool } from '../Interfaces/ITilePool';
import Player from './Player';
import GameEvents from '../Config/GameEvents';
import { IPlatformData } from '../Interfaces/IPlatformData';
import Algorithm from '../Util/Algorithm';
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
		this.game.events.emit(GameEvents.OnDamage, this.toughness - 1);
		this.damage(Player.clickDamage);
	}

	// Platform stats methods:
	damage(amount: number) {
		if (amount >= this.toughness) this.onDestruction();
		else {
			this.toughness -= amount;
		}
	}
}
