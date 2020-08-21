import React from 'react';
import { observer } from 'mobx-react';
import LocalStorageKeys from 'config/LocalStorageKeys';

const MoneyText = (value: number) => {
	const currency = localStorage.getKey(LocalStorageKeys.Currency);

	return (
		<>
			{value}
			{currency}
		</>
	);
};

export default observer(MoneyText);
