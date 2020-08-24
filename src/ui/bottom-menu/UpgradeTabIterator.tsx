import { UpgradeData } from '../../data/UpgradeData';
import { UpgradeEntry } from './UpgradeEntry';
import { IUpgradeDatum } from '../../phaser/interface/IUpgradeData';
import React, { /* useEffect, useState, */ useContext } from 'react';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react';

const UpgradeTabIterator = () => {
	// const [upgradeProgress, setUpdateProgress] = useState({});
	const store = useContext(RootStoreContext);

	// useEffect(() => {
	// 	const _upgradeProgress = {};
	// 	for (let key in UpgradeData) {
	// 		console.log(key);
	// 		_upgradeProgress[key] = 0;
	// 	}
	// 	setUpdateProgress(_upgradeProgress);
	// }, []);

	const calculateCurrentCost = (level: number, upgradeDatum: IUpgradeDatum) => {
		return upgradeDatum.baseCost * level * upgradeDatum.costUpRatio;
	};

	const createUpgradeEntry = (key: string, upgradeDatum: IUpgradeDatum) => {
		//console.log(store.gameStore?.upgradeProgresses);
		return UpgradeEntry(
			key,
			upgradeDatum,
			calculateCurrentCost(store.gameStore?.upgradeProgresses[key].level, upgradeDatum),
			store.gameStore?.upgradeProgresses[key].level
		);
	};

	const createUpgradeList = () => {
		const upgrades = [];
		for (let key in UpgradeData) {
			// console.log(key);
			upgrades.push(createUpgradeEntry(key, UpgradeData[key]));
		}
		return upgrades;
	};

	return <>{createUpgradeList()}</>;
};

export default observer(UpgradeTabIterator);
