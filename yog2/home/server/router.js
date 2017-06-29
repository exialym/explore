export default function (router) {
  //这里定义了app级别的路由处理
  //这里给请求和响应设置了相应的userid
  router.use((req, res, next) => {
    let userId = req.cookies.userId;
    if (!userId) {
      userId = Math.round(Date.now() + Math.random() * 100);
      res.cookie('userId', userId);
    }
    req.userId = userId;
    next();
  });

  //这里对属于api的请求定义了错误处理方法
  router.use((req, res, next) => {
    res.api = function (data, errno, msg) {
      if (errno === undefined) {
        errno = 0;
      }
      res.json({
        errno,
        data,
        msg
      });
    };
    next();
  });
  //对api类的路由进行特殊的定义，其余的按照yog2的默认规则直接识别到action文件夹下对应的js文件
  router.delete('/api/todos/:id', router.action('api/todos').del);
  router.use('/api/todos/clearCompleted', router.action('api/todos/clearCompleted'));
  router.use('/api/todos/complete/:id', router.action('api/todos/complete'));
  router.use('/api/todos/:id', router.action('api/todos'));
  router.use('/api/articles/:id', router.action('api/articles'));
  // 可以所有页面使用相同的getInitialState解决初始状态不同步问题
  // router.all('*', router.action('index'));
};