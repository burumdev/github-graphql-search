
import React, { useState } from "react";

import {
	useReactiveVar,
	useLazyQuery
} from '@apollo/client';

//store
import {
	searchTermVar,
	searchResultsVar,
	searchPageInfoVar,
	selectedUserLoginVar,
} from "../../store/users/usersStore";

//queries
import {
	SEARCH_USERS,
} from '../../store/users/usersQueries';

//styles
import s from './UsersList.module.css';

//comps
import UserItem from './UserItem';
import Paginator from '../common/Paginator/Paginator';
import Loading from '../common/Loading/Loading';

const UsersList: React.FC = () => {
	//hooks
	const [paginationStep, setPaginationStep] = useState(1);
	const searchTerm = useReactiveVar(searchTermVar);
	const pageInfo = useReactiveVar(searchPageInfoVar);
	const selectedUserLogin = useReactiveVar(selectedUserLoginVar);
	const usersList = useReactiveVar(searchResultsVar);

	const [onSearch, {
		called,
		loading
	}] = useLazyQuery(SEARCH_USERS, {
		//onCompleted doesn't run when pulling from apollo cache (BUG?) so network-only
		fetchPolicy: "network-only",
		onCompleted(result) {
			searchResultsVar(result.search.edges);
			searchPageInfoVar(result.search.pageInfo);
		}
	});

	//funcs
	const onClickUser = (id: string) => {
		if (selectedUserLogin === id) {
			selectedUserLoginVar('');
		} else {
			selectedUserLoginVar(id);
		}
	}

	const onPaginatorChangeStep = (step: number) => {
		if (!loading) {
			if (step < paginationStep) {
				onSearch({
					variables: {
						searchTerm,
						before: pageInfo?.startCursor,
						last: 5
					}
				}).then(() => {
					setPaginationStep(step);
				})
			} else {
				onSearch({
					variables: {
						searchTerm,
						after: pageInfo?.endCursor,
						first: 5
					}
				}).then(() => {
					setPaginationStep(step);
				})
			}
		}
	}

	return (
		<div className={s.UsersList}>
			<h2>Users</h2>
			{loading ? <div className={s.UsersListLoading}><Loading /></div> :
				<ul>
					{usersList.map(({ node }) => (
						<UserItem
							key={node.id}
							user={node}
							isSelected={selectedUserLogin === node.login}
							onClickUser={onClickUser}
						/>
					))
					}
				</ul>
			}
			{usersList.length > 0 &&
				<Paginator
					inlineStyles={{
						marginTop: '3rem'
					}}
					currentStep={paginationStep}
					showSteps={false}
					showNext={pageInfo?.hasNextPage}
					showPrev={pageInfo?.hasPreviousPage}
					onChangeStep={onPaginatorChangeStep}
				/>
			}
		</div>
	)
}

export default UsersList;
