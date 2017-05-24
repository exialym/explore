/**
 * Created by exialym on 2017/5/24 0024.
 */
function createStore(reducer, initialState, enhancer) {
  // 源码第30行
  //如果你传入的initialState是 一个函数，会被赋值到enhancer上
  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState;
    initialState = undefined;
  }
  //enhancer接收createStore来对其进行曾强，返回一个增强的Store
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createStore)(reducer, initialState)
  }
  var currentReducer = reducer;
  var currentState = initialState;
  var listeners = [];
  var isDispatching = false;
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState
  }
  function subscribe(listener) {
    listeners.push(listener)
    var isSubscribed = true
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }
      isSubscribed = false
      var index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    listeners.slice().forEach(listener => listener())
    return action
  }
  function replaceReducer(nextReducer) {
    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }
}