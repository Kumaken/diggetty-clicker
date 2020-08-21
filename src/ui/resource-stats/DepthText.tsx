import React from 'react';
import Heading from 'react-bulma-components/lib/components/heading';
import { observer } from 'mobx-react';
import LocalStorageKeys from 'config/LocalStorageKeys';

const DepthText = (value: number) => {
	const depthMetric = localStorage.getKey(LocalStorageKeys.DepthMetric);

	return (
		<>
			{value} {depthMetric}
		</>
	);
};

export default observer(DepthText);
