import React from 'react';

import * as CanDo from 'murderisinthecards-common/CanDo';
import {
	ClientToServerMessage, Suspect
} from 'murderisinthecards-common/Consts';

import {
	GameStateContext,
	RoomIdContext,
	SendMessageContext,
	SessionIdContext,
} from './Context'
import SelectEnum from './SelectEnum';

import Styles from './GameSetup.module.css';

function GameSetup() {
	return (
		<div className={Styles.wrap}>
			<h1>Clue-Less</h1>
			<License />
			<div className={Styles.settingsContainer}>
				<SelectSuspect />
				<ConnectedPlayers />
				<BeginGame />
				<GameLink />
			</div>
		</div>
	);
}

function SelectSuspect() {
	const gameState = React.useContext(GameStateContext);
	const sessionId = React.useContext(SessionIdContext);
	const sendMessage = React.useContext(SendMessageContext);

	const [name, setName] = React.useState('');
	const [suspect, setSuspect] = React.useState(Suspect.BLOOD);

	const submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		sendMessage(ClientToServerMessage.PLAYER_SETUP, { name, suspect });
	};

	const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value);
	};

	const err = CanDo.playerSetup(
		sessionId,
		gameState,
		name,
		suspect,
	);
	const canSetUp = err === null;

	const disabled = (suspect: Suspect) =>
		CanDo.playerSetup(sessionId, gameState, 'dummy', suspect) !== null;

	return (
		<form className={Styles.inputForm} onSubmit={submit}>
			<label className={Styles.nameLabel}>
				Enter your name: 
				<input className={Styles.nameInput} type="text" value={name} onChange={changeName} />
			</label>
				<SelectEnum
					disabled={disabled}
					onChange={setSuspect}
					values={Object.values(Suspect)}
					value={suspect}
					
				/>
				<input className={Styles.startButton} disabled={!canSetUp} type="submit" value="Submit" />
		</form>
	);
}

function ConnectedPlayers() {
	const gameState = React.useContext(GameStateContext);
	const players = gameState.players;

	const playerList = Object.entries(players).map(([id, player]) => {
		if (!player.name || !player.suspect) {
			return <li key={id}>New Player</li>;
		}

		return <li key={id}>{player.name} is... {player.suspect}!</li>;
	});

	return (
			<div className={Styles.playerDisplay} >
				Connected Players:
			<ul className={Styles.playerList}>
					{playerList}
				</ul>
			</div>
	);
}

function BeginGame() {
	const gameState = React.useContext(GameStateContext);
	const sendMessage = React.useContext(SendMessageContext);
	const sessionId = React.useContext(SessionIdContext);

	const err = CanDo.beginGame(sessionId, gameState);
	const readyToBegin = err === null;

	const start = () => {
				sendMessage(ClientToServerMessage.BEGIN_GAME, null);
	};

	return <button className={Styles.gameStart} disabled={!readyToBegin} onClick={start}>Begin Game</button>;
}

function GameLink() {
	const roomId = React.useContext(RoomIdContext);

	const url = new URL(window.location.toString());
	url.searchParams.set('r', roomId);

	const urlStr = url.toString();

	const disable = (e: React.SyntheticEvent) => {
				e.preventDefault();
	};

	return (
			<div className={Styles.joinLink}> Join game on this link: <a href={urlStr} onClick={disable}>{urlStr}</a></div>
	);
}

function License() {

	return (
			<div className={Styles.welcomeText}>
				"Just like the real game... but less!"
		</div>
	);
}

export default GameSetup;
