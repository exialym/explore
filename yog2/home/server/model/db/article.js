/**
 * Created by exialym on 2017/6/26.
 */
var mongoose = require('mongoose');
import db from './index'
let ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  userId: String,
  date:Date,
  detail:String,
})
let ArticleModel = db.model('article',ArticleSchema)
let ArticleDB = {
  getByUser : function (userID) {
    return new Promise(function(resolve, reject){
      ArticleModel.find({},function(err,results){
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
    return ArticleModel.findById(id)
      .then((res) => {
        return res
      })
  },
  save : function (article) {
    var articleItem=new ArticleModel(article);
    //然后保存到数据库
    return articleItem.save()
  },
  delete:function (id) {
    return new Promise(function(resolve, reject){
      ArticleModel.findByIdAndRemove(id,function(err,result){
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
export default ArticleDB