/**
 * Created by exialym on 2017/5/22 0022.
 */
const initialState = {
  loading: true,
  error: false,
  articleList: [],
};
const LOAD_ARTICLES = 'LOAD_ARTICLES';
const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS';
const LOAD_ARTICLES_ERROR = 'LOAD_ARTICLES_ERROR';

//action creator
export function loadArticles() {
  return {
    types: [LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_ERROR],
    url: 'src/api/articles.json',
  };
}

//reducer
function previewList(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case LOAD_ARTICLES_SUCCESS: {
      //let res = action.payload;
      return {
        ...state,
        loading: false,
        error: false,
        articleList: action.payload
      }
    }
    case LOAD_ARTICLES_ERROR: {
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
export default previewList;