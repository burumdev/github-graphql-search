
import React from "react";
import cn from "classnames/bind";

//types
import { IntInputProps } from "./Input.types";

//styles
import s from './Input.module.css';

const Input: React.FC<IntInputProps> = ({
	value,
	placeholder = '',
	isFullHeight = false,
	inlineStyles = {},
	//Getting functions in props
	...props
}) => {
	//classnames
	const cx = cn.bind(s);
	const inputClasses = cx(s.Input, {
		[s.InputFullHeight]: isFullHeight
	})

	//funcs
	const onChangeValue = (e: any) => {
		props.onChangeValue(e.target.value);
	}

	return (
		<input
			style={inlineStyles}
			className={inputClasses}
			value={value}
			onChange={onChangeValue}
			placeholder={placeholder}
		/>
	)
}

export default Input;
