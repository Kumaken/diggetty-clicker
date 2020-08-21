import * as Phaser from 'phaser';
import { TexturePreloadKeys } from '../Config/TexturePreloadKeys';
import SceneKeys from '../Config/SceneKeys';
import GameEvents from '../Config/GameEvents';
import AlignTool from '../Util/AlignTool';

// import images so webpack could include it:
import TL_DIRT from '../../assets/Tiles/dirt_spritesheet.png';
import TL_ROCKY_DIRT from '../../assets/Tiles/rocky_dirt_spritesheet.png';
import TL_SHAKY_DIRT from '../../assets/Tiles/shaky_dirt_spritesheet.png';
import TL_HARD_ROCK from '../../assets/Tiles/hardrock.png';
import BACKGROUND from '../../assets/background.jpg';

export default class PreloadScene extends Phaser.Scene {
	private assetRoot = 'src/assets/';
	static screenScale: {
		scaleWidth: number;
		scaleHeight: number;
	};
	private tileFrameWidth: number = 16;
	private tileFrameHeight: number = 16;

	constructor() {
		super({ key: SceneKeys.Preload });
	}

	preload(): void {
		/* all the routes here is referenced from root! */
		// this.load.image(
		//   TexturePreloadKeys.VB_TRACK.key,
		//   `${this.assetRoot}QuantityBar/track.png`
		// );

		/* UNCOMMENT IF USING NORMAL FORMAT*/
		// this.load.spritesheet(TexturePreloadKeys.TL_DIRT, TL_DIRT, {
		// 	frameWidth: this.tileFrameWidth,
		// 	frameHeight: this.tileFrameHeight
		// });
		// this.load.spritesheet(TexturePreloadKeys.TL_ROCKY_DIRT, TL_ROCKY_DIRT, {
		// 	frameWidth: this.tileFrameWidth,
		// 	frameHeight: this.tileFrameHeight
		// });
		// this.load.spritesheet(TexturePreloadKeys.TL_SHAKY_DIRT, TL_SHAKY_DIRT, {
		// 	frameWidth: this.tileFrameWidth,
		// 	frameHeight: this.tileFrameHeight
		// });
		// this.load.image(TexturePreloadKeys.TL_HARD_ROCK, TL_HARD_ROCK);

		this.load.image(TexturePreloadKeys.BACKGROUND,BACKGROUND);

		/* UNCOMMENT IF USING BASE64 FORMAT */
		let dirtImg = new Image();
		dirtImg.onload = () => {
			this.textures.addSpriteSheet(TexturePreloadKeys.TL_DIRT, dirtImg, { 
				frameWidth: this.tileFrameWidth, 
				frameHeight:  this.tileFrameHeight
			});
		};
		dirtImg.src = TL_DIRT;

		let rockyDirtImg = new Image();
		rockyDirtImg.onload = () => {
			this.textures.addSpriteSheet(TexturePreloadKeys.TL_ROCKY_DIRT, rockyDirtImg, { 
				frameWidth: this.tileFrameWidth, 
				frameHeight:  this.tileFrameHeight
			});
		};
		rockyDirtImg.src = TL_ROCKY_DIRT;

		let shakyDirtImg = new Image();
		shakyDirtImg.onload = () => {
			this.textures.addSpriteSheet(TexturePreloadKeys.TL_SHAKY_DIRT, shakyDirtImg, { 
				frameWidth: this.tileFrameWidth, 
				frameHeight:  this.tileFrameHeight
			});
		};
		shakyDirtImg.src = TL_SHAKY_DIRT;

		this.textures.addBase64(TexturePreloadKeys.TL_HARD_ROCK,TL_HARD_ROCK);

		// Load Icons:
		this.load.spritesheet(TexturePreloadKeys.MINECRAFT_ICONS, `${this.assetRoot}Icons/minecraft_transparent.png`, {
			frameWidth: 18,
			frameHeight: 18
		});

		this.game.events.once(GameEvents.PreloadFinished, this.handlePreloadFinished, this);
	}

	create(): void {
		PreloadScene.screenScale = AlignTool.getScaleScreen(this);

		this.game.events.emit(GameEvents.PreloadFinished);
	}

	private handlePreloadFinished() {
		this.scene.stop(SceneKeys.Preload);
		this.scene.start(SceneKeys.Game);
	}
}
