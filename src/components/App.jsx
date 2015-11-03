import React from 'react';
import { render } from 'react-dom'
import ReactTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
//import PostStore from '../../stores/PostsStore.jsx';
import { Router, Route, Link , Redirect, IndexRoute} from 'react-router'


import Header from './Header.jsx'
import Homepage from './Homepage.jsx'
import Footer from './Footer.jsx'
import SinglePost from './SinglePost.jsx'

import createBrowserHistory from 'history/lib/createBrowserHistory'

const App = React.createClass({

  render: function()  {
    var key = '';//(this.props.location.pathname.split("/")[1] !== '') ? '' : this.props.location.pathname;
    return (
      <div className="app">
        <Header />
        <div>
          {React.cloneElement(this.props.children || <div />, { key: key })}
        </div>
        <Footer />
      </div>
    );
  }
});

React.render((
  <Router /*history={createBrowserHistory()}*/ >
    <Redirect from="/" to="index" />
    <Route path="/" component={App} >
      <Route name="index" path="index" component={Homepage} >
        <Route name="post" path="/post/:postId" component={SinglePost} />
      </Route>
    </Route>
  </Router>
), document.getElementById('main'));
