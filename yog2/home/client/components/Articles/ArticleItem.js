/**
 * Created by exialym on 2017/6/29.
 */
import * as React from 'react'
import { Component, PropTypes } from 'react'
import * as classnames from 'classnames'

class ArticleItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }



  render() {
    const {article,actions} = this.props
    return (
      <div>
        <h1>{article.title}</h1>
        <span>{article.detail}</span>
        <button onClick={()=>actions.deleteArticle(article._id)}>delete</button>
      </div>
    )
  }
}

ArticleItem.propTypes = {
  // todo: PropTypes.object.isRequired,
  // editTodo: PropTypes.func.isRequired,
  // deleteTodo: PropTypes.func.isRequired,
  // completeTodo: PropTypes.func.isRequired
}

export default ArticleItem
