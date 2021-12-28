
import React from "react";
import cn from "classnames/bind";

//types
import { IntVerticalListItemProps } from "./VerticalListItem.types";

//styles
import s from './VerticalListItem.module.css';

const VerticalListItem: React.FC<IntVerticalListItemProps> = ({
	leftText,
	rightText = '',
	isClickable = false,
	//Getting functions in props
	...props
}) => {
	//classnames
	const cx = cn.bind(s);
	const itemClasses = cx(s.VerticalListItem, {
		[s.VerticalListItemClickable]: isClickable,
	})

	return (
		<li className={itemClasses} onClick={() => props.onClick ? props.onClick() : false}>
			<strong>{leftText}</strong>
			<span>{rightText}</span>
		</li>
	)
}

export default VerticalListItem;
