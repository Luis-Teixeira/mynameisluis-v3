import React from 'react';
import ReactTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
//import PostStore from '../../stores/PostsStore.jsx';
import { Router, Route, Link , Redirect} from 'react-router';

import Header from './Header.jsx';
import Homepage from './Homepage.jsx';
import Footer from './Footer.jsx';

const App = React.createClass({

  render: function()  {
    var key = (this.props.location.pathname.split("/")[1] !== '') ? '' : this.props.location.pathname;
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
  <Router>
    <Route name="root" path="homepage" component={App} >
      <Route name="homepage" path="/index" component={Homepage} />
    </Route>
  </Router>
), document.body);
//), document.getElementById('main'));