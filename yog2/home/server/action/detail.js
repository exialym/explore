var detail = require('../model/detail.js');
var util = require('../lib/util.js');

module.exports = function(req, res, next){
  console.log('dddddddddddddddddetail');
  next();
};
module.exports.get = function(req, res){
  res.render('home/page/detail.tpl', detail.getData());
  console.log('get detail');
};