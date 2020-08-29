import 'phaser';
import { IItem } from '../interface/IItem';
import { IItemData } from '../interface/IItemData';

export default class Item implements IItem {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    itemData: IItemData;

	constructor(
        itemData: IItemData
    ) {
        this.itemData = itemData;
    }
    
    useAttribute(): IItem{
        
		return this;
	}
	
}
