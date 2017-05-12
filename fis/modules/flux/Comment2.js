/**
 * Created by exialym on 2017/5/12 0012.
 */
import React, { Component, PropTypes } from 'react';
import fetch from 'fetch'



function dissoc(obj, prop) {
  let result = {};
  for (let p in obj) {
    if (p !== prop) {
      result[p] = obj[p];
    }
  }
  return result;
}
//将promised提出来，作为一个公共的高阶组件，哪个组件需要用promised，就传到wrapped里包装一下
//但是这样并不灵活，一般还是直接 用包装组件来实现
const Promised = (promiseProp, Wrapped) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      value: null,
    };
  }
  componentDidMount() {
    this.props[promiseProp].then(response => response.json())
      .then(value => this.setState({ loading: false, value }))
      .catch(error => this.setState({ loading: false, error }));
  }
  render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    } else {
      const propsWithoutThePromise = dissoc(this.props, promiseProp);
      return <Wrapped {...propsWithoutThePromise} {...this.state.value} />;
    }
  }
};
class CommentListContainer extends Component{
  render() {
    return <CommentList data={data} />;
  }
}
export default Promised('comments', CommentListContainer);
//ReactDOM.render(<CommentListContainer comments={fetch('/api/response.json')} />, document.getElementById('root'));