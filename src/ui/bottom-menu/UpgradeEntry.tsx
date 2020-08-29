import React, { useState, useContext } from 'react';
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
import './TabEntry.scss';
import { observer } from 'mobx-react';
import { RootStoreContext } from 'index';

interface IUpgradeEntryParam {
	_key: string;
	upgradeData: IUpgradeDatum;
}

const UpgradeEntry = (props: IUpgradeEntryParam) => {
	const store = useContext(RootStoreContext);
	const [isUpgrading, setIsUpgrading] = useState(false);

	const issueUpgradeLevelUp = (key: string) => {
		setIsUpgrading(true);
		const game = getGame();
		game.events.once(
			GameEvents.OnUpgradeDone,
			() => {
				setIsUpgrading(false);
			},
			this
		);
		game.events.emit(GameEvents.OnUpgradeIssued, key);
	};

	return (
		<Card key={props._key} className="tab-entry-cards">
			<Card.Content className="tab-entry-content">
				<Media className="tab-entry-img-container">
					<Media.Item renderAs="figure">
						<Image rounded size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
						<Image className="is-overlay" rounded size={64} alt="64x64" src={props.upgradeData.img} />
					</Media.Item>
				</Media>
				<Heading className="text-yellow-outline text-gray shpinscher-regular is-centered" size={4}>
					{props.upgradeData.name}
				</Heading>
				<Heading className="silk-screen-A level-text is-centered" subtitle size={5}>
					Lvl.{store.gameStore.upgradeProgresses[props._key].level}
				</Heading>
				<Heading italic className="effect-text text-white is-centered " subtitle size={6}>
					{props.upgradeData.desc}
				</Heading>
				<Box className="desc-box text-yellow">
					<Content>{props.upgradeData.effectDesc}</Content>
				</Box>
			</Card.Content>
			<Columns className="tab-entry-action">
				<Columns.Column className="is-8">
					<Button
						color="warning"
						className={`button-text text-black `}
						rounded
						loading={isUpgrading ? true : false}
						onClick={() => issueUpgradeLevelUp(props._key)}
					>
						UPGRADE
					</Button>
				</Columns.Column>
				<Columns.Column className="is-4 is-flex">
					<Heading
						className="is-centered silk-screen-A tab-entry-cost text-yellow-outline text-gray "
						size={4}
					>
						<MoneyText value={store.gameStore.upgradeProgresses[props._key].currprice} />
					</Heading>
				</Columns.Column>
			</Columns>
		</Card>
	);
};

export default observer(UpgradeEntry);
