import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getPersonListQuery } from '../queries/queries';
import { Person } from './Person';
import PersonDetails from './PersonDetails';
const uuidv1 = require('uuid/v1');

class PersonList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
			matchingPlanet: null,
			matchingSpecies: null
		};
	}
	displayPersonList({ personList }) {
		return personList.map(({ name, gender, height, homeworld, species }, index) => {
			return (
				<li
					className="personItem"
					key={name}
					onClick={(e) => {
						this.setState({
							selected: index + 1,
							matchingPlanet: homeworld.split('/').slice(-2, -1).reduce((item) => item),
							matchingSpecies: species
								.reduce((item) => item)
								.split('/')
								.slice(-2, -1)
								.reduce((item) => item)
						});
					}}
				>
					<Person name={name} gender={gender} height={height} index={index} />
				</li>
			);
		});
	}
	render() {
		const { loading, error, personList } = this.props;
		if (loading) {
			return <h4>loading ...</h4>;
		}
		if (error) {
			return <h4>{error.message}</h4>;
		}
		return (
			<div>
				<ul className="test">{this.displayPersonList({ personList })}</ul>
				<PersonDetails
					personId={this.state.selected}
					planet={this.state.matchingPlanet}
					species={this.state.matchingSpecies}
				/>
			</div>
		);
	}
}

export default graphql(getPersonListQuery, {
	props: ({ data }) => {
		if (data.loading) {
			return {
				loading: data.loading
			};
		}
		if (data.error) {
			return {
				error: data.error
			};
		}

		return {
			personList: data.personList.results,
			loading: data.loading
		};
	}
})(PersonList);
