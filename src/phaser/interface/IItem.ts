export interface IItem extends Phaser.Physics.Arcade.Sprite {
    id: number;
    name: string;
    attributes: string;
    description: string;
    
    /**
     * Use attribute of the item
     */
    useAttribute(): IItem;
}
