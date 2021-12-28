
import React from 'react';
import cn from "classnames/bind";

//styles
import s from './Button.module.css';

//types
import { IntButtonProps } from './Button.types';

//comps
import Loading from '../Loading/Loading';

const Button: React.FC<IntButtonProps> = ({
	buttonInner = '',
	loading = false,
	isFullHeight = false,
	isTransparentBox = false,
	isHalfOpacity = false,
	isHidden = false,
	inlineStyles = {},
	//Getting functions in props
	...props
}) => {
	//classnames
	const cx = cn.bind(s);
	const buttonClasses = cx(s.Button, {
		[s.ButtonFullHeight]: isFullHeight,
		[s.ButtonTransparentBox]: isTransparentBox,
		[s.ButtonHalfOpacity]: isHalfOpacity,
		[s.ButtonHidden]: isHidden,
	})

	buttonInner = loading ? <Loading size='small' /> : buttonInner;

	return (
		<button
			style={inlineStyles}
			onClick={e => props.onClick(e)}
			className={buttonClasses}
		>
			{buttonInner}
		</button>
	)
}

export default Button;
