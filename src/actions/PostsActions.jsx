import Reflux from 'reflux'

var PostActions = Reflux.createActions([
        "getPost",       // called by button in TodoItem
        "postDetail",    // called by button in TodoMain (even though you'd think TodoHeader)
        "compareLatestsID",
        "fetchPostDetailBySlug",
        "fetchPosts",
  ]);

module.exports = PostActions;