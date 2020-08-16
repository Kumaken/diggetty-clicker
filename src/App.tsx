import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';

import { gameConfig, PhaserConfig } from './phaser/Config/PhaserConfig';
import './App.css';
import registerScenes from './registerScenes';
import SceneKeys from './phaser/Config/SceneKeys';
import { PlayerStats } from './ui/PlayerStats/PlayerStats';

// const gameConfig: GameInstance = {
//   width: "100%",
//   height: "100%",
//   type: Phaser.AUTO,
//   scale: {
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//     width: '100%',
//     height: '100%'
//   },
//   render: {
//     antialias: false,
//     pixelArt: true,
//     roundPixels: true
//   },
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 400 },
//       debug: true
//     }
//   },
//   scene: MainScene
// };

export class PhaserGame extends Phaser.Game {
	constructor(config: PhaserConfig) {
		super(config);
	}
}

let game: PhaserGame;
export function createGame() {
	game = new PhaserGame(gameConfig);
	return game;
}

export function getGame(): PhaserGame {
	return game;
}

export default function App() {
	useEffect(() => {
		let game = createGame();
		registerScenes(game);
		game.scene.start(SceneKeys.Preload);
		// if (initialize) {
		// 	setGame(Object.assign({}, gameConfig));
		// }
	}, []);

	return (
		<>
			<div id="game" />
			<PlayerStats></PlayerStats>
		</>
	);

	// return (
	// 	<div className="App">
	// 		<header className="App-header">
	// 			{initialize ? (
	// 				<>
	// 					<IonPhaser game={game} initialize={initialize} />
	// 					<div onClick={destroy} className="flex destroyButton">
	// 						<a href="#1" className="bttn">
	// 							Destroy
	// 						</a>
	// 					</div>
	// 				</>
	// 			) : (
	// 				<>
	// 					<img src={logo} className="App-logo" alt="logo" />
	// 					<div onClick={() => setInitialize(true)} className="flex">
	// 						<a href="#1" className="bttn">
	// 							Initialize
	// 						</a>
	// 					</div>
	// 				</>
	// 			)}
	// 		</header>
	// 	</div>
	// );
}
