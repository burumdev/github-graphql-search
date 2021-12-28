
import {
	makeVar
} from '@apollo/client';

//types
import { ReposList, RawRepo, Repo } from './reposTypes';

//vars
export const userReposVar = makeVar<ReposList>([]);
export const totalReposVar = makeVar(0);
export const selectedUserRepoVar = makeVar('');

//setters
//TODO: Find a way to show repository issue publishedAt date in human readable format
export const setRepos = (repos: RawRepo[]): Repo[] => {
	return repos.map((repo: RawRepo) => {
		return {
			...repo,
			repoInfo: `${repo.stargazerCount} stars / ${repo.watchers.totalCount} watchers / ${repo.issues.nodes.length} issues`
		}
	});
}
