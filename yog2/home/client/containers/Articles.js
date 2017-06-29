/**
 * Created by exialym on 2017/6/24.
 */
import * as React from 'react'
import { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ArticleActions from '../actions/articles'

export default class Articles extends Component {
  componentDidMount() {
    const {articles, actions} = this.props
    if (articles.length===0) {
      actions.getArticles()
    }
  }
  render() {
    const {articles, actions} = this.props
    return (
      <div className="articles">
        {articles.map(article => {
          return (
            <div key={article._id} >
              <h1>{article.title}</h1>
              <span>{article.detail}</span>
              <button onClick={()=>actions.deleteArticle(article._id)}>delete</button>
            </div>
            )

        })}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ArticleActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles)
