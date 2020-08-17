import { IRootStore } from '../../RootStore';
import { action, observable } from 'mobx';
import { IUpgradeProgresses, IUpgradeProgress } from 'phaser/Interfaces/IUpgradeProgress';
import { UpgradeData } from 'phaser/Data/UpgradeData';

export interface IGameStore {
	topPlatformName: string;
	topPlatformToughness: number;
	topPlatformMaxToughness: number;
	playerDPC: number;
	money: number;
	depth: number;
	upgradeProgresses: IUpgradeProgresses;
	insufficientMoneyNotif: boolean;
	setTopPlatformName(name: string): void;
	setTopPlatformToughness(value: number): void;
	setTopPlatformMaxToughness(value: number): void;
	setPlayerDPC(value: number): void;
	setMoney(value: number): void;
	setDepth(value: number): void;
	setUpgradeProgresses(update: IUpgradeProgresses): void;
	upgradeByKey(key: string);
	setInsufficientMoneyNotif(value: boolean);
}

export class GameStore implements IGameStore {
	rootStore: IRootStore;

	initializeUpgradeProgresses() {
		for (let key in UpgradeData) {
			const newProgress: IUpgradeProgress = {
				level: 1,
				currdmg: UpgradeData[key].baseDMG
			};
			this.upgradeProgresses[key] = newProgress;
		}
	}

	constructor(rootStore: IRootStore) {
		this.rootStore = rootStore;
		this.initializeUpgradeProgresses();
	}

	@observable topPlatformName: string = 'Loading';
	@observable topPlatformToughness: number = 0;
	@observable topPlatformMaxToughness: number = 1;
	@observable playerDPC: number = 1;
	@observable money: number = 0;
	@observable depth: number = 0;
	@observable upgradeProgresses: IUpgradeProgresses = {};
	@observable insufficientMoneyNotif: boolean = false;

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

	@action setUpgradeProgresses(update: IUpgradeProgresses) {
		this.upgradeProgresses = update;
	}

	@action upgradeByKey(key: string) {
		this.upgradeProgresses[key].level += 1;
	}

	@action setInsufficientMoneyNotif(value: boolean) {
		this.insufficientMoneyNotif = value;
	}
}
