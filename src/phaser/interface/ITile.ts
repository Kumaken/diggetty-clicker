export interface ITile extends Phaser.Physics.Arcade.Sprite {
    readonly animDuration: number;
    currentTexture: string;
    currentFrame: number;
    itemType: string;
    
    /**
     * Animate tile break after hit
     */
    animateBreak(): ITile;

    takeItem(): ITile;
}
