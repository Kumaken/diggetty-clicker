import 'phaser';
import { GameInstance } from '../../../node_modules/@ion-phaser/react';
import TitleScene from '../Scene/TitleScene';
import PreloadScene from '../Scene/PreloadScene';
import LevelScene from '../Scene/LevelScene';
import { getResolution } from '../Util/Util';
// import GameUI from './phaser/Scene/GameUI';

export type PhaserConfig = Phaser.Types.Core.GameConfig;

class MainScene extends Phaser.Scene {
	private helloWorld!: Phaser.GameObjects.Text;

	init() {
		this.cameras.main.setBackgroundColor('#24252A');
	}

	create() {
		this.helloWorld = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Hello World', {
			font: '40px Arial',
			fill: '#ffffff'
		});
		this.helloWorld.setOrigin(0.5);
	}
	update() {
		this.helloWorld.angle += 1;
	}
}

export const gameConfig: GameInstance = {
	title: 'PhaserGame',
	type: Phaser.AUTO,
	scale: {
		parent: 'game', // needed to specify which element will contain the canvas
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: getResolution().width,
		height: getResolution().height
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	backgroundColor: '#493a52',
	// parent: 'phaser-ui',
	dom: {
		createContainer: true
	}
};
