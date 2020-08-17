import 'phaser';
import GameEvents from '../Config/GameEvents';
import UpgradeProgressManager from './UpgradeProgress';
import { getGame } from 'phaser/Game';

export default class Player {
	private scene: Phaser.Scene;
	private game: Phaser.Game;
	private gold: number;
	private depth: number;
	private upgradeProgress: UpgradeProgressManager;
	public static clickDamage: number;

	handleUpgrade(key: string) {
		this.upgradeProgress.levelUpProgress(key);
		const dmgChange = this.upgradeProgress.calculateDamageIncrease(key);
		Player.clickDamage += dmgChange;

		this.scene.events.emit(GameEvents.OnUpgradeDone);
	}

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.game = getGame();
		this.gold = 0;
		this.depth = 0;
		this.upgradeProgress = new UpgradeProgressManager(this.scene);
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
