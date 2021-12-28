
import React, { useState, useEffect } from "react";

import {
	useReactiveVar,
	useLazyQuery
} from '@apollo/client';

//store
import {
	userReposVar,
	totalReposVar,
	setRepos,
	selectedUserRepoVar
} from "../../store/repos/reposStore";

import {
	selectedUserLoginVar,
} from "../../store/users/usersStore";

//queries
import {
	GET_REPOS,
} from '../../store/repos/reposQueries';

//styles
import s from './UserReposList.module.css';

//comps
import VerticalList from '../common/VerticalList/VerticalList';
import Paginator from '../common/Paginator/Paginator';
import Button from '../common/Button/Button';

//types
import { IntUserReposListProps } from './UserReposList.types';

const PAG_PER_PAGE = 6;

const UserReposList: React.FC<IntUserReposListProps> = ({

}) => {
	//hooks
	const [paginationStep, setPaginationStep] = useState(1);
	const [paginationIssueStep, setPaginationIssueStep] = useState(1);
	const selectedUserLogin = useReactiveVar(selectedUserLoginVar);
	const userRepos = useReactiveVar(userReposVar);
	const totalRepos = useReactiveVar(totalReposVar);
	const selectedUserRepoId = useReactiveVar(selectedUserRepoVar);

	const [onGetRepos, {
		called,
		loading,
	}] = useLazyQuery(GET_REPOS, {
		//onCompleted doesn't run when pulling from apollo cache (BUG?) so network-only
		fetchPolicy: "network-only",
		onCompleted: (result) => {
			if (result) {
				console.log(result);
				userReposVar(setRepos(result.user.repositories.nodes));
				totalReposVar(result.user.repositories.totalCount)
			}
		}
	});

	//effect
	useEffect(() => {
		if (selectedUserLogin !== '') {
			selectedUserRepoVar('');
			onGetRepos({
				variables: {
					login: selectedUserLogin
				}
			}).then(() => {
				setPaginationStep(1);
			})
		}
	}, [selectedUserLogin]);

	//funcs
	const onClickRepoItem = (id: string) => {
		selectedUserRepoVar(id);
	}

	const onPaginatorChangeStep = (step: number) => {
		if (step !== paginationStep) {
			setPaginationStep(step);
		}
	}

	const onPaginatorChangeIssueStep = (step: number) => {
		if (step !== paginationIssueStep) {
			setPaginationIssueStep(step);
		}
	}

	const onBackToRepo = () => {
		selectedUserRepoVar('');
	}

	//TODO: onNewIssue. We'll open a modal here with a form (title, description and submit, cancel buttons) to create a new issue and send it to github as a mutation.
	const onNewIssue = () => {
		alert('New issue creation is not implemented yet.');
	}

	const startIndex = paginationStep === 1 ? 0 : (paginationStep - 1) * PAG_PER_PAGE;
	const paginatedRepos = userRepos.slice(startIndex, startIndex + PAG_PER_PAGE);

	const selectedRepo = paginatedRepos.find(repo => repo.id === selectedUserRepoId);
	const issuesList = selectedRepo ? selectedRepo.issues.nodes : [];
	const totalIssues = issuesList.length;

	const startIssueIndex = paginationIssueStep === 1 ? 0 : (paginationIssueStep - 1) * PAG_PER_PAGE;
	const paginatedIssues = issuesList.slice(startIssueIndex, startIssueIndex + PAG_PER_PAGE);

	return (
		<div className={s.UserReposList}>
			{selectedRepo ? (
				<>
					<VerticalList
						title='Open Issues'
						list={paginatedIssues}
						leftKey="title"
						rightKey="publishedAt"
						renderRight={
							<Button
								buttonInner="New Issue"
								onClick={onNewIssue}
								isFullHeight
							/>
						}
					/>
					{paginatedIssues.length > 0 &&
						<Paginator
							currentStep={paginationIssueStep}
							onChangeStep={onPaginatorChangeIssueStep}
							perPage={PAG_PER_PAGE}
							totalItems={totalIssues}
						/>
					}
					<Button
						inlineStyles={{
							margin: '2rem auto 0 auto'
						}}
						buttonInner='< Back To Repositories'
						onClick={onBackToRepo}
					/>
				</>
			) :
				<>
					<VerticalList
						title='Repositories'
						list={paginatedRepos}
						idKey='id'
						leftKey="name"
						rightKey="repoInfo"
						loading={loading}
						onClickItem={onClickRepoItem}
					/>
					{(!loading && paginatedRepos.length > 0) &&
						<Paginator
							currentStep={paginationStep}
							onChangeStep={onPaginatorChangeStep}
							perPage={PAG_PER_PAGE}
							totalItems={totalRepos}
						/>
					}
				</>
			}
		</div>
	)
}

export default UserReposList;
