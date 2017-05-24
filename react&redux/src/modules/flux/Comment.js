/**
 * Created by exialym on 2017/5/12 0012.
 */
import React, { Component, PropTypes } from 'react';
import fetch from 'fetch'

//含有数据抽象 而没有业务逻辑的容器型组件
class CommentListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      value: null,
    };
  }
  componentDidMount() {
    this.props.promise.then(response => response.json())
      .then(value => this.setState({ loading: false, value }))
      .catch(error => this.setState({ loading: false, error }));
  }
  render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    } else {
      const list = this.state.value.commentList;
      return (
        <CommentList comments={list} />
      );
    }
  }
}

//没有数据请求，只有业务逻辑的展示型组件
function CommentList({ comments }) {
  return (
    <ul className="comment-box">
      {comments.map((entry, i) => (
        <li key={`reponse-${i}`} className="comment-item">
          <p className="comment-item-name">{entry.name}</p>
          <p className="comment-item-content">{entry.content}</p>
        </li>
      ))}
    </ul>
  );
}
//发布评论，同样，只有逻辑，对于数据的提交放在了CommentBox
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.handleChang = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    return (
      <div>
        <textarea value={this.state.value} onChange={this.handleChange}/>
        <button
          className="comment-confirm-btn"
          onClick={this.props.onSubmitComment.bind(this, this.state.value)}
        >评论</button>
      </div>
    );
  }
}
class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: fetch('/api/response.json'),
    };
  }
  handleSubmitComment(value) {
    fetch('/api/submit.json', {
      method: 'POST',
      body: `value=${value}`,
    })
      .then(response => response.json())
      .then(value => {
        if (value.ok) {
          this.setState({ comments: fetch('/api/response.json') });
        }
      });
  }
  render() {
    return (
      <div>
        <CommentListContainer comments={this.state.comments} />
        <CommentForm onSubmitComment={::this.handleSubmitComment} />
      </div>
    );
  }
}
export default CommentBox;



