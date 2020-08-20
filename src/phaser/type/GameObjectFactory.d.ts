import { ITilePool } from '../interface/ITilePool';
import { IDamageTextPool } from '../interface/IDamageTextPool';
// import { IBubble } from '../Interfaces/IBubble';
// import { IStaticBubblePool } from '../Interfaces/IStaticBubblePool';
// import { IShooter } from '../Interfaces/IShooter';

declare module 'phaser' {
	namespace GameObjects {
		export interface GameObjectFactory {
			damageTextPool(config?: Phaser.Types.GameObjects.Group.GroupCreateConfig): IDamageTextPool;

			tilePool(
				texture: string,
				config?:
					| Phaser.Types.Physics.Arcade.PhysicsGroupConfig
					| Phaser.Types.GameObjects.Group.GroupCreateConfig
			): ITilePool;
		}
	}
}
