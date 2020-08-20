import React from 'react';
import PlayerStats from './player-stats/PlayerStats';
import './UI.scss';
import ToughnessBar from './toughness-bar/ToughnessBar';
import { ResourceStats } from './resource-stats';
import { BottomMenu } from './bottom-menu/BottomMenu';
import { observer } from 'mobx-react';
import InsufficientMoneyAlert from './alert/InsufficientMoney';

const UI = () => {
	return (
		<div className="UI">
			<PlayerStats></PlayerStats>
			<ToughnessBar></ToughnessBar>
			<ResourceStats></ResourceStats>
			<BottomMenu></BottomMenu>
			<InsufficientMoneyAlert></InsufficientMoneyAlert>
		</div>
	);
};

export default observer(UI);
