import React from 'react';
import PlayerStats from './PlayerStats/PlayerStats';
import './UI.scss';
import ToughnessBar from './ToughnessBar/ToughnessBar';
import { ResourceStats } from './ResourceStats';
import { BottomMenu } from './BottomMenu/BottomMenu';
import { observer } from 'mobx-react';
import InsufficientMoneyAlert from './Alerts/InsufficientMoney';

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
