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
import { observer } from 'mobx-react';
import { RootStoreContext } from 'index';
import './TabEntry.scss';
import './UpgradeEntry.scss';
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
						<Image
							className="img-icon"
							rounded
							size={64}
							alt="64x64"
							src="http://bulma.io/images/placeholders/128x128.png"
						/>
						<Image
							className="img-icon is-overlay"
							rounded
							size={64}
							alt="64x64"
							src={props.upgradeData.img}
						/>
					</Media.Item>
				</Media>
				<Heading
					className="text-yellow-outline text-gray shpinscher-regular is-centered is-size-5-mobile"
					size={4}
				>
					{props.upgradeData.name}
				</Heading>
				<Heading className="silk-screen-A level-text is-centered is-size-6-mobile" subtitle size={5}>
					Lvl. {store.gameStore.upgradeProgresses[props._key].level}{' '}
					<span className="silk-screen-A no-wrap text-yellow-outline">{'>>'}</span>{' '}
					<span className="silk-screen-A no-wrap text-yellow-outline next-level-text">
						{store.gameStore.upgradeProgresses[props._key].level + 1}
					</span>
				</Heading>
				<Heading italic className="effect-text text-white is-centered is-size-7-mobile" subtitle size={6}>
					{props.upgradeData.desc}
				</Heading>
				<Box className="desc-box text-yellow">
					<Content className="upgrade-desc-text">{props.upgradeData.effectDesc}</Content>
				</Box>
			</Card.Content>
			<Columns className="tab-entry-action is-mobile">
				<Columns.Column className="is-6">
					<Button
						color="warning"
						className={`button-text text-black `}
						rounded
						loading={isUpgrading ? true : false}
						onClick={() => issueUpgradeLevelUp(props._key)}
					>
						{store.gameStore.upgradeProgresses[props._key].level <= 0 ? 'BUY' : 'LEVEL UP'}
					</Button>
				</Columns.Column>
				<Columns.Column className="is-6 is-flex">
					<Heading
						className="is-centered silk-screen-A tab-entry-cost text-yellow-outline text-gray is-size-5-mobile"
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
