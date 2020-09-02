import * as Phaser from 'phaser';
import { TexturePreloadKeys } from '../config/TexturePreloadKeys';
import SceneKeys from '../config/SceneKeys';
import GameEvents from '../config/GameEvents';
import AlignTool from '../util/AlignTool';

// import images so webpack could include it:
import TL_DIRT from '../../assets/tiles/dirt_spritesheet.png';
import TL_ROCKY_DIRT from '../../assets/tiles/rocky_dirt_spritesheet.png';
import TL_SHAKY_DIRT from '../../assets/tiles/shaky_dirt_spritesheet.png';
import TL_HARD_ROCK from '../../assets/tiles/hardrock.png';
import BACKGROUND from '../../assets/background.jpg';
import APPLE from '../../assets/items/apple.png';
import BOOK from '../../assets/items/book.png';
import GOLD_INGOT from '../../assets/items/gold_ingot.png';
import POTION from '../../assets/items/potion.png';
import FLARES from '../../assets/items/flares.png';
import FLARES_JSON from '../../assets/items/flares.json';
import PLAYER from '../../assets/characters/player.png';
import DRILL_BIRD from '../../assets/characters/drill_bird.png';
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
		// this.load.image(TexturePreloadKeys.APPLE,APPLE);
		// this.load.image(TexturePreloadKeys.BOOK,BOOK);
		// this.load.image(TexturePreloadKeys.GOLD_INGOT,GOLD_INGOT);
		// this.load.image(TexturePreloadKeys.POTION,POTION);

		this.load.image(TexturePreloadKeys.BACKGROUND, BACKGROUND);
		this.load.atlas(TexturePreloadKeys.FLARES, FLARES, FLARES_JSON);

		/* UNCOMMENT IF USING BASE64 FORMAT */
		let dirtImg = new Image();
		dirtImg.onload = () => {
			this.textures.addSpriteSheet(TexturePreloadKeys.TL_DIRT, dirtImg, {
				frameWidth: this.tileFrameWidth,
				frameHeight: this.tileFrameHeight
			});
		};
		dirtImg.src = TL_DIRT;

		let rockyDirtImg = new Image();
		rockyDirtImg.onload = () => {
			this.textures.addSpriteSheet(TexturePreloadKeys.TL_ROCKY_DIRT, rockyDirtImg, {
				frameWidth: this.tileFrameWidth,
				frameHeight: this.tileFrameHeight
			});
		};
		rockyDirtImg.src = TL_ROCKY_DIRT;

		let shakyDirtImg = new Image();
		shakyDirtImg.onload = () => {
			this.textures.addSpriteSheet(TexturePreloadKeys.TL_SHAKY_DIRT, shakyDirtImg, {
				frameWidth: this.tileFrameWidth,
				frameHeight: this.tileFrameHeight
			});
		};
		shakyDirtImg.src = TL_SHAKY_DIRT;

		this.textures.addBase64(TexturePreloadKeys.TL_HARD_ROCK, TL_HARD_ROCK);
		this.textures.addBase64(TexturePreloadKeys.APPLE, APPLE);
		this.textures.addBase64(TexturePreloadKeys.BOOK, BOOK);
		this.textures.addBase64(TexturePreloadKeys.GOLD_INGOT, GOLD_INGOT);
		this.textures.addBase64(TexturePreloadKeys.POTION, POTION);

		// Load Icons:
		// this.load.spritesheet(TexturePreloadKeys.MINECRAFT_ICONS, `${this.assetRoot}icons/minecraft_transparent.png`, {
		// 	frameWidth: 18,
		// 	frameHeight: 18
		// });

		// Characters:
		let playerImg = new Image();
		playerImg.onload = () => {
			this.textures.addSpriteSheet(TexturePreloadKeys.PLAYER, playerImg, {
				frameWidth: 91,
				frameHeight: 62
			});
		};
		playerImg.src = PLAYER;

		let drillbirdIMG = new Image();
		drillbirdIMG.onload = () => {
			this.textures.addSpriteSheet(TexturePreloadKeys.DRILL_BIRD, drillbirdIMG, {
				frameWidth: 17,
				frameHeight: 15
			});
		};
		drillbirdIMG.src = DRILL_BIRD;

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
