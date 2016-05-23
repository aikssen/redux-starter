import React, { Component } from 'react';
//import { Link } from 'react-router';

class MainLayout extends Component {

	static defaultProps = {
		title: 'Undefined Product',
		//TODO temporal solution for avoid warnings
		key: 		{},
		ref: 		{}
	}

	render() {
		return (
			<div>
				{React.cloneElement(this.props.children, this.props)}
			</div>
		);
	}
}

export default MainLayout;
