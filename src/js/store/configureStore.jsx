import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import routes from '../routes';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
	// let createStoreWithMiddleware;

	// const logger = createLogger();

	const middleware = applyMiddleware(thunk, createLogger());

	// redux dev tools
	// const enhancers = compose(
	// 	window.devToolsExtension ? window.devToolsExtension() : fun => fun
	// );

	const enhancers = window.devToolsExtension ? window.devToolsExtension() : fun => fun;

	const createStoreWithMiddleware = compose(
		middleware,
		reduxReactRouter({ routes, createHistory }),
		window.devToolsExtension ? window.devToolsExtension() : fun => fun
	);

	const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;

}
