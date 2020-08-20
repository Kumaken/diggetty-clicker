import React, { useContext } from 'react';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react';
import Tag from 'react-bulma-components/lib/components/tag';
import Media from 'ui/bottom-menu/node_modules/react-bulma-components/lib/components/media';
import Image from 'ui/bottom-menu/node_modules/react-bulma-components/lib/components/image';
import Heading from 'ui/bottom-menu/node_modules/react-bulma-components/lib/components/heading';
import './PlayerStats.scss';
import { IconData } from 'phaser/data/IconData';
import { DPSStatsText } from 'phaser/data/UITextData';

const PlayerStats = () => {
	const store = useContext(RootStoreContext);

	const StatsComponent = (icon: string, name: string, value: number) => {
		return (
			<div className="stats-component">
				<Media className="stats-pic">
					<Media.Item renderAs="figure">
						<Image
							rounded
							size={48}
							alt="dpc icon pic bg"
							src="http://bulma.io/images/placeholders/16x16.png"
						/>
						<Image overlay rounded size={48} alt="dpc icon pic" src={icon} />
					</Media.Item>
				</Media>
				<Tag className="dpc-tag" color="dark" rounded>
					<p className="text-yellow silk-screen-A">{name}</p>
				</Tag>
				<Heading className="stats-text text-gray text-yellow-outline silk-screen-A" size={1}>
					{value}
				</Heading>
			</div>
		);
	};

	return (
		<div className="player-stats">
			<div className="player-stats-row">
				{StatsComponent(IconData.DPC, DPSStatsText, store.gameStore?.playerDPC)}
				{StatsComponent(IconData.DPS, DPSStatsText, store.gameStore?.playerDPS)}
			</div>
		</div>
	);
};

export default observer(PlayerStats);
