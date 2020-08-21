import * as Phaser from 'phaser';
import { TexturePreloadKeys } from '../config/TexturePreloadKeys';
import SceneKeys from '../config/SceneKeys';
import GameEvents from '../config/GameEvents';
import AlignTool from '../util/AlignTool';

// import images so webpack could include it:
import TL_DIRT from '../../assets/tiles/dirt_Tiles_407.png';
import TL_HARD_ROCK from '../../assets/tiles/hard_rock.png';

export default class PreloadScene extends Phaser.Scene {
	private assetRoot = 'src/assets/';
	static screenScale: {
		scaleWidth: number;
		scaleHeight: number;
	};
	private tileFrameWidth: number = 17.9;
	private tileFrameHeight: number = 17.9;

	constructor() {
		super({ key: SceneKeys.Preload });
	}

	preload(): void {
		/* all the routes here is referenced from root! */
		// this.load.image(
		//   TexturePreloadKeys.VB_TRACK.key,
		//   `${this.assetRoot}QuantityBar/track.png`
		// );

		this.load.spritesheet(TexturePreloadKeys.TL_DIRT, TL_DIRT, {
			frameWidth: this.tileFrameWidth,
			frameHeight: this.tileFrameHeight
		});

		this.load.spritesheet(TexturePreloadKeys.TL_HARD_ROCK, TL_HARD_ROCK, {
			frameWidth: this.tileFrameWidth,
			frameHeight: this.tileFrameHeight
		});

		// // Load Icons:
		this.load.spritesheet(TexturePreloadKeys.MINECRAFT_ICONS, `${this.assetRoot}icons/minecraft_transparent.png`, {
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
