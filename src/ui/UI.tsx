import React, { useContext } from 'react';
import PlayerStats from './PlayerStats/PlayerStats';
import './UI.css';
import ToughnessBar from './ToughnessBar/ToughnessBar';
import { ResourceStats } from './ResourceStats';
import { BottomMenu } from './BottomMenu/BottomMenu';

import Notification from 'react-bulma-components/lib/components/notification';
import Button from 'react-bulma-components/lib/components/button';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react';
import { CSSTransition } from 'react-transition-group';

const UI = () => {
	const store = useContext(RootStoreContext);

	return (
		<div className="UI">
			<PlayerStats></PlayerStats>
			<ToughnessBar></ToughnessBar>
			<ResourceStats></ResourceStats>
			<BottomMenu></BottomMenu>
			<CSSTransition
				in={store.gameStore?.insufficientMoneyNotif}
				timeout={{ enter: 300, exit: 400 }}
				classNames="alert"
			>
				<>
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
				</>
			</CSSTransition>
		</div>
	);
};

export default observer(UI);
