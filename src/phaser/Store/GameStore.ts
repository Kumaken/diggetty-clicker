import { IRootStore } from '../../RootStore';
import { action, observable } from 'mobx';

export interface IGameStore {
	topPlatformName: string;
	topPlatformToughness: number;
	topPlatformMaxToughness: number;
	currentLevel: number;
	currentScore: number;
	gameStart(): void;
	gameEnd(): void;
	increaseScore(total: number): void;
	resetScore(): void;
	setTopPlatformName(name: string): void;
	setTopPlatformName(name: string): void;
	setTopPlatformToughness(value: number): void;
	setTopPlatformMaxToughness(value: number): void;
}

export class GameStore implements IGameStore {
	rootStore: IRootStore;
	constructor(rootStore: IRootStore) {
		this.rootStore = rootStore;
	}

	@observable topPlatformName: string = 'Loading';
	@observable topPlatformToughness: number = 0;
	@observable topPlatformMaxToughness: number = 10;

	@action setTopPlatformName(name: string) {
		this.topPlatformName = name;
	}

	@action setTopPlatformToughness(value: number) {
		this.topPlatformToughness = value;
	}

	@action setTopPlatformMaxToughness(value: number) {
		this.topPlatformMaxToughness = value;
	}

	@observable isCurrentlyPlaying: boolean = true;
	@observable currentLevel: number = 0;
	@observable currentScore: number = 0;

	@action
	increaseScore(total: number) {
		this.currentScore = total;
	}

	@action
	resetScore() {
		this.currentScore = 0;
	}

	@action
	gameEnd() {
		this.isCurrentlyPlaying = false;
	}

	@action
	gameStart() {
		this.isCurrentlyPlaying = true;
	}
}
