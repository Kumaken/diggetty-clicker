import 'phaser';
import Character from './Character';
import { ICharacterPool } from '../interface/ICharacterPool';
import { AnimationKeys } from 'phaser/config/AnimationKeys';

export default class CharacterPool extends Phaser.Physics.Arcade.Group implements ICharacterPool {
	constructor(
		world: Phaser.Physics.Arcade.World,
		scene: Phaser.Scene,
		texture: string,
		config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
	) {
		const defaults:
			| Phaser.Types.Physics.Arcade.PhysicsGroupConfig
			| Phaser.Types.GameObjects.Group.GroupCreateConfig = {
			classType: Character,
			maxSize: -1,
			key: texture,
			frame: 0,
			active: false,
			visible: false,
			frameQuantity: 10
		};

		super(world, scene, Object.assign(defaults, config));
	}

	spawn(x: number, y: number, key: string, frame: number): Character {
		const spawnExisting = this.countActive(false) > 0;
		const character: Character = this.get(x, y, key, frame);
		if (!character) {
			return character;
		}

		if (spawnExisting) {
			character.enableSprite();
			this.world.add(character.body);
		}

		character.setupSprite(key, frame);
		character.setupPhysics();
		character.anims.play(AnimationKeys[key]);
		return character;
	}

	despawn(character: Character): void {
		this.killAndHide(character);
		this.world.remove(character.body);
		character.disableSprite();
	}
}

// Register to gameobject factory (Module Augmentation)
Phaser.GameObjects.GameObjectFactory.register('characterPool', function (
	texture: string,
	config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig = {}
) {
	const pool = new CharacterPool(this.scene.physics.world, this.scene, texture, config);

	this.updateList.add(pool);

	return pool;
});
