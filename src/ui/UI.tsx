import React, { useEffect, useState } from 'react';
import PlayerStats from './player-stats/PlayerStats';
import './UI.scss';
import ToughnessBar from './toughness-bar/ToughnessBar';
import ResourceStats from './resource-stats';
import { BottomMenu } from './bottom-menu/BottomMenu';
import { observer } from 'mobx-react';
import InsufficientMoneyAlert from './alert/InsufficientMoney';

// data jsons:
import UITextData from '../data/json/UITextData.json';

const UI = () => {
	const [isConfigLoaded, setIsConfigLoaded] = useState(false);

	const saveToLocalStorage = (data: {}) => {
		Object.keys(data).forEach((key: string) => {
			localStorage.setItem(key, data[key]);
		});
	};

	// setup configurations:
	useEffect(() => {
		if (localStorage.getItem('isConfigured')) return;

		saveToLocalStorage(UITextData);

		// localStorage.setItem('isConfigured', 'true');
		setIsConfigLoaded(true);
	}, []);

	return (
		<div className="UI">
			{isConfigLoaded ? (
				<>
					<PlayerStats></PlayerStats>
					<ToughnessBar></ToughnessBar>
					<ResourceStats></ResourceStats>
					<BottomMenu></BottomMenu>
					<InsufficientMoneyAlert></InsufficientMoneyAlert>
				</>
			) : null}
		</div>
	);
};

export default observer(UI);
