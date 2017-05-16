/**
 * Created by exialym on 2017/5/15.
 */
import React, { Component } from 'react';
import CommentActions from '../actions/CommentActions';
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.state = {
      value: '',
    };
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleAddComment() {
    CommentActions.addComment(this.state.value);
  }
  render() {
    return (
      <div>
        <textarea
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button className="comment-confirm-btn"
                onClick={this.handleAddComment}
        >评论</button>
      </div>
    );
  }
}
export default CommentForm;
