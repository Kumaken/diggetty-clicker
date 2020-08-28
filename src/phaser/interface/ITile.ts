export interface ITile extends Phaser.Physics.Arcade.Sprite {
    currentTexture: string;
    currentFrame: number;
    itemType: string;
    
    /**
     * Animate tile break after hit
     */
    animateBreak(): ITile;
}
