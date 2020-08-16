import SceneKeys from './phaser/Config/SceneKeys';
import TitleScene from './phaser/Scene/TitleScene';
import PreloadScene from './phaser/Scene/PreloadScene';
import LevelScene from './phaser/Scene/LevelScene';
// import GameUI from './phaser/Scene/GameUI';

const registerScenes = (game: Phaser.Game): void => {
	const scene = game.scene;
	scene.add(SceneKeys.Preload, PreloadScene);
	scene.add(SceneKeys.TitleScreen, TitleScene);
	scene.add(SceneKeys.Game, LevelScene);
	// scene.add(SceneKeys.GameUI, GameUI);
};

export default registerScenes;
