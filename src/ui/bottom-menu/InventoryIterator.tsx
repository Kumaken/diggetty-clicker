import React, { /* useEffect */ useState, useContext } from 'react';
import { observer } from 'mobx-react';
import { InventoryEntry } from './InventoryEntry';

const InventoryIterator = () => {
	// const [upgradeProgress, setUpdateProgress] = useState({});
	// const store = useContext(RootStoreContext);

	// useEffect(() => {
	// 	const _upgradeProgress = {};
	// 	for (let key in UpgradeData) {
	// 		console.log(key);
	// 		_upgradeProgress[key] = 0;
	// 	}
	// 	setUpdateProgress(_upgradeProgress);
    // }, []);


	const createInventoryEntry = () => {
        //console.log(store.gameStore?.upgradeProgresses);
        // return ItemModal();
		return InventoryEntry();
	};

	// const createUpgradeList = () => {
	// 	const upgrades = [];
	// 	for (let key in UpgradeData) {
	// 		// console.log(key);
	// 		upgrades.push(createUpgradeEntry(key, UpgradeData[key]));
	// 	}
	// 	return upgrades;
	// };

	return <>{createInventoryEntry()}</>;
};

export default observer(InventoryIterator);
