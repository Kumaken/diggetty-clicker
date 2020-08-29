import { IItemData } from "./IItemData";

export interface IItem {
    itemData: IItemData;
    
    /**
     * Use attribute of the item
     */
    useAttribute(): IItem;
}
