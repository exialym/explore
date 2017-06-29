/**
 * Created by exialym on 2017/6/24.
 */
import { combineReducers } from 'redux'
import todos from './todos'
import errors from './errors'
import articles from './articles'



const rootReducer = combineReducers({
  todos,
  errors,
  articles,
})

export default rootReducer