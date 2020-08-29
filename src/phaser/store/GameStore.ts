import { IRootStore } from '../../RootStore';
import { action, observable } from '../../../node_modules/mobx/lib/mobx';
import { IUpgradeProgresses, IUpgradeProgress } from 'phaser/interface/IUpgradeProgress';
import { UpgradeData } from 'data/UpgradeData';
import { IHiringProgresses, IHiringProgress } from 'phaser/interface/IHiringProgress';
import { HiringData } from 'data/HiringData';
import { IItem } from 'phaser/interface/IItem';

export interface IGameStore {
	topPlatformName: string;
	topPlatformToughness: number;
	topPlatformMaxToughness: number;
	playerDPC: number;
	playerDPS: number;
	money: number;
	inventory: IItem[];
	depth: number;
	upgradeProgresses: IUpgradeProgresses;
	hiringProgresses: IHiringProgresses;
	insufficientMoneyNotif: boolean;
	inventoryFullNotif: boolean;
	setTopPlatformName(name: string): void;
	setTopPlatformToughness(value: number): void;
	setTopPlatformMaxToughness(value: number): void;
	setPlayerDPC(value: number): void;
	setPlayerDPS(value: number): void;
	setMoney(value: number): void;
	addItem(item: IItem): void;
	useItem(id: number): void;
	setDepth(value: number): void;
	setUpgradeProgresses(update: IUpgradeProgresses): void;
	setHiringProgresses(update: IHiringProgresses): void;
	upgradeByKey(key: string);
	hireByKey(key: string);
	setInsufficientMoneyNotif(value: boolean);
	setInventoryFullNotif(value: boolean);
}

export class GameStore implements IGameStore {
	rootStore: IRootStore;

	initializeUpgradeProgresses() {
		for (let key in UpgradeData) {
			const newProgress: IUpgradeProgress = {
				level: 0,
				currdmg: 0,
				currprice: UpgradeData[key].baseCost
			};
			this.upgradeProgresses[key] = newProgress;
		}
	}

	initializeHiringProgresses() {
		for (let key in HiringData) {
			const newProgress: IHiringProgress = {
				level: 0,
				currdps: 0,
				currprice: HiringData[key].baseCost
			};
			this.hiringProgresses[key] = newProgress;
		}
	}

	constructor(rootStore: IRootStore) {
		this.rootStore = rootStore;
		this.initializeUpgradeProgresses();
		this.initializeHiringProgresses();
	}

	@observable topPlatformName: string = 'Loading';
	@observable topPlatformToughness: number = 0;
	@observable topPlatformMaxToughness: number = 1;
	@observable playerDPC: number = 1;
	@observable playerDPS: number = 0;
	@observable money: number = 0;
	@observable inventory: IItem[] = [];
	@observable depth: number = 0;
	@observable upgradeProgresses: IUpgradeProgresses = {};
	@observable hiringProgresses: IHiringProgresses = {};
	@observable insufficientMoneyNotif: boolean = false;
	@observable inventoryFullNotif: boolean = false;

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

	@action setPlayerDPS(value: number) {
		this.playerDPS = value;
	}

	@action setMoney(value: number) {
		this.money = value;
	}

	@action addItem(item: IItem) {
		this.inventory.push(item);
	}

	@action useItem(id: number) {
		this.inventory.splice(id, 1);
	}

	@action setDepth(value: number) {
		this.depth = value;
	}

	@action setUpgradeProgresses(update: IUpgradeProgresses) {
		this.upgradeProgresses = update;
	}

	@action setHiringProgresses(update: IHiringProgresses) {
		this.hiringProgresses = update;
	}

	@action upgradeByKey(key: string) {
		this.upgradeProgresses[key].level += 1;
	}

	@action hireByKey(key: string) {
		this.hiringProgresses[key].level += 1;
	}

	@action setInsufficientMoneyNotif(value: boolean) {
		this.insufficientMoneyNotif = value;
	}

	@action setInventoryFullNotif(value: boolean) {
		this.inventoryFullNotif = value;
	}
}
