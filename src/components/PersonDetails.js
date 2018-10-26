import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getPersonInfoQuery } from '../queries/queries';

class PersonDetails extends Component {
	displayPersonalInfo() {
		const { loading, person } = this.props.data;
		if (loading) {
			return <div>loading ... personal information ...</div>;
		} else {
			if (person) {
				return (
					<div>
						<h2>Name: {person.name}</h2>
						<p>Gender: {person.gender}</p>
						<p>Planet: {person.home.name}</p>
						<p>Population: {person.home.population}</p>
						<p>Species: {person.species.name}</p>
						<p>Classification: {person.species.classification}</p>
					</div>
				);
			} else {
				return <div>No Person Selected</div>;
			}
		}
	}
	render() {
		return <div id="person-details">{this.displayPersonalInfo()}</div>;
	}
}

export default graphql(getPersonInfoQuery, {
	options: (props) => {
		return {
			variables: {
				id: props.personId,
				planet: props.planet,
				species: props.species
			}
		};
	}
})(PersonDetails);
