import 'phaser';
import AlignTool from '../util/AlignTool';
import { IPlatformData } from '../interface/IPlatformData';
import { ITextureKey } from '../interface/ITextureKey';
import { ITilePool } from '../interface/ITilePool';
import Platform from './Platform';
import GameEvents from '../config/GameEvents';
import { PlatformData } from '../../data/PlatformData';
import Player from './Player';
import { TextureKeys } from '../config/TextureKeys';
import './TilePool';
import { ITopMostPlatformInfo } from 'phaser/interface/ITopMostPlatformInfo';
import { getGame } from 'phaser/Game';
import Algorithm from 'phaser/util/Algorithm';
import { DepthConfig } from 'phaser/config/DepthConfig';
import ItemConfig from 'phaser/config/ItemConfig';
import { ITile } from 'phaser/interface/ITile';
import ParticlesManager from './ParticlesManager';

export default class PlatformManager {
	private game: Phaser.Game;
	private scene: Phaser.Scene;
	private particlesManager: ParticlesManager;
	private _pool: ITilePool;
	private player: Player;
	private platformYInterval: number = 0;
	private platforms: Platform[] = [];
	private rowNums: number = 13;
	private textureKeyArr: string[] = Object.keys(PlatformData);
	// NOTE DELETE THIS IF NOT USING TERRARIA TILES: to handle the gap from the tilesheet
	private tileWidthGap: number = 10;
	private tileHeightGap: number = 10;

	// Gameplay Related properties
	private depthPerPlatform: number = 10;
	private goldPerPlatform: number = 1;
	private disappearTimer: Phaser.Time.TimerEvent;
	private createItem: boolean = false;
	private createItemCooldown: Phaser.Time.TimerEvent;
	private itemDisappear: boolean = false;

	// Static properties
	public static bottomMostY: number = 0;
	public static topMostY: number;
	public static topMostPlatform: Platform;
	public static tileSize: Phaser.Structs.Size;

	constructor(scene: Phaser.Scene, player: Player, particlesManager: ParticlesManager) {
		this.scene = scene;
		this.game = getGame();
		this.particlesManager = particlesManager;
		this._pool = this.scene.add.tilePool(TextureKeys.TL_DIRT.key);
		this.player = player;
		PlatformManager.topMostY = AlignTool.getYfromScreenHeight(scene, 0.35);

		// deduce tile size dynamically:
		const sample = this._pool.spawn(0, 0, '', 0);
		PlatformManager.tileSize = new Phaser.Structs.Size(
			sample.displayWidth - this.tileWidthGap,
			sample.displayHeight - this.tileHeightGap
		);
		this._pool.despawn(sample);

		// listen to game events:
		this.game.events.on(GameEvents.TopmostPlatformDestroyed, this.destroyTopmostPlatform, this);
		this.game.events.on(
			GameEvents.OnItemAcquired,
			() => {
				this.disappearTimer?.destroy();
			},
			this
		);
		this.game.events.on(
			GameEvents.ActivateGoldIngot,
			() => {
				this.goldPerPlatform *= 1.2;
			},
			this
		);

		this.game.events.on(
			GameEvents.DeactivateGoldIngot,
			() => {
				this.goldPerPlatform /= 1.2;
			},
			this
		);

		this.scene.input
			.setHitArea(this.pool.getChildren())
			.on(
				'gameobjectdown',
				(
					pointer: Phaser.Input.Pointer,
					gameObject: Phaser.GameObjects.GameObject,
					event: Phaser.Events.EventEmitter
				) => {
					this.player.playDigAnimation();
					const tile = gameObject as ITile;

					if (gameObject.body.position.y >= PlatformManager.topMostY - tile.displayHeight / 2) {
						// damage topmost platform:
						const topMostPlatform = this.platforms[0];
						topMostPlatform.onClickPlatform();
					} else {
						// Take item on surface
						tile.takeItem();
						this.particlesManager.showShootingStar(tile.x, tile.y);

						this.scene.time.addEvent({
							delay: tile.animDuration, // ms
							callback: () => {
								this.removeItem(tile);
							},
							callbackScope: this
						});

						this.player.handleAddItem(tile.itemType);
					}
				}
			);

		// DPS System:
		this.scene.time.addEvent({
			delay: 1000, // ms
			callback: this.damageByDPS,
			callbackScope: this,
			loop: true
		});
	}

	public get pool(): ITilePool {
		return this._pool;
	}

	damageByDPS() {
		if (Player.dps <= 0) return;
		PlatformManager.topMostPlatform?.damage(Player.dps);
	}

