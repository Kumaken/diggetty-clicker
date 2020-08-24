import 'phaser';
import PlatformManager from './PlatformManager';
import AlignTool from 'phaser/Util/AlignTool';
import { ITilePillar } from '../interfaces/ITilePillar';
import { DepthConfig } from '../Config/DepthConfig';

export default class TilePillar extends Phaser.GameObjects.TileSprite implements ITilePillar{
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
		super(
			scene,
			x,
			y,
			PlatformManager.tileSize.width,
			AlignTool.getYfromScreenHeight(scene, 1),
			texture,
			frame
		);

		this.tileScaleX = 4;
		this.tileScaleY = this.tileScaleX;
		this.setOrigin(0);
		this.setDepth(DepthConfig.Pillar);
		scene.add.existing(this);
	}

	scrollUp(): void{
		// this.scene.tweens.add({
		// 	targets: this.tilePositionY,
		// 	y: this.tilePositionY + 5,
		// 	duration: 500
		// });

		this.scene.time.addEvent({
			delay: 1,
			callback: () => {
				this.tilePositionY += 1;
			},
			callbackScope: this,
			repeat: 25
		});
	}
}
