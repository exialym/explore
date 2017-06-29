/**
 * Created by exialym on 2017/6/24.
 */
import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLE
} from '../constants/ActionTypes'

export default function articles(state = [], action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return [
        action.article,
        ...state
      ];

    case DELETE_ARTICLE:
      return state.filter(article =>
        article._id !== action.id
      );

    case EDIT_ARTICLE:
      return state.map(article =>
        article._id === action.id ?
          Object.assign({}, article, action.article) :
          article
      );
    case GET_ARTICLE:
      return [
        ...action.articles,
        ...state,
      ]
    default:
      return state
  }
}