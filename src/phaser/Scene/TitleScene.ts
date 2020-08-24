import * as Phaser from 'phaser';
import FpsText from '../Object/FpsText';
import SceneKeys from '../config/SceneKeys';

export default class TitleScene extends Phaser.Scene {
	private fpsText!: FpsText;

	constructor() {
		super({ key: SceneKeys.TitleScreen });
	}

	preload(): void {}

	create(): void {
		this.fpsText = new FpsText(this);
		console.log('entering title screen');
	}

	update(): void {
		this.fpsText.update();
	}
}
