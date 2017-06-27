/**
 * Created by exialym on 2017/6/24.
 */
import {
  completeTodo
}
  from '../../../model/todoService'

export async function put(req, res, next) {
  console.log('completeTodo')
  const ret = await completeTodo(req.params.id);
  res.api(ret);
}