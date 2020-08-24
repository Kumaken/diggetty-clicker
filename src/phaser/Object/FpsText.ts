import * as Phaser from 'phaser';
import { DepthConfig } from 'phaser/config/DepthConfig';

export default class FpsText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    super(scene, 10, 10, '', { color: 'white', fontSize: '28px' });
    scene.add.existing(this);
    this.setOrigin(0);
    this.setDepth(DepthConfig.FpsText);
  }

  update() {
    this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`);
  }
}
