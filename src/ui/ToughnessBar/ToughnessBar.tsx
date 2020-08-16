import React, { useState, useContext } from 'react';
import Progress from 'react-bulma-components/lib/components/progress';
import { RootStoreContext } from '../../';
import { observer } from 'mobx-react';
import './ToughnessBar.css';

const ToughnessBar = () => {
	const store = useContext(RootStoreContext);
	// const [name, setName] = useState('Loading...');
	// const [value, setValue] = useState(0);
	// const [maxToughness, setMaxToughness] = useState(1);

	return (
		<div className="health-bar">
			{console.log(store.gameStore)}
			<span className="platform-name">{store.gameStore?.topPlatformName}</span>
			<span className="platform-toughness">{store.gameStore?.topPlatformToughness}</span>
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
