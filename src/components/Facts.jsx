
import React from 'react';
import Reflux from 'reflux';
import AboutStore from '../stores/AboutStore.jsx';

var Facts = React.createClass({

  mixins: [Reflux.connect(AboutStore,"page")],

  render: function() {
    var key = '',
        facts = [];
    if(this.state.page) {
      facts = this.state.page[0].acf.faqs;
    }
    return (
      <section className='Facts container fader' id="posts" >
          {
            facts.map(function(fact , i){
              return <div key={'fact-id-'+i}> {fact.funny_faq} </div>
            })
          }
      </section>
    );
  }
});

module.exports = Facts;
