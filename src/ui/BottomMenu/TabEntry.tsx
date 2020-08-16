import React from 'react';
import './TabEntry.scss';
import { IUpgradeData } from '../../phaser/Interfaces/IUpgradeData';
import GameEvents from '../../phaser/Config/GameEvents';

import Card from 'react-bulma-components/lib/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';

// const issueUpgradeLevelUp = (scene: Phaser.Scene, key: string) => {
// 	scene.events.emit(GameEvents.OnUpgradeIssued, key);
// };

export const TabEntry = (key: string, upgradeData: IUpgradeData, cur_cost: number, scene: Phaser.Scene) => (
	<Card>
		<Card.Image size="4by3" src="http://bulma.io/images/placeholders/1280x960.png" />
		<Card.Content>
			<Media>
				<Media.Item renderAs="figure" position="left">
					<Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
				</Media.Item>
				<Media.Item>
					<Heading size={4}>John Smith</Heading>
					<Heading subtitle size={6}>
						@johnsmith
					</Heading>
				</Media.Item>
			</Media>
			<Content>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a>@bulmaio</a>.
				<a href="#1">#css</a> <a href="#2">#responsive</a>
				<br />
				<time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
			</Content>
		</Card.Content>
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
