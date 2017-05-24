/**
 * Created by exialym on 2017/5/11 0011.
 */

/*************tree diff*********/
// 通过updateDepth对Virtual DOM树进行层级控制，只对相同层级的DOM节点进行比较
const treeDiff = {
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
};



/**************element diff*********/
// 对同一层级的节点，提供3种节点操作，分别为INSERT_MARKUP，MOVE_EXISTING，REMOVE_NODE
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

/**************diff算法的核心*********/
const diff = {
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
    //遍历新的节点集合
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

  moveChild: function(child, afterNode, toIndex, lastIndex) {
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
};
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


/**************Patch*********/
// 将Virtual DOM的变化更新到真实DOM上的方法
function  processUpdates(parentNode, updates) {
  //遍历更新队列
  for (var k = 0; k < updates.length; k++) {
    var update = updates[k];
    //根据更新队列中元素的更新种类做不同的处理
    switch (update.type) {
      //插入新节点
      case ReactMultiChildUpdateTypes.INSERT_MARKUP:
        insertLazyTreeChildAt(
          parentNode,
          update.content,
          getNodeAfter(parentNode, update.afterNode)
        );
        break;
      //需要移动的点
      case ReactMultiChildUpdateTypes.MOVE_EXISTING:
        moveChild(
          parentNode,
          update.fromNode,
          getNodeAfter(parentNode, update.afterNode)
        );
        break;
      case ReactMultiChildUpdateTypes.SET_MARKUP:
        setInnerHTML(
          parentNode,
          update.content
        );
        break;
      case ReactMultiChildUpdateTypes.TEXT_CONTENT:
        setTextContent(
          parentNode,
          update.content
        );
        break;
      //需要删除的点
      case ReactMultiChildUpdateTypes.REMOVE_NODE:
        removeChild(parentNode, update.fromNode);
        break;
    }
  }
}
function getNodeAfter(parentNode, node) {
  if (Array.isArray(node)) {
    node = node[1];
  }
  return node ? node.nextSibling : parentNode.firstChild;
}
//插入新节点
function insertLazyTreeChildAt(parentNode, childTree, referenceNode) {
  DOMLazyTree.insertTreeBefore(parentNode, childTree, referenceNode);
}
//移动已有节点
function moveChild(parentNode, childNode, referenceNode) {
  if (Array.isArray(childNode)) {
    moveDelimitedText(parentNode, childNode[0], childNode[1], referenceNode);
  } else {
    insertChildAt(parentNode, childNode, referenceNode);
  }
}
//删除已有节点
function removeChild(parentNode, childNode) {
  if (Array.isArray(childNode)) {
    var closingComment = childNode[1];
    childNode = childNode[0];
    removeDelimitedText(parentNode, childNode, closingComment);
    parentNode.removeChild(closingComment);
  }
  parentNode.removeChild(childNode);
}
//文本组件要去除openingComment，closingComment得到其中的node
function moveDelimitedText(parentNode, openingComment, closingComment, referenceNode) {
  var node = openingComment;
  while (true) {
    var nextNode = node.nextSibling;
    insertChildAt(parentNode, node, referenceNode);
    if (node === closingComment) {
      break;
    }
    node = nextNode;
  }
}
function removeDelimitedText(parentNode, startNode, closingComment) {
  while (true) {
    var node = startNode.nextSibling;
    if (node === closingComment) {
      break;
    } else {
      parentNode.removeChild(node);
    }
  }
}