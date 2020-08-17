import React, { useContext } from 'react';
import { PlayerStats } from './PlayerStats/PlayerStats';
import './UI.css';
import ToughnessBar from './ToughnessBar/ToughnessBar';
import { ResourceStats } from './ResourceStats';
import { BottomMenu } from './BottomMenu/BottomMenu';

import Notification from 'react-bulma-components/lib/components/notification';
import Button from 'react-bulma-components/lib/components/button';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react';

const UI = () => {
	const store = useContext(RootStoreContext);

	return (
		<div className="UI">
			<PlayerStats></PlayerStats>
			<ToughnessBar></ToughnessBar>
			<ResourceStats></ResourceStats>
			<BottomMenu></BottomMenu>
			{store.gameStore?.insufficientMoneyNotif && (
				<Notification color="danger">
					Insufficient Money!
					<Button
						remove
						onClick={() => {
							store.gameStore?.setInsufficientMoneyNotif(false);
						}}
					/>
				</Notification>
			)}
		</div>
	);
};

export default observer(UI);
