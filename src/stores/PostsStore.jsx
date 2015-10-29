
var Reflux = require('reflux'),
    PostActions = require('../actions/PostsActions/PostsActions.jsx'),
    request = require( 'superagent' ),
    _ = require('lodash');


var localStorageKey = 'posts',
    apiUrl = '/wp-json/wp/v2',
    endPoint = '/posts';


function getPostByKey(posts,postKey){
    return _.find(posts, function(post) {
        return post.slug === postKey;
    });
}


//http://wpapi.dev/wp-json/wp/v2/pages?filter[name]
var PostsStore = Reflux.createStore ({

    listenables: [PostActions],

    getInitialState: function() {

      var loadedList = localStorage.getItem(localStorageKey);

      //console.log('local (há? )->' , loadedList  );
      if (!loadedList || loadedList === 'undefined') {
        this.fetchPosts();
      } else {
        //this.trigger(this.posts);
        this.updateList(JSON.parse(loadedList));
        this.compareLatestsID();
      }
      //console.log('local else ->', this.posts);
      return this.posts;

    },


    fetchPostDetailBySlug : function(postKey) {
      var foundPost = getPostByKey(this.posts,postKey);
      if (!foundPost) {
          return;
      }
      return foundPost;
    },

    fetchPosts: function () {
      var self = this;

      request
        .get( apiUrl + endPoint)
        .end( function( error, result ) {
            self.updateList(JSON.parse( result.text ));
        });
    },

    compareLatestsID: function () {
      var self = this;
      var loadedList = localStorage.getItem(localStorageKey);
      var storedListLastID = JSON.parse(loadedList)[0].id;

      request
        .get( apiUrl + endPoint + '?filter[posts_per_page]=1')
        .end( function( error, result ) {
          var serverListLastID = JSON.parse( result.text )[0].id;
          //(storedListLastID === serverListLastID) ? self.updateList(JSON.parse(loadedList)) : self.fetchPosts();
          self.fetchPosts();
        });
    },

    updateList: function(posts){
        localStorage.setItem(localStorageKey,JSON.stringify(posts));
        // if we used a real database, we would likely do the below in a callback
        this.posts = posts;
        this.trigger(posts); // sends the updated list to all listening components
    }

});

module.exports = PostsStore;
