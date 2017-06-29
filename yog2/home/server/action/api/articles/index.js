/**
 * Created by exialym on 2017/6/24.
 */
import {
  getArticles,
  getArticle,
  deleteArticle,
  saveArticle
}
  from '../../../model/articleService'

export async function post(req, res, next) {
  const ret = await saveArticle(req.userId, req.body);
  res.api(ret);
}

export async function put(req, res, next) {
  console.log("put")
  const ret = await saveArticle(req.userId, req.body);
  res.api(ret);
}

export async function del(req, res, next) {
  const ret = await deleteArticle(req.params.id);
  res.api(ret);
}

export async function get(req, res, next) {
  console.log('article service get')
  const ret = await getArticles(req.userId);
  res.api(ret);
}