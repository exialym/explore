
/**
 * Created by exialym on 2017/5/23 0023.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleTable from '../components/Search/Table';
import { actions } from './SearchRedux';
import { bindActionCreators } from 'redux';

class ArticleCRUD extends Component {
  render() {
    return (
    <div className="page">
      <ArticleTable {...this.props.table} {...this.props.tableActions} />
    </div>
  );
  }
}
export default connect(state => {
  return {
    table: state.articles.table,
  };
}, dispatch => {
  return {
    tableActions: bindActionCreators(actions, dispatch),
  };
})(ArticleCRUD);