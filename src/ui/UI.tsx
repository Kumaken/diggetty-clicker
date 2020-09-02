import React, { useEffect, useState, useContext } from 'react';
import { RootStoreContext } from 'index';
import PlayerStats from './player-stats/PlayerStats';
import './UI.scss';
import './modal/ItemDescModal.scss';
import ToughnessBar from './toughness-bar/ToughnessBar';
import ResourceStats from './resource-stats';
import { BottomMenu } from './bottom-menu/BottomMenu';
import { observer } from 'mobx-react';

// data jsons:
import UITextData from '../data/json/UITextData.json';
import Alerts from './alert';
import Modal from 'react-bulma-components/lib/components/modal';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';

const UI = () => {
	const store = useContext(RootStoreContext);
	const [isConfigLoaded, setIsConfigLoaded] = useState(false);

	const saveToLocalStorage = (data: {}) => {
		Object.keys(data).forEach((key: string) => {
			localStorage.setItem(key, data[key]);
		});
	};

	// setup configurations:
	useEffect(() => {
		if (localStorage.getItem('isConfigured') === 'true') {
			setIsConfigLoaded(true);
			return;
		}
		saveToLocalStorage(UITextData);

		localStorage.setItem('isConfigured', 'true');
		setIsConfigLoaded(true);
	}, []);

	return (
		<div className="UI noselect">
			{isConfigLoaded ? (
				<>
					{/* <ItemDescModal></ItemDescModal> */}
					<PlayerStats></PlayerStats>
					<ToughnessBar></ToughnessBar>
					<ResourceStats></ResourceStats>
					<BottomMenu></BottomMenu>
					<Alerts></Alerts>
					<Modal
						show={store.gameStore?.itemShown}
						onClose={() => {
							store.gameStore?.hideItem();
						}}
					>
						<Modal.Card>
							<Modal.Card.Head
								onClose={() => {
									store.gameStore?.hideItem();
								}}
							>
								<Modal.Card.Title>
									{store.gameStore?.inventory[store.gameStore?.currentItemIndex]?.itemData.name}
								</Modal.Card.Title>
							</Modal.Card.Head>
							<Modal.Card.Body>
								<Media>
									<Media.Item renderAs="figure" position="left">
										<Image
											className="item-pic"
											src={
												store.gameStore?.inventory[store.gameStore?.currentItemIndex]?.itemData
													.texturePath
											}
										/>
									</Media.Item>
									<Media.Item>
										<Content className="item-details">
											<p>
												<span>
													<strong>
														{
															store.gameStore?.inventory[
																store.gameStore?.currentItemIndex
															]?.itemData.attributes
														}
													</strong>
												</span>
												<span>
													<small>
														for{' '}
														{
															store.gameStore?.inventory[
																store.gameStore?.currentItemIndex
															]?.itemData.duration
														}{' '}
														minutes
													</small>
												</span>
												<span>
													{
														store.gameStore?.inventory[store.gameStore?.currentItemIndex]
															?.itemData.description
													}
												</span>
											</p>
										</Content>
									</Media.Item>
								</Media>
							</Modal.Card.Body>
							<Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
								{store.gameStore?.buffDuration === 0 ? (
									<Button
										className="is-primary"
										onClick={() => {
											store.gameStore?.useItem();
										}}
									>
										Use Item
									</Button>
								) : (
									<Content className="item-details">
										<span>A buff is active. Can't activate another item.</span>
									</Content>
								)}
							</Modal.Card.Foot>
						</Modal.Card>
					</Modal>
				</>
			) : (
				<div className="pageloader is-active is-bottom-to-top">
					<span className="title">Loading Configurations...</span>
				</div>
			)}
		</div>
	);
};

export default observer(UI);
