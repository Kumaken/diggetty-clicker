import React, { useContext } from 'react';
import { RootStoreContext } from 'index';

import Button from 'react-bulma-components/lib/components/button';
import Image from 'react-bulma-components/lib/components/image';
import { IItemData } from 'phaser/interface/IItemData';

export const InventoryEntry = (id: number, itemData: IItemData) => {
	const store = useContext(RootStoreContext);

	const issueOpenModal = (id: number) => {
		store.gameStore?.showItem(id);
	};

	return (
		<Button key={id} className="column is-2 is-dark inventory-tile" onClick={() => issueOpenModal(id)}>
			<Image className="item" src={itemData.texturePath} />
		</Button>
	);
};
