/**
 * Created by exialym on 2017/5/25 0025.
 */
var koa = require('koa');
var app = koa();
app.use(function *read(next) {
  yield readFile('./a.text');
  yield next;
  console.log('log end!');
});
app.use(function *logger(next) {
  console.log('log start!');
  yield next;
  console.log('log end!');
});
app.use(function *response() {
  this.body = 'Hello World';
});
app.listen(3000);


app.use = function(fn) {
  //...
  this.middleware.push(fn);
  //...
};

function compose(middleware) {
  return function *(next) {
    var i = middleware.length;
    var prev = next || noop();
    var curr;
    while (i--) {
      curr = middleware[i];
      prev = curr.call(this, prev);
    }
    yield *prev;
  }
}