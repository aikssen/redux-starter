import React, { Component } from 'react';
import Photo from './Photo';

import New from '../Comment/New';

class Detail extends Component {

	static propTypes = {
		posts:    React.PropTypes.array,
		params:   React.PropTypes.object,
		comments: React.PropTypes.object
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
				<hr />
				<New />
				<div className="comments-wrapper">
					{this.props.comments[post.code] ?
						this.props.comments[post.code].map((comment, index) =>
							<div key={index} className="comment">
								<div className="comment-author">{comment.user}:</div>
								<div className="comment-text">{comment.text}</div>
							</div>
					) : <div> No comments </div>}
				</div>
			</ul>
		);
	}
}

export default Detail;
