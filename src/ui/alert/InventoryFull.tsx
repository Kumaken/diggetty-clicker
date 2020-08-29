import React, { useContext } from 'react';
import { RootStoreContext } from 'index';
import { CSSTransition } from 'react-transition-group';
import Notification from 'react-bulma-components/lib/components/notification';
import Button from 'react-bulma-components/lib/components/button';
import { observer } from 'mobx-react';
import Algorithm from 'phaser/util/Algorithm';

const InventoryFullAlert = () => {
	const store = useContext(RootStoreContext);
	return (
		<CSSTransition
			in={store.gameStore?.inventoryFullNotif}
			timeout={{ enter: 300, exit: 400 }}
			classNames="alert"
			unmountOnExit
			onEnter={async () => {
				await Algorithm.delay(2000);
				store.gameStore?.setInventoryFullNotif(false);
			}}
		>
			<>
				<Notification color="danger">
					Inventory Full! Can't acquire more item.
					<Button
						remove
						onClick={() => {
                            store.gameStore?.setInventoryFullNotif(false);
						}}
					/>
				</Notification>
			</>
		</CSSTransition>
	);
};

export default observer(InventoryFullAlert);
