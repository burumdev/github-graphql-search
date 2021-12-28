
export type Issue = {
	title: string,
	publishedAt: string
}

export type RawRepo = {
	id: string,
	issues: {
		nodes: Issue[],
	}
	name: string,
	stargazerCount: number,
	watchers: {
		totalCount: number
	}
}

export type Repo = {
	id: string,
	issues: {
		nodes: Issue[],
	}
	name: string,
	repoInfo: string,
}

export type ReposList = Repo[];
