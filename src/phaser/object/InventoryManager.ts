import "phaser";
import GameEvents from "../config/GameEvents";
import { ItemData } from "../../data/ItemData";
import { IItem } from "../interface/IItem";
import Item from "./Item";
import { getGame } from "../Game";
import { IGameStore } from "../store/GameStore";

export default class InventoryManager {
  private scene: Phaser.Scene;
  private game: Phaser.Game;
  private gameStore: IGameStore;

  addItem(itemType: string) {
    if (this.gameStore.inventory.length === 15) {
      this.game.events.emit(GameEvents.OnItemAcquired, true);
      return;
    }
    let item!: IItem;

    switch (itemType) {
      case ItemData.Apple.name:
        item = new Item(ItemData.Apple);
        break;

      case ItemData.Book.name:
        item = new Item(ItemData.Book);
        break;

      case ItemData.GoldIngot.name:
        item = new Item(ItemData.GoldIngot);
        break;

      case ItemData.Potion.name:
        item = new Item(ItemData.Potion);
        break;
    }

    this.game.events.emit(GameEvents.OnItemAcquired, false, item);
  }

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.game = getGame();
    this.gameStore = this.game.registry.get("gameStore");
  }
}
