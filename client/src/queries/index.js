import gql from 'graphql-tag';

// Recipes queries
export const GET_ALL_RECIPES = gql`
	query {
		getAllRecipes {
			id
			name
			category
		}
	}
`;

export const GET_RECIPE = gql`
	query($id: ID!) {
		getRecipe(id: $id) {
			name
			category
			description
			instructions
			likes
			createdDate
			id
			username
		}
	}
`;

// Recipes mutations

export const ADD_RECIPE = gql`
	mutation(
		$name: String!
		$description: String!
		$category: String!
		$instructions: String!
		$username: String
	) {
		addRecipe(
			name: $name
			description: $description
			category: $category
			instructions: $instructions
			username: $username
		) {
			name
			category
			description
			instructions
			likes
			createdDate
			id
			username
		}
	}
`;

// User queries
export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			joinDate
			username
			email
			id
		}
	}
`;

// User mutations

export const LOGIN_USER = gql`
	mutation($username: String!, $password: String!) {
		loginUser(username: $username, password: $password) {
			token
		}
	}
`;

export const REGISTER_USER = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		registerUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`;
