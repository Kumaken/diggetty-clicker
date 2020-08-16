import { IRootStore } from '../../RootStore';
import { action, observable } from 'mobx';

export interface IGameStore {
	topPlatformName: string;
	topPlatformToughness: number;
	topPlatformMaxToughness: number;
	playerDPC: number;
	money: number;
	depth: number;
	setTopPlatformName(name: string): void;
	setTopPlatformToughness(value: number): void;
	setTopPlatformMaxToughness(value: number): void;
	setPlayerDPC(value: number): void;
	setMoney(value: number): void;
	setDepth(value: number): void;
}

export class GameStore implements IGameStore {
	rootStore: IRootStore;
	constructor(rootStore: IRootStore) {
		this.rootStore = rootStore;
	}

	@observable topPlatformName: string = 'Loading';
	@observable topPlatformToughness: number = 0;
	@observable topPlatformMaxToughness: number = 1;
	@observable playerDPC: number = 1;
	@observable money: number = 0;
	@observable depth: number = 0;

	@action setTopPlatformName(name: string) {
		this.topPlatformName = name;
	}

	@action setTopPlatformToughness(value: number) {
		this.topPlatformToughness = value;
	}

	@action setTopPlatformMaxToughness(value: number) {
		this.topPlatformMaxToughness = value;
	}

	@action setPlayerDPC(value: number) {
		this.playerDPC = value;
	}

	@action setMoney(value: number) {
		this.money = value;
	}

	@action setDepth(value: number) {
		this.depth = value;
	}
}
