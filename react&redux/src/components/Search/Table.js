/**
 * Created by exialym on 2017/5/23 0023.
 */
import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
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
}];
class ArticleTable extends Component {
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
          columns={columns}
          dataSource={this.props.articles}
        />
      </div>
    );
  }
}
export default ArticleTable;