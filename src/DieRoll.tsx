import React from 'react';

import { PlayPhase } from 'murderisinthecards-common/Consts';

import { GameStateContext } from './Context';
import Styles from "./DieRoll.module.css";
export default function DieRoll() {
	const gameState = React.useContext(GameStateContext);

	if (gameState.phase !== PlayPhase.MOVEMENT) {
		return null;
	}

	if (gameState.dieRoll === 0) {
		return null;
	}

	return <div className={Styles.dieContainer} >Die roll remaining: {gameState.dieRoll}</div>;
}
