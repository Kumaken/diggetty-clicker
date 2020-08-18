import React, { useContext } from 'react';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react';
import Tag from 'react-bulma-components/lib/components/tag';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Heading from 'react-bulma-components/lib/components/heading';
import './PlayerStats.css';
import { IconData } from 'phaser/Data/IconData';

const PlayerStats = () => {
	const store = useContext(RootStoreContext);
	// const gameScene: Phaser.Scene;

	//   const updateDPC = () => {
	//     this.DPSText.setElement(StatsText(Player.clickDamage));
	//   }

	const createDPC = () => {
		return (
			<>
				<Media className="stats-pic">
					<Media.Item renderAs="figure">
						<Image
							rounded
							size={48}
							alt="dpc icon pic bg"
							src="http://bulma.io/images/placeholders/16x16.png"
						/>
						<Image overlay rounded size={48} alt="dpc icon pic" src={IconData.DPC} />
					</Media.Item>
				</Media>
				<Tag className="dpc-tag" color="dark">
					<p className="text-yellow silk-screen-A">Damage Per Click</p>
				</Tag>
				<Heading className="stats-text text-black silk-screen-A" size={1}>
					{store.gameStore?.playerDPC}
				</Heading>
			</>
		);
	};

	return (
		<div className="player-stats">
			<div className="player-stats-row">{createDPC()}</div>
		</div>
	);
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

export default observer(PlayerStats);
