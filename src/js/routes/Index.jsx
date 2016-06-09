import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../containers/App';
import Home from '../components/Home';
import Login from '../components/Auth/Login';
import Protected from '../components/Home/Protected';
import { requireAuthentication } from '../components/Auth/AuthenticatedComponent';

export default(
	<Route path='/' component={App}>
		<IndexRoute component={Home} />
		<Route path="login" component={Login} />
		<Route path="protected" component={requireAuthentication(Protected)} />
	</Route>
);
