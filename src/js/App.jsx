import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import { ReduxRouter } from 'redux-router';
import configureStore from './store/configureStore';
import { loginUserSuccess } from './actions';

const target = document.getElementById('app');
const store = configureStore(window.__INITIAL_STATE__);

const node = (
	<Provider store={store}>
		<ReduxRouter>{routes}</ReduxRouter>
	</Provider>
);

let token = localStorage.getItem('token');
if (token !== null) {
	store.dispatch(loginUserSuccess(token));
}

render(node, target);
