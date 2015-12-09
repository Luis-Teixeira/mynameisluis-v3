
import React from 'react'
import { State, Lifecycle, RouteContext,Route } from 'react-router'
import cx from 'classnames'
import AboutHp from './AboutSectionHP.jsx'
import Facts from './Facts.jsx'
import Posts from './Posts.jsx'
import Helmet from "react-helmet"
import GSAP from 'gsap'
import ScrollToPlugin from 'gsap/src/uncompressed/plugins/ScrollToPlugin.js'


const Homepage = React.createClass({

  getInitialState() {
    return {
      'showSingle' : false,
      'showSingleContent' : false,
      'singlePostInited': false
      //'thisMounted': false
    };
  },

  singleHandler(props){
    let self = this;
    let delay = 450;

    if(props.location.pathname.split("/")[1] === 'portfolio') {
      //FORWARD
      TweenLite.to(jQuery(window),.3,{scrollTo:{y:0}, ease:Power4.easeOut,onComplete:function(){
        self.setState({
          'singlePostInited':true,
          'showSingle':true
        });

        setTimeout(function(){
          self.setState({
            'showSingleContent' : true
          });
        },delay);
      }})
      //jQuery("html, body").animate({ scrollTop: "0px" });

    } else {
      //REVERSE
      this.setState({
        'showSingleContent' : false
      });

      setTimeout(function(){
        self.setState({
          'singlePostInited':false,
          'showSingle':false
        })
      },delay);
    }
  },

  componentDidMount() {
    this.singleHandler(this.props);
  },

  componentWillReceiveProps(nextProps, prevProps) {
    this.singleHandler(nextProps)
  },

  render() {

    let homepageWarperClass = cx({
      'Homepage-warper': true,
      'with-overlay': this.state.showSingle,
      'filter-blur' : false//this.state.showSingle
    });

    let singlePostClass = cx({
      'SinglePost-warper': true,
      'inited' : this.state.singlePostInited,
      'in' : this.state.showSingleContent
    });

    //let homepageWarperHeight = jQuery('.Homepage-warper').height();

    return (
      <div className="bg-gray-dark">
        <Helmet
          title={appConfig.wordpressName}
          meta={[
            {"name": "description", "content": "My Name Is Luis - Is all about me and my work"},
            {"property": "og:description", "content": "My Name Is Luis - Is all about me and my work"},
            {"property": "og:type", "content": "article"},
            {"property": "og:title", "content": appConfig.wordpressName},
            {"property": "og:url", "content": appConfig.siteURL},
            {"property": "og:image", "content": appConfig.themeURL+"/images/mnslv3.png"},
            {"property": "og:site_name","content": appConfig.wordpressName},
          ]}
          link={[
            //{"rel": "canonical", "href": "http://mysite.com/example"},
          ]}
        />
        <section className={homepageWarperClass} ref="homepageWarper">
          <AboutHp />
          <Posts />
          <Facts />
        </section>
        <section className={singlePostClass} style={{minHeight: jQuery('.Homepage-warper').height()+10}}>
          {React.cloneElement(this.props.children || <div />, { key: 'key' })}
        </section>
      </div>
    );
  }
});

module.exports = Homepage;
