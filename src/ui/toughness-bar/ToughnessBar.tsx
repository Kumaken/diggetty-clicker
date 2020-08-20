import React, { useContext } from 'react';
import Progress from 'react-bulma-components/lib/components/progress';
import { RootStoreContext } from '../..';
import { observer } from 'mobx-react';
import './ToughnessBar.scss';

const ToughnessBar = () => {
	const store = useContext(RootStoreContext);

	return (
		<div className="health-bar">
			<span className="platform-name shpinscher-regular">{store.gameStore?.topPlatformName}</span>
			<span className="platform-toughness silk-screen-A">{store.gameStore?.topPlatformToughness}</span>
			<Progress
				max={store.gameStore?.topPlatformMaxToughness}
				value={store.gameStore?.topPlatformToughness}
				color="danger"
				size="small"
			/>
		</div>
	);
};

export default observer(ToughnessBar);
