import React, { Component } from 'react';
import Photo from './Photo';

class Detail extends Component {

	static propTypes = {
		posts:  React.PropTypes.array,
		params: React.PropTypes.object
	}

	render() {
		//index of the post
		const code = this.props.params.postId;
		const index = this.props.posts.findIndex((post) =>
			post.code === code
		);
		const post = this.props.posts[index];

		return (
			<ul className="photo-detail">
				<Photo
					{...this.props}
					index={index}
					post={post}
				/>
			</ul>
		);
	}
}

export default Detail;
