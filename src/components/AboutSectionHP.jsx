// var React = require('react'),
//     Reflux = require('reflux'),

//     AboutStore = require('../../stores/AboutStore.jsx');

// var AboutSectionHP = React.createClass({

//   mixins: [Reflux.connect(AboutStore,"page")],

//   render: function() {
//     var key = content = '';

//     if(this.state.page) {
//       key = this.state.page[0].id;
//       content = this.state.page[0].content.rendered;
//     }
//     return (
//       <article key={key} className="AboutSectionHP">
//         <div className="container ">
//           <div className="the-content  " dangerouslySetInnerHTML={{__html: content }} />
//         </div>
//       </article>

//     );
//   }
// });

// module.exports = AboutSectionHP;

import React from 'react';
import Reflux from 'reflux';
import AboutStore from '../stores/AboutStore.jsx'



const AboutSectionHP = React.createClass({

  mixins: [Reflux.connect(AboutStore,"page")],

  render: function() {
    var key = '',
        content = '';

    if(this.state.page) {
      key = this.state.page[0].id;
      content = this.state.page[0].content.rendered;
    }
    return (
      <article key={key} className="AboutSectionHP">
        <div className="container ">
          <div className="the-content  " dangerouslySetInnerHTML={{__html: content }} />
        </div>
      </article>
    );
  }
});

module.exports = AboutSectionHP;
