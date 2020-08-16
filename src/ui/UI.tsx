import React from 'react';
import { PlayerStats } from './PlayerStats/PlayerStats';
import './UI.css';
import ToughnessBar from './ToughnessBar/ToughnessBar';
import { ResourceStats } from './ResourceStats';
import { BottomMenu } from './BottomMenu/BottomMenu';

export const UI = () => {
	return (
		<div className="UI">
			<PlayerStats></PlayerStats>
			<ToughnessBar></ToughnessBar>
			<ResourceStats></ResourceStats>
			<BottomMenu></BottomMenu>
		</div>
	);
};
