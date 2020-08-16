import React from 'react';
import { PlayerStats } from './PlayerStats/PlayerStats';
import './UI.css';
import ToughnessBar from './ToughnessBar/ToughnessBar';

export const UI = () => {
	return (
		<div className="UI">
			<PlayerStats></PlayerStats>
			<ToughnessBar></ToughnessBar>
		</div>
	);
};
