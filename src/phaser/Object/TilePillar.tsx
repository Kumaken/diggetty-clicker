import 'phaser';
import PlatformManager from './PlatformManager';
import AlignTool from 'phaser/util/AlignTool';

export default class TilePillar {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
		const tilePillar = scene.add.tileSprite(
			x,
			y,
			PlatformManager.tileSize.width,
			AlignTool.getYfromScreenHeight(scene, 1),
			texture,
			frame
		);

		tilePillar.tileScaleX = 4;
		tilePillar.tileScaleY = tilePillar.tileScaleX;
		tilePillar.setOrigin(0);
		tilePillar.setDepth(2);
	}
}
