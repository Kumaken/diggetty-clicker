import React from 'react';
import MoneyText from './MoneyText';
import DepthText from './DepthText';
import './resource-text.scss';

export const ResourceStats = () => {
	return (
		<>
			<MoneyText></MoneyText>
			<DepthText></DepthText>
		</>
	);
};
