import React from 'react'
import PostsStore from '../stores/PostsStore.jsx'
import { RouteHandler , Lifecycle , State ,RouteContext, History } from 'react-router'
import Helmet from "react-helmet";


const SinglePost = React.createClass({

  mixins: [ Lifecycle ],

  getInitialState() {
    return {
      fetchedData: this.fetchPostDetailBySlug(this.props.params.postId),
      isVisible : false
    };
  },

  fetchPostDetailBySlug(slug){
    //console.log(slug);
    return PostsStore.fetchPostDetailBySlug(slug);
  },

  componentDidMount() {
    this.state.isVisible = true;
    //console.log(this.state.isVisible);
  },

  componentWillReceiveProps(nextProps, prevProps) {
    this.setState({
      fetchedData: PostsStore.fetchPostDetailBySlug(nextProps.params.postId),
      isVisible: true
    });
  },

  shouldComponentUpdate(nextProps, nextState){
      return true;
  //   //return false;//nextProps.id !== this.props.id;
  },

  routerWillLeave(nextLocation) {
    let self = this;
    if (this.state.isVisible) {
      //console.log('ani out please', this.context);
      setTimeout(function(){
        //console.log('delay');
        self.state.isVisible = false;
        self.context.history.pushState(null, nextLocation.pathname);
        //self.context.history.transitionTo('/');
      },500)
      return false;
    }
    //return 'Your work is not saved! Are you sure you want to leave?'
    //return;
  },

  componentWillLeave(callback) {
    console.log('unout', callback);
  },

  render() {
    let fetchedData = this.state.fetchedData;
    //console.log(fetchedData,this.props.params.postId);
    return (
      <article>
        <Helmet title={fetchedData.title.rendered+' | '+ appConfig.wordpressName} />
        <div className='container'>{fetchedData.title.rendered}</div>
      </article>
    );
  }
});

module.exports = SinglePost;

