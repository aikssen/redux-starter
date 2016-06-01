import React, { Component } from 'react';

class NewComment extends Component {

	handleSaveComment = (ev) => {
		ev.preventDefault();
	}

	render() {
		return (
			<form className="comment-new" onSubmit={this.handleSaveComment}>
				<div className="comment-new-user">@user:</div>
				<div className="comment-new-txt">
					<input type="text" ref="comment" placeholder="new comment..." />
					<input type="submit" hidden />
				</div>
			</form>
		);
	}
}

export default NewComment;
