/**
 * Created by exialym on 2017/5/15.
 */
import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CommentConstants from '../constants/CommentConstants';

let comment = [];

function loadComment(newComment) {
  comment = newComment;
}

const CommentStore = assign({}, EventEmitter.prototype, {
  getComment() {
    return comment;
  },
  emitChange() {
    this.emit('change');
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener(callback);
  }
});

AppDispatcher.register((action) => {
  switch (action.type) {
    case CommentConstants.LOAD_COMMENT_SUCCESS: {
      comment = action.payload.comment.commentList;
      CommentStore.emitChange();
    }
  }
});

export default CommentStore;