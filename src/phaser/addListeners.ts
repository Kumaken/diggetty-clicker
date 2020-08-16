import GameEvents from './Config/GameEvents';
import { IGameStore } from './Store/GameStore';

// Custom event that change value in Mobx store
const addGameEventListeners = (game: Phaser.Game, gameStore: IGameStore) => {
	game.events.on(GameEvents.TopmostPlatformChanged, (name: string) => {
		gameStore?.setTopPlatformName(name);
	});
};

export default addGameEventListeners;
