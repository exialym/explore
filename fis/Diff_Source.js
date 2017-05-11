/**
 * Created by exialym on 2017/5/11 0011.
 */

//tree diff,通过updateDepth对Virtual DOM树进行层级控制，只对相同层级的DOM节点进行比较
updateChildren: function(nextNestedChildrenElements, transaction, context) {
  updateDepth++;
  var errorThrown = true;
  try {
    this._updateChildren(nextNestedChildrenElements, transaction, context);
    errorThrown = false;
  } finally {
    updateDepth--;
    if (!updateDepth) {
      if (errorThrown) {
        clearQueue();
      } else {
        processQueue();
      }
    }
  }
}


//element diff 对同一层级的节点，提供3种节点操作，分别为INSERT_MARKUP，MOVE_EXISTING，REMOVE_NODE
function makeInsertMarkup(markup, afterNode, toIndex) {
  return {
    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
    content: markup,
    fromIndex: null,
    fromNode: null,
    toIndex: toIndex,
    afterNode: afterNode,
  };
}
function makeMove(child, afterNode, toIndex) {
  return {
    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
    content: null,
    fromIndex: child._mountIndex,
    fromNode: ReactReconciler.getNativeNode(child),
    toIndex: toIndex,
    afterNode: afterNode,
  };
}
function makeRemove(child, node) {
  return {
    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
    content: null,
    fromIndex: child._mountIndex,
    fromNode: node,
    toIndex: null,
    afterNode: null,
  };
}

//diff
_updateChildren: function(nextNestedChildrenElements, transaction, context) {
  var prevChildren = this._renderedChildren;
  var removedNodes = {};
  var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements,
    removedNodes, transaction, context);
  if (!nextChildren && !prevChildren) {
    return;
  }
  var updates = null;
  var name;
  var lastIndex = 0;
  var nextIndex = 0;
  var lastPlacedNode = null;
  for (name in nextChildren) {
    if (!nextChildren.hasOwnProperty(name)) {
      continue;
    }
    var prevChild = prevChildren && prevChildren[name];
    var nextChild = nextChildren[name];
    if (prevChild === nextChild) {
      updates = enqueue(
        updates,
        this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex)
      );
      lastIndex = Math.max(prevChild._mountIndex, lastIndex);
      prevChild._mountIndex = nextIndex;
    } else {
      if (prevChild) {
        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
      }
      updates = enqueue(
        updates,
        this._mountChildAtIndex(nextChild, lastPlacedNode, nextIndex, transaction, context)
      );
    }
    nextIndex++;
    lastPlacedNode = ReactReconciler.getNativeNode(nextChild);
  }
  for (name in removedNodes) {
    if (removedNodes.hasOwnProperty(name)) {
      updates = enqueue(
        updates,
        this._unmountChild(prevChildren[name], removedNodes[name])
      );
    }
  }
  if (updates) {
    processQueue(this, updates);
  }
  this._renderedChildren = nextChildren;
},
function enqueue(queue, update) {
  if (update) {queue = queue || [];
    queue.push(update);
  }
  return queue;
}
function processQueue(inst, updateQueue) {
  ReactComponentEnvironment.processChildrenUpdates(
    inst,
    updateQueue,
  );
}

moveChild: function(child, afterNode, toIndex, lastIndex) {
// සࡕጱব ڦۅindex ၭᇀ lastIndexǈሶᅎ޿ۯবۅ
  if (child._mountIndex < lastIndex) {
    return makeMove(child, afterNode, toIndex);
  }
},
createChild: function(child, afterNode, mountImage) {
  return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
},
removeChild: function(child, node) {
  return makeRemove(child, node);
},
_unmountChild: function(child, node) {
  var update = this.removeChild(child, node);
  child._mountIndex = null;
  return update;
},
_mountChildAtIndex: function(child, afterNode, index, transaction, context) {
  var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._nativeContainerInfo,
    context);
  child._mountIndex = index;
  return this.createChild(child, afterNode, mountImage);
},