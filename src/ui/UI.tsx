import React, { useEffect, useState } from 'react';
import PlayerStats from './player-stats/PlayerStats';
import './UI.scss';
import ToughnessBar from './toughness-bar/ToughnessBar';
import ResourceStats from './resource-stats';
import { BottomMenu } from './bottom-menu/BottomMenu';
import { observer } from 'mobx-react';

// data jsons:
import UITextData from '../data/json/UITextData.json';
import Alerts from './alert';

const UI = () => {
	const [isConfigLoaded, setIsConfigLoaded] = useState(false);

	const saveToLocalStorage = (data: {}) => {
		Object.keys(data).forEach((key: string) => {
			localStorage.setItem(key, data[key]);
		});
	};

	// setup configurations:
	useEffect(() => {
		if (localStorage.getItem('isConfigured') === 'true') {
			setIsConfigLoaded(true);
			return;
		}
		saveToLocalStorage(UITextData);

		localStorage.setItem('isConfigured', 'true');
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
					<Alerts></Alerts>
				</>
			) : null}
		</div>
	);
};

export default observer(UI);
