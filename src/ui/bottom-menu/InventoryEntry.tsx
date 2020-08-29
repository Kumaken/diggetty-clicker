import React, { useContext } from 'react';
import { RootStoreContext } from 'index';
import './InventoryEntry.scss';

import Button from 'react-bulma-components/lib/components/button';
import Image from 'react-bulma-components/lib/components/image';
import { IItemData } from 'phaser/interface/IItemData';

export const InventoryEntry = (id: number, itemData: IItemData) => {
	const store = useContext(RootStoreContext);

	const issueUseItem = (id: number) => {
		store.gameStore?.useItem(id);
	};

	return (
		<Button key={id} className="column is-2 is-dark inventory-tile" id={id} onClick={() => issueUseItem(id)}>
			<Image className="item" src={itemData.texturePath} />
		</Button>
	);
};
