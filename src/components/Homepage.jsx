
import React from 'react'
import { State, Lifecycle, RouteContext,Route } from 'react-router'
import cx from 'classnames'
import AboutHp from './AboutSectionHP.jsx'
import Facts from './Facts.jsx'
import Posts from './Posts.jsx'
import Helmet from "react-helmet";

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
    let delay = 550;

    if(props.location.pathname.split("/")[1] === 'portfolio') {
      //FORWARD

      jQuery("html, body").animate({ scrollTop: "0px" });

      this.setState({
        'singlePostInited':true,
        'showSingle':true
      });

      setTimeout(function(){
        self.setState({
          'showSingleContent' : true
        });
      },delay);
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
      <div className="bg-gray">
        <Helmet
          title={appConfig.wordpressName}
          meta={[
            {"name": "description", "content": "Helmet application"}//,
            //{"property": "og:type", "content": "article"}
          ]}
          link={[
            //{"rel": "canonical", "href": "http://mysite.com/example"},
          ]}
        />
        <section className={homepageWarperClass} ref="homepageWarper">

        </section>
        <section className={singlePostClass} style={{minHeight: jQuery('.Homepage-warper').height()+10}}>
          {React.cloneElement(this.props.children || <div />, { key: 'key' })}
        </section>
      </div>
    );
  }
});
/*<AboutHp />
          <Posts />
          <Facts />*/
module.exports = Homepage;
