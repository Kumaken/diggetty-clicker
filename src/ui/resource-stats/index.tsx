import React, { useContext } from 'react';
import Heading from 'react-bulma-components/lib/components/heading';
import MoneyText from './MoneyText';
import DepthText from './DepthText';
import './resource-text.scss';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react/dist';

const ResourceStats = () => {
	const store = useContext(RootStoreContext);

	return (
		<>
			<Heading className="text-gray text-yellow-outline silk-screen-A is-centered is-size-4-mobile" size={1}>
				<MoneyText value={store.gameStore?.money} />
			</Heading>
			<Heading className="text-gray text-yellow-outline silk-screen-A is-centered is-size-4-mobile">
				<DepthText value={store.gameStore?.depth} />
			</Heading>
		</>
	);
};

export default observer(ResourceStats);
