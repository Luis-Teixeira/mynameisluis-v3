// var React = require('react');
//     ReactRouter = require('react-router'),
//     Link = ReactRouter.Link;


// var Header = React.createClass({

//   render: function() {

//     return (
//       <header className="Header">
//         <div className="container">
//           <div className="row">
//             <Link to="/"className="logo col-md-2">
//               <img src={appConfig.themeURL+"/images/logo.svg"} />
//             </Link>
//             <nav className="nav">
//               <Link to={`/`} className="nav-link" activeClassName="active"> Home </Link>
//               <Link to={`/posts`} className="nav-link" activeClassName="active"> Posts </Link>
//             </nav>
//           </div>
//         </div>
//       </header>
//     );
//   }
// });

//module.exports = Header;

import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <div className="container">
          <div className="row">
            <Link  to="/" className="logo col-md-2">
              <img src={appConfig.themeURL+"/images/logo.svg"} />
            </Link>
            <nav className="nav">
              <Link to={`/`} className="nav-link" activeClassName="active"> Home </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;