/**
 * Created by exialym on 2017/6/24.
 */
import {
  completeAll
}
  from '../../../model/todoService'

export async function post(req, res, next) {
  const data = await completeAll(req.userId);
  res.api({}, data, data === 0 ? '' : 'redis errno');
}