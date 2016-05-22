import React, { Component } from 'react';
import config from '../../Config';
class Index extends Component {

	static propTypes = {

	}
/* eslint-disable */
	render() {
		console.log(config.api.createUserURL);
		return (
			<div>Test</div>
		);
	}
	/* eslint-enable */
}

export default Index;
