import React, { useEffect, useContext } from 'react';

import './App.scss';

import SceneKeys from './phaser/Config/SceneKeys';
import { createGame } from './phaser/Game';
import { UI } from './ui/UI';
import { RootStoreContext } from 'index';

export default function App() {
	const store = useContext(RootStoreContext);

	useEffect(() => {
		let game = createGame(store.gameStore);
		game.scene.start(SceneKeys.Preload);
	}, [store]);

	return (
		<>
			<div id="game" />
			<UI></UI>
		</>
	);
}
