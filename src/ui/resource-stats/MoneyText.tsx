import React from 'react';
import LocalStorageKeys from 'config/LocalStorageKeys';

interface IMoneyProps {
	value: number;
}
const MoneyText = (props: IMoneyProps) => {
	const currency = localStorage.getItem(LocalStorageKeys.Currency);

	return (
		<>
			{props.value}
			{currency}
		</>
	);
};

export default MoneyText;
