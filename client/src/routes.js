import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Nav from './components/Nav';
import Search from './components/Recipe/Search';
import AddRecipe from './components/Recipe/AddRecipe';
import RecipePage from './components/Recipe/RecipePage';
import Profile from './components/Profile/Profile';

const AppRouter = ({ refetch, data }) => {
	return (
		<BrowserRouter>
			<Fragment>
				<Nav session={data} />
				<Switch>
					<Route exact path="/" component={App} />
					<Route exact path="/search" component={Search} />
					<Route path="/auth/register" render={() => <Register refetch={refetch} />} />
					<Route path="/auth/login" render={() => <Login refetch={refetch} />} />
					<Route exact path="/recipe/add" render={() => <AddRecipe session={data} />} />
					<Route exact path="/recipe/:id" component={RecipePage} />
					<Route exact path="/profile" render={() => <Profile session={data} />} />
					<Redirect to="/" />
				</Switch>
			</Fragment>
		</BrowserRouter>
	);
};

export default AppRouter;
