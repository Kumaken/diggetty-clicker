import React from 'react';
import './UpgradeEntry.scss';
import { IUpgradeDatum } from '../../phaser/interface/IUpgradeData';
import GameEvents from '../../phaser/config/GameEvents';

import Card from 'react-bulma-components/lib/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Columns from 'react-bulma-components/lib/components/columns';
import Button from 'react-bulma-components/lib/components/button';
import { getGame } from 'phaser/Game';
import MoneyText from 'ui/resource-stats/MoneyText';

const issueUpgradeLevelUp = (key: string) => {
	const game = getGame();
	game.events.emit(GameEvents.OnUpgradeIssued, key);
};

export const UpgradeEntry = (key: string, upgradeData: IUpgradeDatum, cur_cost: number, cur_level: number) => (
	<Card key={key} className="upgrade-cards">
		<Card.Content className="upgrade-content">
			<Media className="upgrade-img-container">
				<Media.Item renderAs="figure">
					<Image rounded size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
					<Image className="is-overlay" rounded size={64} alt="64x64" src={upgradeData.img} />
				</Media.Item>
			</Media>
			<Heading className="text-yellow-outline text-gray shpinscher-regular is-centered" size={4}>
				{upgradeData.name}
			</Heading>
			<Heading className="silk-screen-A level-text is-centered" subtitle size={5}>
				Lvl.{cur_level}
			</Heading>
			<Heading italic className="effect-text text-white is-centered " subtitle size={6}>
				{upgradeData.desc}
			</Heading>
			<Box className="desc-box text-yellow">
				<Content>{upgradeData.effectDesc}</Content>
			</Box>
		</Card.Content>
		<Columns className="upgrade-action">
			<Columns.Column className="is-8">
				<Button color="warning" rounded onClick={() => issueUpgradeLevelUp(key)}>
					<Heading italic className="shpinscher-regular text-gray" subtitle size={4}>
						UPGRADE
					</Heading>
				</Button>
			</Columns.Column>
			<Columns.Column className="is-4 is-flex">
				<Heading className="is-centered silk-screen-A upgrade-cost text-yellow-outline text-gray" size={4}>
					<MoneyText value={cur_cost} />
				</Heading>
			</Columns.Column>
		</Columns>
	</Card>
);
