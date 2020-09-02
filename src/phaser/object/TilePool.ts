import 'phaser';
import Tile from './Tile';
import { ITilePool } from '../interface/ITilePool';

export default class TilePool extends Phaser.Physics.Arcade.Group implements ITilePool {
	constructor(
		world: Phaser.Physics.Arcade.World,
		scene: Phaser.Scene,
		texture: string,
		config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
	) {
		const defaults:
			| Phaser.Types.Physics.Arcade.PhysicsGroupConfig
			| Phaser.Types.GameObjects.Group.GroupCreateConfig = {
			classType: Tile,
			maxSize: -1,
			key: texture,
			frame: 0,
			active: false,
			visible: false,
			frameQuantity: 10
		};

		super(world, scene, Object.assign(defaults, config));
	}

	spawn(x: number, y: number, key: string, frame: number, tileType?: string): Tile {
		const spawnExisting = this.countActive(false) > 0;
		const tile: Tile = this.get(x, y, key, frame);
		if (!tile) {
			return tile;
		}

		if (spawnExisting) {
			tile.enableSprite();
			this.world.add(tile.body);
		}

		tile.setupSprite(key, frame, tileType);
		tile.setupPhysics();
		return tile;
	}

	despawn(tile: Tile): void {
		this.killAndHide(tile);
		this.world.remove(tile.body);
		tile.disableSprite();
	}
}

// Register to gameobject factory (Module Augmentation)
Phaser.GameObjects.GameObjectFactory.register('tilePool', function (
	texture: string,
	config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
) {
	const pool = new TilePool(this.scene.physics.world, this.scene, texture, config);

	this.updateList.add(pool);

	return pool;
});
