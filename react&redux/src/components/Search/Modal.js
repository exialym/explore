/**
 * Created by exialym on 2017/5/23 0023.
 */
import React, { Component, PropTypes } from 'react';
import { Modal } from 'antd';
import { createForm } from 'redux-form-utils';
import formConfig from './Modal.config';
@createForm(formConfig)
class ArticleModal extends Component {
  render() {
    const { title, desc, date } = this.props.fields;
    return (
      <Modal
        isVisible={this.props.isVisible}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
      >
        <div className="form">
          <div className="control-group">
            <label>标题</label>
            <input type="text" {...title} />
          </div>
          <div className="control-group">
            <label>描述</label>
            <textarea {...desc} />
          </div>
          <div className="control-group">
            <label>݀日期</label>
            <input type="date" {...date} />
          </div>
        </div>
        <button onClick={this.props.onOk}>确认</button>
        <button onClick={this.props.onCancel}>取消</button>
      </Modal>
    );
  }
}
export default ArticleModal;