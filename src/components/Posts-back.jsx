/** @jsx React.DOM */

var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    cx = require('classnames'),
    request = require( 'superagent' ),
    GSAP = require('gsap'),
    _ = require('lodash'),

    ReactTransitionGroup = require('react/addons').addons.CSSTransitionGroup,

    PostsStore = require('../../stores/PostsStore.jsx'),
    Post = require('../Post/Post.jsx');


var Posts = React.createClass({

  mixins: [Reflux.connect(PostsStore,"posts"),Router.State],

  getInitialState: function() {
    return {
      animatedEnded: true,
      animated: true,
      canOut: true
    };
  },

  onClickToShow: function () {
    TweenMax.staggerTo('.Post',.4,{autoAlpha:0}, 0.2);
    TweenMax.to('.fader',.4,{autoAlpha:0});
    //TweenMax.to('.Post.active',.4,{autoAlpha:1,y:0, overwrite: 5});
  },

  onClickToClose: function () {
    //console.log('close');
    TweenMax.staggerTo('.Post',.4,{autoAlpha:1}, 0.2);
    TweenMax.to('.fader',.4,{autoAlpha:1});
  },

  handleClick: function(){
    this.setState( { animatedEnded : !this.state.animatedEnded } );
  },

  componentDidMount: function () {
    //console.log('did');
    if(!this.props.currentPath){
      TweenMax.staggerTo('.Post',.4,{autoAlpha:1,y:0,delay:.5}, 0.2);
      TweenMax.to('.fader',.4,{autoAlpha:1});
    }
  },

  componentWillUpdate: function (nextProps, prevProps) {

    if(!nextProps.currentPath) {
      TweenMax.staggerTo('.Post',.4,{autoAlpha:1,y:0,delay:.5}, 0.2);
      TweenMax.to('.fader',.4,{autoAlpha:1});
    }
  },

  render: function() {

    var self = this;
    var key = '';//(this.props.location.pathname.split("/").length > 2) ? '' : this.props.location.pathname;
    var animatedEnded = this.state.animatedEnded ? 'show' : 'hidden';
    var currentPost = '';
    var index = 0;

    var classNames = cx({
      'Posts container all-posts fade': true,
      'ended': this.state.animatedEnded,
      'ongoing': this.state.animated,
    });

    return (
      <div className="position-rel">
        <section className={classNames}  >
          {
            this.state.posts.map(function(post, i){


              var activePost = (self.props.currentPath === post.slug)
              if(self.props.currentPath === post.slug) {
                currentPost = 'post-'+post.id;
                index = i+1;
                //console.log(currentPost);
              }
              //console.log(post.acf);
              //console.log('--->' , self.props.currentPath, self.props.currentPath === post.slug );
              return <Post
                  id= {post.id}
                  key= {post.id}
                  slug= {post.slug}
                  title= {post.title}
                  content= {post.content.rendered}
                  brandColor = {post.acf.brand_color}
                  onClickToShow = {self.onClickToShow}
                  onClickToClose = {self.onClickToClose}
                  activePost = {activePost}
                />
            })
          }
        </section>
        <div transitionName="show-post" transitionAppear={true}>
          {React.cloneElement(this.props.children || <div />, {
            index: index ,
            currentPost: currentPost,
            onClickCallBack: this.handleClick,
            key: key})}
        </div>
        {/*<button className="btn" onClick={this.handleClick}> Toogle Class </button>*/}
      </div>
    );
  }

});

module.exports = Posts;