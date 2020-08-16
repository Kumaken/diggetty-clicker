import 'phaser';
import { GameInstance } from '../../../node_modules/@ion-phaser/react';
import { getResolution } from '../Util/Util';
// import GameUI from './phaser/Scene/GameUI';

export type PhaserConfig = Phaser.Types.Core.GameConfig;

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
