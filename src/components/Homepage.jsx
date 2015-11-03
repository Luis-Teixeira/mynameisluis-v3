
import React from 'react'
import { State, Lifecycle, RouteContext } from 'react-router'
import AboutHp from './AboutSectionHP.jsx'
import Facts from './Facts.jsx'
import Posts from './Posts.jsx'


// class Homepage extends React.Component {
//   render() {
//     return (
//       <div>
//         <AboutHp />
//         <Posts children={this.props.children}/>
//         <Facts />
//       </div>
//     );
//   }
// }

// export default Homepage;


// import React from 'react';

const Homepage = React.createClass({

  //mixins: [RouteContext],

  render() {
    return (
      <div>
        <AboutHp />
        <Posts />
        <Facts />
        <div >
          {React.cloneElement(this.props.children || <div />, { key: 'key' })}
        </div>
      </div>
    );
  }
});

module.exports = Homepage;
