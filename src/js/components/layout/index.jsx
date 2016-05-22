import React, { Component } from 'react';
//import { Link } from 'react-router';

class Layout extends Component {

	render() {
		return (
			<div id="wrapper">
				<div id="page-wrapper">
					{React.cloneElement(this.props.children, this.props.user)}
				</div>
			</div>
		);
	}
}

export default Layout;
