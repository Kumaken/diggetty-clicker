import React from 'react';
import './UpgradeEntry.scss';
import { IUpgradeData, IUpgradeDatum } from '../../phaser/Interfaces/IUpgradeData';
import GameEvents from '../../phaser/Config/GameEvents';

import Card from 'react-bulma-components/lib/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Columns from 'react-bulma-components/lib/components/columns';
// const issueUpgradeLevelUp = (scene: Phaser.Scene, key: string) => {
// 	scene.events.emit(GameEvents.OnUpgradeIssued, key);
// };

export const UpgradeEntry = (key: string, upgradeData: IUpgradeDatum, cur_cost: number) => (
	<Card className="upgrade-cards">
		<Card.Content className="upgrade-content">
			<Media className="upgrade-img-container">
				<Media.Item renderAs="figure">
					<Image rounded size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
				</Media.Item>
			</Media>
			<Heading className="is-centered" size={5}>
				{upgradeData.name}
			</Heading>
			<Heading className="level-text is-centered" subtitle size={6}>
				Lvl.{upgradeData.baseDMG}
			</Heading>
			<Box className="desc-box">
				<Heading italic className="effect-text text-gray is-centered" subtitle size={6}>
					"{upgradeData.desc}"
				</Heading>
				<Content>{upgradeData.effectDesc}</Content>
			</Box>
		</Card.Content>
		<Columns>
			<Columns.Column>
				<span>Yes</span>
			</Columns.Column>
			<Columns.Column>
				<span>No</span>
			</Columns.Column>
		</Columns>
		{/* <Card.Footer.Item renderAs="a" href="#Yes">
				Yes
			</Card.Footer.Item>
			<Card.Footer.Item renderAs="a" href="#No">
				No
			</Card.Footer.Item> */}
	</Card>
	// <div
	// 	key={key}
	// 	class="container is-marginless"
	// 	onClick={() => {
	// 		issueUpgradeLevelUp(scene, key);
	// 	}}
	// >
	// 	<div class="card is-horizontal tab-entry">
	// 		<div class="card-image align-both-center">
	// 			<figure class="image is-64x64">
	// 				<img
	// 					src="https://p1.hiclipart.com/preview/38/630/500/minecraft-diamond-pickaxe-minecraft-diamond-axe-png-clipart.jpg"
	// 					alt="Placeholder image"
	// 				/>
	// 			</figure>
	// 		</div>
	// 		<div class="card-stacked">
	// 			<div class="card-content is-paddingless">
	// 				<div class="media-content">
	// 					<p class="title is-4">{upgradeData.name}</p>
	// 					<p class="subtitle is-6">{cur_cost}</p>
	// 				</div>

	// 				<div class="content">
	// 					{upgradeData.desc} <a>@bulmaio</a>.<a href="#">#css</a> <a href="#">#responsive</a>
	// 					<br />
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// </div>
);
