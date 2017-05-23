/**
 * Created by exialym on 2017/5/22 0022.
 */
import React, { Component } from 'react';
import Article from "../components/Detail/Article";

import { actions } from './DetialRedux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class Detail extends Component {
  render() {
    let a = this.props;
    return (
      <div>
        <h1>Detail</h1>
        <Article
          id={this.props.match.params.id}
          {...this.props.page}
          {...this.props.loadPage}
        />
      </div>
    );
  }
}
export default connect(state => {
  return {
    page: state.detail.page,
  };
}, dispatch => {
  return {
    loadPage: bindActionCreators(actions, dispatch),
  };
})(Detail);
