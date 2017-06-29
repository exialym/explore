/**
 * Created by exialym on 2017/6/24.
 */
import * as axios from 'axios'
import * as types from '../../constants/ActionTypes'

export function addArticle(article) {
  return axios.post('/api/articles', article)
    .then(res => {
    if (res.data.errno === 0) {
      return {
        type: types.ADD_ARTICLE,
        article: res.data.data
      }
    }
    else {
      return showError(res.data.msg);
    }
  }).catch(error => {
    return showError(`request ${error.config.url} ${error.statusText}`);
  })
}

export function getArticles() {
  return axios.get('/api/articles')
    .then(res => {
      if (res.data.errno === 0) {
        return {
          type: types.GET_ARTICLE,
          articles: res.data.data
        }
      }
      else {
        return showError(res.data.msg);
      }
    }).catch(error => {
      return showError(`request ${error.config.url} ${error.statusText}`);
    })
}


export function deleteArticle(id) {
  return axios.delete(`/api/articles/${id}`, {
    id
  }).then(res => {
    if (res.data.errno === 0) {
      return {
        type: types.DELETE_ARTICLE,
        id
      }
    }
    else {
      return showError(res.data.msg);
    }
  }).catch(error => {
    return showError(`request ${error.config.url} ${error.statusText}`);
  })
}

export function editArticle(article) {
  return axios.put(`/api/articles`, article)
    .then(res => {
    if (res.data.errno === 0) {
      return {
        type: types.EDIT_ARTICLE,
        id,
        article: res.data.data
      }
    }
    else {
      return showError(res.data.msg);
    }
  }).catch(error => {
    return showError(`request ${error.config.url} ${error.statusText}`);
  })
}



export function showError(msg) {
  console.error(msg);
  return {
    type: types.SHOW_ERROR,
    msg: msg
  }
}
