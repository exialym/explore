/**
 * Created by exialym on 2017/5/22 0022.
 */
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
class Preview extends Component {
  static PropTypes = {
    title: React.PropTypes.string,
    link: React.PropTypes.string,
  };
  render() {
    return (
      <article className="article-preview-item">
        <Link to={`/detail/${this.props.id}`}>{this.props.title}</Link>
        <span className="date">{this.props.date}</span>
        <p className="desc">{this.props.description}</p>
      </article>
    );
  }
}
export default Preview;