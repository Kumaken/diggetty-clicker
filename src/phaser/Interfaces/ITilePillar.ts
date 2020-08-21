import 'phaser';

export interface ITilePillar extends Phaser.GameObjects.TileSprite {
    scrollUp(): void;
}
