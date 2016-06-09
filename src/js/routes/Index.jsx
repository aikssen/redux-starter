import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { AppContainer } from '../containers/AppContainer';
import Home from '../components/Home';
import Login from '../components/Auth/Login';
import Protected from '../components/Home/Protected';
import { requireAuthentication } from '../components/Auth/AuthenticatedComponent';

export default(
	<Route path='/' component={AppContainer}>
		<IndexRoute component={Home} />
		<Route path="login" component={Login} />
		<Route path="protected" component={requireAuthentication(Protected)} />
	</Route>
);
