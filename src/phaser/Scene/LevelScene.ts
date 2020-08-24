import * as Phaser from 'phaser';
import '../Object/TilePool';
import FpsText from '../Object/FpsText';
import PlatformManager from '../Object/PlatformManager';
import ParticlesManager from '../Object/ParticlesManager';
import { TextureKeys } from '../Config/TextureKeys';
import SceneKeys from '../Config/SceneKeys';
import GameEvents from '../Config/GameEvents';
import Player from '../Object/Player';
// import GameUI from './GameUI';
// import { IDamageTextPool } from '../Interfaces/IDamageTextPool';

import '../Object/DamageTextPool';
import TilePillarsManager from '../Object/TilePillarsManager';
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
		// UI ---
		// this.gameUI = this.scene.get(SceneKeys.GameUI) as GameUI;
		// this.scene.bringToTop(SceneKeys.GameUI);

		this.player = new Player(this);
		// const tilePool: ITilePool = this.add.tilePool(TextureKeys.TL_DIRT.key);

		// this.add.existing(tilePool);
		this.add.damageTextPool();
		this.platformManager = new PlatformManager(this, this.player);
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
		
		// Particles Manager
		this.particlesManager = new ParticlesManager(this);
		this.game.events.on(
			GameEvents.OnDamage, 
			() => {
				this.particlesManager.showParticles();
			},
			this
		);

		this.fpsText = new FpsText(this);
		
	}

	update(): void {
		this.fpsText.update();
	}
}
