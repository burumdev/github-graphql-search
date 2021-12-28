
import { User } from '../../store/users/usersTypes';

export interface IntUserItemProps {
	user: User;
	isSelected: boolean;
	onClickUser: Function;
}