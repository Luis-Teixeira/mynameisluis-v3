import React from 'react'
import PostsStore from '../stores/PostsStore.jsx'
import { RouteHandler , Lifecycle , State ,RouteContext, History } from 'react-router'
import Helmet from "react-helmet";
import ImageLoader from './ImageLoader'
import LazyLoad from 'react-lazy-load'



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
//    console.log(acf);
    return (
      <article className="SinglePost">
        <Helmet title={fetchedData.title.rendered+' | '+ appConfig.wordpressName} />
        {
          this.state.isVisible ?
          <div className='container'>
            { acf.imagem_banner ? <ImageLoader imageSrc={acf.imagem_banner.sizes.banner_image}/> : <div/> }

            <div className='stagger col-md-8 col-md-push-2'>
              <h2 className="the-title text-center text-uppercase margin-t-60">{fetchedData.title.rendered}</h2>

              <div className="the-content margin-t-60" dangerouslySetInnerHTML={{__html: fetchedData.content.rendered }} />
              <div className="the-link text-center margin-t-40">
                <a href={acf.link_url} title={acf.link_label}>{acf.link_label}</a>
              </div>

              <div className="the-role-wapper margin-t-40">
                <div className="the-role-title uppercase"><strong>ROLE</strong></div>
                <div className="the-role-loop ">
                {

                    acf.role ? acf.role.map(function(role , i){
                      let roleKey = 'role-'+i
                      return <div key={roleKey} dangerouslySetInnerHTML={{__html: role.content }} />
                    }) : ''

                }
                </div>
              </div>
            </div>
            <div className="loop-images margin-t-60 margin-b-60">

               {
                 acf.images ? acf.images.map(function(image , i){
                   let imageKey = 'image-'+i;
                   return (
                      <LazyLoad  key={imageKey} once ref="LazyLoad">
                        <ImageLoader className="project-image" imageSrc={image.image.sizes.large}/>
                      </LazyLoad>
                  )
                 }) : ''
               }

            </div>

          </div>
          : <div />
        }
      </article>
    );
  }
});

module.exports = SinglePost;

