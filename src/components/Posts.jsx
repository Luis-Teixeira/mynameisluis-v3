
import React from 'react'
import Reflux from 'reflux'
import { State } from 'react-router'
import cx from 'classnames'
//import request from 'superagent'
//import GSAP from 'gsap'
//import _ from 'lodash'
//import LazyLoad from 'react-lazy-load'
import PostsStore from '../stores/PostsStore.jsx'
import Post from './Post.jsx'


const Posts = React.createClass({

  mixins: [Reflux.connect(PostsStore,"posts"), State],

  // getInitialState() {

  // },

  render() {
    //console.log(this.state.posts);

    let classNames = cx({
      'Posts_container row all-posts fade': true
      // 'ended': this.state.animatedEnded,
      // 'ongoing': this.state.animated,
    });

    return (
      <div className="Posts container position-rel">
        <section className={classNames}>
          {
            this.state.posts ?
              this.state.posts.map(function(post, i){
                let postKey = 'post-'+post.id;
                return <Post id={postKey} key={postKey} data={post}/>
              })
            : <div className='loading-state'>
                <div className="spiner animated"></div>
              </div>
          }

        </section>
      </div>
    );
  }
});

module.exports = Posts;