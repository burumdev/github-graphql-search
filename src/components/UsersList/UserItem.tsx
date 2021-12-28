
import React from "react";

//types
import { IntUserItemProps } from './UserItem.types';

//styles
import s from './UserItem.module.css';

const UserItem: React.FC<IntUserItemProps> = ({
	user,
	isSelected,
	//Getting functions in props
	...props
}) => {
	return (
		<li
			onClick={() => props.onClickUser(user.login)}
		>
			<div className={s.UserAvatar + (isSelected ? ' ' + s.UserSelected : '')}>
				<img src={user.avatarUrl} alt={user.login} />
			</div>
			{user.login}
		</li>
	)
}

export default UserItem;
