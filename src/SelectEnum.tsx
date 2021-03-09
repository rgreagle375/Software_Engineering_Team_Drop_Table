import React from 'react';
import Styles from './SelectEnum.module.css';

type Props<T> = {
	disabled?: (val: T) => boolean,
	onChange: (val: T) => void,
	values: T[],
	value: T,
};

export default function SelectEnum<T extends string>(
	{ disabled, onChange, values, value }: Props<T>
) {
	const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newVal = (e.currentTarget.value as unknown) as T;
		onChange(newVal);
	};

	const disabledReal = disabled || (_ => false);

	return (
		<select className={Styles.roleSelect} value={value} onChange={changeHandler}>
			{values.map(v =>
				<option className={Styles.roleOption} value={v} key={v} disabled={disabledReal(v)}>{v}</option>
			)}
		</select>
	);
}
