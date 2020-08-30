import React, { useEffect, useState } from 'react';
import PlayerStats from './player-stats/PlayerStats';
import './UI.scss';
import ToughnessBar from './toughness-bar/ToughnessBar';
import ResourceStats from './resource-stats';
import { BottomMenu } from './bottom-menu/BottomMenu';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

// data jsons:
import UITextData from '../data/json/UITextData.json';
import Alerts from './alert';
import Modal from 'react-bulma-components/lib/components/modal';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Button from 'react-bulma-components/lib/components/button';

const UI = () => {
	const [isConfigLoaded, setIsConfigLoaded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
					<Button onClick={() => {
						setIsModalOpen(true);
					}}>Open</Button>
					<PlayerStats></PlayerStats>
					<ToughnessBar></ToughnessBar>
					<ResourceStats></ResourceStats>
					<BottomMenu></BottomMenu>
					<Alerts></Alerts>
					<Modal show={isModalOpen} onClose={() => {
						setIsModalOpen(false);
					}} closeOnEsc>
						<Modal.Card>
							<Modal.Card.Head onClose={() => {
								setIsModalOpen(false);
							}}>
							<Modal.Card.Title>
								Title
							</Modal.Card.Title>
							</Modal.Card.Head>
							<Modal.Card.Body>
							<Media>
								<Media.Item renderAs="figure" position="left">
								<Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
								</Media.Item>
								<Media.Item>
								<Content>
									<p>
									<strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
									<br />
									If the children of the Modal is a card, the close button will be on the Card Head instead than the top-right corner
									You can also pass showClose = false to Card.Head to hide the close button
									</p>
								</Content>
								</Media.Item>
							</Media>
							</Modal.Card.Body>
							<Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
							<p>
								Lorem Ipsum...
							</p>
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
