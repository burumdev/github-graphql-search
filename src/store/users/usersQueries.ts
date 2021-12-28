
import {
	gql
} from '@apollo/client';

export const SEARCH_USERS = gql`
	query ($searchTerm: String!, $before: String = null, $after: String = null, $first: Int = null, $last: Int = null) {
		search(query: $searchTerm, type: USER, before: $before, after: $after, first: $first, last: $last) {
			pageInfo {
				startCursor
				endCursor
                hasNextPage
				hasPreviousPage
			}
			edges {
				cursor
				node {
					... on User {
						id
						avatarUrl
						login
					}
				}
			}
		}
	}
`
