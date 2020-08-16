import React from 'react';
import { PlayerStats } from './PlayerStats/PlayerStats';
import './UI.css';
import ToughnessBar from './ToughnessBar/ToughnessBar';
import MoneyText from './ResourceStats/MoneyText';
import DepthText from './ResourceStats/DepthText';

export const UI = () => {
	return (
		<div className="UI">
			<PlayerStats></PlayerStats>
			<ToughnessBar></ToughnessBar>
			<MoneyText></MoneyText>
			<DepthText></DepthText>
		</div>
	);
};
