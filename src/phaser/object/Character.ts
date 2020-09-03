import 'phaser';
import { ICharacter } from '../interface/ICharacter';
import AlignTool from 'phaser/util/AlignTool';
import { DepthConfig } from 'phaser/config/DepthConfig';
import { PhysicsConfig } from 'phaser/config/PhysicsConfig';
import AnimationHelper from 'phaser/util/AnimationHelper';

export default class Character extends Phaser.Physics.Arcade.Sprite implements ICharacter {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	scene: Phaser.Scene;

	setupPhysics() {
		this.scene.add.existing(this); // add to screen
		this.scene.physics.add.existing(this); // enable physics
		this.setGravityY(PhysicsConfig.WorldGravity);
		this.setBounce(0.2, 0.2);
		this.setCollideWorldBounds(true);
		this.body.setSize(); // readjust physics body to texture size
	}

	setupSprite(key: string, frame: number) {
		this.setTexture(key);
		this.setFrame(frame);
		this.setDepth(DepthConfig.Character);

		AlignTool.scaleToScreenWidth(this.scene, this, 0.25);
		// this.setInteractive();
	}

	playUpgradeEffect() {
		AnimationHelper.Pulse(
			this.scene, // scene
			this, // target object
			0.3, // duration in seconds
			1.25, // scale
			1, // repeat times
			0 // delay
		);
		AnimationHelper.ChangeAlpha(
			this.scene, // scene
			this, // target object
			0.1, // duration in seconds
			0, // target alpha
			true, // yoyo
			0, // delay
			1, // starting alpha
			4 // times played
		);
	}

	enableSprite() {
		this.setVisible(true);
		this.setActive(true);
		this.alpha = 1;
	}

	disableSprite() {
		this.alpha = 0;
		this.body.reset(0, 0);
		// this.disableInteractive();
	}

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
		super(scene, x, y, texture, frame);
		this.scene = scene;
	}
}
