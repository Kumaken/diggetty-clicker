import GameEvents from './config/GameEvents';
import { IGameStore } from './store/GameStore';
import { ITopMostPlatformInfo } from './interface/ITopMostPlatformInfo';
import { IItem } from './interface/IItem';

// Custom event that change value in Mobx store
const addGameEventListeners = (game: Phaser.Game, gameStore: IGameStore) => {
	game.events.on(GameEvents.TopmostPlatformChanged, (data: ITopMostPlatformInfo) => {
		gameStore?.setTopPlatformName(data.name);
		gameStore?.setTopPlatformToughness(data.toughness);
		gameStore?.setTopPlatformMaxToughness(data.maxToughness);
	});

	game.events.on(GameEvents.OnDamage, (value: number) => {
		const newToughness = gameStore?.topPlatformToughness - value;
		gameStore?.setTopPlatformToughness(newToughness >= 0 ? newToughness : 0);
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

	game.events.on(GameEvents.OnHiringDone, (key: string, DPS: number) => {
		if (!key && !DPS) {
			gameStore?.setInsufficientMoneyNotif(true);
			return;
		}
		gameStore?.hireByKey(key);
		gameStore?.setPlayerDPS(DPS);
	});

	game.events.on(GameEvents.OnItemAcquired, (isFull: boolean, item?: IItem) => {
		if (isFull) {
			gameStore?.setInventoryFullNotif(true);
			return;
		}
		gameStore?.addItem(item);
	});
};

export default addGameEventListeners;
