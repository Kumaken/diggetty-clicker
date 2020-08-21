import TilePillar from '../Object/TilePillar';
import { TexturePreloadKeys } from 'phaser/Config/TexturePreloadKeys';
import AlignTool from 'phaser/Util/AlignTool';
import PlatformManager from './PlatformManager';
import { ITilePillar } from '../Interfaces/ITilePillar';
import { DepthConfig } from '../Config/DepthConfig';

export default class TilePillarsManager {
	private scene: Phaser.Scene;
	private leftPillar: ITilePillar;
	private rightPillar: ITilePillar;
	private background: Phaser.GameObjects.TileSprite;

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
		this.background = scene.add.tileSprite(
			AlignTool.getCenterHorizontal(scene),
			AlignTool.getCenterVertical(scene),
			AlignTool.getXfromScreenWidth(scene,1),
			AlignTool.getYfromScreenHeight(scene,1),
			TexturePreloadKeys.BACKGROUND
		).setDepth(DepthConfig.Background)
		.setAlpha(0.35);
	}

	moveDown(): void{
		this.leftPillar.scrollUp();
		this.rightPillar.scrollUp();
		this.scene.time.addEvent({
			delay: 1,
			callback: () => {
				this.background.tilePositionY += 0.75;
			},
			callbackScope: this,
			repeat: 25
		});
	}
}
