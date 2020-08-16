import { gameConfig } from './Config/PhaserConfig';
import registerScenes from './registerScenes';
import { IGameStore } from './Store/GameStore';
import addGameEventListeners from './addListeners';

let game: Phaser.Game;
export function createGame(gameStore: IGameStore) {
	game = new Phaser.Game(gameConfig);
	registerScenes(game);
	addGameEventListeners(this.game, gameStore);
	return game;
}

export function getGame(): Phaser.Game {
	return game;
}
