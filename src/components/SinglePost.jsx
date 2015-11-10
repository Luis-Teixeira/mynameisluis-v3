import React from 'react'
import PostsStore from '../stores/PostsStore.jsx'
import { RouteHandler , Lifecycle , State ,RouteContext, History } from 'react-router'
import Helmet from "react-helmet";
import ImageLoader from './ImageLoader'


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
    this.state.isVisible = false;
    //console.log(this.state.isVisible);
  },

  componentWillReceiveProps(nextProps, prevProps) {

    let self = this;
    this.setState({
      fetchedData: PostsStore.fetchPostDetailBySlug(nextProps.params.postId)
    });
    setTimeout(function(){
      self.setState({
        isVisible: true
      })
    },750);
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
    let acf = fetchedData.acf;

    console.log(fetchedData);
    return (
      <article className="SinglePost">
        <Helmet title={fetchedData.title.rendered+' | '+ appConfig.wordpressName} />
        {
          this.state.isVisible ?
          <div className='container'>
            <ImageLoader imageSrc={acf.imagem_banner.sizes.banner_image}/>

            <div className='stagger'>
              <h2 className="the-title text-center text-uppercase margin-t-60">{fetchedData.title.rendered}</h2>
              <div className="the-content col-md-8 col-md-push-2 margin-t-60" dangerouslySetInnerHTML={{__html: fetchedData.content.rendered }} />


            </div>
          </div>
          : <div />
        }
      </article>
    );
  }
});

module.exports = SinglePost;

