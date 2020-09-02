interface IITemGenCooldown{
    min: number;
    max: number;
    itemNotTaken: number;
}

export default class ItemConfig {
    public static readonly ITEM_GEN_STARTING_LAYER = 0;
    private static _itemGenCooldown: IITemGenCooldown = {
        min: 0.25,
        max: 1,
        itemNotTaken: 0.1
    }
    
    public static get itemGenCooldown() : IITemGenCooldown {
        return this._itemGenCooldown;
    }
}