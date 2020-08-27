import { gameConfig } from './config/PhaserConfig';
import registerScenes from './registerScenes';
import { IGameStore } from './store/GameStore';
import addGameEventListeners from './addListeners';
import { IGameInitConfig } from './interface/IGameInitConfig';

let game: Phaser.Game;
export function createGame(gameStore: IGameStore) {
	game = new Phaser.Game({
		...gameConfig,
		callbacks: {
			preBoot: function (game) {
				// setup gameInitConfig:
				let gameInitConfig: IGameInitConfig = {
					gameStore: gameStore
				};
				game.registry.merge(gameInitConfig);
			}
		}
	});
	registerScenes(game);
	addGameEventListeners(game, gameStore);
	return game;
}

export function getGame(): Phaser.Game {
	return game;
}
