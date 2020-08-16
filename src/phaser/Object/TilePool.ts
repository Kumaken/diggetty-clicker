import * as Phaser from 'phaser';
// import tile from './tile';
// import { Itile } from '../Interfaces/Itile';
// import { IStatictilePool } from '../Interfaces/IStatictilePool';
// import ColorConfig from '../Config/ColorConfig';
import Tile from './Tile';
import { ITilePool } from '../Interfaces/ITilePool';
import AlignTool from '../Util/AlignTool';

export default class TilePool {
	private group?: Phaser.Physics.Arcade.Group;
	private scene: Phaser.Scene;
	private world: Phaser.Physics.Arcade.World;
	constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, texture: string) {
		// const defaults:
		// 	| Phaser.Types.Physics.Arcade.PhysicsGroupConfig
		// 	| Phaser.Types.GameObjects.Group.GroupCreateConfig = {
		// 	classType: Tile,
		// 	maxSize: -1,
		// 	key: texture,
		// 	frame: 0,
		// 	active: false,
		// 	visible: false,
		// 	frameQuantity: 10
		// };
		this.world = world;
		this.scene = scene;
		this.group = scene.physics.add.group({
			defaultKey: texture
		});
		scene.add.existing(this.group);
		// super(world, scene, Object.assign(defaults, config));
	}

	spawn(x: number, y: number, key: string, frame: number): Tile {
		const spawnExisting = this.group.countActive(false) > 0;
		const tile: Tile = this.group.get(x, y, key, frame);
		if (!tile) {
			return tile;
		}

		tile.setTexture(key);
		tile.setFrame(frame);
		// tile.giveCircleCollider();
		// tile.emit('on-spawned');

		if (spawnExisting) {
			tile.setVisible(true);
			tile.setActive(true);
			this.world.add(tile.body);
			// tile.randomizeColor();
		}

		AlignTool.scaleToScreenWidth(this.scene, tile, 0.11);
		// tile.setScale(
		//   PreloadScene.screenScale.scaleWidth,
		//   PreloadScene.screenScale.scaleHeight
		// );
		tile.setInteractive();
		return tile;
	}

	despawn(tile: Tile): void {
		this.group.killAndHide(tile);
		this.world.remove(tile.body);
		tile.alpha = 1;
		tile.body.reset(0, 0);
		tile.disableInteractive();
		// tile.anims.stop();
	}
}

// Register to gameobject factory (Module Augmentation)
// Phaser.GameObjects.GameObjectFactory.register('tilePool', function (
// 	texture: string,
// 	config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
// ) {
// 	const pool = new TilePool(this.scene.physics.world, this.scene, texture, config);

// 	this.updateList.add(pool);

// 	return pool;
// });
