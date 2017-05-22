/**
 * Created by exialym on 2017/5/22 0022.
 */
import { combineReducers } from 'redux';
import list, { loadArticles } from '../components/Home/PreviewListRedux';

export default combineReducers({
  list,
});

export const actions = {
  loadArticles,
};
