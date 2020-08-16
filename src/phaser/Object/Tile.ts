import 'phaser';
import { ITile } from '../Interfaces/ITile';

export default class Tile extends Phaser.Physics.Arcade.Sprite implements ITile {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
		super(scene, x, y, texture, frame);
	}
}
