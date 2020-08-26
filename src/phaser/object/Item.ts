import 'phaser';
import { IItem } from '../interface/IItem';
import { IItemData } from '../interface/IItemData';

export default class Item extends Phaser.Physics.Arcade.Sprite implements IItem {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    id: number;
    name: string;
    attributes: string;
    description: string;

	constructor(
        scene: Phaser.Scene, 
        x: number, 
        y: number, 
        texture: string, 
        frame: number,
        itemData: IItemData,
        id: number
    ) {
        super(scene, x, y, texture, frame);
        this.name = itemData.name;
        this.attributes = itemData.attributes;
        this.description = itemData.description;
        this.id = id;
    }
    
    useAttribute(): IItem{
        
		return this;
	}
	
}
