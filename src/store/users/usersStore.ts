
import {
	makeVar
} from '@apollo/client';

//types
import { UsersList, PageInfo } from './usersTypes';

export const searchTermVar = makeVar('');
export const searchResultsVar = makeVar<UsersList>([]);
export const searchPageInfoVar = makeVar<PageInfo>(null);

export const selectedUserLoginVar = makeVar('');
