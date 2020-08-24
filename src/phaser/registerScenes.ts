import SceneKeys from './config/SceneKeys';
import TitleScene from './scene/TitleScene';
import PreloadScene from './scene/PreloadScene';
import LevelScene from './scene/LevelScene';

const registerScenes = (game: Phaser.Game): void => {
	const scene = game.scene;
	scene.add(SceneKeys.Preload, PreloadScene);
	scene.add(SceneKeys.TitleScreen, TitleScene);
	scene.add(SceneKeys.Game, LevelScene);
};

export default registerScenes;
