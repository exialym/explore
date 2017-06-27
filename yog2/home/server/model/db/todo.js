/**
 * Created by exialym on 2017/6/26.
 */
var mongoose = require('mongoose');
import db from './index'
let TodoSchema = new mongoose.Schema({
  completed: Boolean,
  text: String,
  userId: String,
})
let TodoModel = db.model('todo',TodoSchema)
let TodoDB = {
  getByUser : function (userID) {
    return new Promise(function(resolve, reject){
      TodoModel.find({},function(err,results){
        if(err){
          reject(err)
        } else {
          console.log("getByUser",results)
          resolve(results)
        }
      })
    })
  },
  get : function (id) {
    return TodoModel.findById(id)
      .then((res) => {
        return res
      })
  },
  save : function (todo) {
    var todoItem=new TodoModel(todo);
    //然后保存到数据库
    return todoItem.save()
  },
  delete:function (id) {
    return new Promise(function(resolve, reject){
      TodoModel.findByIdAndRemove(id,function(err,result){
        if(err){
          reject(err)
        }else {
          console.log(result);
          resolve(result)
        }
      })
    })
  }
}
export default TodoDB