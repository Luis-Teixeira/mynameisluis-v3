
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
    //console.log(this.props);

    let classNames = cx({
      'Posts_container row all-posts fade': true
      // 'ended': this.state.animatedEnded,
      // 'ongoing': this.state.animated,
    });

    return (

      <div className="Posts container position-rel">
        <section className={classNames}>

          {
            this.state.posts.map(function(post, i){
              let postKey = 'post-'+post.id
              // var activePost = (self.props.currentPath === post.slug)
              // if(self.props.currentPath === post.slug) {
              //   currentPost = 'post-'+post.id;
              //   index = i+1;
              //   //console.log(currentPost);
              // }
              //console.log(post.acf);
              //console.log('--->' , self.props.currentPath, self.props.currentPath === post.slug );
              // return <Post
              //     id= {post.id}
              //     key= {post.id}
              //     slug= {post.slug}
              //     title= {post.title}
              //     content= {post.content.rendered}
              //     brandColor = {post.acf.brand_color}
              //     onClickToShow = {self.onClickToShow}
              //     onClickToClose = {self.onClickToClose}
              //     activePost = {activePost}
              //   />
              return <Post id={postKey} key={postKey} data={post}/>
            })
          }
        </section>
      </div>
    );
  }
});

module.exports = Posts;