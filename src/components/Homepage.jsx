// var React = require('react'),
//     Posts = require('../Posts/Posts.jsx'),
//     About = require('../AboutSectionHP/AboutSectionHP.jsx'),
//     Facts = require('../Facts/Facts.jsx')
// ;


// var Homepage = React.createClass({

//   render: function() {
//     var currentPath = this.props.location.pathname.split("/")[2];
//     //console.log(this.props.location.pathname.split("/")[2];);//.length > 2);
//     return (
//       <div>
//         <About />
//         <Posts children={this.props.children} currentPath={currentPath} />
//         <Facts />
//       </div>
//     );
//   }
// });

import React from 'react';
import AboutHp from './AboutSectionHP.jsx';
import Facts from './Facts.jsx';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <AboutHp />
        <Facts />
      </div>
    );
  }
}

export default Homepage;