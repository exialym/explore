
/**
 * Created by exialym on 2017/5/23 0023.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleTable from '../components/Search/Table';
import { tableActions,modalActions } from './SearchRedux';
import { bindActionCreators } from 'redux';
import ArticleModal from "../components/Search/Modal";

class ArticleCRUD extends Component {
  render() {
    return (
    <div className="page">
      <button onClick={this.props.modalActions.showModal}>New</button>
      <ArticleTable {...this.props.table} {...this.props.tableActions} />
      <ArticleModal {...this.props.modal} {...this.props.modalActions}/>
    </div>
  );
  }
}
export default connect(state => {
  return {
    table: state.articles.table,
    modal: state.articles.modal,
  };
}, dispatch => {
  return {
    tableActions: bindActionCreators(tableActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
  };
})(ArticleCRUD);