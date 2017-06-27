/**
 * Created by exialym on 2017/6/19.
 */
// 插件逻辑
module.exports.myPlugin = function(app, conf){
  console.log(conf.id);
  app.use(function (req, res, next) {
    //console.log('Time:', Date.now());
    next();
  });
}

// 设置插件默认配置
module.exports.myPlugin.defaultConf = {

}