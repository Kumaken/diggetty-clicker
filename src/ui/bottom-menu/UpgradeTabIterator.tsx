import { UpgradeData } from '../../data/UpgradeData';
import UpgradeEntry from './UpgradeEntry';
import { IUpgradeDatum } from '../../phaser/interface/IUpgradeData';
import React from 'react';
const UpgradeTabIterator = () => {
	// const store = useContext(RootStoreContext);

	// const calculateCurrentCost = (level: number, upgradeDatum: IUpgradeDatum) => {
	// 	return upgradeDatum.baseCost * level * upgradeDatum.costUpRatio;
	// };

	const createUpgradeEntry = (key: string, upgradeDatum: IUpgradeDatum) => {
		return <UpgradeEntry key={key} _key={key} upgradeData={upgradeDatum} />;
	};

	const createUpgradeList = () => {
		const upgrades = [];
		for (let key in UpgradeData) {
			upgrades.push(createUpgradeEntry(key, UpgradeData[key]));
		}
		return upgrades;
	};

	return <>{createUpgradeList()}</>;
};

export default UpgradeTabIterator;
