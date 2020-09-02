import { ICharacter } from './ICharacter';

export interface ICharacterPool extends Phaser.Physics.Arcade.Group {
	spawn(x: number, y: number, key: string, frame: number): ICharacter;
	despawn(character: ICharacter): void;
}

/*
declare global so interfaces do not have to be imported to use
ERR: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations(2669)
FIX: mark the file as a module with "export {};"
*/
