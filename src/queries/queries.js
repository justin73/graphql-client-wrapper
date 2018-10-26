import { gql } from 'apollo-boost';
// the exact query we made in graphql server
const getPersonListQuery = gql`
	{
		personList @rest(type: "PersonList", path: "people") {
			count
			results @type(name: "Person") {
				name
				gender
				height
				homeworld
				species
			}
		}
	}
`;

/**
 * combine different endpoints together to get the EXACT data format WE WANT!
 * when backend is not front end friendly, GraphQL is the remedy!
 */

const getPersonInfoQuery = gql`
	query($id: ID, $planet: String, $species: String) {
		person(id: $id) @rest(type: "Person", path: "people/{args.id}/") {
			name
			gender
			home(planet: $planet) @rest(type: "Home", path: "planets/{args.planet}/") {
				name
				population
			}
			species(species: $species) @rest(type: "Species", path: "species/{args.species}/") {
				name
				classification
			}
		}
	}
`;

export { getPersonInfoQuery, getPersonListQuery };
