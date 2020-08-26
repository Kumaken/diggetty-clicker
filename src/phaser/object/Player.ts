import 'phaser';
import GameEvents from '../config/GameEvents';
import { IItem } from '../interface/IItem';
import UpgradeProgressManager from './UpgradeProgressManager';
import { getGame } from 'phaser/Game';
import Item from './Item';
import { ItemData } from 'data/ItemData';

export default class Player {
	private scene: Phaser.Scene;
	private game: Phaser.Game;
	private gold: number;
	private _depth: number;
	private _inventory: IItem[];
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
			this.game.events.emit(GameEvents.OnUpgradeDone);
		}
	}

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.game = getGame();
		this.gold = 0;
		this._depth = 0;
		this._inventory = [];
		this.upgradeProgressManager = new UpgradeProgressManager(this.scene);
		Player.clickDamage = 1;

		// listen to game events (with params):
		this.game.events.on(GameEvents.OnUpgradeIssued, (key: string) => this.handleUpgrade(key), this);
	}

	public get depth() : number {
		return this._depth;
	}
	
	public get inventory() : string {
		return this.inventory
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
		this._depth += amount;
		this.game.events.emit(GameEvents.OnDepthChanged, this._depth);
	}
	
	addItem(itemType: string){
		let item!: Item;
		const lastItemId = this._inventory[this._inventory.length - 1] ? this._inventory[this._inventory.length - 1].id : 1;
		switch(itemType){
			case ItemData.Apple.name:
				item = new Item(
					this.scene, 
					0,
					0, 
					ItemData.Apple.textureKey.key, 
					0, 
					ItemData.Apple,
					lastItemId+1
				);
				break;

			case ItemData.Book.name:
				item = new Item(
					this.scene, 
					0,
					0, 
					ItemData.Book.textureKey.key, 
					0, 
					ItemData.Book,
					lastItemId+1
				);
				break;
			
			case ItemData.GoldIngot.name:
				item = new Item(
					this.scene, 
					0,
					0, 
					ItemData.GoldIngot.textureKey.key, 
					0, 
					ItemData.GoldIngot,
					lastItemId+1
				);
				break;
			
			case ItemData.Potion.name:
				item = new Item(
					this.scene, 
					0,
					0, 
					ItemData.Potion.textureKey.key, 
					0, 
					ItemData.Potion,
					lastItemId+1
				);
				break;
		}

		this._inventory.push(item);
	}
}
