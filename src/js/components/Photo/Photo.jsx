import React, { Component } from 'react';
import { Link } from 'react-router';

class Photo extends Component {

	static propTypes = {
		post:      React.PropTypes.object,
		comments:  React.PropTypes.object,
		increment: React.PropTypes.func,
		index:     React.PropTypes.number
	}

	render() {
		const post = this.props.post;

		return(
			<li className="item">
				<Link to={`/view/${post.code}`}>
					<img src={post.display_src} alt="" />
				</Link>
				<div className="caption">
					{post.caption}
				</div>
				<div className="controls">
					<button
						className="likes-btn"
						onClick={this.props.increment.bind(null, this.props.index)}
					>
						&hearts; {post.likes}
					</button>
					<button className="comments-btn">
						[ {this.props.comments[post.code] ?
							this.props.comments[post.code].length :
							'0'} ] 
					</button>
				</div>
			</li>
		);
	}
}

export default Photo;
