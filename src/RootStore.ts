import { GameStore, IGameStore } from './phaser/Store/GameStore';

export interface IRootStore {
	gameStore?: IGameStore;
}

// this class contains all stores used in the application (game & ui)
export default class RootStore implements IRootStore {
	gameStore: GameStore = new GameStore(this);
}
