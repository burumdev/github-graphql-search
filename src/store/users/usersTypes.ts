
export type User = {
	id: string,
	login: string,
	avatarUrl: string,
}

export type UserResult = {
	cursor: string;
	node: User
}

export type PageInfo = {
	endCursor: string;
	startCursor: string;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
} | null;

export type UsersList = UserResult[];
