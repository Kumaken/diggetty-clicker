import React, { /* useEffect */ useState, useContext } from 'react';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react';
import { InventoryEntry } from './InventoryEntry';
import { IItemData } from 'phaser/interface/IItemData';
import Columns from 'react-bulma-components/lib/components/columns';
import { IItem } from 'phaser/interface/IItem';

const InventoryIterator = () => {
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


	const createInventoryEntry = (id: number, itemData: IItemData) => {
        //console.log(store.gameStore?.upgradeProgresses);
        // return ItemModal();
		return InventoryEntry(id, itemData);
	};

	const createInventory = () => {
		const inventory = store.gameStore?.inventory as IItem[];
		const jsxElem = [];

		inventory.forEach((item,index) => {
			console.log(index,item.itemData.name)
			jsxElem.push(createInventoryEntry(index, item.itemData));
		});
		return jsxElem;
	};

	return (
		<>
			<Columns className="is-multiline is-mobile inventory">
				{createInventory()}
			</Columns>
		</>
	);
};

export default observer(InventoryIterator);
