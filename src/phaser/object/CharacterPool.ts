import 'phaser';
import Character from './Character';
import { ICharacterPool } from '../interface/ICharacterPool';
import { AnimationKeys } from 'phaser/config/AnimationKeys';
import { TexturePreloadKeys } from 'phaser/config/TexturePreloadKeys';

export default class CharacterPool extends Phaser.Physics.Arcade.Group implements ICharacterPool {
	setupAnimations() {
		this.scene.anims.create({
			key: AnimationKeys.PLAYER_DIG,
			frames: this.scene.anims.generateFrameNumbers(TexturePreloadKeys.PLAYER, { start: 0, end: 6 }),
			frameRate: 12,
			repeat: 0
		});

		this.scene.anims.create({
			key: AnimationKeys.DRILL_BIRD,
			frames: this.scene.anims.generateFrameNumbers(TexturePreloadKeys.DRILL_BIRD, { start: 0, end: 5 }),
			frameRate: 4,
			repeat: -1
		});
		this.scene.anims.create({
			key: AnimationKeys.FEISTY_HEN,
			frames: this.scene.anims.generateFrameNumbers(TexturePreloadKeys.FEISTY_HEN, { start: 0, end: 2 }),
			frameRate: 3,
			repeat: -1
		});
		this.scene.anims.create({
			key: AnimationKeys.DRUNK_SQUIRREL,
			frames: this.scene.anims.generateFrameNumbers(TexturePreloadKeys.DRUNK_SQUIRREL, { start: 0, end: 5 }),
			frameRate: 3,
			repeat: -1
		});
		this.scene.anims.create({
			key: AnimationKeys.DRILL_MACHINE,
			frames: this.scene.anims.generateFrameNumbers(TexturePreloadKeys.DRILL_MACHINE, { start: 0, end: 7 }),
			frameRate: 2,
			repeat: -1
		});
	}

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

		// setup animations
		this.setupAnimations();
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
