import 'phaser';
import { ITile } from '../interface/ITile';
import { TextureKeys } from '../config/TextureKeys';

export default class Tile extends Phaser.Physics.Arcade.Sprite implements ITile {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	readonly animDuration: number = 250;
	currentTexture: string;
	currentFrame: number;
	itemType: string;

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
		super(scene, x, y, texture, frame);
		this.currentTexture = texture;
		this.currentFrame = frame;
	}

	animateBreak(): ITile{
		switch (this.currentTexture){
			case TextureKeys.TL_DIRT.key:
				this.currentFrame += TextureKeys.TL_DIRT.frameStep;
				this.setTexture(this.currentTexture, this.currentFrame);
				break;

			case TextureKeys.TL_ROCKY_DIRT.key:
				this.currentFrame += TextureKeys.TL_ROCKY_DIRT.frameStep;
				this.setTexture(this.currentTexture, this.currentFrame);
				break;
			
			case TextureKeys.TL_SHAKY_DIRT.key:
				this.currentFrame += TextureKeys.TL_SHAKY_DIRT.frameStep;
				this.setTexture(this.currentTexture, this.currentFrame);
				break;
		}

		return this;
	}

	takeItem(): ITile{
		console.log(this.itemType);
		if(!this.itemType) return this;

		console.log('get item')
		this.setGravityY(0);
		this.scene.tweens.add({
			targets: this,
			scale: 0.5,
			duration: this.animDuration
		});
		
	}
}
