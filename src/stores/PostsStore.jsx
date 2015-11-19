import Reflux from 'reflux'
import PostActions from '../actions/PostsActions.jsx'
import request from 'superagent'
import _ from 'lodash'
import timeDifference from '../utils/TimeDifference'

const localStorageKey = 'posts',
      localStorageDateKey = 'post-date',
      apiUrl = '/wp-json/wp/v2',
      endPoint = '/portfolio';

function getPostByKey(posts,postKey){
  return _.find(posts, function(post) {
      return post.slug === postKey;
  });
}

//http://wpapi.dev/wp-json/wp/v2/pages?filter[name]
var PostsStore = Reflux.createStore ({

    listenables: [PostActions],

    getInitialState(){
      //let oldDate = '';
      //let currentDate = new Date('Thu Nov 19 2015 11:49:23 +0000');
      //console.log(appConfig.time);

      // console.log(timeDifference.daysDifference(d2,d1));
      let oldDate = localStorage.getItem(localStorageDateKey);
      let loadedList = localStorage.getItem(localStorageKey);

      if( !oldDate || oldDate === 'undefined') {
        localStorage.setItem(localStorageDateKey,appConfig.time);
        //console.log(timeDifference.daysDifference(d2,d1));
      }

      let oldDateObj = new Date(oldDate);
      //console.log(oldDateObj);
      //console.log(timeDifference.daysDifference( new Date(), oldDateObj));
      //console.log(timeDifference.hoursDifference( new Date(), oldDateObj));

      //console.log(localStorage.getItem(localStorageDateKey));

      //console.log('local (há? )->' , loadedList  );
      if (!loadedList || loadedList === 'undefined') {
        this.fetchPosts();
      } else {
        //this.trigger(this.posts);
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

    compareLatestsID() {
      let self = this;
      let loadedList = localStorage.getItem(localStorageKey);
      let storedListLastID = JSON.parse(loadedList)[0].id;

      request
        .get( apiUrl + endPoint + '?filter[posts_per_page]=1')
        .end( function( error, result ) {
          let serverListLastID = JSON.parse( result.text )[0].id;
          //(storedListLastID === serverListLastID) ? self.updateList(JSON.parse(loadedList)) : self.fetchPosts();
          self.fetchPosts();
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
