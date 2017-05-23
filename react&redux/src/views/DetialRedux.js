/**
 * Created by exialym on 2017/5/22 0022.
 */
import { combineReducers } from 'redux';
import page, { loadPage } from '../components/Detail/ArticleRedux';

export default combineReducers({
  page,
});

export const actions = {
  loadPage,
};