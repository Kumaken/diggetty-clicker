import 'phaser';
import { TextureKeys } from '../config/TextureKeys';
import PlatformManager from './PlatformManager';
import AlignTool from 'phaser/util/AlignTool';
import { DepthConfig } from 'phaser/config/DepthConfig';

export default class ParticlesManager {
    private scene: Phaser.Scene;
    private groundCrumbs: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private shootingStar: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private starSprite: Phaser.Physics.Arcade.Image;
    private star: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor(scene: Phaser.Scene){
        this.scene = scene;
        this.groundCrumbs = scene.add.particles(TextureKeys.TL_DIRT.key, 0);
        scene.add.existing(this.groundCrumbs);

        this.groundCrumbs.createEmitter({
            frame: 0,
            angle: { min: 240, max: 300 },
            speed: { min: 200, max: 400 },
            quantity: 1,
            lifespan: 1000,
            alpha: { start: 1, end: 0 },
            scale: 1,
            rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
            gravityY: 800,
            on: false
        });

        this.shootingStar = scene.add.particles(TextureKeys.FLARES.key,TextureKeys.FLARES.frame[2]);
        this.shootingStar.setDepth(DepthConfig.Star);
        scene.add.existing(this.shootingStar);

        this.starSprite = this.scene.physics.add.image(
            AlignTool.getXfromScreenWidth(scene, 0.5),
            AlignTool.getYfromScreenHeight(scene, 0.5),
            TextureKeys.FLARES.key,
            TextureKeys.FLARES.frame[2]
        );
        this.starSprite.setVisible(true);
        this.star = this.shootingStar.createEmitter({
            lifespan: 600,
            speed: 300,
            angle: 330,
            gravityY: 100,
            scale: { start: 0.4, end: 0 },
            quantity: 1,
            follow: this.starSprite
        });
        this.star.stop();
    }

    showGroundCrumbs(): void{
        const topmostRow = PlatformManager.topMostPlatform.row;
        topmostRow.forEach(block => {
            this.groundCrumbs.emitParticleAt(
                block.x,
                block.y - block.displayHeight/2
            );
        });
    }

    showShootingStar(x: number, y: number): void{
        const dest = {
            x: AlignTool.getXfromScreenWidth(this.scene, 0.95),
            y: PlatformManager.bottomMostY + AlignTool.getYfromScreenHeight(this.scene,0.1)
        }
        const duration = 600;

        this.star.start();
        this.star.setAngle(
            Math.atan((dest.y-y)/(dest.x-x)) + 225
        );
        
        this.starSprite.setPosition(x,y);
        this.scene.tweens.add({
            targets: this.starSprite,
            x: dest.x,
            y: dest.y,
            duration: duration
        });

        this.scene.time.delayedCall(
            duration,
            () => {
                this.star.stop()
            },
            null,
            this
        );
    }
}
