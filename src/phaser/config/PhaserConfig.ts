import 'phaser';
import { GameInstance } from '../../../node_modules/@ion-phaser/react/dist';
import { getResolution } from '../util/Util';

export type PhaserConfig = Phaser.Types.Core.GameConfig;

export const gameConfig: GameInstance = {
	title: 'PhaserGame',
	type: Phaser.CANVAS,
	scale: {
		parent: 'game', // needed to specify which element will contain the canvas
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
	backgroundColor: '#000000',
	// parent: 'phaser-ui',
	dom: {
		createContainer: true
	}
};
