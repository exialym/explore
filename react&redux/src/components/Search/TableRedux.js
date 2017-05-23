/**
 * Created by exialym on 2017/5/23 0023.
 */
export function loadArticlesForSearch(query) {
  return {
    url: '../src/api/articles.json',
    types: ['LOAD_ARTICLES_FOR_SEARCH', 'LOAD_ARTICLES_FOR_SEARCH_SUCCESS', 'LOAD_ARTICLES_FOR_SEARCH_ERROR'],
    query,
  };
}
// TableRedux.js
const initialState = {
  articles: [],
  loading: true,
  error: false,
  query:'',
};
export function changeQuery(e) {
  return {
    type: 'CHANGE_QUERY',
    payload: {
      query: e.target.value.trim(),
    },
  };
}
export function search() {
  return (dispatch, getState) => {
    const { query } = getState().articles.table;
    return dispatch(loadArticlesForSearch(query));
  }
}
function articles(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_QUERY': {
      return {
        ...state,
        query: action.payload.query,
      };
    }
    case 'LOAD_ARTICLES_FOR_SEARCH': {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case 'LOAD_ARTICLES_FOR_SEARCH_SUCCESS': {
      let articles = [];
      for (let article in action.payload) {
        if (!action.payload.hasOwnProperty(article)) continue;
        if (action.payload[article].title.indexOf(action.query) !== -1) {
          articles.push(action.payload[article]);
        }
      }
      return {
        ...state,
        articles: articles,
        loading: false,
        error: false,
      };
    }
    case 'LOAD_ARTICLES_FOR_SEARCH_ERROR': {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
}
export default articles;