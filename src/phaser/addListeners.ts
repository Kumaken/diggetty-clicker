import GameEvents from './config/GameEvents';
import { IGameStore } from './store/GameStore';
import { ITopMostPlatformInfo } from './Interfaces/ITopMostPlatformInfo';

// Custom event that change value in Mobx store
const addGameEventListeners = (game: Phaser.Game, gameStore: IGameStore) => {
	game.events.on(GameEvents.TopmostPlatformChanged, (data: ITopMostPlatformInfo) => {
		gameStore?.setTopPlatformName(data.name);
		gameStore?.setTopPlatformToughness(data.toughness);
		gameStore?.setTopPlatformMaxToughness(data.maxToughness);
	});

	game.events.on(GameEvents.OnDamage, (value: number) => {
		gameStore?.setTopPlatformToughness(value);
	});

	game.events.on(GameEvents.OnMoneyChanged, (value: number) => {
		gameStore?.setMoney(value);
	});

	game.events.on(GameEvents.OnDepthChanged, (value: number) => {
		gameStore?.setDepth(value);
	});

	game.events.on(GameEvents.OnUpgradeDone, (key: string, DPC: number) => {
		if (!key && !DPC) {
			gameStore?.setInsufficientMoneyNotif(true);
			return;
		}
		gameStore?.upgradeByKey(key);
		gameStore?.setPlayerDPC(DPC);
	});
};

export default addGameEventListeners;
