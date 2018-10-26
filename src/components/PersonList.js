import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getPersonListQuery } from '../queries/queries';
import { Person } from './Person';
import PersonDetails from './PersonDetails';

class PersonList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
			matchingPlanet: null,
			matchingSpecies: null
		};
		this.validateSelection = this.validateSelection.bind(this);
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

	validateSelection() {
		if (this.state.selected) {
			return (
				<PersonDetails
					personId={this.state.selected}
					planet={this.state.matchingPlanet}
					species={this.state.matchingSpecies}
				/>
			);
		} else {
			return <p>No Person Selected</p>;
		}
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
				{this.validateSelection()}
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
