import TilePillar from './TilePillar';
import { TexturePreloadKeys } from 'phaser/config/TexturePreloadKeys';
import AlignTool from 'phaser/util/AlignTool';
import PlatformManager from './PlatformManager';

export default class TilePillarsManager {
	private scene: Phaser.Scene;
	private leftPillar: TilePillar;
	private rightPillar: TilePillar;

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.leftPillar = new TilePillar(scene, 0, 0, TexturePreloadKeys.TL_HARD_ROCK, 138);
		this.rightPillar = new TilePillar(
			scene,
			AlignTool.getXfromScreenWidth(scene, 1) - PlatformManager.tileSize.width,
			0,
			TexturePreloadKeys.TL_HARD_ROCK,
			138
		);
	}
}
