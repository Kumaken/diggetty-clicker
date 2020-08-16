// import 'phaser';
// import AlignTool from '../Util/AlignTool';
// import BottomMenuManager from './BottomMenu/BottomMenuManager';
// import { TextureKeys } from '../Config/TextureKeys';
// import Player from '../Object/Player';
// import GameEvents from '../Config/GameEvents';
// import { StatsText } from './TextElements';

import React from 'react';
// import 'react-bulma-components/basic/react-bulma-components.min.css';
import Tag from 'react-bulma-components/lib/components/tag';

export const PlayerStats = () => {
	// const gameScene: Phaser.Scene;

	//   const updateDPC = () => {
	//     this.DPSText.setElement(StatsText(Player.clickDamage));
	//   }

	const createDPC = () => {
		return <Tag color="danger">Tag Text</Tag>;
	};

	return <>{createDPC()}</>;
	// this.DPSText = this.gameScene.add.dom(
	//   AlignTool.getXfromScreenWidth(this.gameScene, 0.12),
	//   AlignTool.getYfromScreenHeight(
	//     this.gameScene,
	//     BottomMenuManager.bottomMenuStartY - 0.175
	//   ),
	//   StatsText(Player.clickDamage)
	// );

	// const img = this.gameScene.add.image(
	//   AlignTool.getXfromScreenWidth(this.gameScene, 0.05),
	//   AlignTool.getYfromScreenHeight(
	//     this.gameScene,
	//     BottomMenuManager.bottomMenuStartY - 0.181
	//   ),
	//   TextureKeys.IC_PICKAXE.key,
	//   TextureKeys.IC_PICKAXE.frame[0]
	// );
	// AlignTool.scaleToScreenWidth(this.gameScene, img, 0.08);

	// listen to game events:
	// this.gameScene.events.on(GameEvents.OnUpgradeDone, this.updateDPSUI, this);

	//   constructor(scene: Phaser.Scene) {
	//     this.gameScene = scene;
	//     this.createDPSUI();
	//   }
};
