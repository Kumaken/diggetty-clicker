import 'phaser';
import { TextureKeys } from '../config/TextureKeys';
import PlatformManager from './PlatformManager';

export default class ParticlesManager extends Phaser.GameObjects.Particles.ParticleEmitterManager {
	constructor(scene: Phaser.Scene) {
		super(scene, TextureKeys.TL_DIRT.key, 0);
		scene.add.existing(this);

		this.createEmitter({
			frame: 0,
			angle: { min: 240, max: 300 },
			speed: { min: 200, max: 400 },
			quantity: 1,
			lifespan: 1000,
			alpha: { start: 1, end: 0 },
			scale: 1,
			rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
			gravityY: 800,
			on: false
		});
	}

	showParticles(): void {
		const topmostRow = PlatformManager.topMostPlatform.row;
		topmostRow.forEach((block) => {
			this.emitParticleAt(block.x, block.y - block.displayHeight / 2);
		});
	}
}
