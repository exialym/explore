/**
 * Created by exialym on 2017/5/23 0023.
 */
const initialState = {
  articles: [],
  loading: true,
  error: false,
  query:'',
};

export function addArticle() {
  return (dispatch, getState) => {
    const { title, desc, date } = getState().article.modal.form;
    return dispatch({
      url: '/api/articles.json',
      method: 'POST',
      params: {title: title.value,
        desc: desc.value,
        date: date.value,
      },
    });
  };
}