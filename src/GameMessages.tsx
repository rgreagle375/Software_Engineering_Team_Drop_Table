import React from 'react';

import { GameMessagesContext } from './Context';
import Styles from './GameMessages.module.css';
export default function GameMessages() {
	const messages = React.useContext(GameMessagesContext);

	return (
		<div className={Styles.logContainer}>
			Log:
			<ul className={Styles.log}>
				{messages.map(m => <li key={m.id}>{m.message}</li>)}
			</ul>
		</div>
	);
}
