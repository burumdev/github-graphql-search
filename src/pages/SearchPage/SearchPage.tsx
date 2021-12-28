
import React from "react";

import UsersSearch from '../../components/UsersSearch/UsersSearch';
import UsersList from '../../components/UsersList/UsersList';
import UserReposList from '../../components/UserReposList/UserReposList';

const SearchUsersPage: React.FC = () => {
	return (
		<>
			<UsersSearch />
			<UsersList />
			<UserReposList />
		</>
	)
}

export default SearchUsersPage;
