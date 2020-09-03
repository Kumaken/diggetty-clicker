import 'phaser';
import GameEvents from '../config/GameEvents';
import UpgradeProgressManager from './UpgradeProgressManager';
import InventoryManager from './InventoryManager';
import { getGame } from 'phaser/Game';
import HiringProgressManager from './HiringProgressManager';
import { IGameStore } from 'phaser/store/GameStore';
import { ItemData } from 'data/ItemData';
import { UpgradeData } from 'data/UpgradeData';
import { HiringData } from 'data/HiringData';
import AlignTool from 'phaser/util/AlignTool';
import { TexturePreloadKeys } from 'phaser/config/TexturePreloadKeys';
import { DepthConfig } from 'phaser/config/DepthConfig';
import { AnimationKeys } from 'phaser/config/AnimationKeys';
import Algorithm from 'phaser/util/Algorithm';
import { ICharacterPool } from 'phaser/interface/ICharacterPool';
import { ICharacter } from 'phaser/interface/ICharacter';

export default class Player {
	public scene: Phaser.Scene;
	private game: Phaser.Game;
	private money: number;
	private _depth: number;
	private inventoryManager: InventoryManager;
	private upgradeProgressManager: UpgradeProgressManager;
	private hiringProgressManager: HiringProgressManager;
	public characterPool: ICharacterPool;
	public static clickDamage: number = 1;
	public static dps: number = 0;
	private gameStore: IGameStore;
	private playerSprite: ICharacter;

	handleUpgrade(key: string) {
		const price = this.upgradeProgressManager.getCurrentUpgradePrice(key);
		if (price <= this.money) {
			this.playerSprite.playUpgradeEffect();
			let dmgChange;
			if (this.gameStore.upgradeProgresses[key].level <= 1) {
				dmgChange = UpgradeData[key].baseDMG;
			} else {
				dmgChange = this.upgradeProgressManager.calculateDamageIncrease(key);
			}

			Player.clickDamage += dmgChange;
			this.gameStore.upgradeProgresses[key].currdmg += dmgChange;

			// increase cost:
			this.gameStore.upgradeProgresses[key].currprice = this.upgradeProgressManager.calculatePriceIncrease(
				UpgradeData[key],
				this.gameStore.upgradeProgresses[key].currprice
			);

			this.spendGold(price);
			this.game.events.emit(GameEvents.OnUpgradeDone, key, Player.clickDamage);
		} else {
			console.log('not enough money');
			this.game.events.emit(GameEvents.OnUpgradeDone);
		}
	}

	handleHiring(key: string) {
		const price = this.hiringProgressManager.getCurrentHiringPrice(key);
		if (price <= this.money) {
			let dmgChange;
			if (this.gameStore.hiringProgresses[key].level < 1) {
				console.log(key);
				this.hiringProgressManager.spawnSprite(key);
				dmgChange = HiringData[key].baseDMG;
			} else {
				this.hiringProgressManager.playUpgradeEffect(key);
				dmgChange = this.hiringProgressManager.calculateDamageIncrease(key);
			}
			Player.dps += dmgChange;
			this.gameStore.hiringProgresses[key].currdps += dmgChange;

			// increase cost:
			this.gameStore.hiringProgresses[key].currprice = this.upgradeProgressManager.calculatePriceIncrease(
				HiringData[key],
				this.gameStore.hiringProgresses[key].currprice
			);

			this.spendGold(price);
			this.game.events.emit(GameEvents.OnHiringDone, key, Player.dps);
		} else {
			console.log('not enough money');
			this.game.events.emit(GameEvents.OnHiringDone);
		}
	}

	handleAddItem(itemType: string) {
		this.inventoryManager.addItem(itemType);
	}

	checkItem() {
		if (this.gameStore.newActiveItem) {
			this.gameStore.newActiveItem = false;

			const itemData = this.gameStore.activeItem.itemData;
			switch (itemData.name) {
				case ItemData.Apple.name:
					Player.clickDamage += 5;
					this.gameStore.setPlayerDPC(Player.clickDamage);
					break;

				case ItemData.Book.name:
					this.upgradeProgressManager.setDiscount(0.25, false);
					break;

				case ItemData.GoldIngot.name:
					this.game.events.emit(GameEvents.ActivateGoldIngot);
					break;

				case ItemData.Potion.name:
					Player.dps += 2;
					this.gameStore.setPlayerDPS(Player.dps);
					break;
			}
		}

		if (this.gameStore.buffJustFinished) {
			this.gameStore.buffJustFinished = false;

			const itemData = this.gameStore.activeItem.itemData;
			switch (itemData.name) {
				case ItemData.Apple.name:
					Player.clickDamage -= 5;
					this.gameStore.setPlayerDPC(Player.clickDamage);
					break;

				case ItemData.Book.name:
					this.upgradeProgressManager.setDiscount(0.25, true);
					break;

				case ItemData.GoldIngot.name:
					this.game.events.emit(GameEvents.DeactivateGoldIngot);
					break;

				case ItemData.Potion.name:
					Player.dps -= 2;
					this.gameStore.setPlayerDPS(Player.dps);
					break;
			}

			this.gameStore.activeItem = undefined;
		}
	}

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.game = getGame();
		this.money = 10000;
		this._depth = 0;
		this.inventoryManager = new InventoryManager(this.scene);
		this.upgradeProgressManager = new UpgradeProgressManager(this.scene);
		this.characterPool = this.scene.add.characterPool(TexturePreloadKeys.DRILL_BIRD);
		this.hiringProgressManager = new HiringProgressManager(this.scene, this.characterPool);
		this.gameStore = this.game.registry.get('gameStore');

		this.playerSprite = this.characterPool.spawn(
			AlignTool.getCenterHorizontal(scene),
			AlignTool.getYfromScreenHeight(scene, 0.2),
			TexturePreloadKeys.PLAYER,
			0
		);

		// setup sprite
		AlignTool.scaleToScreenWidth(scene, this, 0.3);
		this.playerSprite.setDepth(DepthConfig.Player);

		// listen to game events (with params):
		this.game.events.on(GameEvents.OnUpgradeIssued, (key: string) => this.handleUpgrade(key), this);
		this.game.events.on(GameEvents.OnHiringIssued, (key: string) => this.handleHiring(key), this);
	}

	public get depth(): number {
		return this._depth;
	}

	public get inventory(): string {
		return this.inventory;
	}

	// spawnSprite() {
	// 	this.scene.add.sprite();
	// }

	addGold(amount: number) {
		this.money += amount;
		this.money = Algorithm.roundToNDecimal(this.money, 1); // Rounding to 2 decimals
		this.game.events.emit(GameEvents.OnMoneyChanged, this.money);
	}

	spendGold(amount: number) {
		this.money -= amount;
		this.game.events.emit(GameEvents.OnMoneyChanged, this.money);
	}

	addDepth(amount: number) {
		this._depth += amount;
		this.game.events.emit(GameEvents.OnDepthChanged, this._depth);
	}

	playDigAnimation() {
		this.playerSprite.anims.play(AnimationKeys.PLAYER_DIG);
	}
}
