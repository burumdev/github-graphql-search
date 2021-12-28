
import {
	gql
} from '@apollo/client';

export const GET_REPOS = gql`
	query ($login: String!) {
		user(login: $login) {
			repositories(first: 100) {
				totalCount
				nodes {
					name
					id
					stargazerCount
					watchers {
						totalCount
					}
					issues(filterBy: {states: OPEN}, first: 100) {
						nodes {
							title
							publishedAt
						}
						totalCount
					}
				}
			}
		}
	}
`
