import * as Phaser from 'phaser';
import '../object/TilePool';
import FpsText from '../object/FpsText';
import PlatformManager from '../object/PlatformManager';
import ParticlesManager from '../object/ParticlesManager';
import { TextureKeys } from '../config/TextureKeys';
import SceneKeys from '../config/SceneKeys';
import GameEvents from '../config/GameEvents';
import Player from '../object/Player';
// import GameUI from './GameUI';
// import { IDamageTextPool } from '../Interfaces/IDamageTextPool';

import '../object/DamageTextPool';
import TilePillarsManager from '../object/TilePillarsManager';
// import { ITile } from '../interfaces/ITile';
// import { IDamageTextPool } from 'phaser/Interfaces/IDamageTextPool';

export default class LevelScene extends Phaser.Scene {
	private fpsText!: FpsText;
	private platformManager!: PlatformManager;
	private particlesManager: ParticlesManager;
	private player!: Player;
	private tilePillarsManager: TilePillarsManager;

	// private gameUI: GameUI;
	constructor() {
		const sceneConfig = {
			key: SceneKeys.Game
		};
		super(sceneConfig);
	}

	preload(): void {}

	create(): void {
		this.player = new Player(this);

		this.add.damageTextPool();

		// Particles Manager
		this.particlesManager = new ParticlesManager(this);
		this.game.events.on(
			GameEvents.OnDamage,
			() => {
				this.particlesManager.showGroundCrumbs();
			},
			this
		);

		this.platformManager = new PlatformManager(this, this.player, this.particlesManager);
		this.platformManager.spawnPlatformInitial(TextureKeys.TL_DIRT);

		// Tile pillars
		this.tilePillarsManager = new TilePillarsManager(this);
		this.game.events.on(
			GameEvents.TopmostPlatformDestroyed,
			() => {
				this.tilePillarsManager.moveDown();
			},
			this
		);

		this.fpsText = new FpsText(this);
	}

	update(): void {
		this.physics.collide(this.platformManager.pool,this.platformManager.pool);
		this.fpsText.update();
	}
}
