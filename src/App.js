import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { RestLink } from 'apollo-link-rest';
import Person from './components/Person';
import PersonList from './components/PersonList';
import PersonDetails from './components/PersonDetails';

// create a RestLink for the REST API
const restLink = new RestLink({
	uri: 'https://swapi.co/api/'
});
// Config the ApolloClient with the default cache and RestLink
const client = new ApolloClient({
	link: restLink,
	cache: new InMemoryCache()
});

class App extends Component {
	render() {
		return (
			<div className="app">
				<header className="app-header">
					<h1 className="app-title"> Welcome to Apollo Rest Link Example </h1>
				</header>
				<PersonList />
			</div>
		);
	}
}

const ApolloApp = () => (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);

export default ApolloApp;
