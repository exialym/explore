/******* createClass是创建自定义组件的入口方法，负责管理生命周期中的getDefaultProps。***/
// getDefaultProps方法整个生命周期只执行一次，这样所有实例初始化的props将会被共享
var ReactClass = {
  createClass: function(spec) {
    var Constructor = function(props, context, updater) {
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
      this.state = null;
      var initialState = this.getInitialState ? this.getInitialState() : null;
      this.state = initialState;
    };
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];
    injectedMixins.forEach(
      mixSpecIntoComponent.bind(null, Constructor)
    );
    mixSpecIntoComponent(Constructor, spec);
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }
    return Constructor;
    },
};

/*****MOUNTING，负责生命周期中的getInitialState componentWillMount render和componentDidMount****/
var nextMountID = 1;
mountComponent: function(transaction, nativeParent, nativeContainerInfo, context) {
  this._context = context;
  this._mountOrder = nextMountID++;
  this._nativeParent = nativeParent;
  this._nativeContainerInfo = nativeContainerInfo;
  var publicProps = this._processProps(this._currentElement.props);
  var publicContext = this._processContext(context);
  var Component = this._currentElement.type;
  var inst = this._constructComponent(publicProps, publicContext);
  var renderedElement;
  if (!shouldConstruct(Component) && (inst == null || inst.render == null)) {
    renderedElement = inst;
    warnIfInvalidElement(Component, renderedElement);
    inst = new StatelessComponent(Component);
  }
  inst.props = publicProps;
  inst.context = publicContext;
  inst.refs = emptyObject;
  inst.updater = ReactUpdateQueue;
  this._instance = inst;

  ReactInstanceMap.set(inst, this);
  var initialState = inst.state;
  if (initialState === undefined) {
    inst.state = initialState = null;
  }

  this._pendingStateQueue = null;
  this._pendingReplaceState = false;
  this._pendingForceUpdate = false;
  var markup;
  if (inst.unstable_handleError) {
    markup = this.performInitialMountWithErrorHandling(renderedElement, nativeParent,
      nativeContainerInfo, transaction, context);
  } else {
    markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction,
      context);
  }

if (inst.componentDidMount) {
    transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
  }
  return markup;
}
performInitialMountWithErrorHandling: function(renderedElement, nativeParent, nativeContainerInfo,
                                               transaction, context) {
  var markup;
  var checkpoint = transaction.checkpoint();
  try {
    markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction,
      context);
  } catch (e) {
    transaction.rollback(checkpoint);
    this._instance.unstable_handleError(e);
    if (this._pendingStateQueue) {
      this._instance.state = this._processPendingState(this._instance.props, this._instance.context);
    }
    checkpoint = transaction.checkpoint();
    this._renderedComponent.unmountComponent(true);
    transaction.rollback(checkpoint);
    markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction,
      context);
  }
  return markup;
  },
performInitialMount: function(renderedElement, nativeParent, nativeContainerInfo, transaction,    context) {
  var inst = this._instance;
  if (inst.componentWillMount) {
    inst.componentWillMount();
    if (this._pendingStateQueue) {
      inst.state = this._processPendingState(inst.props, inst.context);
    }
  }
  if (renderedElement === undefined) {
    renderedElement = this._renderValidatedComponent();
  }
  this._renderedNodeType = ReactNodeTypes.getType(renderedElement);
  this._renderedComponent = this._instantiateReactComponent( renderedElement   );
  var markup = ReactReconciler.mountComponent(this._renderedComponent, transaction, nativeParent,
    nativeContainerInfo, this._processChildContext(context));
  return markup;
  },



/*****RECEIVE_PROPS：componentWillReceiveProps shouldComponentUpdate componentWillUpdate render和componentDidUpdate****/
receiveComponent: function(nextElement, transaction, nextContext) {
  var prevElement = this._currentElement;
  var prevContext = this._context;
  this._pendingElement = null;
  this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
  },
updateComponent: function(transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
  var inst = this._instance;
  var willReceive = false;
  var nextContext;
  var nextProps;
  if (this._context === nextUnmaskedContext) {
    nextContext = inst.context;
  } else {
    nextContext = this._processContext(nextUnmaskedContext);
    willReceive = true;
  }
  if (prevParentElement === nextParentElement) {
    nextProps = nextParentElement.props;
  } else {
    nextProps = this._processProps(nextParentElement.props);
    willReceive = true;
  }
  if (willReceive && inst.componentWillReceiveProps) {
    inst.componentWillReceiveProps(nextProps, nextContext);
  }

  var nextState = this._processPendingState(nextProps, nextContext);
  var shouldUpdate =
    this._pendingForceUpdate ||
    !inst.shouldComponentUpdate ||
    inst.shouldComponentUpdate(nextProps, nextState, nextContext);
  if (shouldUpdate) {
    this._pendingForceUpdate = false;
    this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction,
      nextUnmaskedContext);
  } else {
    this._currentElement = nextParentElement;
    this._context = nextUnmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;
  }
},

