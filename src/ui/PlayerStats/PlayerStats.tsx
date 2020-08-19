import React, { useContext } from 'react';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react';
import Tag from 'react-bulma-components/lib/components/tag';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Heading from 'react-bulma-components/lib/components/heading';
import './PlayerStats.scss';
import { IconData } from 'phaser/Data/IconData';

const PlayerStats = () => {
	const store = useContext(RootStoreContext);

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
};

export default observer(PlayerStats);