	spawnPlatformInitial(textureKey: ITextureKey) {
		let curY = PlatformManager.topMostY;
		PlatformManager.topMostPlatform = new Platform(
			this.scene,
			this._pool,
			curY,
			PlatformManager.tileSize,
			PlatformData.Dirt,
			false
		);
		this.platforms.push(PlatformManager.topMostPlatform);
		curY += PlatformManager.tileSize.height;

		for (let i = 1; i < this.rowNums; i++) {
			const newPlatform = new Platform(
				this.scene,
				this._pool,
				curY,
				PlatformManager.tileSize,
				PlatformData.Dirt,
				false
			);
			this.platforms.push(newPlatform);
			curY += PlatformManager.tileSize.height;
		}
		PlatformManager.bottomMostY = curY - PlatformManager.tileSize.height;

		const topMostPlatformInfo: ITopMostPlatformInfo = {
			name: PlatformManager.topMostPlatform.platformData.name,
			toughness: PlatformManager.topMostPlatform.toughness,
			maxToughness: PlatformManager.topMostPlatform.platformData.toughness
		};
		this.game.events.emit(GameEvents.TopmostPlatformChanged, topMostPlatformInfo);
	}

	despawnTopmostPlatform() {
		const topMost = this.platforms.shift()!.row;
		topMost.forEach((tile) => {
			if (tile.itemType) {
				const itemSprite: ITile = this._pool.spawn(tile.x, tile.y, tile.texture.key, 0, tile.itemType);
				itemSprite.setDepth(DepthConfig.Pillar);
				itemSprite.setImmovable(false);
				this.scene.tweens.add({
					targets: itemSprite,
					y: itemSprite.y - AlignTool.getYfromScreenHeight(this.scene, 0.1),
					duration: 300
				});
				this.scene.time.delayedCall(
					300,
					() => {
						itemSprite.setGravityY(50);
						this.startDisappearCountdown(itemSprite);
					},
					null,
					this
				);
			}
			this._pool.despawn(tile);
		});
		PlatformManager.topMostPlatform = this.platforms[0];

		const topMostPlatformInfo: ITopMostPlatformInfo = {
			name: PlatformManager.topMostPlatform.platformData.name,
			toughness: PlatformManager.topMostPlatform.toughness,
			maxToughness: PlatformManager.topMostPlatform.platformData.toughness
		};
		this.game.events.emit(GameEvents.TopmostPlatformChanged, topMostPlatformInfo);
	}

	startDisappearCountdown(itemSprite: ITile) {
		this.disappearTimer = this.scene.time.delayedCall(
			5 * 1000,
			() => {
				this.itemDisappear = true;
				this.removeItem(itemSprite);
			},
			null,
			this
		);
	}

	removeItem(itemSprite: ITile) {
		if (!itemSprite.active || !itemSprite.visible) return;

		itemSprite.setGravityY(0);
		itemSprite.setVelocityY(0);
		itemSprite.setPosition(
			AlignTool.getXfromScreenWidth(this.scene, 1),
			AlignTool.getYfromScreenHeight(this.scene, 1)
		);
		this._pool.killAndHide(itemSprite);
	}

	shiftAllPlatformsUpward() {
		this.platforms.forEach((platform) => {
			platform.shiftAllTilesUpward();
		});
	}

	spawnBottommostPlatform(platformData: IPlatformData) {
		if (this.player.depth >= ItemConfig.ITEM_GEN_STARTING_LAYER && !this.createItem && !this.createItemCooldown) {
			this.createItem = true;
		}

		const newPlatform = new Platform(
			this.scene,
			this._pool,
			PlatformManager.bottomMostY,
			PlatformManager.tileSize,
			platformData,
			this.createItem
		);
		this.platforms.push(newPlatform);

		if (this.createItem || this.itemDisappear) {
			this.createItem = false;
			this.addItemCooldown();
		}
	}

	destroyTopmostPlatform() {
		this.player.addDepth(this.depthPerPlatform);
		this.player.addGold(this.goldPerPlatform);
		this.despawnTopmostPlatform();
		this.shiftAllPlatformsUpward();
		const randIdx = Algorithm.randomIntFromInterval(0, this.textureKeyArr.length - 1);
		this.spawnBottommostPlatform(PlatformData[this.textureKeyArr[randIdx]]);
	}

	addItemCooldown() {
		let duration = Algorithm.randomFloatFromInterval(
			ItemConfig.itemGenCooldown.min,
			ItemConfig.itemGenCooldown.max
		);

		if (this.itemDisappear) {
			duration = ItemConfig.itemGenCooldown.itemNotTaken;
			this.createItemCooldown?.destroy();
		}
		this.itemDisappear = false;

		this.createItemCooldown = this.scene.time.delayedCall(
			duration * 60 * 1000,
			() => {
				this.createItem = true;
				this.createItemCooldown.destroy();
			},
			null,
			this
		);
	}
}
