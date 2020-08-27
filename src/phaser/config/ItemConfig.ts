interface IITemGenCooldown{
    min: number;
    max: number;
}

export default class ItemConfig {
    public static readonly ITEM_GEN_STARTING_LAYER = 0;
    private static _itemGenCooldown: IITemGenCooldown = {
        min: 5,
        max: 8
    }
    
    public static get itemGenCooldown() : IITemGenCooldown {
        return this._itemGenCooldown;
    }

    public static setItemGenCooldown(depth: number) {
        this._itemGenCooldown.min = 5 + Math.floor(depth/10);
        this._itemGenCooldown.max = 8 + Math.floor(depth/9);
    }
}