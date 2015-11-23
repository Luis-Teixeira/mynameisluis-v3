import Reflux from 'reflux'
import PostActions from '../actions/PostsActions.jsx'
import request from 'superagent'
import _ from 'lodash'
import timeDifference from '../utils/TimeDifference'

const localStorageKey = 'posts',
      localStorageDateKey = 'post-date',
      apiUrl = '/wp-json/wp/v2',
      endPoint = '/portfolio',
      loadEvery = appConfig.loadDataEvery;

function getPostByKey(posts,postKey){
  return _.find(posts, function(post) {
      return post.slug === postKey;
  });
}

//http://wpapi.dev/wp-json/wp/v2/pages?filter[name]
var PostsStore = Reflux.createStore ({

    listenables: [PostActions],


    getInitialState(){

      let oldDate = localStorage.getItem(localStorageDateKey);
      let loadedList = localStorage.getItem(localStorageKey);

      if( !oldDate || oldDate === 'undefined') {
        localStorage.setItem(localStorageDateKey,appConfig.time);
      }
      //console.log('--->', appConfig.loadDataEvery);
      let oldDateObj = new Date(oldDate);

      if (!loadedList || loadedList === 'undefined' || timeDifference.daysDifference( new Date(), oldDateObj) > loadEvery) {

        localStorage.setItem(localStorageDateKey,appConfig.time);
        this.fetchPosts();
      } else {
        this.updateList(JSON.parse(loadedList));
        //this.compareLatestsID();
      }
      //console.log('local else ->', this.posts);
      return this.posts;
    },

    fetchPostDetailBySlug(postKey) {
      let foundPost = getPostByKey(this.posts,postKey);
      if (!foundPost) {
          return;
      }
      return foundPost;
    },

    fetchPosts() {
      let self = this;

      request
        .get( apiUrl + endPoint)
        .end( function( error, result ) {
            self.updateList(JSON.parse( result.text ));
        });
    },

    updateList(posts){
        localStorage.setItem(localStorageKey,JSON.stringify(posts));
        // if we used a real database, we would likely do the below in a callback
        this.posts = posts;
        this.trigger(posts); // sends the updated list to all listening components
    }

});

module.exports = PostsStore;
