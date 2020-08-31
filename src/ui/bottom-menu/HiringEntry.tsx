import React, { useState, useCallback, useContext } from 'react';
import { IHiringDatum } from '../../phaser/interface/IHiringData';
import GameEvents from '../../phaser/config/GameEvents';
import Card from 'react-bulma-components/lib/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Columns from 'react-bulma-components/lib/components/columns';
import Button from 'react-bulma-components/lib/components/button';
import { getGame } from 'phaser/Game';
import MoneyText from 'ui/resource-stats/MoneyText';
import './TabEntry.scss';
import './HiringEntry.scss';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react';
import { HiringData } from 'data/HiringData';

interface IHiringEntryParam {
	_key: string;
	hiringData: IHiringDatum;
}

const HiringEntry = (props: IHiringEntryParam) => {
	const store = useContext(RootStoreContext);
	const [isUpgrading, setIsUpgrading] = useState(false);

	const issueHiringLevelUp = (_key: string) => {
		setIsUpgrading(true);
		const game = getGame();
		game.events.once(
			GameEvents.OnHiringDone,
			() => {
				setIsUpgrading(false);
			},
			this
		);
		game.events.emit(GameEvents.OnHiringIssued, _key);
	};

	const countNextDPSIncrease = useCallback(() => {
		if (store.gameStore.hiringProgresses[props._key].level <= 0) return HiringData[props._key].baseDMG;
		if (props.hiringData.dmgGrowthType === 'linear')
			return store.gameStore.hiringProgresses[props._key].currdps + props.hiringData.dmgUpRatio;
		// exponential
		else
			return (
				store.gameStore.hiringProgresses[props._key].currdps +
				store.gameStore.hiringProgresses[props._key].currdps * props.hiringData.dmgUpRatio
			);
	}, [props.hiringData.dmgGrowthType, props.hiringData.dmgUpRatio, props._key, store.gameStore.hiringProgresses]);

	return (
		<Card _key={props._key} className="tab-entry-cards">
			<Card.Content className="tab-entry-content">
				<Media className="tab-entry-img-container">
					<Media.Item renderAs="figure">
						<Image rounded size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
						<Image className="is-overlay" rounded size={64} alt="64x64" src={props.hiringData.img} />
					</Media.Item>
				</Media>
				<Heading className="text-yellow-outline text-gray shpinscher-regular is-centered" size={4}>
					{props.hiringData.name}
				</Heading>
				<Heading className="silk-screen-A level-text is-centered" subtitle size={5}>
					Lvl.{store.gameStore.hiringProgresses[props._key].level}{' '}
					<span className="silk-screen-A no-wrap text-yellow-outline">{'>>'}</span>{' '}
					<span className="silk-screen-A no-wrap text-yellow-outline next-level-text">
						{store.gameStore.hiringProgresses[props._key].level + 1}
					</span>
				</Heading>
				<Heading italic className="effect-text text-white is-centered " subtitle size={6}>
					{props.hiringData.desc}
				</Heading>
				<Box className="desc-box text-yellow">
					<Heading className="silk-screen-A hiring-dps-text text-gray text-yellow-outline" subtitle size={4}>
						DPS
					</Heading>
					<Columns className="dps-columns">
						<Columns.Column className="is-4">
							<Heading className="silk-screen-A no-wrap" subtitle size={4}>
								{store.gameStore.hiringProgresses[props._key].currdps}
							</Heading>
						</Columns.Column>
						<Columns.Column className="is-4">
							<Heading className="silk-screen-A no-wrap text-yellow-outline" subtitle size={4}>
								{'>>'}
							</Heading>
						</Columns.Column>
						<Columns.Column className="is-4">
							<Heading className="silk-screen-A no-wrap text-yellow-outline" subtitle size={2}>
								{countNextDPSIncrease()}
							</Heading>
						</Columns.Column>
					</Columns>
				</Box>
			</Card.Content>
			<Columns className="tab-entry-action">
				<Columns.Column className="is-8">
					<Button
						color="warning"
						className={`button-text text-black `}
						rounded
						loading={isUpgrading ? true : false}
						onClick={() => issueHiringLevelUp(props._key)}
					>
						{store.gameStore.hiringProgresses[props._key].level <= 0 ? 'HIRE' : 'LEVEL UP'}
					</Button>
				</Columns.Column>
				<Columns.Column className="is-4 is-flex">
					<Heading
						className="is-centered silk-screen-A tab-entry-cost text-yellow-outline text-gray "
						size={4}
					>
						<MoneyText value={store.gameStore.hiringProgresses[props._key].currprice} />
					</Heading>
				</Columns.Column>
			</Columns>
		</Card>
	);
};

export default observer(HiringEntry);
