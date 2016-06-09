// import React from 'react';
// import { render } from 'react-dom';
// import { Router, Route, IndexRoute } from 'react-router';
// import { Provider } from 'react-redux';
//
// import store, { history } from './Store';
// import MainContainer from './containers/MainContainer';
// import Grid from './components/Photo/Grid';
// import Detail from './components/Photo/Detail';
// import NotFound from './components/NotFound/';
//
// // provider exposes the store to the entire application
// const routes = (
// 	<Provider store={store}>
// 		<Router history={history}>
// 			<Route path="/" component={MainContainer}>
// 				<IndexRoute component={Grid} />
// 				<Route path="/view/:postId" component={Detail} />
// 			</Route>
// 			<Router path="*" component={NotFound} />
// 		</Router>
// 	</Provider>
// );
//
// render(routes, document.getElementById('app'));
// import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import { loginUserSuccess } from './actions';

const target = document.getElementById('app');
const store = configureStore(window.__INITIAL_STATE__);

const node = (
	<Root store={store} />
);

let token = localStorage.getItem('token');
if (token !== null) {
	store.dispatch(loginUserSuccess(token));
}

render(node, target);
