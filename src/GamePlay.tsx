import React from 'react';

import DieRoll from './DieRoll';
import GameBoard from './GameBoard';
import GameMessages from './GameMessages';
import Notes from './Notes';
import TurnActions from './TurnActions';
import TurnOrder from './TurnOrder';
import YourCards from './YourCards';
import YourTurnWrap from './YourTurnWrap';

import Styles from './GamePlay.module.css';

export default function GamePlay() {
	return (
		<YourTurnWrap>
			<div className={Styles.wrap}>
				<div className={Styles.mainInformations}>
					<TurnOrder />
					<YourCards />
					<DieRoll />
					<TurnActions />
				</div>
				<GameBoard />
				<Notes />
			</div>
			<div className={Styles.col}>
				<GameMessages />
			</div>
		</YourTurnWrap>
	);
}
