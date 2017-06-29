/**
 * Created by exialym on 2017/6/24.
 */
import {
  addTodo,
  setTodo,
  deleteTodo,
  getTodos
}
  from '../../../model/todoService'

export async function post(req, res, next) {
  const ret = await addTodo(req.userId, req.body.text);
  res.api(ret);
}

export async function put(req, res, next) {
  console.log("put")
  const ret = await setTodo(req.params.id, req.body.text);
  res.api(ret);
}

export async function del(req, res, next) {
  const ret = await deleteTodo(req.params.id);
  res.api(ret);
}
export async function get(req, res, next) {
  const ret = await getTodos(req.userId);
  res.api(ret);
}