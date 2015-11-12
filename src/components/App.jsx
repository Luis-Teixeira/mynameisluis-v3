import React from 'react';
import { render } from 'react-dom'
import ReactTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route , Redirect,Lifecycle,RouteContext} from 'react-router'


import Header from './Header.jsx'
import Homepage from './Homepage.jsx'
import Footer from './Footer.jsx'
import SinglePost from './SinglePost.jsx'
import AboutMe from './Aboutme.jsx'

/* /?gf_page=preview&id=1  */

const App = React.createClass({

  render: function()  {
    let key = '';//(this.props.location.pathname.split("/")[1] === '' || this.props.location.pathname.split("/")[1] === 'portfolio') ? '' : this.props.location.pathname.split("/")[1];
    console.log(key);
    return (
      <div className="app">
        <Header />
        <ReactTransitionGroup component="div"  transitionName="page-transition">
          {React.cloneElement(this.props.children || <div />, { key: key })}
        </ReactTransitionGroup>
        <Footer />
      </div>
    );
  }
});


React.render((
  <Router history={createBrowserHistory()} >
    <Redirect from="/" to="index" />
    <Route path="/" component={App} >
      <Route name="index" path="index" component={Homepage} >
        <Route name="portfolio" path="/portfolio/:postId" component={SinglePost} />
      </Route>
      <Route name="aboutme" path="about-me" component={AboutMe} />

    </Route>
  </Router>
), document.getElementById('main'));
