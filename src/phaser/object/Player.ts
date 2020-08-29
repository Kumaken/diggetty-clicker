import 'phaser';
import GameEvents from '../config/GameEvents';
import UpgradeProgressManager from './UpgradeProgressManager';
import { getGame } from 'phaser/Game';
import HiringProgressManager from './HiringProgressManager';
import { IGameStore } from 'phaser/store/GameStore';

export default class Player {
	private scene: Phaser.Scene;
	private game: Phaser.Game;
	private gold: number;
	private depth: number;
	private upgradeProgressManager: UpgradeProgressManager;
	private hiringProgressManager: HiringProgressManager;
	public static clickDamage: number = 1;
	public static dps: number = 0;
	private gameStore: IGameStore;

	handleUpgrade(key: string) {
		const price = this.upgradeProgressManager.getCurrentUpgradePrice(key);
		if (price <= this.gold) {
			const dmgChange = this.upgradeProgressManager.calculateDamageIncrease(key);
			Player.clickDamage += dmgChange;
			this.gameStore.upgradeProgresses[key].currdmg += dmgChange;

			this.spendGold(price);
			this.game.events.emit(GameEvents.OnUpgradeDone, key, Player.clickDamage);
		} else {
			console.log('not enough money');
			this.game.events.emit(GameEvents.OnUpgradeDone);
		}
	}

	handleHiring(key: string) {
		const price = this.hiringProgressManager.getCurrentHiringPrice(key);
		if (price <= this.gold) {
			const dmgChange = this.hiringProgressManager.calculateDamageIncrease(key);
			Player.dps += dmgChange;
			this.gameStore.hiringProgresses[key].currdps += dmgChange;

			this.spendGold(price);
			this.game.events.emit(GameEvents.OnHiringDone, key, Player.dps);
		} else {
			console.log('not enough money');
			this.game.events.emit(GameEvents.OnHiringDone);
		}
	}

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.game = getGame();
		this.gold = 10000;
		this.depth = 0;
		this.upgradeProgressManager = new UpgradeProgressManager(this.scene);
		this.hiringProgressManager = new HiringProgressManager(this.scene);
		this.gameStore = this.game.registry.get('gameStore');

		// listen to game events (with params):
		this.game.events.on(GameEvents.OnUpgradeIssued, (key: string) => this.handleUpgrade(key), this);
		this.game.events.on(GameEvents.OnHiringIssued, (key: string) => this.handleHiring(key), this);
	}

	addGold(amount: number) {
		this.gold += amount;
		this.game.events.emit(GameEvents.OnMoneyChanged, this.gold);
	}

	spendGold(amount: number) {
		this.gold -= amount;
		this.game.events.emit(GameEvents.OnMoneyChanged, this.gold);
	}

	addDepth(amount: number) {
		this.depth += amount;
		this.game.events.emit(GameEvents.OnDepthChanged, this.depth);
	}
}
