import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/actionCreators';

import MainLayout from '../components/Layout/Main';

function mapStateToProps(state) {
	return {
		posts:    state.posts,
		comments: state.comments
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

// Allows to map the application state as props
// to passed them down to the other components
const MainContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainLayout);

export default MainContainer;
