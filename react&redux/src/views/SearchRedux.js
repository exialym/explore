/**
 * Created by exialym on 2017/5/23 0023.
 */
import tableReducer, {loadArticlesForSearch,changeQuery,search,deleteArticle} from '../components/Search/TableRedux';
import { combineReducers } from 'redux';
import modal, {addArticle,showModal,hideModal} from '../components/Search/ModalRedux';
export default combineReducers({
  table: tableReducer,
  modal,
});
export const tableActions = {
  loadArticlesForSearch,
  changeQuery,
  search,
  deleteArticle
};
export const modalActions = {
  addArticle,
  showModal,
  hideModal
};