import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/';
import comments from './data/comments';
import posts from './data/posts';

// create an object for the default data
const defaultState = {
	posts,
	comments
};

// redux dev tools
const enhancers = compose(
	window.devToolsExtension ? window.devToolsExtension() : fun => fun
);


const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

//hot reducer reloading for development
if(module.hot) {
	module.hot.accept('./reducers', ()=>{
		const nextRootReducer = require('./reducers').default;
		store.replaceReducer(nextRootReducer);
	});
}

export default store;
