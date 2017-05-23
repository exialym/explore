/**
 * Created by exialym on 2017/5/23 0023.
 */
import tableReducer, {loadArticlesForSearch,changeQuery,search} from '../components/Search/TableRedux';
import { combineReducers } from 'redux';
export default combineReducers({
  table: tableReducer,
});
export const actions = {
  loadArticlesForSearch,
  changeQuery,
  search
};