import 'phaser';
import GameEvents from '../Config/GameEvents';
import UpgradeProgressManager from './UpgradeProgressManager';
import { getGame } from 'phaser/Game';

export default class Player {
	private scene: Phaser.Scene;
	private game: Phaser.Game;
	private gold: number;
	private depth: number;
	private upgradeProgressManager: UpgradeProgressManager;
	public static clickDamage: number;

	handleUpgrade(key: string) {
		const price = this.upgradeProgressManager.getCurrentUpgradePrice(key);
		if (price <= this.gold) {
			this.upgradeProgressManager.levelUpProgress(key);
			const dmgChange = this.upgradeProgressManager.calculateDamageIncrease(key);
			Player.clickDamage += dmgChange;

			this.spendGold(price);
			this.game.events.emit(GameEvents.OnUpgradeDone, key, Player.clickDamage);
		} else {
			console.log('not enough money');
			this.game.events.emit(GameEvents.InsufficientMoney);
		}
	}

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.game = getGame();
		this.gold = 0;
		this.depth = 0;
		this.upgradeProgressManager = new UpgradeProgressManager(this.scene);
		Player.clickDamage = 1;

		// listen to game events (with params):
		this.game.events.on(GameEvents.OnUpgradeIssued, (key: string) => this.handleUpgrade(key), this);
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
