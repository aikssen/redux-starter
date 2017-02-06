import React, { Component } from 'react';
import config from '../../Config';
import Photo from './Photo';

class Grid extends Component {

	static propTypes = {
		posts: React.PropTypes.array
	}

	render() {
		return (
			<ul className="container">
				{this.props.posts.map((post, index) =>
					<Photo
						{...this.props}
						key={index}
						index={index}
						post={post}
					/>
				)}
			</ul>
		);
	}
}

export default Grid;
