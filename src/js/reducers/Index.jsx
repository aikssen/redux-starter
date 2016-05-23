import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';

// allows to export all the reducers like only one
// routing also is part of the state.
// When an action is dispached every single reducer
// is fired
const rootReducer = combineReducers({
	posts,
	comments,
	routing: routerReducer
});

export default rootReducer;
