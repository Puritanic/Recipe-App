import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_RECIPE } from '../../queries/index';
import LikeRecipe from './LikeRecipe';

const RecipePage = ({
	match: {
		params: { id },
	},
}) => {
	return (
		<Query query={GET_RECIPE} variables={{ id }}>
			{({ data, loading, error }) => {
				if (loading) return <div>Loading...</div>;
				if (error) return <div>{error}</div>;
				const { getRecipe } = data;
				return (
					<div className="App">
						<h2>{getRecipe.name}</h2>
						<p>Likes: {getRecipe.likes}</p>
						<p>Created by: {getRecipe.username}</p>
						<p>Category: {getRecipe.category}</p>
						<p>Description: {getRecipe.description}</p>
						<p>Instructions: {getRecipe.instructions}</p>
						<LikeRecipe id={id} />
					</div>
				);
			}}
		</Query>
	);
};

export default withRouter(RecipePage);
