/**
 * Created by exialym on 2017/5/23 0023.
 */
import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
import { Modal } from 'antd';
const columns = [{
  title: '标题',
  dataIndex: 'title',
  key:'title',
}, {
  title: '描述',
  dataIndex: 'description',
  key: 'description',
}, {
  title: '发布日期',
  dataIndex: 'date',
  key: 'date',
}, {
  title: '操作',
  render(text, record) {
    return <a className="op-btn" onClick={this.handleDelete.bind(this, record)}>删除</a>;
  },
}];
class ArticleTable extends Component {
  handleDelete(record) {
    Modal.confirm({
      title: '提示',
      content: '确认删除该文章？',
      onOk: () => {
        this.props.deleteArticle(record).then(() => {
          Modal.success({
            title: '提示',
            content: '成功',
          });
        }, (err) => {
          Modal.error({
            title: '提示',
            content: '失败',
          });
        });
      }
    });
  }
  render() {
    return (
      <div className="table">
        <div className="search">
          <input
            type="text"
            placeholder="请输入关键字"
            value={this.props.query}
            onChange={this.props.changeQuery}
          />
          <button onClick={this.props.search}>搜索</button>
        </div>
        <Table
          columns={columns.map(c => c.render ? ({
            ...c,
            render: c.render.bind(this),
          }) : c)}
          dataSource={this.props.articles}
        />
      </div>
    );
  }
}
export default ArticleTable;