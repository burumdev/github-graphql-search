
import React from "react";

import {
	useLazyQuery,
} from "@apollo/client";

//queries
import {
	SEARCH_USERS
} from '../../store/users/usersQueries';

//store
import {
	searchTermVar,
	searchResultsVar,
	searchPageInfoVar
} from '../../store/users/usersStore';

//comps
import Search from '../common/Search/Search';

//styles
import s from './UsersSearch.module.css';

const UsersSearch: React.FC = () => {
	//hooks
	const [onSearch, {
		loading
	}] = useLazyQuery(SEARCH_USERS, {
		//Woraround for loading value never changes after first query see BUG: https://github.com/apollographql/apollo-client/issues/9137
		notifyOnNetworkStatusChange: true,
		onCompleted(result) {
			searchResultsVar(result.search.edges);
			searchPageInfoVar(result.search.pageInfo);
		}
	});

	//funcs
	const onClickSearch = (searchTerm: string) => {
		searchTermVar(searchTerm);
		if (searchTerm !== '') {
			onSearch({
				variables: {
					searchTerm,
					first: 5
				}
			})
		}
	}

	return (
		<div className={s.UsersSearch}>
			<Search
				initialSearchTerm=""
				onClickSearch={(searchTerm: string) => onClickSearch(searchTerm)}
				loading={loading}
			/>
		</div>
	)
}

export default UsersSearch;
