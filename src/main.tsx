import React from 'react';
import ReactDOM from 'react-dom';

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	HttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import './index.css';
import App from './App';

const token = import.meta.env.VITE_GH_TOKEN;

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: token ? `Token ${token}` : null,
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(
		new HttpLink({ uri: "https://api.github.com/graphql" })
	),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