_performComponentUpdate: function(nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
  var inst = this._instance;
  var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
  var prevProps;
  var prevState;
  var prevContext;
  if (hasComponentDidUpdate) {
    prevProps = inst.props;
    prevState = inst.state;
    prevContext = inst.context;
  }
  if (inst.componentWillUpdate) {
    inst.componentWillUpdate(nextProps, nextState, nextContext);
  }
  this._currentElement = nextElement;
  this._context = unmaskedContext;
  inst.props = nextProps;
  inst.state = nextState;
  inst.context = nextContext;
  this._updateRenderedComponent(transaction, unmaskedContext);
  if (hasComponentDidUpdate) {
    transaction.getReactMountReady().enqueue(
      inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext),
      inst
    );
  }
},
_updateRenderedComponent: function(transaction, context) {
  var prevComponentInstance = this._renderedComponent;
  var prevRenderedElement = prevComponentInstance._currentElement;
  var nextRenderedElement = this._renderValidatedComponent();
  if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
    ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction,
      this._processChildContext(context));
  } else {
    var oldNativeNode = ReactReconciler.getNativeNode(prevComponentInstance);
    ReactReconciler.unmountComponent(prevComponentInstance);

    this._renderedNodeType = ReactNodeTypes.getType(nextRenderedElement);
    this._renderedComponent = this._instantiateReactComponent(
      nextRenderedElement
    );
    var nextMarkup = ReactReconciler.mountComponent(this._renderedComponent, transaction,
      this._nativeParent, this._nativeContainerInfo, this._processChildContext(context));
      this._replaceNodeWithMarkup(oldNativeNode, nextMarkup);
  }
}




/*****UNMOUNTING：负责componentWillUnmount*****/
unmountComponent: function(safely) {
  if (!this._renderedComponent) {
    return;
  }
  var inst = this._instance;
  if (inst.componentWillUnmount) {
    if (safely) {
      var name = this.getName() + '.componentWillUnmount()';
      ReactErrorUtils.invokeGuardedCallback(name, inst.componentWillUnmount.bind(inst));
    } else {
      inst.componentWillUnmount();
    }
  }
  if (this._renderedComponent) {
    ReactReconciler.unmountComponent(this._renderedComponent, safely);
    this._renderedNodeType = null;
    this._renderedComponent = null;
    this._instance = null;
  }
  this._pendingStateQueue = null;
  this._pendingReplaceState = false;
  this._pendingForceUpdate = false;
  this._pendingCallbacks = null;
  this._pendingElement = null;
  this._context = null;
  this._rootNodeID = null;
  this._topLevelWrapper = null;
  ReactInstanceMap.remove(inst);
}

/*******无状态组件*****/
StatelessComponent.prototype.render = function() {
  var Component = ReactInstanceMap.get(this)._currentElement.type; //    state
  var element = Component(this.props, this.context, this.updater);
  warnIfInvalidElement(Component, element);
  return element;
};
function shouldConstruct(Component) {
  return Component.prototype && Component.prototype.isReactComponent;
}

/******setState*****/
ReactComponent.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};
enqueueSetState: function(publicInstance, partialState) {
  var internalInstance = getInternalInstanceReadyForUpdate(
  publicInstance,
  'setState'
  );
  if (!internalInstance) {
    return;
  }
  //将现有更新队列合并，并将新的partialState放入队列
  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
  queue.push(partialState);
  enqueueUpdate(internalInstance);
  },
//如果存在_pendingElement _pendingStateQueue _pendingForceUpdate，则更新组件
performUpdateIfNecessary: function(transaction) {
  if (this._pendingElement != null) {
    ReactReconciler.receiveComponent(this, this._pendingElement, transaction, this._context);
  }
  if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
    this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
  }
}
function enqueueUpdate(component) {
  ensureInjected();
// 不是批量更新模式
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return; }
// 是批量更新模式dirtyComponents
  dirtyComponents.push(component);
}
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
    ReactDefaultBatchingStrategy.isBatchingUpdates = true;
    if (alreadyBatchingUpdates) {
      callback(a, b, c, d, e);
    } else {
      transaction.perform(callback, null, a, b, c, d, e);
    }
    },
}