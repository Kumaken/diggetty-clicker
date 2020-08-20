import React, { useContext } from 'react';
import Heading from 'react-bulma-components/lib/components/heading';
import { RootStoreContext } from '../..';
import { observer } from 'mobx-react';

const MoneyText = () => {
	const store = useContext(RootStoreContext);

	return (
		<Heading className="text-gray text-yellow-outline silk-screen-A is-centered" size={1}>
			{store.gameStore?.money}$
		</Heading>
	);
};

export default observer(MoneyText);
