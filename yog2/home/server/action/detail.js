var detail = require('../model/detail.js');
var util = require('../lib/util.js');

module.exports = function(req, res){
    res.render('home/page/detail.tpl', detail.getData());
};