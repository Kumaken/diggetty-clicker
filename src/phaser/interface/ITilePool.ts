import { ITile } from './ITile';
import { IItem } from './IItem';

export interface ITilePool extends Phaser.Physics.Arcade.Group {
	spawnTile(x: number, y: number, key: string, frame: number, tileType?: string): ITile;
	despawn(tile: ITile): void;
}

/*
declare global so interfaces do not have to be imported to use
ERR: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations(2669)
FIX: mark the file as a module with "export {};"
*/
