/**
 * Created by exialym on 2017/5/22 0022.
 */
import { bindRedux } from 'redux-form-utils';
const { state: formState, reducer: formReducer } = bindRedux({
  form: 'my-form',
  fields: ['name', 'address', 'gender'],
});
const initialState = {
  loading: true,
  error: false,
  page: {},
  ...formState,
};
const LOAD_PAGE = 'LOAD_PAGE';
const LOAD_PAGE_SUCCESS = 'LOAD_PAGE_SUCCESS';
const LOAD_PAGE_ERROR = 'LOAD_PAGE_ERROR';

//action creator
export function loadPage(id) {
  return {
    types: [LOAD_PAGE, LOAD_PAGE_SUCCESS, LOAD_PAGE_ERROR],
    url: '../src/api/articles.json',
    id:id,
  };
}

//reducer
function pageDetail(state = initialState, action) {
  switch (action.type) {
    case LOAD_PAGE: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case LOAD_PAGE_SUCCESS: {
      let articleObj;
      for (let article in action.payload) {
        if (!action.payload.hasOwnProperty(article)) continue;
        if (action.payload[article].id+"" === action.id) {
          articleObj = action.payload[article];
          break;
        }
      }
      return {
        ...state,
        loading: false,
        error: false,
        page: articleObj
      }
    }
    case LOAD_PAGE_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default:
      return formReducer(state, action);
  }
}

// const initialState = {
//   foo: 1,
//   bar: 2,
//   ...formState,
// };
// function myReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'MY_ACTION': {
// // ...
//     }
//     default:
//       return formReducer(state, action);
//   }
// }
export default pageDetail;