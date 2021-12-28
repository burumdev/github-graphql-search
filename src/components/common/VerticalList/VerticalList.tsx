
import React from "react";

//types
import { IntVerticalListProps } from "./VerticalList.types";

//styles
import s from './VerticalList.module.css';

//comps
import VerticalListItem from './VerticalListItem';
import Loading from '../Loading/Loading';

const VerticalList: React.FC<IntVerticalListProps> = ({
	list,
	renderRight = <div></div>,
	loading = false,
	title = '',
	idKey = 'id',
	leftKey = 'name',
	rightKey = null,
	//Getting functions in props
	...props
}) => {
	return (
		<>
			<div className={s.VerticalListHeading}>
				<h2>{title}</h2>
				{renderRight}
			</div>
			{loading ? <div className={s.VerticalListLoading}><Loading /></div> :
				<ul>
					{list.map((item: any) => (
						<VerticalListItem
							key={item[idKey]}
							leftText={item[leftKey]}
							rightText={rightKey ? item[rightKey] : ''}
							isClickable={typeof (props.onClickItem) === 'function'}
							onClick={() => (props.onClickItem ? props.onClickItem(item[idKey]) : false)}
						/>
					))}
				</ul>
			}
		</>
	)
}

export default VerticalList;
