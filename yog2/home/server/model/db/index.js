/**
 * Created by exialym on 2017/6/26.
 */
var mongoose = require('mongoose');
let db=mongoose.connect('mongodb://localhost:27017/todolist');
export default db