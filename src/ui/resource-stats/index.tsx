import React from 'react';
import Heading from 'react-bulma-components/lib/components/heading';
import MoneyText from './MoneyText';
import DepthText from './DepthText';
import './resource-text.scss';
import { useContext } from 'react';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react/dist';

const ResourceStats = () => {
	const store = useContext(RootStoreContext);

	return (
		<>
			<Heading className="text-gray text-yellow-outline silk-screen-A is-centered" size={1}>
				{MoneyText(store.gameStore?.money)}
			</Heading>
			<Heading className="text-gray text-yellow-outline silk-screen-A is-centered">
				{DepthText(store.gameStore?.depth)}
			</Heading>
		</>
	);
};

export default observer(ResourceStats);
