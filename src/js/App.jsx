import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import { createHashHistory } from 'history';

import Layout from './components/layout/';
import Index from './components/app/';
import Single from './components/app/Single';
import NotFound from './components/not-found/';

// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
//<Route path="/views/:postId" component={Single} />
const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Index} />
			<Route path="/views/:postId" component={Single} />
		</Route>
		<Router path="*" component={NotFound} />
	</Router>
);

render(routes, document.getElementById('app'));
