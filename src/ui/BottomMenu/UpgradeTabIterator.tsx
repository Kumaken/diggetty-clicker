import { UpgradeData } from '../../phaser/Data/UpgradeData';
import { UpgradeEntry } from './UpgradeEntry';
import { IUpgradeData, IUpgradeDatum } from '../../phaser/Interfaces/IUpgradeData';
import React, { useEffect, useState } from 'react';

export const UpgradeTabIterator = () => {
	const [upgradeProgress, setUpdateProgress] = useState({});

	useEffect(() => {
		const _upgradeProgress = {};
		for (let key in UpgradeData) {
			console.log(key);
			upgradeProgress[key] = 0;
		}
		setUpdateProgress(_upgradeProgress);
	}, []);

	const createUpgradeEntry = (key: string, upgradeData: IUpgradeDatum) => {
		return UpgradeEntry(key, upgradeData, 10);
	};

	const createUpgradeList = () => {
		const upgrades = [];
		for (let key in UpgradeData) {
			console.log(key);
			upgrades.push(createUpgradeEntry(key, UpgradeData[key]));
		}
		return upgrades;
	};

	return <>{createUpgradeList()}</>;
};
