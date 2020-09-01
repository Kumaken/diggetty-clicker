interface IITemGenCooldown{
    min: number;
    max: number;
}

export default class ItemConfig {
    public static readonly ITEM_GEN_STARTING_LAYER = 0;
    private static _itemGenCooldown: IITemGenCooldown = {
        min: 0.125,
        max: 1
    }
    
    public static get itemGenCooldown() : IITemGenCooldown {
        return this._itemGenCooldown;
    }
}