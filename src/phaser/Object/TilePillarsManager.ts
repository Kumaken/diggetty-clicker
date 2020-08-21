import TilePillar from '../Object/TilePillar';
import { TexturePreloadKeys } from 'phaser/Config/TexturePreloadKeys';
import AlignTool from 'phaser/Util/AlignTool';
import PlatformManager from './PlatformManager';
import { ITilePillar } from '../Interfaces/ITilePillar';

export default class TilePillarsManager {
	private scene: Phaser.Scene;
	private leftPillar: ITilePillar;
	private rightPillar: ITilePillar;

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.leftPillar = new TilePillar(scene, 0, 0, TexturePreloadKeys.TL_HARD_ROCK, 0);
		this.rightPillar = new TilePillar(
			scene,
			AlignTool.getXfromScreenWidth(scene, 1) - PlatformManager.tileSize.width,
			0,
			TexturePreloadKeys.TL_HARD_ROCK,
			0
		);
	}

	moveDown(): void{
		this.leftPillar.scrollUp();
		this.rightPillar.scrollUp();
	}
}
